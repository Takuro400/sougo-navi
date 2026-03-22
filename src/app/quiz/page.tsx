"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import { quizQuestions } from "@/data/quizQuestions";
import { QuizAnswers } from "@/types";

// ===========================
// 診断ページ
// ===========================
export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [selected, setSelected] = useState<string | null>(null);

  const current = quizQuestions[currentIndex];
  const total = quizQuestions.length;
  const progress = Math.round((currentIndex / total) * 100);
  const isLast = currentIndex === total - 1;

  /** 選択肢を選んだとき */
  const handleSelect = (value: string) => {
    setSelected(value);
  };

  /** 次へ進む */
  const handleNext = () => {
    if (!selected) return;

    const newAnswers = { ...answers, [current.id]: selected };
    setAnswers(newAnswers);

    if (isLast) {
      // 結果ページへ。URLパラメータとして回答を渡す
      const encoded = encodeURIComponent(JSON.stringify(newAnswers));
      router.push(`/result?answers=${encoded}`);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
    }
  };

  /** 前の問いに戻る */
  const handleBack = () => {
    if (currentIndex === 0) return;
    setCurrentIndex((i) => i - 1);
    setSelected(answers[quizQuestions[currentIndex - 1].id] || null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-indigo-50">
      <Header />

      <div className="max-w-lg mx-auto px-4 py-8">
        {/* プログレス */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-primary-600">
              質問 {currentIndex + 1} / {total}
            </span>
            <span className="text-xs text-gray-500">{progress}%完了</span>
          </div>
          <div className="w-full bg-white rounded-full h-2 shadow-inner">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
            />
          </div>
        </div>

        {/* 質問カード */}
        <div className="card shadow-md">
          {/* カテゴリラベル */}
          <div className="mb-4">
            <span className="badge bg-primary-50 text-primary-600 text-xs">
              {categoryLabel(current.category)}
            </span>
          </div>

          {/* 質問文 */}
          <h2 className="font-display font-black text-xl text-gray-900 leading-snug mb-6">
            {current.text}
          </h2>

          {/* 選択肢 */}
          <div className="flex flex-col gap-3">
            {current.options.map((option) => {
              const isActive = selected === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full text-left px-4 py-4 rounded-xl border-2 transition-all duration-150 text-sm font-medium leading-snug active:scale-[0.98]
                    ${isActive
                      ? "border-primary-500 bg-primary-50 text-primary-800 shadow-sm"
                      : "border-surface-200 bg-white text-gray-700 hover:border-primary-300 hover:bg-primary-50/50"
                    }`}
                >
                  <span className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors
                        ${isActive ? "border-primary-500 bg-primary-500" : "border-gray-300"}`}
                    >
                      {isActive && (
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M3.5 6.5L5.5 8.5L8.5 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                      )}
                    </span>
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ナビゲーションボタン */}
          <div className="flex gap-3 mt-6">
            {currentIndex > 0 && (
              <button
                onClick={handleBack}
                className="flex-none py-3 px-5 text-sm font-bold text-gray-500 bg-surface-100 hover:bg-surface-200 rounded-xl transition-colors"
              >
                ← 戻る
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!selected}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-200
                ${selected
                  ? "bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg active:scale-95"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
            >
              {isLast ? "診断結果を見る 🎉" : "次の質問へ →"}
            </button>
          </div>
        </div>

        {/* 注意文 */}
        <p className="text-center text-xs text-gray-400 mt-5 leading-relaxed">
          診断結果は参考情報です。合格を保証するものではありません。
        </p>
      </div>
    </div>
  );
}

/** カテゴリ → 日本語ラベル */
function categoryLabel(cat: string): string {
  const map: Record<string, string> = {
    interest: "興味・関心",
    career: "将来の目標",
    learning: "学び方",
    personality: "性格・特性",
    activity: "高校での活動",
    academic: "学力・評定",
    location: "地域志向",
    school_type: "学校の種別",
    finance: "学費・通学",
  };
  return map[cat] || cat;
}
