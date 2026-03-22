"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getUniversityById } from "@/data/universities";
import { University } from "@/types";

export const COMPARE_KEY = "sougo_navi_compare_ids";

// ===========================
// 大学比較ページ（最大3校）
// ===========================
export default function ComparePage() {
  const [universities, setUniversities] = useState<University[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(COMPARE_KEY);
    const ids: string[] = raw ? JSON.parse(raw) : [];
    const univs = ids
      .map((id) => getUniversityById(id))
      .filter((u): u is University => u !== undefined);
    setUniversities(univs);
  }, []);

  const handleRemove = (id: string) => {
    const next = universities.filter((u) => u.id !== id);
    setUniversities(next);
    localStorage.setItem(COMPARE_KEY, JSON.stringify(next.map((u) => u.id)));
    window.dispatchEvent(new Event("compare-updated"));
  };

  const typeColor: Record<string, string> = {
    国立: "bg-purple-100 text-purple-700",
    公立: "bg-teal-100 text-teal-700",
    私立: "bg-pink-100 text-pink-700",
  };

  const sougoColor: Record<string, string> = {
    高: "bg-green-100 text-green-700",
    中: "bg-yellow-100 text-yellow-700",
    低: "bg-orange-100 text-orange-700",
  };

  /** 比較テーブルの各行定義 */
  const rows: { label: string; render: (u: University) => React.ReactNode }[] = [
    {
      label: "大学名",
      render: (u) => (
        <Link href={`/universities/${u.id}`} className="font-display font-black text-gray-900 hover:text-primary-600 transition-colors leading-tight block">
          {u.name}
        </Link>
      ),
    },
    {
      label: "学部・学科",
      render: (u) => (
        <span className="text-sm text-gray-700">
          {u.faculty}
          <span className="block text-xs text-gray-500 mt-0.5">{u.department}</span>
        </span>
      ),
    },
    {
      label: "種別",
      render: (u) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColor[u.type]}`}>
          {u.type}
        </span>
      ),
    },
    {
      label: "地域",
      render: (u) => <span className="text-sm text-gray-700">{u.region}・{u.prefecture}</span>,
    },
    {
      label: "総合型選抜相性",
      render: (u) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sougoColor[u.sougoCompatibility]}`}>
          {u.sougoCompatibility}
        </span>
      ),
    },
    {
      label: "向いている学生像",
      render: (u) => <p className="text-xs text-gray-700 leading-relaxed">{u.idealStudent}</p>,
    },
    {
      label: "必要な活動",
      render: (u) => (
        <ul className="space-y-1.5">
          {u.requiredActivities.slice(0, 3).map((act, i) => (
            <li key={i} className="flex items-start gap-1.5 text-xs text-gray-700">
              <span className="mt-0.5 shrink-0 text-primary-500 font-bold">・</span>
              {act}
            </li>
          ))}
        </ul>
      ),
    },
    {
      label: "外部リンク",
      render: (u) => (
        <div className="flex flex-col gap-2">
          <a href={u.links.official} target="_blank" rel="noopener noreferrer"
            className="text-xs font-bold text-primary-600 hover:underline flex items-center gap-1">
            🏫 公式サイト
          </a>
          <a href={u.links.admissions} target="_blank" rel="noopener noreferrer"
            className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">
            📄 入試情報
          </a>
          <a href={u.links.passnavi} target="_blank" rel="noopener noreferrer"
            className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1">
            🔍 パスナビ
          </a>
          {u.links.openCampus && (
            <a href={u.links.openCampus} target="_blank" rel="noopener noreferrer"
              className="text-xs font-bold text-green-600 hover:underline flex items-center gap-1">
              🎪 オープンキャンパス
            </a>
          )}
        </div>
      ),
    },
  ];

  const emptySlots = 3 - universities.length;

  return (
    <div className="min-h-screen bg-surface-50">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* ページヘッダー */}
        <div className="mb-6">
          <h1 className="font-display font-black text-2xl text-gray-900 mb-1">⚖️ 大学を比較する</h1>
          <p className="text-sm text-gray-500">
            最大3校を横並びで比較できます。大学詳細ページの「比較に追加」ボタンで大学を選択してください。
          </p>
        </div>

        {universities.length === 0 ? (
          /* 空状態 */
          <div className="card text-center py-16">
            <div className="text-5xl mb-4">⚖️</div>
            <h2 className="font-bold text-gray-700 mb-2">比較する大学が選択されていません</h2>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              大学詳細ページを開き、「比較に追加」ボタンをタップして<br />比較したい大学を選んでください（最大3校）。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/result" className="btn-primary">診断結果から大学を探す</Link>
              <Link href="/quiz" className="btn-secondary">診断を始める</Link>
            </div>
          </div>
        ) : (
          <>
            {/* 選択中の大学チップ */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs font-bold text-gray-500">選択中：</span>
              {universities.map((u) => (
                <div key={u.id} className="flex items-center gap-1.5 bg-primary-50 border border-primary-100 text-primary-700 text-xs font-bold px-3 py-1 rounded-full">
                  {u.name}
                  <button
                    onClick={() => handleRemove(u.id)}
                    className="text-primary-400 hover:text-primary-700 transition-colors ml-0.5"
                    aria-label={`${u.name}を比較から削除`}
                  >
                    ✕
                  </button>
                </div>
              ))}
              {emptySlots > 0 && (
                <Link href="/result" className="text-xs text-gray-400 border border-dashed border-gray-300 px-3 py-1 rounded-full hover:border-primary-300 hover:text-primary-500 transition-colors">
                  ＋ 大学を追加
                </Link>
              )}
            </div>

            {/* 比較テーブル（横スクロール） */}
            <div className="overflow-x-auto -mx-4 px-4 pb-4">
              <table className="w-full border-collapse" style={{ minWidth: `${universities.length * 200 + 120}px` }}>
                {/* 大学カラムヘッダー */}
                <thead>
                  <tr>
                    <th className="w-28 min-w-[7rem]" />
                    {universities.map((u) => (
                      <th key={u.id} className="pb-3 px-2 align-bottom">
                        <div className="bg-white border border-surface-200 rounded-2xl shadow-sm p-4 relative text-left">
                          <button
                            onClick={() => handleRemove(u.id)}
                            className="absolute top-2.5 right-2.5 text-gray-300 hover:text-red-400 transition-colors"
                            aria-label={`${u.name}を削除`}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                          <Link href={`/universities/${u.id}`} className="font-display font-black text-sm text-primary-700 hover:underline block pr-5 leading-tight">
                            {u.name}
                          </Link>
                          <p className="text-xs text-gray-500 mt-1 truncate">{u.faculty}</p>
                        </div>
                      </th>
                    ))}
                    {/* 空スロット */}
                    {Array.from({ length: emptySlots }).map((_, i) => (
                      <th key={`empty-header-${i}`} className="pb-3 px-2 align-bottom">
                        <Link href="/result">
                          <div className="border-2 border-dashed border-surface-200 rounded-2xl p-4 text-center text-gray-300 hover:border-primary-300 hover:text-primary-400 transition-colors min-h-[80px] flex flex-col items-center justify-center">
                            <span className="text-2xl block">＋</span>
                            <span className="text-xs mt-1">大学を追加</span>
                          </div>
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* 比較行 */}
                <tbody>
                  {rows.map((row, ri) => (
                    <tr key={row.label} className={ri % 2 === 0 ? "bg-surface-50" : "bg-white"}>
                      <td className="py-4 pr-3 align-top">
                        <span className="text-xs font-bold text-gray-500 whitespace-nowrap">{row.label}</span>
                      </td>
                      {universities.map((u) => (
                        <td key={u.id} className="py-4 px-3 align-top border-l border-surface-100">
                          {row.render(u)}
                        </td>
                      ))}
                      {Array.from({ length: emptySlots }).map((_, i) => (
                        <td key={`empty-${ri}-${i}`} className="py-4 px-3 align-top border-l border-surface-100 bg-surface-50/50" />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* アクションボタン */}
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/result" className="btn-primary">診断結果に戻る</Link>
              <Link href="/quiz" className="btn-secondary">もう一度診断する</Link>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
