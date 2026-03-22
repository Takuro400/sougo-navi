import { QuizAnswers, MatchResult, University } from "@/types";
import { universities } from "@/data/universities";
import { quizQuestions } from "@/data/quizQuestions";

// ===========================
// マッチングエンジン
// 診断回答 → 大学おすすめスコア算出
// ===========================

/** 回答から全タグを収集して頻度マップを作る */
function buildTagFrequency(answers: QuizAnswers): Record<string, number> {
  const freq: Record<string, number> = {};

  quizQuestions.forEach((q) => {
    const selectedValue = answers[q.id];
    if (!selectedValue) return;
    const option = q.options.find((o) => o.value === selectedValue);
    if (!option) return;
    option.tags.forEach((tag) => {
      freq[tag] = (freq[tag] || 0) + 1;
    });
  });

  return freq;
}

/** 1件の大学に対してスコアを計算 (0〜100) */
function calcScore(university: University, tagFreq: Record<string, number>): number {
  let score = 0;
  let maxPossible = 0;

  university.matchTags.forEach((tag) => {
    const weight = tagFreq[tag] || 0;
    score += weight;
    maxPossible += 3; // 最大3問でそのタグが選ばれうる想定
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
// メイン：診断結果を生成
// ===========================
export function generateMatchResults(answers: QuizAnswers): MatchResult[] {
  const tagFreq = buildTagFrequency(answers);

  const results: MatchResult[] = universities.map((univ) => {
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
  return results.sort((a, b) => b.score - a.score);
}
