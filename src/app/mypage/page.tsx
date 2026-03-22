"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MatchResult } from "@/types";

// ===========================
// マイページ
// ローカルストレージから保存データを読み込む
// ===========================
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
      if (savedRaw) {
        setSavedIds(JSON.parse(savedRaw));
      }
    } catch (e) {
      console.error("マイページデータの読み込みに失敗", e);
    }
    setLoaded(true);
  }, []);

  /** 保存済み大学のトグル */
  const handleToggleSave = (id: string) => {
    const newIds = savedIds.includes(id)
      ? savedIds.filter((x) => x !== id)
      : [...savedIds, id];
    setSavedIds(newIds);
    localStorage.setItem("sougo_navi_saved", JSON.stringify(newIds));
  };

  /** 診断結果のリセット */
  const handleReset = () => {
    if (!confirm("診断結果をリセットしますか？")) return;
    localStorage.removeItem("sougo_navi_result");
    localStorage.removeItem("sougo_navi_saved");
    setMatchResults([]);
    setSavedIds([]);
    setHasData(false);
  };

  /** 日付のフォーマット */
  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  };

  if (!loaded) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center py-24">
          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* ページタイトル */}
        <div className="mb-6">
          <h1 className="font-display font-black text-2xl text-gray-900 mb-1">マイページ</h1>
          <p className="text-sm text-gray-500">診断結果・気になる大学を確認できます</p>
        </div>

        {!hasData ? (
          // 診断前の状態
          <div className="card text-center py-14">
            <div className="text-5xl mb-4">🎓</div>
            <h2 className="font-bold text-gray-900 mb-2">まだ診断を受けていません</h2>
            <p className="text-sm text-gray-500 mb-6">
              診断を受けると、おすすめ大学の結果がここに保存されます。
            </p>
            <Link href="/quiz" className="btn-primary inline-flex">
              診断を始める（約3分）
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* 診断日 */}
            {savedAt && (
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>📅 診断日：{formatDate(savedAt)}</span>
                <button
                  onClick={handleReset}
                  className="text-xs text-red-400 hover:text-red-600 transition-colors"
                >
                  結果をリセット
                </button>
              </div>
            )}

            {/* おすすめ大学ランキング */}
            <div className="card">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                🏆 あなたへのおすすめ大学
              </h2>
              <div className="space-y-3">
                {matchResults.map((result, i) => {
                  const { university: u, score, readinessLevel } = result;
                  const isSaved = savedIds.includes(u.id);
                  const readinessColor = {
                    高: "text-green-600 bg-green-50",
                    中: "text-yellow-600 bg-yellow-50",
                    低: "text-orange-600 bg-orange-50",
                  };
                  return (
                    <div
                      key={u.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-colors
                        ${isSaved ? "border-accent-300 bg-orange-50/50" : "border-surface-200 bg-white hover:border-primary-200"}`}
                    >
                      {/* ランク */}
                      <div className="w-7 h-7 rounded-full bg-primary-600 text-white text-xs font-black flex items-center justify-center shrink-0">
                        {i + 1}
                      </div>
                      {/* 大学情報 */}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-gray-900 truncate">{u.name}</p>
                        <p className="text-xs text-gray-500 truncate">{u.faculty}</p>
                        <div className="flex gap-1.5 mt-1 flex-wrap">
                          <span className="badge bg-primary-50 text-primary-600 text-xs">{score}点</span>
                          <span className={`badge text-xs ${readinessColor[readinessLevel]}`}>
                            準備度：{readinessLevel}
                          </span>
                        </div>
                      </div>
                      {/* アクション */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleToggleSave(u.id)}
                          className={`p-1.5 rounded-full transition-colors ${isSaved ? "text-accent-500" : "text-gray-300 hover:text-accent-400"}`}
                          title={isSaved ? "保存解除" : "気になる大学に追加"}
                        >
                          <svg className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                        <Link href={`/universities/${u.id}`}
                          className="p-1.5 rounded-full text-primary-400 hover:text-primary-600 transition-colors"
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

            {/* 気になる大学（ハート保存分） */}
            {savedIds.length > 0 && (
              <div className="card border-accent-100 bg-orange-50/30">
                <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  ❤️ 気になる大学リスト
                </h2>
                <div className="flex flex-col gap-2">
                  {matchResults
                    .filter((r) => savedIds.includes(r.university.id))
                    .map((r) => (
                      <div key={r.university.id} className="flex items-center justify-between py-2 px-3 bg-white rounded-xl border border-accent-100">
                        <div>
                          <p className="font-bold text-sm text-gray-900">{r.university.name}</p>
                          <p className="text-xs text-gray-500">{r.university.faculty}</p>
                        </div>
                        <Link href={`/universities/${r.university.id}`}
                          className="text-xs font-bold text-primary-600 hover:underline"
                        >
                          詳細 →
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* 次にやること */}
            {matchResults.length > 0 && (
              <div className="card border-primary-100 bg-primary-50">
                <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  📋 今すぐやること
                </h2>
                <ul className="space-y-2">
                  {matchResults[0].requiredActions.slice(0, 4).map((action, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-primary-100 text-primary-600 text-xs font-black flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* アクションボタン */}
            <div className="flex flex-col gap-3">
              <Link href="/quiz" className="btn-secondary justify-center">
                診断をやり直す
              </Link>
              <Link href="/mentors" className="btn-primary justify-center">
                先輩に相談する
              </Link>
            </div>

            {/* 免責 */}
            <p className="text-xs text-gray-400 text-center leading-relaxed">
              診断結果・合格可能性は参考情報であり、合格を保証するものではありません。<br />
              進路決定は先生・保護者の方とご相談ください。
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
