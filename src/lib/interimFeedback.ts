import { QuizAnswers, UserType } from "@/types";
import { quizQuestions } from "@/data/quizQuestions";

// ===========================
// 回答から支配的ユーザータイプを判定
// ===========================

const TAG_TO_TYPE: Record<string, UserType> = {
  global:          "global",
  international:   "global",
  english:         "global",
  language:        "global",
  stem:            "stem",
  engineering:     "stem",
  tech:            "stem",
  math:            "stem",
  innovation:      "stem",
  community:       "community",
  welfare:         "community",
  social:          "community",
  fieldwork:       "community",
  medical:         "community",
  business:        "business",
  entrepreneurship:"business",
  leadership:      "business",
  practical:       "business",
  culture:         "culture",
  humanities:      "culture",
  interdisciplinary:"culture",
  art:             "culture",
};

export function getDominantType(answers: QuizAnswers): UserType | "default" {
  const typeScores: Record<UserType, number> = {
    global: 0, stem: 0, community: 0, business: 0, culture: 0,
  };

  Object.entries(answers).forEach(([qId, optionValue]) => {
    const question = quizQuestions.find((q) => q.id === qId);
    if (!question) return;
    const option = question.options.find((o) => o.value === optionValue);
    if (!option) return;
    option.tags.forEach((tag) => {
      const type = TAG_TO_TYPE[tag];
      if (type) typeScores[type]++;
    });
  });

  const sorted = (Object.entries(typeScores) as [UserType, number][]).sort(
    (a, b) => b[1] - a[1]
  );
  if (sorted[0][1] === 0) return "default";
  return sorted[0][0];
}
