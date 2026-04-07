"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { UserType, UserTypeInfo, MatchResult } from "@/types";
import { StrengthWeaknessData, RoadmapStep } from "@/data/resultData";
import RankedUniversityList from "@/components/result/RankedUniversityList";

// ============================================================
// 型
// ============================================================
export interface ResultFlowProps {
  userType: UserTypeInfo;
  results: MatchResult[];
  strengthData: StrengthWeaknessData;
  roadmapSteps: RoadmapStep[];
  onViewDetail: () => void;
  onOpenModal?: () => void;
}

const TOTAL_STEPS = 5;

// ============================================================
// タイプ別アクセントカラー
// ============================================================
const TYPE_ACCENT: Record<UserType, { iconBg: string; badge: string; badgeText: string }> = {
  global:    { iconBg: "bg-blue-100",    badge: "bg-blue-50 border-blue-200",    badgeText: "text-blue-700" },
  stem:      { iconBg: "bg-indigo-100",  badge: "bg-indigo-50 border-indigo-200", badgeText: "text-indigo-700" },
  community: { iconBg: "bg-emerald-100", badge: "bg-emerald-50 border-emerald-200", badgeText: "text-emerald-700" },
  business:  { iconBg: "bg-orange-100",  badge: "bg-orange-50 border-orange-200", badgeText: "text-orange-700" },
  culture:   { iconBg: "bg-purple-100",  badge: "bg-purple-50 border-purple-200", badgeText: "text-purple-700" },
};

// ============================================================
// 共通部品
// ============================================================

/** ステップ進捗インジケーター */
function StepDots({ current, dark = false }: { current: number; dark?: boolean }) {
  return (
    <div className="flex items-center gap-1.5 justify-center py-4">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <span
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i === current - 1
              ? `h-2 w-6 ${dark ? "bg-white" : "bg-indigo-500"}`
              : i < current - 1
              ? `h-2 w-2 ${dark ? "bg-white/40" : "bg-indigo-300"}`
              : `h-2 w-2 ${dark ? "bg-white/15" : "bg-slate-200"}`
          }`}
        />
      ))}
    </div>
  );
}

/** スキップリンク */
function SkipLink({ onClick, dark = false }: { onClick: () => void; dark?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs transition-opacity duration-150 active:opacity-50 ${dark ? "text-white/50" : "text-slate-400"}`}
    >
      詳しい結果を見る
    </button>
  );
}

/** メインCTAボタン */
function PrimaryButton({
  children,
  onClick,
  href,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}) {
  const cls =
    "w-full flex items-center justify-center gap-2 py-4 px-6 " +
    "bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold text-[15px] " +
    "rounded-full shadow-lg shadow-indigo-300/40 active:opacity-80 transition-opacity duration-150";
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}

// ============================================================
// 画面①: タイプ + 強み
// ============================================================
function StepTypeStrengths({
  userType,
  strengthData,
  onNext,
  onSkip,
}: {
  userType: UserTypeInfo;
  strengthData: StrengthWeaknessData;
  onNext: () => void;
  onSkip: () => void;
}) {
  const accent = TYPE_ACCENT[userType.type];
  return (
    <div className="flex flex-col flex-1 px-5 pb-8">
      {/* スキップ */}
      <div className="flex justify-end pt-2 pb-4">
        <SkipLink onClick={onSkip} />
      </div>

      <div className="flex-1 flex flex-col justify-center gap-6">
        {/* タイプ表示 */}
        <div className="text-center">
          <p className="text-xs font-bold text-slate-400 tracking-[0.15em] uppercase mb-5">診断結果</p>
          <div className={`w-16 h-16 ${accent.iconBg} rounded-full flex items-center justify-center text-3xl mx-auto mb-4`}>
            {userType.icon}
          </div>
          <h1 className="font-mincho font-bold text-[1.6rem] text-slate-800 leading-tight mb-2.5">
            {userType.label}
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
            {userType.description}
          </p>
        </div>

        {/* 強みカード */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
          <p className="text-xs font-bold text-slate-500 tracking-wide">✦ あなたの強み</p>
          {strengthData.strengths.map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-[18px] shrink-0 mt-0.5 leading-none">{s.icon}</span>
              <div>
                <p className="text-[13px] font-bold text-slate-700 leading-snug">{s.title}</p>
                <p className="text-[12px] text-slate-500 leading-relaxed mt-0.5">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="pt-6">
        <PrimaryButton onClick={onNext}>あなたの可能性をもっと見る →</PrimaryButton>
      </div>
    </div>
  );
}

// ============================================================
// 画面②: 伸びしろ
// ============================================================
function StepChallenges({
  strengthData,
  onNext,
  onSkip,
}: {
  strengthData: StrengthWeaknessData;
  onNext: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="flex flex-col flex-1 px-5 pb-8">
      <div className="flex justify-end pt-2 pb-4">
        <SkipLink onClick={onSkip} />
      </div>

      <div className="flex-1 flex flex-col justify-center gap-6">
        <div>
          <p className="text-xs font-bold text-slate-400 tracking-[0.15em] uppercase mb-4">次のポイント</p>
          <h2 className="font-mincho font-bold text-[1.6rem] text-slate-800 leading-tight">
            あなたの<br />伸びしろ
          </h2>
        </div>

        {/* 課題カード */}
        <div className="space-y-3">
          {strengthData.challenges.map((c, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-amber-50 border border-amber-200/80 rounded-2xl p-4"
            >
              <span className="text-[20px] shrink-0 mt-0.5 leading-none">{c.icon}</span>
              <div>
                <p className="text-[13px] font-bold text-slate-700 leading-snug mb-1">{c.title}</p>
                <p className="text-[12px] text-slate-500 leading-relaxed">{c.hint}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ソフトな注釈 */}
        <p className="text-[12px] text-slate-400 text-center leading-relaxed px-4">
          今の段階で気づいていれば、準備が一段と変わります。
        </p>
      </div>

      <div className="pt-6">
        <PrimaryButton onClick={onNext}>具体的な改善方法を見る →</PrimaryButton>
      </div>
    </div>
  );
}

// ============================================================
// 画面③: おすすめ大学
// ============================================================
function StepUniversities({
  results,
  onNext,
  onSkip,
}: {
  results: MatchResult[];
  onNext: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* 固定ヘッダー */}
      <div className="px-5 pt-2 pb-3 shrink-0">
        <div className="flex justify-end pb-3">
          <SkipLink onClick={onSkip} />
        </div>
        <p className="text-xs font-bold text-slate-400 tracking-[0.15em] uppercase mb-3">おすすめ</p>
        <h2 className="font-mincho font-bold text-[1.6rem] text-slate-800 leading-tight">
          あなたに合う<br />大学 TOP5
        </h2>
      </div>

      {/* スクロール可能なランキングリスト */}
      <div className="flex-1 overflow-y-auto px-5 pb-2 min-h-0">
        <RankedUniversityList results={results.slice(0, 5)} compact />
        <div className="h-4" />
      </div>

      {/* 固定フッター */}
      <div className="px-5 pt-3 pb-8 shrink-0 bg-white">
        <PrimaryButton onClick={onNext}>合格するためのルートを見る →</PrimaryButton>
      </div>
    </div>
  );
}

// ============================================================
// 画面④: ロードマップ
// ============================================================
function StepRoadmap({
  roadmapSteps,
  onNext,
  onSkip,
}: {
  roadmapSteps: RoadmapStep[];
  onNext: () => void;
  onSkip: () => void;
}) {
  const selfCount = roadmapSteps.filter((s) => s.tag === "self").length;

  return (
    <div className="flex flex-col flex-1 px-5 pb-8">
      <div className="flex justify-end pt-2 pb-4">
        <SkipLink onClick={onSkip} />
      </div>

      <div className="flex-1 flex flex-col justify-center gap-5">
        <div>
          <p className="text-xs font-bold text-slate-400 tracking-[0.15em] uppercase mb-4">準備の流れ</p>
          <h2 className="font-mincho font-bold text-[1.6rem] text-slate-800 leading-tight">
            合格までの<br />ステップ
          </h2>
        </div>

        {/* タイムライン */}
        <div className="relative">
          {/* 縦線 */}
          <div className="absolute left-[15px] top-5 bottom-5 w-px bg-slate-200" aria-hidden />

          <div className="space-y-3">
            {roadmapSteps.map((s) => {
              const isSelf = s.tag === "self";
              return (
                <div key={s.step} className="relative flex items-start gap-4">
                  {/* ステップ丸 */}
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full z-10 flex items-center justify-center text-xs font-black leading-none
                      ${isSelf ? "bg-indigo-100 text-indigo-600" : "bg-violet-100 text-violet-500"}`}
                  >
                    {s.step}
                  </div>
                  {/* テキスト */}
                  <div className="flex-1 pt-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-[13px] font-bold text-slate-700 leading-snug">{s.title}</p>
                      {!isSelf && (
                        <span className="text-[11px] font-medium text-violet-500 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-full shrink-0">
                          サポートがあると◎
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 注釈 */}
        <p className="text-[12px] text-slate-400 leading-relaxed text-center px-4">
          STEP {selfCount + 1} 以降は専門的な添削があると<br />完成度が格段に上がります
        </p>
      </div>

      <div className="pt-5">
        <PrimaryButton onClick={onNext}>あなた専用の合格戦略を受け取る →</PrimaryButton>
      </div>
    </div>
  );
}

// ============================================================
// 画面⑤: CTA（ダーク）
// ============================================================
function StepCTA({
  onViewDetail,
  onOpenModal,
  userTypeLabel,
}: {
  onViewDetail: () => void;
  onOpenModal?: () => void;
  userTypeLabel: string;
}) {
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://sougo-navi.vercel.app";
  const shareUrl = `${siteUrl}/quiz`;
  const shareText = `AIが診断した私のタイプは「${userTypeLabel}」でした！\n総合型選抜の志望校、無料で診断してみて👇`;
  const hashtags = "総合型選抜,AO入試,大学受験";
  const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent(hashtags)}`;

  return (
    <div className="flex flex-col flex-1 bg-gradient-to-br from-indigo-600 to-violet-600 relative overflow-hidden">
      {/* 装飾円 */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-white/5 rounded-full pointer-events-none" />

      <div className="flex flex-col flex-1 px-5 pb-8 relative">
        {/* ステップドット（ダーク版） */}
        <StepDots current={TOTAL_STEPS} dark />

        <div className="flex-1 flex flex-col justify-center gap-7">
          {/* 中央メッセージ */}
          <div className="text-center">
            <div className="w-14 h-14 bg-white/15 rounded-full flex items-center justify-center text-2xl mx-auto mb-5">
              ✨
            </div>
            <h2 className="font-mincho font-bold text-[1.5rem] text-white leading-snug mb-3">
              あなたの結果に合わせた<br />個別対策を<br />用意しています
            </h2>
            <p className="text-[13px] text-white/65 leading-relaxed">
              診断結果をもとに、次の一手を一緒に考えます。
            </p>
          </div>

          {/* サービス内容 */}
          <div className="bg-white/10 rounded-2xl p-5 space-y-3.5">
            {[
              { icon: "✍️", label: "志望理由書の個別添削" },
              { icon: "🎤", label: "面接・プレゼン対策" },
              { icon: "🎯", label: "あなた専用の合格戦略" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-lg leading-none">{item.icon}</span>
                <p className="text-[14px] font-bold text-white leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3 pt-2">
          <button
            onClick={onOpenModal}
            className="w-full flex items-center justify-center py-4 px-6
              bg-white text-indigo-600 font-bold text-[15px] rounded-full
              shadow-lg shadow-indigo-900/20 active:opacity-80 transition-opacity duration-150"
          >
            無料で戦略を受け取る
          </button>
          {/* Xシェアボタン */}
          <a
            href={xShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6
              bg-white/15 text-white font-bold text-[14px] rounded-full border border-white/25
              active:opacity-70 transition-opacity duration-150"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Xでシェアして広める
          </a>
          <button
            onClick={onViewDetail}
            className="text-[13px] text-white/55 active:opacity-50 transition-opacity duration-150"
          >
            詳しい診断結果を見る →
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// メインコンポーネント
// ============================================================
export default function ResultFlow({
  userType,
  results,
  strengthData,
  roadmapSteps,
  onViewDetail,
  onOpenModal,
}: ResultFlowProps) {
  const [step, setStep] = useState(1);
  const nextStep = useCallback(() => setStep((s) => Math.min(s + 1, TOTAL_STEPS)), []);
  const sharedProps = { onNext: nextStep, onSkip: onViewDetail };
  const isDarkStep = step === TOTAL_STEPS;

  return (
    <div
      className={`flex flex-col w-full max-w-md mx-auto ${isDarkStep ? "" : "bg-white"}`}
      style={{ minHeight: "calc(100dvh - 3.5rem)" }}
    >
      {/* ステップドット（step5以外はここで表示） */}
      {!isDarkStep && (
        <StepDots current={step} />
      )}

      {/* 各ステップ（key変更でアニメーション発火） */}
      <div
        key={step}
        className="flex flex-col flex-1 step-enter"
        // step5はStepCTA内でStepDotsを表示するため、最小高さを調整
        style={isDarkStep ? { minHeight: "calc(100dvh - 3.5rem)" } : undefined}
      >
        {step === 1 && (
          <StepTypeStrengths
            userType={userType}
            strengthData={strengthData}
            {...sharedProps}
          />
        )}
        {step === 2 && (
          <StepChallenges strengthData={strengthData} {...sharedProps} />
        )}
        {step === 3 && (
          <StepUniversities results={results} {...sharedProps} />
        )}
        {step === 4 && (
          <StepRoadmap roadmapSteps={roadmapSteps} {...sharedProps} />
        )}
        {step === 5 && <StepCTA onViewDetail={onViewDetail} onOpenModal={onOpenModal} userTypeLabel={userType.label} />}
      </div>
    </div>
  );
}
