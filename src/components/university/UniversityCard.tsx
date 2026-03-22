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
    const raw = localStorage.getItem(COMPARE_KEY);
    setCompareIds(raw ? JSON.parse(raw) : []);
    const sync = () => {
      const r = localStorage.getItem(COMPARE_KEY);
      setCompareIds(r ? JSON.parse(r) : []);
    };
    window.addEventListener("compare-updated", sync);
    return () => window.removeEventListener("compare-updated", sync);
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
    高: { color: "bg-green-100 text-green-700", label: "準備度：高" },
    中: { color: "bg-yellow-100 text-yellow-700", label: "準備度：中" },
    低: { color: "bg-orange-100 text-orange-700", label: "準備度：低" },
  };

  const sougoConfig = {
    高: "bg-blue-100 text-blue-700",
    中: "bg-indigo-100 text-indigo-700",
    低: "bg-gray-100 text-gray-600",
  };

  const typeConfig = {
    国立: "bg-purple-100 text-purple-700",
    公立: "bg-teal-100 text-teal-700",
    私立: "bg-pink-100 text-pink-700",
  };

  return (
    <div className="card relative overflow-hidden hover:shadow-md transition-all duration-200">
      {/* ヘッダー行: ランク・大学名・保存ボタン */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-primary-600 text-white text-sm font-black flex items-center justify-center shrink-0 mt-0.5">
          {rank}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-black text-gray-900 text-lg leading-tight">{univ.name}</h3>
          <p className="text-sm text-gray-500 mt-0.5 truncate">{univ.faculty}</p>
        </div>
        {onSave && (
          <button
            onClick={() => onSave(univ.id)}
            className={`p-2 rounded-full transition-colors shrink-0 ${
              isSaved ? "text-accent-500" : "text-gray-300 hover:text-accent-400"
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
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className={`badge ${typeConfig[univ.type]}`}>{univ.type}</span>
        <span className="badge bg-gray-100 text-gray-600">{univ.prefecture}</span>
        <span className={`badge ${sougoConfig[univ.sougoCompatibility]}`}>
          総合型選抜：{univ.sougoCompatibility}
        </span>
        <span className={`badge ${readinessConfig[readinessLevel].color}`}>
          {readinessConfig[readinessLevel].label}
        </span>
      </div>

      {/* スコア */}
      <div className="mb-3">
        <ScoreBadge score={score} />
      </div>

      {/* おすすめ理由 */}
      <div className="mb-4 space-y-1.5">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">なぜおすすめ？</p>
        {matchReasons.slice(0, 2).map((reason, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
            <span className="mt-0.5 text-primary-500 shrink-0 font-bold">✓</span>
            <span>{reason}</span>
          </div>
        ))}
      </div>

      {/* アクションボタン */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2.5">
          <Link
            href={`/universities/${univ.id}`}
            className="flex-1 text-center py-3.5 text-base font-bold text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-xl transition-colors"
          >
            詳細を見る
          </Link>
          <Link
            href={`/mentors?university=${univ.id}`}
            className="flex-1 text-center py-3.5 text-base font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors shadow-sm"
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
              ? "bg-indigo-50 text-indigo-700 border-2 border-indigo-300"
              : isFull
                ? "bg-gray-50 text-gray-300 border-2 border-gray-100 cursor-not-allowed"
                : "bg-gray-50 text-gray-500 border-2 border-gray-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50"
            }`}
        >
          {isCompared ? (
            <>
              <span>✓</span> 比較リストに追加済み
              <Link
                href="/compare"
                onClick={(e) => e.stopPropagation()}
                className="ml-auto text-xs text-indigo-500 hover:underline"
              >
                比較する →
              </Link>
            </>
          ) : isFull ? (
            <>⚖️ 比較リストが上限（3校）</>
          ) : (
            <>⚖️ 比較に追加</>
          )}
        </button>
      </div>
    </div>
  );
}
