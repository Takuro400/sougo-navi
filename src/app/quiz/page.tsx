"use client";

import { useState } from "react";
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

// ===========================
// 診断ページ
// ===========================
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

  const handleSelect = (value: string) => setSelected(value);

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
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* 背景グラデーションオーブ */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <Header />

      {/* グローバル進捗バー */}
      <div className="fixed top-14 left-0 right-0 z-40 h-0.5 bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="relative max-w-lg mx-auto px-4 pt-10 pb-16">

        {step === "region" ? (
          <>
            {/* ヘッダー行 */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-white/30">
                <span className="text-2xl font-black text-white">1</span>
                <span className="text-sm">/ {total + 1}</span>
              </div>
              <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                地域志向
              </span>
            </div>

            {/* 質問文 */}
            <h2 className="font-display font-black text-2xl text-white leading-snug mb-8">
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
                    className={`w-full text-left px-5 py-5 rounded-2xl border-2 transition-all duration-200 active:scale-[0.97]
                      ${isActive
                        ? "bg-gradient-to-r from-indigo-600/70 to-violet-600/70 border-indigo-400/70 shadow-lg shadow-indigo-500/20 text-white"
                        : "bg-white/5 border-white/10 text-white/75 hover:bg-white/8 hover:border-white/20 hover:text-white"
                      }`}
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-all duration-200
                          ${isActive
                            ? "border-white/60 bg-white/20 scale-110"
                            : "border-white/20"
                          }`}
                      >
                        {isActive && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 12 12">
                            <path d="M2.5 6L5 8.5L9.5 3.5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <span className="text-base font-medium leading-snug">{option.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ナビゲーション */}
            <div className="flex gap-3">
              <button
                onClick={handleRegionNext}
                disabled={!regionSelected}
                className={`flex-1 py-4 text-base font-bold rounded-xl transition-all duration-200
                  ${regionSelected
                    ? "bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white shadow-lg shadow-indigo-500/25 active:scale-95"
                    : "bg-white/5 text-white/20 cursor-not-allowed"
                  }`}
              >
                次の質問へ →
              </button>
            </div>
          </>
        ) : (
          <>
            {/* ヘッダー行 */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-white/30">
                <span className="text-2xl font-black text-white">{currentIndex + 2}</span>
                <span className="text-sm">/ {total + 1}</span>
              </div>
              <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                {categoryLabel(current.category)}
              </span>
            </div>

            {/* 質問文 */}
            <h2 className="font-display font-black text-2xl text-white leading-snug mb-8">
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
                    className={`w-full text-left px-5 py-5 rounded-2xl border-2 transition-all duration-200 active:scale-[0.97]
                      ${isActive
                        ? "bg-gradient-to-r from-indigo-600/70 to-violet-600/70 border-indigo-400/70 shadow-lg shadow-indigo-500/20 text-white"
                        : "bg-white/5 border-white/10 text-white/75 hover:bg-white/8 hover:border-white/20 hover:text-white"
                      }`}
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-all duration-200
                          ${isActive
                            ? "border-white/60 bg-white/20 scale-110"
                            : "border-white/20"
                          }`}
                      >
                        {isActive && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 12 12">
                            <path d="M2.5 6L5 8.5L9.5 3.5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <span className="text-base font-medium leading-snug">{option.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ナビゲーション */}
            <div className="flex gap-3">
              <button
                onClick={handleBack}
                className="py-4 px-6 text-base font-bold text-white/40 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
              >
                ← 戻る
              </button>
              <button
                onClick={handleNext}
                disabled={!selected}
                className={`flex-1 py-4 text-base font-bold rounded-xl transition-all duration-200
                  ${selected
                    ? "bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white shadow-lg shadow-indigo-500/25 active:scale-95"
                    : "bg-white/5 text-white/20 cursor-not-allowed"
                  }`}
              >
                {isLast ? "診断結果を見る ✨" : "次の質問へ →"}
              </button>
            </div>
          </>
        )}

        {/* 注意文 */}
        <p className="text-center text-xs text-white/20 mt-6 leading-relaxed">
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
