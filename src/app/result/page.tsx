"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import UniversityCard from "@/components/university/UniversityCard";
import { generateMatchResults } from "@/lib/matchingEngine";
import { MatchResult, QuizAnswers, UserTypeInfo } from "@/types";

// ユーザータイプごとのグラデーション
const typeGradients: Record<string, string> = {
  global:    "from-blue-600/40 to-cyan-600/40 border-blue-500/30",
  stem:      "from-indigo-600/40 to-violet-600/40 border-indigo-500/30",
  community: "from-emerald-600/40 to-teal-600/40 border-emerald-500/30",
  business:  "from-orange-600/40 to-amber-600/40 border-orange-500/30",
  culture:   "from-purple-600/40 to-pink-600/40 border-purple-500/30",
};

// ===========================
// 診断結果ページ（内部コンポーネント）
// ===========================
function ResultContent() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<MatchResult[]>([]);
  const [userType, setUserType] = useState<UserTypeInfo | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = searchParams.get("answers");
    if (!raw) { setLoading(false); return; }
    try {
      const answers: QuizAnswers = JSON.parse(decodeURIComponent(raw));
      const { matchResults: matched, userType: type } = generateMatchResults(answers);
      setResults(matched);
      setUserType(type);
      localStorage.setItem("sougo_navi_result", JSON.stringify({
        matchResults: matched, userType: type, answers, savedAt: new Date().toISOString(),
      }));
    } catch (e) {
      console.error("回答データの解析に失敗しました", e);
    }
    setLoading(false);
  }, [searchParams]);

  const handleSave = (id: string) => {
    setSavedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  /* ローディング */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] px-4">
        <div className="relative mb-8">
          <div className="w-20 h-20 rounded-full border-4 border-white/10 border-t-indigo-500 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-2xl">🎯</div>
        </div>
        <h2 className="font-display font-black text-xl text-white mb-2">分析中です…</h2>
        <p className="text-white/40 text-sm text-center leading-relaxed mb-8">
          あなたの回答をもとに<br />ぴったりの大学を探しています
        </p>
        <div className="flex flex-col gap-2.5 w-full max-w-xs mb-8">
          {["回答を分析中", "大学データと照合中", "おすすめ順に整理中"].map((step, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-white/40">
              <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-indigo-400 animate-spin shrink-0"
                style={{ animationDelay: `${i * 0.3}s` }} />
              {step}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <span className="loading-dot w-2 h-2 rounded-full bg-indigo-500 block" />
          <span className="loading-dot w-2 h-2 rounded-full bg-violet-500 block" />
          <span className="loading-dot w-2 h-2 rounded-full bg-purple-500 block" />
        </div>
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="text-center py-24 px-4">
        <p className="text-white/50 mb-6">診断結果がありません。もう一度診断してください。</p>
        <Link href="/quiz" className="btn-primary">診断を始める</Link>
      </div>
    );
  }

  const top = results[0];

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">

      {/* 結果ヘッダー */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold px-4 py-1.5 rounded-full mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          診断完了！
        </span>
        <h1 className="font-display font-black text-2xl text-white mb-2">
          あなたにおすすめの大学が見つかりました
        </h1>
        <p className="text-sm text-white/40 leading-relaxed">
          回答をもとに、相性の良い大学・学部を表示しています。
        </p>
      </div>

      {/* あなたのタイプ */}
      {userType && (
        <div className={`bg-gradient-to-br ${typeGradients[userType.type] ?? "from-indigo-600/30 to-violet-600/30 border-indigo-500/30"} backdrop-blur-md border rounded-2xl p-5 mb-6`}>
          <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">あなたのタイプ</p>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{userType.icon}</span>
            <h2 className="font-display font-black text-xl text-white">{userType.label}</h2>
          </div>
          <p className="text-sm text-white/65 leading-relaxed mb-4">{userType.description}</p>
          <div className="flex flex-wrap gap-2">
            {userType.traits.map((trait) => (
              <span key={trait} className="text-xs font-medium bg-white/10 text-white/70 px-2.5 py-1 rounded-full border border-white/10">
                ✓ {trait}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 1位ピックアップ */}
      <div className="relative bg-gradient-to-br from-indigo-600/60 to-violet-700/60 backdrop-blur-md border border-white/15 rounded-2xl p-5 mb-5 overflow-hidden">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/5 rounded-full pointer-events-none" />
        <p className="text-xs font-bold text-white/50 mb-2">🏆 最もおすすめの大学</p>
        <p className="font-display font-black text-xl text-white">{top.university.name}</p>
        <p className="text-sm text-white/60 mt-0.5">{top.university.faculty}</p>
        <div className="flex items-baseline gap-2 mt-3 mb-3">
          <span className="text-3xl font-black bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent">
            {top.score}
          </span>
          <span className="text-sm text-white/40">点</span>
          <span className="text-xs text-white/30">/ 相性スコア</span>
        </div>
        <div className="space-y-1.5">
          {top.matchReasons.slice(0, 2).map((r, i) => (
            <p key={i} className="text-xs text-white/70 flex items-start gap-1.5">
              <span className="shrink-0 text-indigo-300 mt-0.5">✓</span>{r}
            </p>
          ))}
        </div>
      </div>

      {/* 免責注意 */}
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3 mb-7 text-xs text-amber-200/60 leading-relaxed">
        ⚠️ この結果は参考情報です。合格を保証するものではありません。進路決定は先生・保護者と相談のうえ行ってください。
      </div>

      {/* 全結果リスト */}
      <div className="space-y-4 mb-10">
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
      <div className="card border-indigo-500/20 bg-indigo-500/5 mb-6">
        <h2 className="font-bold text-white mb-3">📋 次にやること</h2>
        <ul className="space-y-2.5 text-sm text-white/70">
          {top.requiredActions.slice(0, 3).map((action, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-black flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              {action}
            </li>
          ))}
        </ul>
      </div>

      {/* CTAボタン群 */}
      <div className="flex flex-col gap-3">
        <Link href="/mentors"  className="btn-primary justify-center py-3.5">先輩大学生に相談する</Link>
        <Link href="/mypage"   className="btn-secondary justify-center py-3.5">マイページで結果を確認する</Link>
        <Link href="/quiz"     className="text-center text-sm text-white/30 hover:text-white/60 py-2 transition-colors">
          もう一度診断する
        </Link>
      </div>
    </div>
  );
}

// Suspenseラップ
export default function ResultPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-[65vh] px-4">
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-full border-4 border-white/10 border-t-indigo-500 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center text-2xl">🎯</div>
          </div>
          <h2 className="font-display font-black text-xl text-white mb-2">読み込み中…</h2>
          <div className="flex gap-2 mt-4">
            <span className="loading-dot w-2 h-2 rounded-full bg-indigo-500 block" />
            <span className="loading-dot w-2 h-2 rounded-full bg-violet-500 block" />
            <span className="loading-dot w-2 h-2 rounded-full bg-purple-500 block" />
          </div>
        </div>
      }>
        <ResultContent />
      </Suspense>
      <Footer />
    </div>
  );
}
