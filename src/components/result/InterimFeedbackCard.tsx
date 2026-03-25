"use client";

import { useMemo } from "react";
import { QuizAnswers, UserType } from "@/types";
import { getDominantType } from "@/lib/interimFeedback";
import { interimFeedback1, interimFeedback2 } from "@/data/resultData";

interface Props {
  step: 1 | 2;
  answers: QuizAnswers;
  totalQuestions: number;
  onContinue: () => void;
}

const TYPE_LABEL: Record<UserType | "default", string> = {
  global:    "国際志向タイプ",
  stem:      "研究・理工タイプ",
  community: "地域・社会貢献タイプ",
  business:  "起業・ビジネスタイプ",
  culture:   "文化・人文タイプ",
  default:   "あなただけのタイプ",
};

const TYPE_ICON: Record<UserType | "default", string> = {
  global:    "🌍",
  stem:      "🔬",
  community: "🤝",
  business:  "🚀",
  culture:   "🎨",
  default:   "✨",
};

const TYPE_COLOR: Record<UserType | "default", string> = {
  global:    "from-blue-50 to-cyan-50 border-blue-200",
  stem:      "from-indigo-50 to-violet-50 border-indigo-200",
  community: "from-emerald-50 to-teal-50 border-emerald-200",
  business:  "from-orange-50 to-amber-50 border-orange-200",
  culture:   "from-purple-50 to-pink-50 border-purple-200",
  default:   "from-violet-50 to-indigo-50 border-violet-200",
};

const TYPE_BADGE_COLOR: Record<UserType | "default", string> = {
  global:    "bg-blue-100 text-blue-700",
  stem:      "bg-indigo-100 text-indigo-700",
  community: "bg-emerald-100 text-emerald-700",
  business:  "bg-orange-100 text-orange-700",
  culture:   "bg-purple-100 text-purple-700",
  default:   "bg-violet-100 text-violet-700",
};

export default function InterimFeedbackCard({ step, answers, totalQuestions, onContinue }: Props) {
  const dominantType = useMemo(() => getDominantType(answers), [answers]);
  const feedbackMap = step === 1 ? interimFeedback1 : interimFeedback2;
  const content = feedbackMap[dominantType];
  const answeredCount = Object.keys(answers).length;
  const progressPct = (answeredCount / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col">
      {/* 背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/70 via-white to-sky-50/50 pointer-events-none" />

      <div className="relative flex-1 flex flex-col max-w-lg mx-auto w-full px-4 pt-16 pb-12">
        {/* プログレス */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400">{answeredCount} / {totalQuestions} 問回答済み</span>
            <span className="text-xs font-bold text-violet-500">{Math.round(progressPct)}%</span>
          </div>
          <div className="h-1.5 bg-violet-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-[width] duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* 中間フィードバック */}
        <div className={`bg-gradient-to-br ${TYPE_COLOR[dominantType]} border rounded-2xl p-6 mb-6`}>
          {/* ラベル */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-xs font-bold text-slate-500 tracking-widest uppercase">
              {step === 1 ? "5問終了 — 中間レポート" : "10問終了 — 中間レポート"}
            </span>
          </div>

          {/* タイプバッジ */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-3xl">{TYPE_ICON[dominantType]}</span>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${TYPE_BADGE_COLOR[dominantType]}`}>
              {TYPE_LABEL[dominantType]}の傾向
            </span>
          </div>

          {/* ヘッドライン */}
          <h2 className="font-mincho font-bold text-xl text-slate-800 leading-snug mb-3">
            {content.headline}
          </h2>

          {/* 本文 */}
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            {content.body}
          </p>

          {/* 励まし */}
          <div className="flex items-start gap-2 bg-white/70 rounded-xl px-4 py-3">
            <span className="text-indigo-400 shrink-0 mt-0.5">✓</span>
            <p className="text-sm font-medium text-indigo-700">{content.encouragement}</p>
          </div>
        </div>

        {/* 注意書き */}
        <p className="text-xs text-slate-400 text-center leading-relaxed mb-6">
          この内容は途中経過です。最後まで答えると、より詳しい診断結果が出ます。
        </p>

        {/* 続けるボタン */}
        <button
          onClick={onContinue}
          className="w-full py-4 font-mincho text-base font-bold rounded-xl
            bg-gradient-to-r from-indigo-500 to-violet-500 text-white
            shadow-lg shadow-indigo-300/40 active:opacity-80 transition-opacity duration-150"
        >
          {step === 1 ? "次の5問へ →" : "最後の5問へ →"}
        </button>
      </div>
    </div>
  );
}
