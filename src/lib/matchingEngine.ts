import { QuizAnswers, MatchResult, University, DiagnosisResult, UserTypeInfo, QuizCategory } from "@/types";
import { universities } from "@/data/universities";
import { quizQuestions } from "@/data/quizQuestions";

// ===========================
// マッチングエンジン
// 診断回答 → 大学おすすめスコア算出 + ユーザータイプ判定
// ===========================

/**
 * カテゴリごとのスコア重み
 * 高いほど大学マッチングに強く影響する
 */
const CATEGORY_WEIGHTS: Record<QuizCategory, number> = {
  interest:          2.0,  // 興味分野（最重要）
  career:            2.0,  // 将来の目標（最重要）
  graduation_vision: 2.0,  // 卒業後のなりたい姿（最重要）
  learning:          1.5,  // 学び方の好み
  campus_life:       1.5,  // 大学生活に求めること
  personality:       1.5,  // 性格・行動特性
  subject:           1.5,  // 得意科目
  finance:           1.5,  // 学費・通学
  location:          3.0,  // 地域志向（立地は特に重要）
  school_type:       2.0,  // 国公立/私立
  activity:          1.0,  // 高校での活動
  club:              1.0,  // 部活の種類
  info_gathering:    1.0,  // 情報収集の好み
  academic:          0.5,  // 学力・評定（マッチングより準備度に使用）
};

/** 回答から全タグを収集して重み付き頻度マップを作る */
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

/**
 * 1件の大学に対してスコアを計算 (0〜100)
 * 重み付きタグ頻度と大学のmatchTagsのマッチ度で算出
 */
function calcScore(university: University, tagFreq: Record<string, number>): number {
  let score = 0;
  let maxPossible = 0;

  university.matchTags.forEach((tag) => {
    score += tagFreq[tag] || 0;
    // 重み付きシステムでの最大値: 平均重み(≒1.83) × 最大マッチ問数(3) ≈ 5.5
    maxPossible += 5.5;
  });

  if (maxPossible === 0) return 0;
  return Math.min(100, Math.round((score / maxPossible) * 100));
}

/** スコアに基づいておすすめ理由を生成 */
function buildMatchReasons(
  university: University,
  tagFreq: Record<string, number>
): string[] {
  const reasons: string[] = [];

  // グローバル志向
  if ((tagFreq["global"] || 0) >= 2 && university.matchTags.includes("global")) {
    reasons.push("グローバルな環境や英語での学びを求めるあなたに合っています");
  }
  // 理工系志向
  if ((tagFreq["tech"] || 0) >= 1 && university.matchTags.includes("tech")) {
    reasons.push("テクノロジー・エンジニアリング分野への関心が大学の強みと一致しています");
  }
  // 地域志向
  if ((tagFreq["kyushu"] || 0) >= 1 && university.matchTags.includes("kyushu")) {
    reasons.push("九州・地元志向のあなたにとって通いやすい立地です");
  }
  // 社会課題・コミュニティ志向
  if ((tagFreq["community"] || 0) >= 1 && university.matchTags.includes("community")) {
    reasons.push("地域・社会課題への関心が学部のフィールドワーク型教育とマッチしています");
  }
  // 実践的な学び
  if ((tagFreq["hands-on"] || 0) >= 1 && university.matchTags.includes("hands-on")) {
    reasons.push("実験・実習重視の学び方の好みと大学の教育スタイルが合っています");
  }
  // 国公立志向
  if ((tagFreq["national"] || 0) >= 1 && (university.type === "国立" || university.type === "公立")) {
    reasons.push("国公立大学を希望するあなたの条件に合っています（学費が比較的安い）");
  }
  // ビジネス志向
  if ((tagFreq["business"] || 0) >= 1 && university.matchTags.includes("business")) {
    reasons.push("ビジネス・経営への関心が学部のカリキュラムと合致しています");
  }
  // リーダーシップ
  if ((tagFreq["leadership"] || 0) >= 1 && university.matchTags.includes("leadership")) {
    reasons.push("リーダーシップや主体性が活かせる学風・課外活動が充実しています");
  }
  // 起業・イノベーション志向
  if ((tagFreq["entrepreneurship"] || 0) >= 1.5 && university.matchTags.includes("entrepreneurship")) {
    reasons.push("起業・新規事業への挑戦を後押しするカリキュラムや学内環境が整っています");
  }
  // 人文・教養志向
  if ((tagFreq["humanities"] || 0) >= 1.5 && university.matchTags.includes("humanities")) {
    reasons.push("文学・歴史・思想への関心と大学の人文系カリキュラムがマッチしています");
  }

  // 理由が少なければ汎用メッセージを追加
  if (reasons.length === 0) {
    reasons.push("あなたの興味・関心の方向性がこの大学の特色と合っています");
  }
  if (reasons.length < 2) {
    reasons.push(`総合型選抜との相性は「${university.sougoCompatibility}」で、積極的に活用できます`);
  }

  return reasons;
}

/** 準備度を判定 */
function calcReadinessLevel(
  score: number,
  answers: QuizAnswers
): "高" | "中" | "低" {
  const academicAnswer = answers["q6"];
  const hasHighAcademic = academicAnswer === "a" || academicAnswer === "b";

  if (score >= 65 && hasHighAcademic) return "高";
  if (score >= 40) return "中";
  return "低";
}

/** 準備度に応じた必要行動リストを生成 */
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
  // 高
  return [
    ...base,
    "志望理由書を完成させる",
    "面接・小論文対策を始める",
    "活動実績をポートフォリオとしてまとめる",
  ];
}

// ===========================
// ユーザータイプ判定
// ===========================

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

/** タグ頻度からユーザータイプを判定 */
function determineUserType(tagFreq: Record<string, number>): UserTypeInfo {
  const typeScores: Record<string, number> = {
    global:    (tagFreq["global"] || 0) + (tagFreq["international"] || 0) + (tagFreq["english"] || 0) + (tagFreq["language"] || 0),
    stem:      (tagFreq["tech"] || 0) + (tagFreq["stem"] || 0) + (tagFreq["engineering"] || 0) + (tagFreq["math"] || 0),
    community: (tagFreq["community"] || 0) + (tagFreq["welfare"] || 0) + (tagFreq["social"] || 0) + (tagFreq["fieldwork"] || 0),
    business:  (tagFreq["business"] || 0) + (tagFreq["entrepreneurship"] || 0) + (tagFreq["innovation"] || 0) + (tagFreq["leadership"] || 0),
    culture:   (tagFreq["humanities"] || 0) + (tagFreq["culture"] || 0) + (tagFreq["interdisciplinary"] || 0),
  };

  const topType = Object.entries(typeScores)
    .sort(([, a], [, b]) => b - a)[0][0];

  return USER_TYPE_DATA[topType] ?? USER_TYPE_DATA["global"];
}

// ===========================
// メイン：診断結果を生成
// ===========================
export function generateMatchResults(answers: QuizAnswers): DiagnosisResult {
  const tagFreq = buildTagFrequency(answers);

  const matchResults: MatchResult[] = universities.map((univ) => {
    const score = calcScore(univ, tagFreq);
    const matchReasons = buildMatchReasons(univ, tagFreq);
    const readinessLevel = calcReadinessLevel(score, answers);
    const requiredActions = buildRequiredActions(univ, readinessLevel);

    return {
      university: univ,
      score,
      matchReasons,
      readinessLevel,
      requiredActions,
    };
  });

  // スコア降順でソート
  matchResults.sort((a, b) => b.score - a.score);

  const userType = determineUserType(tagFreq);

  return { matchResults, userType };
}
