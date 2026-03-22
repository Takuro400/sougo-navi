"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MatchResult } from "@/types";
import ScoreBadge from "./ScoreBadge";

const COMPARE_KEY = "sougo_navi_compare_ids";

interface Props {
  result: MatchResult;
  rank: number;
  isSaved?: boolean;
  onSave?: (id: string) => void;
}

export default function UniversityCard({ result, rank, isSaved, onSave }: Props) {
  const { university: univ, score, matchReasons, readinessLevel } = result;
  const [compareIds, setCompareIds] = useState<string[]>([]);

  useEffect(() => {
    const read = () => {
      const raw = localStorage.getItem(COMPARE_KEY);
      setCompareIds(raw ? JSON.parse(raw) : []);
    };
    read();
    window.addEventListener("compare-updated", read);
    return () => window.removeEventListener("compare-updated", read);
  }, []);

  const isCompared = compareIds.includes(univ.id);
  const isFull = compareIds.length >= 3 && !isCompared;

  const handleCompareToggle = () => {
    const next = isCompared
      ? compareIds.filter((x) => x !== univ.id)
      : [...compareIds, univ.id];
    setCompareIds(next);
    localStorage.setItem(COMPARE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("compare-updated"));
  };

  const readinessConfig = {
    高: { color: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30", label: "準備度：高" },
    中: { color: "bg-amber-500/20 text-amber-400 border border-amber-500/30",   label: "準備度：中" },
    低: { color: "bg-orange-500/20 text-orange-400 border border-orange-500/30", label: "準備度：低" },
  };

  const sougoConfig = {
    高: "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30",
    中: "bg-violet-500/20 text-violet-300 border border-violet-500/30",
    低: "bg-white/10 text-white/40 border border-white/10",
  };

  const typeConfig = {
    国立: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
    公立: "bg-teal-500/20 text-teal-300 border border-teal-500/30",
    私立: "bg-pink-500/20 text-pink-300 border border-pink-500/30",
  };

  // ランクに応じたグラデーション
  const rankGradient =
    rank === 1 ? "from-amber-500 to-yellow-400" :
    rank === 2 ? "from-slate-400 to-slate-300" :
    rank === 3 ? "from-orange-600 to-amber-500" :
    "from-indigo-500 to-violet-500";

  return (
    <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl border border-white/10 p-5 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
      {/* ヘッダー行 */}
      <div className="flex items-start gap-3 mb-4">
        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${rankGradient} text-white text-sm font-black flex items-center justify-center shrink-0`}>
          {rank}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-black text-white text-lg leading-tight">{univ.name}</h3>
          <p className="text-sm text-white/50 mt-0.5 truncate">{univ.faculty}</p>
        </div>
        {onSave && (
          <button
            onClick={() => onSave(univ.id)}
            className={`p-2 rounded-full transition-colors shrink-0 ${
              isSaved ? "text-rose-400" : "text-white/20 hover:text-rose-400"
            }`}
            aria-label={isSaved ? "保存済み" : "気になる大学に保存"}
          >
            <svg className="w-6 h-6" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        )}
      </div>

      {/* バッジ群 */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <span className={`badge ${typeConfig[univ.type]}`}>{univ.type}</span>
        <span className="badge bg-white/10 text-white/50 border border-white/10">{univ.prefecture}</span>
        <span className={`badge ${sougoConfig[univ.sougoCompatibility]}`}>
          総合型選抜：{univ.sougoCompatibility}
        </span>
        <span className={`badge ${readinessConfig[readinessLevel].color}`}>
          {readinessConfig[readinessLevel].label}
        </span>
      </div>

      {/* スコア */}
      <div className="mb-4">
        <ScoreBadge score={score} />
      </div>

      {/* おすすめ理由 */}
      <div className="mb-5 space-y-2">
        <p className="text-xs font-bold text-white/30 uppercase tracking-wider">なぜおすすめ？</p>
        {matchReasons.slice(0, 2).map((reason, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-white/70">
            <span className="mt-0.5 text-indigo-400 shrink-0 font-bold">✓</span>
            <span>{reason}</span>
          </div>
        ))}
      </div>

      {/* アクションボタン */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Link
            href={`/universities/${univ.id}`}
            className="flex-1 text-center py-3 text-sm font-bold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-500/40 rounded-xl transition-all"
          >
            詳細を見る
          </Link>
          <Link
            href={`/mentors?university=${univ.id}`}
            className="flex-1 text-center py-3 text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 rounded-xl transition-all shadow-md shadow-indigo-500/20"
          >
            先輩に相談
          </Link>
        </div>

        {/* 比較ボタン */}
        <button
          onClick={handleCompareToggle}
          disabled={isFull}
          className={`w-full py-2.5 text-sm font-bold rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-1.5
            ${isCompared
              ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
              : isFull
                ? "bg-white/5 text-white/20 border border-white/5 cursor-not-allowed"
                : "bg-white/5 text-white/40 border border-white/10 hover:bg-indigo-500/10 hover:text-indigo-300 hover:border-indigo-500/30"
            }`}
        >
          {isCompared ? (
            <>
              <span>✓</span>
              <span>比較リストに追加済み</span>
              <Link
                href="/compare"
                onClick={(e) => e.stopPropagation()}
                className="ml-auto text-xs text-indigo-400 hover:underline"
              >
                比較する →
              </Link>
            </>
          ) : isFull ? (
            <span>⚖️ 比較リストが上限（3校）</span>
          ) : (
            <span>⚖️ 比較に追加</span>
          )}
        </button>
      </div>
    </div>
  );
}
