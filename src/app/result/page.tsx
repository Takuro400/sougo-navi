"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import UniversityCard from "@/components/university/UniversityCard";
import { generateMatchResults } from "@/lib/matchingEngine";
import { MatchResult, QuizAnswers } from "@/types";

// ===========================
// 診断結果ページ（内部コンポーネント）
// ===========================
function ResultContent() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<MatchResult[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = searchParams.get("answers");
    if (!raw) {
      setLoading(false);
      return;
    }
    try {
      const answers: QuizAnswers = JSON.parse(decodeURIComponent(raw));
      const matched = generateMatchResults(answers);
      setResults(matched);

      // ローカルストレージに保存（マイページ用）
      const saveData = {
        matchResults: matched,
        answers,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem("sougo_navi_result", JSON.stringify(saveData));
    } catch (e) {
      console.error("回答データの解析に失敗しました", e);
    }
    setLoading(false);
  }, [searchParams]);

  /** 気になる大学をトグル保存 */
  const handleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        {/* スピナー + アイコン */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-full border-4 border-primary-100 border-t-primary-600 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-2xl">🎯</div>
        </div>

        <h2 className="font-display font-black text-xl text-gray-800 mb-2">分析中です…</h2>
        <p className="text-gray-500 text-sm text-center leading-relaxed mb-6">
          あなたの回答をもとに<br />ぴったりの大学を探しています
        </p>

        {/* ステップ表示 */}
        <div className="flex flex-col gap-2 w-full max-w-xs mb-6">
          {["回答を分析中", "大学データと照合中", "おすすめ順に整理中"].map((step, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm text-gray-500">
              <div
                className="w-4 h-4 rounded-full border-2 border-primary-300 border-t-primary-600 animate-spin shrink-0"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
              <span>{step}</span>
            </div>
          ))}
        </div>

        {/* バウンスドット */}
        <div className="flex gap-2">
          <span className="loading-dot w-2.5 h-2.5 rounded-full bg-primary-400 block" />
          <span className="loading-dot w-2.5 h-2.5 rounded-full bg-primary-500 block" />
          <span className="loading-dot w-2.5 h-2.5 rounded-full bg-primary-600 block" />
        </div>
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="text-center py-24 px-4">
        <p className="text-gray-500 mb-6">診断結果がありません。もう一度診断してください。</p>
        <Link href="/quiz" className="btn-primary">
          診断を始める
        </Link>
      </div>
    );
  }

  const top = results[0];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* 結果ヘッダー */}
      <div className="text-center mb-8">
        <div className="inline-block bg-primary-50 text-primary-600 text-xs font-bold px-3 py-1 rounded-full mb-3">
          診断完了！
        </div>
        <h1 className="font-display font-black text-2xl text-gray-900 mb-2">
          あなたにおすすめの大学が見つかりました
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          回答をもとに、相性の良い大学・学部を表示しています。<br />
          各大学の詳細や先輩への相談もここから進められます。
        </p>
      </div>

      {/* 1位ピックアップ */}
      <div className="bg-gradient-to-br from-primary-600 to-indigo-700 rounded-2xl p-5 mb-6 text-white">
        <p className="text-xs font-bold text-white/70 mb-1">🏆 最もおすすめの大学</p>
        <p className="font-display font-black text-xl">{top.university.name}</p>
        <p className="text-sm text-white/80">{top.university.faculty}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-2xl font-black text-yellow-300">{top.score}点</span>
          <span className="text-xs text-white/70">相性スコア</span>
        </div>
        <div className="mt-3 space-y-1">
          {top.matchReasons.slice(0, 2).map((r, i) => (
            <p key={i} className="text-xs text-white/90 flex items-start gap-1">
              <span className="mt-0.5 shrink-0">✓</span>{r}
            </p>
          ))}
        </div>
      </div>

      {/* 免責注意 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-6 text-xs text-yellow-800 leading-relaxed">
        ⚠️ この結果は参考情報です。合格を保証するものではありません。進路決定は先生・保護者と相談のうえ行ってください。
      </div>

      {/* 全結果リスト */}
      <div className="space-y-4">
        {results.map((result, i) => (
          <UniversityCard
            key={result.university.id}
            result={result}
            rank={i + 1}
            isSaved={savedIds.includes(result.university.id)}
            onSave={handleSave}
          />
        ))}
      </div>

      {/* 次のアクション */}
      <div className="mt-10 card border-primary-100 bg-primary-50">
        <h2 className="font-bold text-gray-900 mb-3">📋 次にやること</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          {top.requiredActions.slice(0, 3).map((action, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-primary-100 text-primary-600 text-xs font-black flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              {action}
            </li>
          ))}
        </ul>
      </div>

      {/* CTAボタン群 */}
      <div className="flex flex-col gap-3 mt-6">
        <Link href="/mentors" className="btn-primary justify-center py-3.5">
          先輩大学生に相談する
        </Link>
        <Link href="/mypage" className="btn-secondary justify-center py-3.5">
          マイページで結果を確認する
        </Link>
        <Link href="/quiz" className="text-center text-sm text-gray-500 hover:text-primary-600 py-2">
          もう一度診断する
        </Link>
      </div>
    </div>
  );
}

// Suspenseラップが必要（useSearchParams使用のため）
export default function ResultPage() {
  return (
    <div className="min-h-screen bg-surface-50">
      <Header />
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-full border-4 border-primary-100 border-t-primary-600 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center text-2xl">🎯</div>
          </div>
          <h2 className="font-display font-black text-xl text-gray-800 mb-2">読み込み中…</h2>
          <div className="flex gap-2 mt-4">
            <span className="loading-dot w-2.5 h-2.5 rounded-full bg-primary-400 block" />
            <span className="loading-dot w-2.5 h-2.5 rounded-full bg-primary-500 block" />
            <span className="loading-dot w-2.5 h-2.5 rounded-full bg-primary-600 block" />
          </div>
        </div>
      }>
        <ResultContent />
      </Suspense>
      <Footer />
    </div>
  );
}
