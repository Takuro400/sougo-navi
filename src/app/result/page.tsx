"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import UniversityCard from "@/components/university/UniversityCard";
import { generateMatchResults } from "@/lib/matchingEngine";
import { MatchResult, QuizAnswers, UserTypeInfo } from "@/types";
import { universities } from "@/data/universities";
import type { AiAnalysisResponse } from "@/app/api/ai-analysis/route";
import type { AiMatchingResponse } from "@/app/api/ai-matching/route";
import StrengthWeaknessCard from "@/components/result/StrengthWeaknessCard";
import RoadmapSection from "@/components/result/RoadmapSection";
import ConsultationCTA from "@/components/result/ConsultationCTA";
import ResultFlow from "@/components/result/ResultFlow";
import RankedUniversityList from "@/components/result/RankedUniversityList";
import LineModal from "@/components/result/LineModal";
import { strengthWeaknessMap, roadmapMap } from "@/data/resultData";
import { supabase } from "@/lib/supabase";

// ユーザータイプごとのカラー（ライト版）
const typeGradients: Record<string, string> = {
  global:    "from-blue-50 to-cyan-50 border-blue-200",
  stem:      "from-indigo-50 to-violet-50 border-indigo-200",
  community: "from-emerald-50 to-teal-50 border-emerald-200",
  business:  "from-orange-50 to-amber-50 border-orange-200",
  culture:   "from-purple-50 to-pink-50 border-purple-200",
};

const typeTextColor: Record<string, string> = {
  global:    "text-blue-800",
  stem:      "text-indigo-800",
  community: "text-emerald-800",
  business:  "text-orange-800",
  culture:   "text-purple-800",
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
  const [rawAnswers, setRawAnswers] = useState<QuizAnswers>({});
  const [rawRegion, setRawRegion] = useState<string>("");
  const [rawPrefecture, setRawPrefecture] = useState<string>("");
  const [rawNickname, setRawNickname] = useState<string>("");
  const [isAiMatched, setIsAiMatched] = useState(false);
  // フロー表示 or 詳細表示の切り替え
  const [viewMode, setViewMode] = useState<"flow" | "detail">("flow");
  // LINEモーダル
  const [showLineModal, setShowLineModal] = useState(false);
  // Supabase保存済みレコードID
  const [savedRecordId, setSavedRecordId] = useState<string | null>(null);

  // 既存AI分析
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AiAnalysisResponse | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  // 新AIマッチング
  const [aiMatchLoading, setAiMatchLoading] = useState(false);
  const [aiMatchError, setAiMatchError] = useState<string | null>(null);

  useEffect(() => {
    const raw = searchParams.get("answers");
    if (!raw) {
      try {
        const saved = localStorage.getItem("sougo_navi_result");
        if (saved) {
          const { matchResults, userType, answers: savedAnswers, region: savedRegion, prefecture: savedPrefecture, nickname: savedNickname } = JSON.parse(saved);
          if (matchResults?.length) {
            setResults(matchResults.slice(0, 5));
            setUserType(userType);
            if (savedAnswers)    setRawAnswers(savedAnswers);
            if (savedRegion)     setRawRegion(savedRegion);
            if (savedPrefecture) setRawPrefecture(savedPrefecture);
            if (savedNickname)   setRawNickname(savedNickname);
          }
        }
      } catch (e) {
        console.error("保存済み結果の読み込みに失敗しました", e);
      }
      setLoading(false);
      return;
    }
    try {
      const answers: QuizAnswers = JSON.parse(decodeURIComponent(raw));
      const region     = searchParams.get("region")     ?? "";
      const prefecture = searchParams.get("prefecture") ?? "";
      const nickname   = searchParams.get("nickname")   ?? "";
      const { matchResults: matched, userType: type } = generateMatchResults(answers, region);
      setResults(matched.slice(0, 5));
      setUserType(type);
      setRawAnswers(answers);
      setRawRegion(region);
      setRawPrefecture(prefecture);
      setRawNickname(nickname);
      localStorage.setItem("sougo_navi_result", JSON.stringify({
        matchResults: matched, userType: type, answers, region, prefecture, nickname, savedAt: new Date().toISOString(),
      }));

      // Supabaseに診断結果を保存
      const top = matched[0];
      const GRADE_LABELS: Record<string, string> = {
        a: "高校1年生", b: "高校2年生", c: "高校3年生", d: "浪人生", e: "その他",
      };
      const CONCERN_LABELS: Record<string, string> = {
        a: "志望校・学部が決まらない",
        b: "志望理由書・自己PRの書き方が分からない",
        c: "面接・プレゼンが不安",
        d: "活動実績・課外活動が足りない気がする",
      };
      supabase
        .from("diagnosis_results")
        .insert({
          user_type:      type.label,
          top_university: top?.university.name ?? null,
          top_faculty:    top?.university.faculty ?? null,
          score:          top?.score ?? null,
          prefecture:     prefecture || null,
          nickname:       nickname || null,
          grade:          answers["q_grade"] ? (GRADE_LABELS[answers["q_grade"]] ?? null) : null,
          concern:        answers["q_concern"] ? (CONCERN_LABELS[answers["q_concern"]] ?? null) : null,
          answers:        answers as Record<string, unknown>,
          line_clicked:   false,
          user_agent:     typeof navigator !== "undefined" ? navigator.userAgent : null,
        })
        .select("id")
        .single()
        .then(({ data }) => {
          if (data?.id) setSavedRecordId(data.id);
        });
    } catch (e) {
      console.error("回答データの解析に失敗しました", e);
    }
    setLoading(false);
  }, [searchParams]);

  const handleSave = (id: string) => {
    setSavedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const handleAiAnalysis = async () => {
    if (!results.length || !userType) return;
    setAiLoading(true);
    setAiError(null);
    setAiResult(null);
    try {
      const top = results[0];
      const res = await fetch("/api/ai-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: rawAnswers,
          userTypeLabel: userType.label,
          topUniversityName: top.university.name,
          topFaculty: top.university.faculty,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAiError(data.error ?? "分析中にエラーが発生しました");
      } else {
        setAiResult(data as AiAnalysisResponse);
      }
    } catch {
      setAiError("ネットワークエラーが発生しました。もう一度お試しください");
    } finally {
      setAiLoading(false);
    }
  };

  /** AIマッチング: 大学リストをAI選定結果に置き換える */
  const handleAiMatching = async () => {
    if (!userType) return;
    setAiMatchLoading(true);
    setAiMatchError(null);
    try {
      const res = await fetch("/api/ai-matching", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: rawAnswers, region: rawRegion }),
      });
      const data: AiMatchingResponse & { error?: string } = await res.json();
      if (!res.ok) {
        setAiMatchError(data.error ?? "AIマッチング中にエラーが発生しました");
        return;
      }

      // AI結果をMatchResult形式に変換
      const newResults: MatchResult[] = data.results
        .flatMap((item): MatchResult[] => {
          const univ = universities.find((u) => u.id === item.universityId);
          if (!univ) return [];
          return [{
            university: univ,
            score: item.score,
            matchReasons: item.matchReasons,
            readinessLevel: item.readinessLevel,
            requiredActions: item.requiredActions,
            userType: userType,
            aiComment: item.aiComment,
          }];
        });

      if (newResults.length > 0) {
        setResults(newResults);
        setIsAiMatched(true);
      } else {
        setAiMatchError("AIが大学を特定できませんでした。もう一度お試しください");
      }
    } catch {
      setAiMatchError("ネットワークエラーが発生しました。もう一度お試しください");
    } finally {
      setAiMatchLoading(false);
    }
  };

  /* ローディング */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] px-4">
        <div className="relative mb-8">
          <div className="w-20 h-20 rounded-full border-4 border-violet-100 border-t-indigo-500 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-2xl">🎯</div>
        </div>
        <h2 className="font-mincho font-bold text-xl text-slate-800 mb-2">分析中です…</h2>
        <p className="text-slate-500 text-sm text-center leading-relaxed mb-8">
          あなたの回答をもとに<br />ぴったりの大学を探しています
        </p>
        <div className="flex flex-col gap-2.5 w-full max-w-xs mb-8">
          {["回答を分析中", "大学データと照合中", "おすすめ順に整理中"].map((step, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-slate-400">
              <div className="w-4 h-4 rounded-full border-2 border-slate-200 border-t-indigo-400 animate-spin shrink-0"
                style={{ animationDelay: `${i * 0.3}s` }} />
              {step}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <span className="loading-dot w-2 h-2 rounded-full bg-indigo-400 block" />
          <span className="loading-dot w-2 h-2 rounded-full bg-violet-400 block" />
          <span className="loading-dot w-2 h-2 rounded-full bg-purple-400 block" />
        </div>
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="text-center py-24 px-4">
        <p className="text-slate-500 mb-6">診断結果がありません。もう一度診断してください。</p>
        <Link href="/quiz" className="btn-primary">診断を始める</Link>
      </div>
    );
  }

  const top = results[0];
  const typeKey = userType?.type ?? "stem";

  // ── フロー表示モード ──
  if (viewMode === "flow" && userType) {
    const strengthData = strengthWeaknessMap[userType.type];
    const roadmapSteps = roadmapMap[userType.type];
    return (
      <>
        <ResultFlow
          userType={userType}
          results={results}
          strengthData={strengthData}
          roadmapSteps={roadmapSteps}
          onViewDetail={() => setViewMode("detail")}
          onOpenModal={() => {
            setShowLineModal(true);
            // LINE誘導クリックを記録
            if (savedRecordId) {
              supabase
                .from("diagnosis_results")
                .update({ line_clicked: true })
                .eq("id", savedRecordId)
                .then(() => {});
            }
          }}
        />
        <LineModal
          isOpen={showLineModal}
          onClose={() => setShowLineModal(false)}
          userTypeLabel={userType.label}
        />
      </>
    );
  }

  // ── 詳細表示モード ──
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* 詳細表示に戻ってきた場合のバナー */}
      <div className="flex items-center justify-between bg-violet-50 border border-violet-200 rounded-xl px-4 py-3 mb-6">
        <p className="text-sm text-violet-700 font-medium">ストーリー形式で見直す</p>
        <button
          onClick={() => setViewMode("flow")}
          className="text-xs font-bold text-violet-600 bg-violet-100 px-3 py-1.5 rounded-full active:opacity-70 transition-opacity duration-150"
        >
          フローを見る ←
        </button>
      </div>

      {/* 結果ヘッダー */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          {isAiMatched ? "AI診断完了！" : "診断完了！"}
        </span>
        <h1 className="font-mincho font-bold text-2xl text-slate-800 mb-2">
          あなたにおすすめの大学が見つかりました
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          {isAiMatched
            ? "AIが回答を分析し、最適な大学・学部を選びました。"
            : "回答をもとに、相性の良い大学・学部を表示しています。"}
        </p>
      </div>

      {/* あなたのタイプ */}
      {userType && (
        <div className={`bg-gradient-to-br ${typeGradients[typeKey] ?? "from-indigo-50 to-violet-50 border-indigo-200"} border rounded-2xl p-5 mb-6`}>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">あなたのタイプ</p>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{userType.icon}</span>
            <h2 className={`font-mincho font-bold text-xl ${typeTextColor[typeKey] ?? "text-indigo-800"}`}>{userType.label}</h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">{userType.description}</p>
          <div className="flex flex-wrap gap-2">
            {userType.traits.map((trait) => (
              <span key={trait} className="text-xs font-medium bg-white text-slate-600 px-2.5 py-1 rounded-full border border-slate-200">
                ✓ {trait}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 強み・伸びしろカード */}
      {userType && <StrengthWeaknessCard userType={userType.type} />}

      {/* ランキング形式・大学リスト */}
      <div className="mb-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-mincho font-bold text-slate-800 text-base">
            {isAiMatched ? "✨ AIが選んだおすすめ大学" : "あなたにおすすめの大学"}
          </h2>
          {isAiMatched && (
            <span className="text-xs font-bold text-fuchsia-600 bg-fuchsia-50 border border-fuchsia-200 px-2.5 py-1 rounded-full">
              AI選定
            </span>
          )}
        </div>
        <RankedUniversityList results={results} />
      </div>

      {/* 免責注意 */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 my-5 text-xs text-amber-700 leading-relaxed">
        ⚠️ この結果は参考情報です。合格を保証するものではありません。進路決定は先生・保護者と相談のうえ行ってください。
      </div>

      {/* ── AIマッチングセクション ── */}
      <div className="mb-6">
        {!isAiMatched ? (
          <>
            {/* AIマッチングボタン */}
            <button
              onClick={handleAiMatching}
              disabled={aiMatchLoading}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm
                bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white shadow-md shadow-violet-200/60
                hover:from-fuchsia-700 hover:to-violet-700 active:scale-[.98] transition-all
                disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {aiMatchLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  AIが分析中…約10秒かかります
                </>
              ) : (
                <>
                  <span className="text-lg">✨</span>
                  AIが大学をもう一度分析する
                </>
              )}
            </button>
            {aiMatchLoading && (
              <p className="text-center text-xs text-slate-400 mt-2">
                Claude AIが診断回答を分析し、最適な大学を選定しています
              </p>
            )}
            {aiMatchError && (
              <div className="mt-3 bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-600">
                ⚠️ {aiMatchError}
              </div>
            )}
          </>
        ) : (
          /* AI選定済み：タグ結果に戻すオプション */
          <div className="text-center">
            <p className="text-xs text-slate-400 mb-2">⚠️ AIによる参考情報です。合格を保証するものではありません。</p>
            <button
              onClick={() => {
                // localStorageから元のタグマッチング結果を復元
                try {
                  const saved = localStorage.getItem("sougo_navi_result");
                  if (saved) {
                    const { matchResults } = JSON.parse(saved);
                    if (matchResults?.length) {
                      setResults(matchResults.slice(0, 5));
                      setIsAiMatched(false);
                    }
                  }
                } catch {
                  setIsAiMatched(false);
                }
              }}
              className="text-xs text-slate-400 hover:text-slate-600 underline transition-colors"
            >
              タグマッチング結果に戻す
            </button>
          </div>
        )}
      </div>

      {/* 再診断促進 */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-center">
        <p className="text-sm text-slate-500 mb-3">他にも候補があります。条件を変えて再診断してみましょう</p>
        <Link href="/quiz" className="btn-primary justify-center py-2.5 text-sm">
          条件を変えて再診断する
        </Link>
      </div>

      {/* ロードマップ */}
      {userType && <RoadmapSection userType={userType.type} />}

      {/* AIによる詳細分析セクション */}
      <div className="mb-6">
        {/* ボタン */}
        {!aiResult && (
          <button
            onClick={handleAiAnalysis}
            disabled={aiLoading}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm
              bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-indigo-200/60
              hover:from-violet-700 hover:to-indigo-700 active:scale-[.98] transition-all
              disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {aiLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                AIが分析中…
              </>
            ) : (
              <>
                <span className="text-lg">✨</span>
                AIが詳しく分析する
              </>
            )}
          </button>
        )}

        {/* エラー表示 */}
        {aiError && (
          <div className="mt-3 bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-600">
            ⚠️ {aiError}
          </div>
        )}

        {/* 分析結果カード */}
        {aiResult && (
          <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 rounded-2xl p-5">
            {/* ヘッダー */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">✨</span>
              <h2 className="font-mincho font-bold text-slate-800 text-base">AIによる詳細分析</h2>
            </div>

            {/* タイプ一言表現 */}
            <div className="bg-white rounded-xl px-4 py-3 mb-4 border border-violet-100">
              <p className="text-xs font-bold text-violet-500 mb-1">あなたのタイプ</p>
              <p className="font-mincho font-bold text-slate-800 text-base">
                💡 {aiResult.oneLiner}
              </p>
            </div>

            {/* 合う大学・学部の特徴 */}
            <div className="mb-4">
              <p className="text-xs font-bold text-slate-500 mb-2">あなたに合う大学・学部の特徴</p>
              <p className="text-sm text-slate-600 leading-relaxed bg-white rounded-xl p-3 border border-violet-100">
                {aiResult.features}
              </p>
            </div>

            {/* 今すぐ始めるべき3つのアクション */}
            <div className="mb-4">
              <p className="text-xs font-bold text-slate-500 mb-2">今すぐ始めるべき3つのアクション</p>
              <ul className="space-y-2">
                {aiResult.actions.map((action, i) => (
                  <li key={i} className="flex items-start gap-2.5 bg-white rounded-xl p-3 border border-violet-100">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-violet-100 text-violet-600 text-xs font-black flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm text-slate-600 leading-relaxed">{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 注意書き */}
            <p className="text-xs text-slate-400 text-center leading-relaxed">
              ⚠️ この分析はAIによる参考情報です。合格を保証するものではありません。
            </p>
          </div>
        )}
      </div>

      {/* 相談CTA（タイプ別パーソナライズ） */}
      {userType && <ConsultationCTA userType={userType.type} />}

      {/* 再診断・マイページ */}
      <div className="flex flex-col gap-3">
        <Link href="/mypage" className="btn-secondary justify-center py-3.5">マイページで結果を保存する</Link>
        <Link href="/quiz" className="text-center text-sm text-slate-400 py-2 transition-colors active:opacity-70">
          もう一度診断する
        </Link>
      </div>
    </div>
  );
}

// Suspenseラップ
export default function ResultPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* 背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/70 via-white to-sky-50/50 pointer-events-none" />
      <div className="absolute -top-32 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-violet-100/35 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-sky-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative">
      <Header variant="light" />

      <Suspense fallback={
        <div className="relative flex flex-col items-center justify-center min-h-[65vh] px-4">
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-full border-4 border-violet-100 border-t-indigo-500 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center text-2xl">🎯</div>
          </div>
          <h2 className="font-mincho font-bold text-xl text-slate-800 mb-2">読み込み中…</h2>
          <div className="flex gap-2 mt-4">
            <span className="loading-dot w-2 h-2 rounded-full bg-indigo-400 block" />
            <span className="loading-dot w-2 h-2 rounded-full bg-violet-400 block" />
            <span className="loading-dot w-2 h-2 rounded-full bg-purple-400 block" />
          </div>
        </div>
      }>
        <ResultContent />
      </Suspense>
      <Footer />
      </div>
    </div>
  );
}
