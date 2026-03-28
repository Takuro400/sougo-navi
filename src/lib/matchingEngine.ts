import { QuizAnswers, MatchResult, University, DiagnosisResult, UserTypeInfo, QuizCategory } from "@/types";
import { universities } from "@/data/universities";
import { quizQuestions } from "@/data/quizQuestions";

// ===========================
// マッチングエンジン v2
// ===========================

// ───────────────────────────────────────────────
// 1. カテゴリ重み（spec 準拠）
// ───────────────────────────────────────────────
const CATEGORY_WEIGHTS: Record<QuizCategory, number> = {
  career:            3.0,  // 将来の目標（最重要）
  interest:          2.5,  // 興味分野
  graduation_vision: 2.5,  // 卒業後のなりたい姿
  learning:          2.0,  // 学び方の好み
  location:          2.0,  // 地域志向
  school_type:       2.0,  // 国公立/私立
  personality:       1.5,  // 性格・行動特性
  academic:          1.5,  // 学力・評定
  campus_life:       1.5,  // 大学生活に求めること
  subject:           1.5,  // 得意科目
  finance:           1.0,  // 学費・通学
  activity:          1.0,  // 高校での活動
  club:              1.0,  // 部活の種類
  info_gathering:    1.0,  // 情報収集の好み
};

// ───────────────────────────────────────────────
// 2. 重み付きタグ頻度マップを構築
// ───────────────────────────────────────────────
function buildTagFrequency(answers: QuizAnswers): Record<string, number> {
  const freq: Record<string, number> = {};
  quizQuestions.forEach((q) => {
    const selectedValue = answers[q.id];
    if (!selectedValue) return;
    const option = q.options.find((o) => o.value === selectedValue);
    if (!option) return;
    const weight = CATEGORY_WEIGHTS[q.category] ?? 1.0;
    option.tags.forEach((tag) => {
      freq[tag] = (freq[tag] || 0) + weight;
    });
  });
  return freq;
}

// ───────────────────────────────────────────────
// 3. 学部タイプ別スコア乗数（学部レベルマッチング）
// ───────────────────────────────────────────────
function calcFacultyMultiplier(
  university: University,
  tagFreq: Record<string, number>
): number {
  // 理系スコア：tech / stem / engineering / math / hands-on タグの合計
  const stemScore =
    (tagFreq["tech"]       || 0) +
    (tagFreq["stem"]       || 0) +
    (tagFreq["engineering"]|| 0) +
    (tagFreq["math"]       || 0) +
    (tagFreq["hands-on"]   || 0);

  // 文系スコア：humanities / culture / language / social タグの合計
  const humanitiesScore =
    (tagFreq["humanities"] || 0) +
    (tagFreq["culture"]    || 0) +
    (tagFreq["language"]   || 0) +
    (tagFreq["social"]     || 0);

  // 文理融合スコア：global / interdisciplinary / innovation / business タグの合計
  const mixedScore =
    (tagFreq["global"]          || 0) +
    (tagFreq["interdisciplinary"]|| 0) +
    (tagFreq["innovation"]       || 0) +
    (tagFreq["business"]         || 0);

  const maxScore = Math.max(stemScore, humanitiesScore, mixedScore);
  if (maxScore === 0) return 1.0;

  if (stemScore === maxScore && university.facultyType === "理系")    return 1.5;
  if (humanitiesScore === maxScore && university.facultyType === "文系") return 1.5;
  if (mixedScore === maxScore && university.facultyType === "文理融合") return 1.3;
  return 1.0;
}

// ───────────────────────────────────────────────
// 4. タググループ定義（カテゴリ単位でボーナスを管理）
// ───────────────────────────────────────────────
const TAG_GROUPS: Record<string, string[]> = {
  stem:          ["tech", "stem", "engineering", "math", "science", "research"],
  hands_on:      ["hands-on", "fieldwork", "agriculture", "environment", "marine"],
  global:        ["global", "international", "english", "language"],
  business:      ["business", "entrepreneurship", "innovation", "career-focused", "leadership"],
  community:     ["community", "welfare", "social", "education", "collaborative"],
  humanities:    ["humanities", "culture", "interdisciplinary", "law"],
  creative:      ["arts", "design", "creative"],
  medical:       ["medical", "medicine"],
  presence:      ["prestigious", "academic"],
  location:      ["national", "private", "kyushu", "okinawa", "chugoku-shikoku", "local"],
};

const TAG_GROUP_MAX_BONUS = 20; // 1カテゴリにつき最大ボーナス点

// ───────────────────────────────────────────────
// 5. 大学スコア計算（0〜100）
// カテゴリ単位でボーナスを+20点に上限設定し、100点インフレを防ぐ
// ───────────────────────────────────────────────
const MAX_PER_TAG = (() => {
  const top3 = Object.values(CATEGORY_WEIGHTS)
    .sort((a, b) => b - a)
    .slice(0, 3);
  return top3.reduce((s, w) => s + w, 0); // 3.0 + 2.5 + 2.5 = 8.0
})();

function calcScore(
  university: University,
  tagFreq: Record<string, number>
): number {
  // 大学のタグをグループに分類し、グループ別に集計
  const groupRawScores: Record<string, number> = {};
  const groupMaxScores: Record<string, number> = {};

  university.matchTags.forEach((tag) => {
    const group =
      Object.entries(TAG_GROUPS).find(([, tags]) => tags.includes(tag))?.[0] ?? `other_${tag}`;
    groupRawScores[group] = (groupRawScores[group] || 0) + (tagFreq[tag] || 0);
    groupMaxScores[group] = (groupMaxScores[group] || 0) + MAX_PER_TAG;
  });

  let totalScore = 0;
  let totalMax = 0;

  // グループごとにTAG_GROUP_MAX_BONUSを上限として集計（同カテゴリのタグ積み増しを防ぐ）
  Object.entries(groupRawScores).forEach(([group, rawScore]) => {
    const groupMax = groupMaxScores[group];
    const groupContribution = (rawScore / groupMax) * TAG_GROUP_MAX_BONUS;
    totalScore += Math.min(TAG_GROUP_MAX_BONUS, groupContribution);
    totalMax += TAG_GROUP_MAX_BONUS;
  });

  if (totalMax === 0) return 0;

  const baseScore = Math.min(100, Math.round((totalScore / totalMax) * 100));
  const multiplier = calcFacultyMultiplier(university, tagFreq);
  return Math.min(100, Math.round(baseScore * multiplier));
}

// ───────────────────────────────────────────────
// 6. 学部単位のおすすめ理由生成
// ───────────────────────────────────────────────
type MajorField = University["majorField"];

const MAJOR_FIELD_REASON_FN: Record<
  MajorField,
  (tf: Record<string, number>, univ: University) => string | null
> = {
  "理工・情報": (tf) =>
    (tf["tech"] || 0) + (tf["stem"] || 0) + (tf["engineering"] || 0) >= 2
      ? "プログラミングや数理への関心がこの学部のカリキュラムと一致しています"
      : null,

  "経済・経営": (tf) =>
    (tf["business"] || 0) + (tf["entrepreneurship"] || 0) >= 1.5
      ? "ビジネス・経済への関心が学部の実践的なカリキュラムと合っています"
      : null,

  "文学・語学": (tf) =>
    (tf["humanities"] || 0) + (tf["language"] || 0) + (tf["culture"] || 0) >= 1.5
      ? "言語・文化・人文学への関心がこの学部の専門分野と一致しています"
      : null,

  "社会・福祉": (tf) =>
    (tf["community"] || 0) + (tf["welfare"] || 0) + (tf["social"] || 0) >= 1.5
      ? "社会課題・地域貢献への関心とこの学部のフィールドワーク型教育がマッチしています"
      : null,

  "医療・生命": (tf) =>
    (tf["welfare"] || 0) + (tf["medical"] || 0) >= 1.5
      ? "医療・生命科学への関心とこの学部の専門教育が合っています"
      : null,

  "国際": (tf) =>
    (tf["global"] || 0) + (tf["international"] || 0) + (tf["english"] || 0) >= 2
      ? "グローバルな視野と語学力を伸ばしたいあなたにこの学部の国際環境は最適です"
      : null,

  "法・政治": (tf) =>
    (tf["social"] || 0) + (tf["humanities"] || 0) + (tf["leadership"] || 0) >= 1.5
      ? "社会・制度への関心がこの学部の学びと合致しています"
      : null,

  "芸術・デザイン": (tf) =>
    (tf["culture"] || 0) + (tf["hands-on"] || 0) >= 1.5
      ? "表現・創造への関心がこの学部の実践的カリキュラムと合っています"
      : null,

  "農・環境": (tf) =>
    (tf["community"] || 0) + (tf["fieldwork"] || 0) + (tf["stem"] || 0) >= 1.5
      ? "自然・環境・地域への関心がこの学部のフィールドワーク重視の学びとマッチしています"
      : null,

  "教育": (tf) =>
    (tf["community"] || 0) + (tf["social"] || 0) + (tf["welfare"] || 0) >= 1.5
      ? "人を育てることへの関心がこの学部の教育者育成カリキュラムと合っています"
      : null,
};

function buildMatchReasons(
  university: University,
  tagFreq: Record<string, number>
): string[] {
  const reasons: string[] = [];

  // ── 学部単位の理由（最優先）
  const majorReason = MAJOR_FIELD_REASON_FN[university.majorField]?.(tagFreq, university);
  if (majorReason) reasons.push(majorReason);

  // ── 汎用タグ理由
  if ((tagFreq["global"] || 0) >= 2 && university.matchTags.includes("global")) {
    reasons.push("グローバルな環境・英語での学びを求めるあなたに合っています");
  }
  if ((tagFreq["tech"] || 0) >= 1.5 && university.matchTags.includes("tech")) {
    reasons.push("テクノロジー・エンジニアリング分野への関心が大学の強みと一致しています");
  }
  if ((tagFreq["kyushu"] || 0) >= 1 && university.matchTags.includes("kyushu")) {
    reasons.push("九州・地元志向のあなたにとって通いやすい立地です");
  }
  if ((tagFreq["community"] || 0) >= 1.5 && university.matchTags.includes("community")) {
    reasons.push("地域・社会課題への関心が学部のフィールドワーク型教育とマッチしています");
  }
  if ((tagFreq["hands-on"] || 0) >= 1 && university.matchTags.includes("hands-on")) {
    reasons.push("実験・実習重視の学び方の好みと大学の教育スタイルが合っています");
  }
  if ((tagFreq["national"] || 0) >= 1 && (university.type === "国立" || university.type === "公立")) {
    reasons.push("国公立大学を希望するあなたの条件に合っています（学費が比較的安い）");
  }
  if ((tagFreq["business"] || 0) >= 1.5 && university.matchTags.includes("business")) {
    reasons.push("ビジネス・経営への関心が学部のカリキュラムと合致しています");
  }
  if ((tagFreq["leadership"] || 0) >= 1.5 && university.matchTags.includes("leadership")) {
    reasons.push("リーダーシップや主体性が活かせる学風・課外活動が充実しています");
  }
  if ((tagFreq["entrepreneurship"] || 0) >= 2 && university.matchTags.includes("entrepreneurship")) {
    reasons.push("起業・新規事業への挑戦を後押しするカリキュラムや学内環境が整っています");
  }
  if ((tagFreq["humanities"] || 0) >= 2 && university.matchTags.includes("humanities")) {
    reasons.push("文学・歴史・思想への関心と大学の人文系カリキュラムがマッチしています");
  }

  // 不足時のフォールバック
  if (reasons.length === 0) {
    reasons.push("あなたの興味・関心の方向性がこの大学の特色と合っています");
  }
  if (reasons.length < 2) {
    reasons.push(`総合型選抜との相性は「${university.sougoCompatibility}」で、積極的に活用できます`);
  }

  return reasons;
}

// ───────────────────────────────────────────────
// 7. 準備度を判定
// ───────────────────────────────────────────────
function calcReadinessLevel(
  score: number,
  answers: QuizAnswers
): "高" | "中" | "低" {
  const academicAnswer = answers["q13"]; // q13: 今の偏差値帯（a=60以上, b=53〜59）
  const hasHighAcademic = academicAnswer === "a" || academicAnswer === "b";
  if (score >= 65 && hasHighAcademic) return "高";
  if (score >= 40) return "中";
  return "低";
}

// ───────────────────────────────────────────────
// 8. 準備度に応じた必要行動リスト
// ───────────────────────────────────────────────
function buildRequiredActions(
  university: University,
  readiness: "高" | "中" | "低"
): string[] {
  const base = [
    `${university.name}のオープンキャンパスに参加する`,
    "入試要項を確認し、出願書類を把握する",
  ];
  if (readiness === "低") {
    return [
      "まずは自分の興味・将来像を言語化してみる",
      "志望する学部に関連する本・記事を読む",
      ...base,
      university.requiredActivities[0] || "関連する活動・体験を始める",
    ];
  }
  if (readiness === "中") {
    return [
      ...base,
      "志望理由書の初稿を書いてみる",
      university.requiredActivities[0] || "関連する活動実績を作る",
      "総合型選抜の日程・倍率を調べる",
    ];
  }
  return [
    ...base,
    "志望理由書を完成させる",
    "面接・小論文対策を始める",
    "活動実績をポートフォリオとしてまとめる",
  ];
}

// ───────────────────────────────────────────────
// 9. ユーザータイプ判定
// タグ合計が最も高いタイプを採用（複数該当時は最高スコア）
// ───────────────────────────────────────────────
const USER_TYPE_DATA: Record<string, UserTypeInfo> = {
  global: {
    type: "global",
    label: "グローバル志向型",
    icon: "🌍",
    color: "text-blue-700",
    bgColor: "bg-blue-50 border-blue-200",
    description: "国境を越えた視野と行動力を持ち、グローバルな舞台で活躍することを目指すタイプ。英語や異文化コミュニケーションへの関心が高く、海外留学や国際的なキャリアに意欲的です。",
    traits: ["英語・外国語が得意", "海外留学に積極的", "多様な文化に興味がある", "国際的な視野を持つ"],
  },
  stem: {
    type: "stem",
    label: "理系探究型",
    icon: "🔬",
    color: "text-indigo-700",
    bgColor: "bg-indigo-50 border-indigo-200",
    description: "科学・技術・工学・数学への深い探究心を持ち、論理的思考と分析力を武器にするタイプ。最先端の研究や技術開発に関心があり、専門的な知識を積み重ねることを好みます。",
    traits: ["論理的・分析的な思考", "理系科目が得意", "研究・実験が好き", "専門技術を深めたい"],
  },
  community: {
    type: "community",
    label: "地域貢献型",
    icon: "🤝",
    color: "text-green-700",
    bgColor: "bg-green-50 border-green-200",
    description: "地域や社会の課題に真摯に向き合い、人のために行動することを大切にするタイプ。ボランティアや地域活動の経験を活かし、地元や身近なコミュニティで貢献することを目指します。",
    traits: ["人の役に立ちたい", "地域・社会課題に関心", "協調性が高い", "現場での活動が好き"],
  },
  business: {
    type: "business",
    label: "ビジネス挑戦型",
    icon: "🚀",
    color: "text-orange-700",
    bgColor: "bg-orange-50 border-orange-200",
    description: "行動力とリーダーシップで社会に変革をもたらすことを目指す挑戦的なタイプ。起業やビジネスに関心が高く、新しいアイデアや仕組みで世の中を変えることを夢見ています。",
    traits: ["行動力・リーダーシップ", "起業・ビジネスに興味", "チャレンジ精神旺盛", "新しいアイデアを生み出す"],
  },
  culture: {
    type: "culture",
    label: "文化教養型",
    icon: "📚",
    color: "text-purple-700",
    bgColor: "bg-purple-50 border-purple-200",
    description: "幅広い教養と深い洞察力を持ち、文学・歴史・芸術・哲学など人文知の世界に魅力を感じるタイプ。多角的な視点から物事を考え、言語や表現を通じて世界を理解することを好みます。",
    traits: ["文系科目が得意", "読書・文化活動が好き", "多角的な視点を持つ", "言語・表現に興味がある"],
  },
};

function determineUserType(tagFreq: Record<string, number>): UserTypeInfo {
  const typeScores: Record<string, number> = {
    // globalタグが3以上で優位
    global:    (tagFreq["global"]          || 0) +
               (tagFreq["international"]   || 0) +
               (tagFreq["english"]         || 0) +
               (tagFreq["language"]        || 0),
    // stem/tech/engineeringタグが3以上で優位
    stem:      (tagFreq["tech"]            || 0) +
               (tagFreq["stem"]            || 0) +
               (tagFreq["engineering"]     || 0) +
               (tagFreq["math"]            || 0),
    // community/local/socialタグが3以上で優位
    community: (tagFreq["community"]       || 0) +
               (tagFreq["welfare"]         || 0) +
               (tagFreq["social"]          || 0) +
               (tagFreq["fieldwork"]       || 0),
    // business/entrepreneurshipタグが3以上で優位
    business:  (tagFreq["business"]        || 0) +
               (tagFreq["entrepreneurship"]|| 0) +
               (tagFreq["innovation"]      || 0) +
               (tagFreq["leadership"]      || 0),
    // culture/language/interdisciplinaryタグが3以上で優位
    culture:   (tagFreq["humanities"]      || 0) +
               (tagFreq["culture"]         || 0) +
               (tagFreq["interdisciplinary"]|| 0),
  };

  const topType = Object.entries(typeScores)
    .sort(([, a], [, b]) => b - a)[0][0];

  return USER_TYPE_DATA[topType] ?? USER_TYPE_DATA["global"];
}

// ───────────────────────────────────────────────
// 9. 地域スラッグ → 大学 region 名マッピング
// ───────────────────────────────────────────────
const REGION_MAP: Record<string, string[]> = {
  "hokkaido-tohoku": ["北海道", "東北"],
  "kanto":           ["関東"],
  "chubu-hokuriku":  ["中部", "北陸", "中部・北陸"],
  "kansai":          ["関西"],
  "chugoku-shikoku": ["中国", "四国", "中国・四国"],
  "kyushu-okinawa":  ["九州", "沖縄"],
  "anywhere":        [],
};

// ───────────────────────────────────────────────
// 10. メイン：診断結果を生成
// ───────────────────────────────────────────────

// ランク別スコア上限（1位100点、2位最大85点、3位最大70点…と差を広げる）
const RANK_SCORE_CAPS = [100, 85, 70, 57, 45, 35, 27, 21, 17, 14];

export function generateMatchResults(answers: QuizAnswers, region = ""): DiagnosisResult {
  const tagFreq = buildTagFrequency(answers);
  const regionNames = REGION_MAP[region] ?? [];
  const userType = determineUserType(tagFreq);

  // 偏差値帯マッピング
  const hensachiRanges: Record<string, (h: number) => boolean> = {
    "hensachi-high":     (h) => h >= 60,
    "hensachi-mid-high": (h) => h >= 53 && h <= 59,
    "hensachi-mid":      (h) => h >= 46 && h <= 52,
    "hensachi-low":      (h) => h <= 45,
  };
  const hensachiTag = Object.keys(hensachiRanges).find((tag) => (tagFreq[tag] || 0) > 0) ?? null;

  // 文理傾向の判定
  const stemScore =
    (tagFreq["tech"] || 0) + (tagFreq["stem"] || 0) + (tagFreq["engineering"] || 0) +
    (tagFreq["math"] || 0) + (tagFreq["hands-on"] || 0);
  const humanitiesScore =
    (tagFreq["humanities"] || 0) + (tagFreq["culture"] || 0) +
    (tagFreq["language"] || 0) + (tagFreq["social"] || 0);
  const userOrientation: "理系" | "文系" | null =
    stemScore > humanitiesScore * 1.5 ? "理系" :
    humanitiesScore > stemScore * 1.5  ? "文系" : null;

  // 地元志向フラグ（Q8で「地元で学びたい」を選択した場合は "local" タグが入る）
  const isLocalPreference = (tagFreq["local"] || 0) > 0 && regionNames.length > 0;

  // Step 1: 総合型選抜が利用可能な大学のみを対象にフィルタリング
  // 地元志向の場合は選択地域内の大学のみに絞る
  const eligibleUniversities = universities.filter((univ) => {
    if (!univ.sougouAdmission?.available) return false;
    if (isLocalPreference && !regionNames.includes(univ.region)) return false;
    return true;
  });

  // Step 2: 全大学の生スコアを計算（ボーナス・ペナルティ含む）
  const rawResults = eligibleUniversities.map((univ) => {
    let score = calcScore(univ, tagFreq);

    if (isLocalPreference) {
      // 地元志向強化：一致地域に+40、不一致は既にフィルタ済みなので適用なし
      score += 40;
    } else {
      // 通常の地域ボーナス（一致）
      if (regionNames.length > 0 && regionNames.includes(univ.region)) {
        score += 20;
      }
      // 通常の地域ペナルティ（不一致）
      if (regionNames.length > 0 && !regionNames.includes(univ.region)) {
        score -= 20;
      }
    }

    // 偏差値帯ボーナス（一致）
    if (hensachiTag && univ.hensachi != null && hensachiRanges[hensachiTag](univ.hensachi)) {
      score += 15;
    }
    // 偏差値帯ペナルティ（不一致）
    if (hensachiTag && univ.hensachi != null && !hensachiRanges[hensachiTag](univ.hensachi)) {
      score -= 25;
    }

    // 文理ペナルティ（理系回答なのに文系学部、または逆）
    if (userOrientation === "理系" && univ.facultyType === "文系") {
      score -= 30;
    } else if (userOrientation === "文系" && univ.facultyType === "理系") {
      score -= 30;
    }

    score = Math.max(0, score);

    return { univ, score };
  });

  // Step 2: スコア降順でソート
  rawResults.sort((a, b) => b.score - a.score);

  // Step 3: 全体正規化（最高点を100として相対化）＋ランク別上限で差を広げる
  const maxRawScore = rawResults[0]?.score ?? 1;

  const matchResults: MatchResult[] = rawResults.map(({ univ, score }, index) => {
    const normalizedScore = maxRawScore > 0
      ? Math.round((score / maxRawScore) * 100)
      : 0;
    // ランク別上限を適用して上位との差を明確化
    const rankCap = RANK_SCORE_CAPS[index] ?? 10;
    const finalScore = Math.min(normalizedScore, rankCap);

    const matchReasons    = buildMatchReasons(univ, tagFreq);
    const readinessLevel  = calcReadinessLevel(finalScore, answers);
    const requiredActions = buildRequiredActions(univ, readinessLevel);

    return {
      university: univ,
      score: finalScore,
      matchReasons,
      readinessLevel,
      requiredActions,
      userType,
    };
  });

  return { matchResults, userType };
}
