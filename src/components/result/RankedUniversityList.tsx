"use client";

import { MatchResult } from "@/types";

interface Props {
  results: MatchResult[];
  /** ResultFlow内のコンパクト表示（スコア非表示、理由を短縮） */
  compact?: boolean;
}

// ============================================================
// ① 1位カード — 最も目立つ・選ばれた感
// ============================================================
function FirstPlaceCard({ result, compact }: { result: MatchResult; compact: boolean }) {
  const { university: u, score, matchReasons } = result;
  return (
    <div className="relative bg-gradient-to-br from-indigo-50 via-violet-50 to-fuchsia-50 border border-violet-300 rounded-2xl p-5 shadow-lg shadow-violet-100/70 overflow-hidden">
      {/* 装飾円 */}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-violet-100/40 rounded-full pointer-events-none" />

      {/* BEST MATCHバッジ + スコア */}
      <div className="flex items-center gap-2 mb-3.5 relative">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-black bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-3 py-1 rounded-full tracking-wide">
          ✦ BEST MATCH
        </span>
        {!compact && (
          <span className="text-[11px] font-bold text-violet-400">
            相性スコア {score}点
          </span>
        )}
      </div>

      {/* ランク丸 + 大学名 */}
      <div className="flex items-start gap-3 mb-4 relative">
        <span className="shrink-0 w-10 h-10 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center text-xl leading-none">
          🏆
        </span>
        <div className="min-w-0">
          <p className="font-mincho font-bold text-[17px] text-slate-800 leading-tight">
            {u.name}
          </p>
          <p className="text-[12px] text-slate-500 mt-0.5 leading-snug">
            {u.faculty}
            {u.department && u.department !== u.faculty && ` / ${u.department}`}
          </p>
        </div>
      </div>

      {/* マッチ理由（2つ） */}
      <div className="space-y-2 relative">
        {matchReasons.slice(0, 2).map((reason, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="shrink-0 text-indigo-400 text-[13px] mt-0.5 font-bold">✓</span>
            <p className="text-[12px] text-slate-600 leading-relaxed">{reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// ② 2位カード — 少し目立つ・紫ボーダー
// ============================================================
function SecondPlaceCard({ result }: { result: MatchResult }) {
  const { university: u, matchReasons } = result;
  return (
    <div className="bg-white border-2 border-violet-200 rounded-2xl p-4 shadow-md shadow-violet-50">
      <div className="flex items-start gap-3">
        <span className="shrink-0 w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-[13px] font-black leading-none">
          2
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-slate-800 text-[14px] leading-snug">{u.name}</p>
          <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{u.faculty}</p>
          {matchReasons[0] && (
            <p className="text-[12px] text-violet-500 mt-1.5 leading-relaxed">
              {matchReasons[0]}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ③ 3位カード — 通常・シンプル
// ============================================================
function ThirdPlaceCard({ result, compact }: { result: MatchResult; compact: boolean }) {
  const { university: u, matchReasons } = result;
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="shrink-0 w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[13px] font-black leading-none">
          3
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-slate-700 text-[13px] leading-snug">{u.name}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">{u.faculty}</p>
          {matchReasons[0] && !compact && (
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{matchReasons[0]}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ④⑤ その他の候補 — まとめカード
// ============================================================
function OtherCandidates({ results }: { results: MatchResult[] }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5">
      <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-2.5">
        その他の候補
      </p>
      <div className="space-y-2">
        {results.map((r, i) => (
          <div key={r.university.id} className="flex items-center gap-2.5">
            <span className="shrink-0 w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px] font-black leading-none">
              {i + 4}
            </span>
            <p className="text-[12px] text-slate-500 leading-snug">
              <span className="font-medium text-slate-600">{r.university.name}</span>
              <span className="text-slate-400 ml-1.5">{r.university.faculty}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// メインエクスポート
// ============================================================
export default function RankedUniversityList({ results, compact = false }: Props) {
  if (!results.length) return null;
  const [first, second, third, ...rest] = results;
  return (
    <div className="space-y-3">
      {first  && <FirstPlaceCard  result={first}  compact={compact} />}
      {second && <SecondPlaceCard result={second} />}
      {third  && <ThirdPlaceCard  result={third}  compact={compact} />}
      {rest.length > 0 && <OtherCandidates results={rest.slice(0, 2)} />}
    </div>
  );
}
