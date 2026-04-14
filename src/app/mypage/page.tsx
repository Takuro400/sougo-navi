"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MatchResult } from "@/types";

export default function MyPage() {
  const [matchResults, setMatchResults] = useState<MatchResult[]>([]);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [hasData, setHasData] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("sougo_navi_result");
      if (raw) {
        const data = JSON.parse(raw);
        setMatchResults(data.matchResults || []);
        setSavedAt(data.savedAt || null);
        setHasData(true);
      }
      const savedRaw = localStorage.getItem("sougo_navi_saved");
      if (savedRaw) setSavedIds(JSON.parse(savedRaw));
    } catch (e) {
      console.error("マイページデータの読み込みに失敗", e);
    }
    setLoaded(true);
  }, []);

  const handleToggleSave = (id: string) => {
    const newIds = savedIds.includes(id)
      ? savedIds.filter((x) => x !== id)
      : [...savedIds, id];
    setSavedIds(newIds);
    localStorage.setItem("sougo_navi_saved", JSON.stringify(newIds));
  };

  const handleReset = () => {
    if (!confirm("診断結果をリセットしますか？")) return;
    localStorage.removeItem("sougo_navi_result");
    localStorage.removeItem("sougo_navi_saved");
    setMatchResults([]);
    setSavedIds([]);
    setHasData(false);
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  };

  const readinessColor: Record<string, string> = {
    高: "text-emerald-600 bg-emerald-50 border-emerald-200",
    中: "text-amber-600 bg-amber-50 border-amber-200",
    低: "text-rose-500 bg-rose-50 border-rose-200",
  };

  const rankGradient = [
    "from-violet-500 to-indigo-500",
    "from-indigo-500 to-blue-500",
    "from-blue-500 to-sky-500",
    "from-sky-500 to-cyan-500",
    "from-slate-400 to-slate-500",
  ];

  if (!loaded) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center py-32">
          <div className="w-10 h-10 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* 背景グラデーション（quizページと同じ） */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/70 via-white to-sky-50/50 pointer-events-none" />
      <div className="absolute -top-32 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-violet-100/35 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-sky-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />

      <Header />

      <div className="relative max-w-lg mx-auto px-4 pt-12 pb-20">

        {/* ページタイトル */}
        <div className="mb-8">
          <p className="text-xs font-bold text-violet-600 bg-violet-50 border border-violet-200 px-3 py-1.5 rounded-full inline-block mb-4">
            マイページ
          </p>
          <h1 className="font-mincho text-[1.55rem] font-bold text-slate-800 leading-[1.5] mb-2 tracking-wide">
            診断結果を確認しよう
          </h1>
          <p className="text-sm text-slate-500">気になる大学をチェック・保存できます</p>
        </div>

        {!hasData ? (
          /* 診断前 */
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center">
            <div className="text-5xl mb-5">🎓</div>
            <h2 className="font-mincho text-lg font-bold text-slate-800 mb-2">
              まだ診断を受けていません
            </h2>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">
              診断を受けると、おすすめ大学の<br />結果がここに保存されます。
            </p>
            <Link
              href="/quiz"
              className="block w-full py-4 font-mincho text-base font-bold rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-300/40 text-center"
            >
              診断を始める（約3分）
            </Link>
          </div>
        ) : (
          <div className="space-y-5">

            {/* 診断日 + リセット */}
            {savedAt && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-sans">
                  📅 診断日：{formatDate(savedAt)}
                </span>
                <button
                  onClick={handleReset}
                  className="text-xs text-rose-400 hover:text-rose-600 transition-colors font-sans"
                >
                  結果をリセット
                </button>
              </div>
            )}

            {/* おすすめ大学ランキング */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-5 pt-5 pb-3 border-b border-slate-50">
                <h2 className="font-mincho text-base font-bold text-slate-800 flex items-center gap-2">
                  🏆 あなたへのおすすめ大学
                </h2>
              </div>
              <div className="divide-y divide-slate-50">
                {matchResults.map((result, i) => {
                  const { university: u, score, readinessLevel } = result;
                  const isSaved = savedIds.includes(u.id);
                  return (
                    <div
                      key={u.id}
                      className={`flex items-center gap-3 px-5 py-4 transition-colors
                        ${isSaved ? "bg-violet-50/40" : "hover:bg-slate-50/60"}`}
                    >
                      {/* ランク番号 */}
                      <div
                        className={`w-8 h-8 rounded-full bg-gradient-to-br ${rankGradient[i] ?? "from-slate-400 to-slate-500"} text-white text-xs font-black flex items-center justify-center shrink-0 shadow-sm`}
                      >
                        {i + 1}
                      </div>

                      {/* 大学情報 */}
                      <div className="flex-1 min-w-0">
                        <p className="font-mincho font-bold text-sm text-slate-800 truncate">{u.name}</p>
                        <p className="text-xs text-slate-400 truncate mb-1">{u.faculty}</p>
                        <div className="flex gap-1.5 flex-wrap">
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 border border-violet-100">
                            {score}点
                          </span>
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${readinessColor[readinessLevel] ?? "text-slate-500 bg-slate-50 border-slate-200"}`}>
                            準備度：{readinessLevel}
                          </span>
                        </div>
                      </div>

                      {/* アクション */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleToggleSave(u.id)}
                          className={`p-1.5 rounded-full transition-colors ${isSaved ? "text-rose-400" : "text-slate-300 hover:text-rose-300"}`}
                          title={isSaved ? "保存解除" : "気になる大学に追加"}
                        >
                          <svg className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                        <Link
                          href={`/universities/${u.id}`}
                          className="p-1.5 rounded-full text-violet-300 hover:text-violet-500 transition-colors"
                          title="詳細を見る"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 気になる大学リスト */}
            {savedIds.length > 0 && (
              <div className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden">
                <div className="px-5 pt-5 pb-3 border-b border-rose-50">
                  <h2 className="font-mincho text-base font-bold text-slate-800 flex items-center gap-2">
                    ❤️ 気になる大学リスト
                  </h2>
                </div>
                <div className="divide-y divide-slate-50">
                  {matchResults
                    .filter((r) => savedIds.includes(r.university.id))
                    .map((r) => (
                      <div key={r.university.id} className="flex items-center justify-between px-5 py-3 hover:bg-rose-50/30 transition-colors">
                        <div>
                          <p className="font-mincho font-bold text-sm text-slate-800">{r.university.name}</p>
                          <p className="text-xs text-slate-400">{r.university.faculty}</p>
                        </div>
                        <Link
                          href={`/universities/${r.university.id}`}
                          className="text-xs font-bold text-violet-500 hover:text-violet-700 transition-colors"
                        >
                          詳細 →
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* 今すぐやること */}
            {matchResults.length > 0 && (
              <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-5">
                <h2 className="font-mincho text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                  📋 今すぐやること
                </h2>
                <ul className="space-y-3">
                  {matchResults[0].requiredActions.slice(0, 4).map((action, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* アクションボタン */}
            <div className="flex flex-col gap-3 pt-1">
              <Link
                href="/mentors"
                className="block w-full py-4 font-mincho text-base font-bold rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-300/40 text-center"
              >
                先輩に相談する
              </Link>
              <Link
                href="/quiz"
                className="block w-full py-4 font-mincho text-base font-bold text-slate-500 bg-white border border-slate-200 rounded-xl shadow-sm text-center"
              >
                診断をやり直す
              </Link>
            </div>

            {/* 免責 */}
            <p className="text-xs text-slate-400 text-center leading-relaxed font-sans pt-2">
              診断結果は参考情報です。合格を保証するものではありません。
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
