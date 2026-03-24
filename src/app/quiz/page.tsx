"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import { quizQuestions } from "@/data/quizQuestions";
import { QuizAnswers } from "@/types";

const REGION_OPTIONS = [
  { value: "hokkaido-tohoku", label: "北海道・東北" },
  { value: "kanto", label: "関東" },
  { value: "chubu-hokuriku", label: "中部・北陸" },
  { value: "kansai", label: "関西" },
  { value: "chugoku-shikoku", label: "中国・四国" },
  { value: "kyushu-okinawa", label: "九州・沖縄" },
  { value: "anywhere", label: "どこでもOK" },
];

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState<"region" | "quiz">("region");
  const [region, setRegion] = useState<string | null>(null);
  const [regionSelected, setRegionSelected] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [selected, setSelected] = useState<string | null>(null);

  const current = quizQuestions[currentIndex];
  const total = quizQuestions.length;
  const progress = step === "region" ? 0 : ((currentIndex + 1) / total) * 100;
  const isLast = currentIndex === total - 1;

  const handleRegionNext = () => {
    if (!regionSelected) return;
    setRegion(regionSelected);
    setStep("quiz");
  };

  const handleSelect = useCallback((value: string) => setSelected(value), []);

  const handleNext = () => {
    if (!selected) return;
    const newAnswers = { ...answers, [current.id]: selected };
    setAnswers(newAnswers);
    if (isLast) {
      router.push(
        `/result?answers=${encodeURIComponent(JSON.stringify(newAnswers))}&region=${encodeURIComponent(region ?? "")}`
      );
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
    }
  };

  const handleBack = () => {
    if (currentIndex === 0) {
      setStep("region");
      return;
    }
    setCurrentIndex((i) => i - 1);
    setSelected(answers[quizQuestions[currentIndex - 1].id] || null);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* 背景グラデーション（ファーストビューと同一） */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/70 via-white to-sky-50/50 pointer-events-none" />
      <div className="absolute -top-32 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-violet-100/35 to-transparent rounded-full blur-3xl pointer-events-none will-change-transform" />
      <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-sky-100/30 to-transparent rounded-full blur-3xl pointer-events-none will-change-transform" />

      <Header variant="light" />

      {/* プログレスバー */}
      <div className="fixed top-14 left-0 right-0 z-40 h-0.5 bg-violet-100">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-[width] duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="relative max-w-lg mx-auto px-4 pt-12 pb-16">

        {step === "region" ? (
          <>
            {/* ヘッダー行 */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-baseline gap-1.5">
                <span className="font-mincho text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent leading-none">
                  1
                </span>
                <span className="text-sm text-slate-400 font-sans">/ {total + 1}</span>
              </div>
              <span className="text-xs font-bold text-violet-600 bg-violet-50 border border-violet-200 px-3 py-1.5 rounded-full">
                地域志向
              </span>
            </div>

            {/* 質問文 */}
            <h2 className="font-mincho text-[1.55rem] font-bold text-slate-800 leading-[1.5] mb-9 tracking-wide">
              志望するエリアを教えてください。
            </h2>

            {/* 選択肢 */}
            <div className="flex flex-col gap-3 mb-8">
              {REGION_OPTIONS.map((option) => {
                const isActive = regionSelected === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => setRegionSelected(option.value)}
                    className={`w-full text-left px-5 py-4 rounded-2xl border transition-colors duration-150
                      ${isActive
                        ? "bg-gradient-to-r from-indigo-500 to-violet-500 border-transparent shadow-lg shadow-indigo-200/60 text-white"
                        : "bg-white border-slate-200 text-slate-700 hover:border-violet-300 hover:bg-violet-50/40 shadow-sm"
                      }`}
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors duration-150
                          ${isActive
                            ? "border-white/70 bg-white/20"
                            : "border-slate-300"
                          }`}
                      >
                        {isActive && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 12 12">
                            <path d="M2.5 6L5 8.5L9.5 3.5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <span className="font-mincho text-base leading-snug">{option.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ナビゲーション */}
            <button
              onClick={handleRegionNext}
              disabled={!regionSelected}
              className={`w-full py-4 font-mincho text-base font-bold rounded-xl transition-colors duration-150
                ${regionSelected
                  ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-300/40 active:opacity-80"
                  : "bg-slate-100 text-slate-300 cursor-not-allowed"
                }`}
            >
              次の質問へ →
            </button>
          </>
        ) : (
          <>
            {/* ヘッダー行 */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-baseline gap-1.5">
                <span className="font-mincho text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent leading-none">
                  {currentIndex + 2}
                </span>
                <span className="text-sm text-slate-400 font-sans">/ {total + 1}</span>
              </div>
              <span className="text-xs font-bold text-violet-600 bg-violet-50 border border-violet-200 px-3 py-1.5 rounded-full">
                {categoryLabel(current.category)}
              </span>
            </div>

            {/* 質問文 */}
            <h2 className="font-mincho text-[1.55rem] font-bold text-slate-800 leading-[1.5] mb-9 tracking-wide">
              {current.text}
            </h2>

            {/* 選択肢 */}
            <div className="flex flex-col gap-3 mb-8">
              {current.options.map((option) => {
                const isActive = selected === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`w-full text-left px-5 py-4 rounded-2xl border transition-colors duration-150
                      ${isActive
                        ? "bg-gradient-to-r from-indigo-500 to-violet-500 border-transparent shadow-lg shadow-indigo-200/60 text-white"
                        : "bg-white border-slate-200 text-slate-700 hover:border-violet-300 hover:bg-violet-50/40 shadow-sm"
                      }`}
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors duration-150
                          ${isActive
                            ? "border-white/70 bg-white/20"
                            : "border-slate-300"
                          }`}
                      >
                        {isActive && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 12 12">
                            <path d="M2.5 6L5 8.5L9.5 3.5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <span className="font-mincho text-base leading-snug">{option.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ナビゲーション */}
            <div className="flex gap-3">
              <button
                onClick={handleBack}
                className="py-4 px-6 font-mincho text-base font-bold text-slate-500 bg-white border border-slate-200 rounded-xl transition-colors duration-150 shadow-sm active:opacity-70"
              >
                ← 戻る
              </button>
              <button
                onClick={handleNext}
                disabled={!selected}
                className={`flex-1 py-4 font-mincho text-base font-bold rounded-xl transition-colors duration-150
                  ${selected
                    ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-300/40 active:opacity-80"
                    : "bg-slate-100 text-slate-300 cursor-not-allowed"
                  }`}
              >
                {isLast ? "診断結果を見る ✨" : "次の質問へ →"}
              </button>
            </div>
          </>
        )}

        {/* 注意文 */}
        <p className="text-center text-xs text-slate-400 mt-8 leading-relaxed font-sans">
          診断結果は参考情報です。合格を保証するものではありません。
        </p>
      </div>
    </div>
  );
}

function categoryLabel(cat: string): string {
  const map: Record<string, string> = {
    interest:          "興味・関心",
    career:            "将来の目標",
    learning:          "学び方",
    personality:       "性格・特性",
    activity:          "高校での活動",
    academic:          "学力・評定",
    location:          "地域志向",
    school_type:       "学校の種別",
    finance:           "学費・通学",
    subject:           "得意科目",
    club:              "部活動",
    graduation_vision: "卒業後の姿",
    campus_life:       "大学生活",
    info_gathering:    "情報収集",
  };
  return map[cat] || cat;
}
