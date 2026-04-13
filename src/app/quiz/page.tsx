"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import { quizQuestions } from "@/data/quizQuestions";
import { QuizAnswers } from "@/types";
import InterimFeedbackCard from "@/components/result/InterimFeedbackCard";

// ─── 都道府県グループ ─────────────────────────────────────
const PREFECTURE_GROUPS = [
  {
    region: "北海道・東北",
    slug: "hokkaido-tohoku",
    prefectures: ["北海道", "青森", "岩手", "宮城", "秋田", "山形", "福島"],
  },
  {
    region: "関東",
    slug: "kanto",
    prefectures: ["東京", "神奈川", "埼玉", "千葉", "茨城", "栃木", "群馬"],
  },
  {
    region: "中部・北陸",
    slug: "chubu-hokuriku",
    prefectures: ["愛知", "静岡", "岐阜", "三重", "新潟", "富山", "石川", "福井", "長野", "山梨"],
  },
  {
    region: "近畿",
    slug: "kansai",
    prefectures: ["大阪", "京都", "兵庫", "滋賀", "奈良", "和歌山"],
  },
  {
    region: "中国",
    slug: "chugoku-shikoku",
    prefectures: ["広島", "岡山", "山口", "鳥取", "島根"],
  },
  {
    region: "四国",
    slug: "chugoku-shikoku",
    prefectures: ["愛媛", "香川", "高知", "徳島"],
  },
  {
    region: "九州",
    slug: "kyushu-okinawa",
    prefectures: ["福岡", "佐賀", "長崎", "熊本", "大分", "宮崎", "鹿児島"],
  },
  {
    region: "沖縄",
    slug: "kyushu-okinawa",
    prefectures: ["沖縄"],
  },
];

// 都道府県 → region slug
const PREFECTURE_TO_SLUG: Record<string, string> = {};
for (const g of PREFECTURE_GROUPS) {
  for (const p of g.prefectures) {
    PREFECTURE_TO_SLUG[p] = g.slug;
  }
}

type FlowStep = "nickname" | "prefecture" | "quiz";

// ─── メインコンポーネント ────────────────────────────────
export default function QuizPage() {
  const router = useRouter();

  // フロー制御
  const [flowStep, setFlowStep] = useState<FlowStep>("nickname");

  // ニックネーム
  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState(false);

  // 都道府県選択
  const [selectedRegionLabel, setSelectedRegionLabel] = useState<string | null>(null);
  const [selectedPrefecture, setSelectedPrefecture] = useState<string | null>(null);

  // 診断
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [feedbackStep, setFeedbackStep] = useState<1 | 2 | null>(null);

  const current = quizQuestions[currentIndex];
  const total = quizQuestions.length;
  const isLast = currentIndex === total - 1;

  // プログレスバー
  const progress =
    flowStep === "nickname"    ? 0
    : flowStep === "prefecture"  ? 3
    : ((currentIndex + 1) / total) * 100;

  // ── ニックネーム → 次へ ──
  const handleNicknameNext = () => {
    if (!nickname.trim()) { setNicknameError(true); return; }
    setNicknameError(false);
    setFlowStep("prefecture");
  };

  // ── 都道府県 → 次へ ──
  const handlePrefectureNext = () => {
    if (!selectedPrefecture) return;
    setFlowStep("quiz");
  };

  // ── 選択肢クリック ──
  const handleSelect = useCallback((value: string) => setSelected(value), []);

  // ── 次の問へ ──
  const handleNext = () => {
    if (!selected) return;
    const newAnswers = { ...answers, [current.id]: selected };
    setAnswers(newAnswers);
    if (isLast) {
      const regionSlug = selectedPrefecture
        ? (PREFECTURE_TO_SLUG[selectedPrefecture] ?? "anywhere")
        : "anywhere";
      router.push(
        `/result?answers=${encodeURIComponent(JSON.stringify(newAnswers))}`
        + `&region=${encodeURIComponent(regionSlug)}`
        + `&prefecture=${encodeURIComponent(selectedPrefecture ?? "")}`
        + `&nickname=${encodeURIComponent(nickname)}`
      );
    } else {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelected(answers[quizQuestions[nextIndex]?.id] || null);
      // 中間フィードバック：Q6終了後(index→7), Q12終了後(index→13)
      if (nextIndex === 7)  setFeedbackStep(1);
      else if (nextIndex === 13) setFeedbackStep(2);
    }
  };

  // ── 戻る ──
  const handleBack = () => {
    if (feedbackStep !== null) { setFeedbackStep(null); return; }
    if (currentIndex === 0) { setFlowStep("prefecture"); return; }
    setCurrentIndex((i) => i - 1);
    setSelected(answers[quizQuestions[currentIndex - 1].id] || null);
  };

  // ─── 中間フィードバック ───────────────────────────────
  if (feedbackStep !== null) {
    return (
      <>
        <Header variant="light" />
        <InterimFeedbackCard
          step={feedbackStep}
          answers={answers}
          totalQuestions={total}
          onContinue={() => setFeedbackStep(null)}
        />
      </>
    );
  }

  const selectedGroup = PREFECTURE_GROUPS.find((g) => g.region === selectedRegionLabel);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/70 via-white to-sky-50/50 pointer-events-none" />
      <div className="absolute -top-32 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-violet-100/35 to-transparent rounded-full blur-3xl pointer-events-none will-change-transform" />
      <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-sky-100/30 to-transparent rounded-full blur-3xl pointer-events-none will-change-transform" />

      <Header variant="light" />

      {/* プログレスバー */}
      <div className="fixed top-14 left-0 right-0 z-40 h-0.5 bg-violet-100">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-[width] duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="relative max-w-lg mx-auto px-4 pt-12 pb-16">

        {/* ─── STEP 0-A：ニックネーム ─────────────────────── */}
        {flowStep === "nickname" && (
          <>
            <div className="mb-10">
              <p className="text-xs font-bold text-violet-600 bg-violet-50 border border-violet-200 px-3 py-1.5 rounded-full inline-block mb-4">
                STEP 1 / 3
              </p>
              <h2 className="font-mincho text-[1.55rem] font-bold text-slate-800 leading-[1.5] mb-2 tracking-wide">
                まず教えてください！
              </h2>
              <p className="text-sm text-slate-500">診断結果をより正確にするために教えてください</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-2">ニックネーム</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => { setNickname(e.target.value); setNicknameError(false); }}
                placeholder="例：たろう、さくら"
                className={`w-full border rounded-2xl px-5 py-4 text-base outline-none transition-colors duration-150
                  ${nicknameError
                    ? "border-red-400 focus:border-red-500 bg-red-50"
                    : "border-slate-200 focus:border-indigo-400 bg-white"
                  } shadow-sm`}
              />
              {nicknameError && (
                <p className="text-red-500 text-xs mt-1.5">ニックネームを入力してください</p>
              )}
              <p className="text-xs text-slate-400 mt-2">
                本名でなくてOKです。データ管理のために使用します。
              </p>
            </div>

            <button
              onClick={handleNicknameNext}
              className="w-full py-4 font-mincho text-base font-bold rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-300/40 active:opacity-80 transition-opacity duration-150"
            >
              次へ →
            </button>
          </>
        )}

        {/* ─── STEP 0-B：都道府県選択 ──────────────────────── */}
        {flowStep === "prefecture" && (
          <>
            <div className="mb-8">
              <p className="text-xs font-bold text-violet-600 bg-violet-50 border border-violet-200 px-3 py-1.5 rounded-full inline-block mb-4">
                STEP 2 / 3
              </p>
              <h2 className="font-mincho text-[1.55rem] font-bold text-slate-800 leading-[1.5] tracking-wide">
                今住んでいる都道府県を選んでください
              </h2>
            </div>

            {/* 第1段階：地方ボタン */}
            <div className="flex flex-wrap gap-2 mb-6">
              {PREFECTURE_GROUPS.map((g) => (
                <button
                  key={g.region}
                  onClick={() => {
                    setSelectedRegionLabel(g.region);
                    setSelectedPrefecture(null);
                  }}
                  className={`px-3 py-2 rounded-full text-sm font-bold border transition-colors duration-150
                    ${selectedRegionLabel === g.region
                      ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white border-transparent shadow-md shadow-indigo-200/60"
                      : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:bg-violet-50/40"
                    }`}
                >
                  {g.region}
                </button>
              ))}
            </div>

            {/* 第2段階：都道府県ボタン */}
            {selectedGroup && (
              <div className="mb-8">
                <p className="text-xs font-bold text-slate-400 mb-3">都道府県を選んでください</p>
                <div className="flex flex-wrap gap-2">
                  {selectedGroup.prefectures.map((pref) => (
                    <button
                      key={pref}
                      onClick={() => setSelectedPrefecture(pref)}
                      className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors duration-150
                        ${selectedPrefecture === pref
                          ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white border-transparent shadow-md shadow-indigo-200/60"
                          : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:bg-violet-50/40"
                        }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedPrefecture && (
              <p className="text-sm text-indigo-600 font-bold mb-4">
                ✓ {selectedPrefecture} を選択中
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setFlowStep("nickname")}
                className="py-4 px-6 font-mincho text-base font-bold text-slate-500 bg-white border border-slate-200 rounded-xl shadow-sm active:opacity-70"
              >
                ← 戻る
              </button>
              <button
                onClick={handlePrefectureNext}
                disabled={!selectedPrefecture}
                className={`flex-1 py-4 font-mincho text-base font-bold rounded-xl transition-colors duration-150
                  ${selectedPrefecture
                    ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-300/40 active:opacity-80"
                    : "bg-slate-100 text-slate-300 cursor-not-allowed"
                  }`}
              >
                次へ →
              </button>
            </div>
          </>
        )}

        {/* ─── 診断問題 ────────────────────────────────────── */}
        {flowStep === "quiz" && (
          <>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-baseline gap-1.5">
                <span className="font-mincho text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent leading-none">
                  {currentIndex + 1}
                </span>
                <span className="text-sm text-slate-400 font-sans">/ {total}</span>
              </div>
              <span className="text-xs font-bold text-violet-600 bg-violet-50 border border-violet-200 px-3 py-1.5 rounded-full">
                {categoryLabel(current.category)}
              </span>
            </div>

            <h2 className="font-mincho text-[1.55rem] font-bold text-slate-800 leading-[1.5] mb-9 tracking-wide">
              {current.text}
            </h2>

            <div className="flex flex-col gap-3 mb-8">
              {current.options.map((option) => {
                const isActive = selected === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`w-full text-left px-5 py-4 rounded-2xl border transition-colors duration-150
                      ${isActive
                        ? "bg-gradient-to-r from-indigo-500 to-violet-500 border-transparent shadow-lg shadow-indigo-200/60 text-white"
                        : "bg-white border-slate-200 text-slate-700 hover:border-violet-300 hover:bg-violet-50/40 shadow-sm"
                      }`}
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors duration-150
                          ${isActive ? "border-white/70 bg-white/20" : "border-slate-300"}`}
                      >
                        {isActive && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 12 12">
                            <path d="M2.5 6L5 8.5L9.5 3.5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <span className="font-mincho text-base leading-snug">{option.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleBack}
                className="py-4 px-6 font-mincho text-base font-bold text-slate-500 bg-white border border-slate-200 rounded-xl transition-colors duration-150 shadow-sm active:opacity-70"
              >
                ← 戻る
              </button>
              <button
                onClick={handleNext}
                disabled={!selected}
                className={`flex-1 py-4 font-mincho text-base font-bold rounded-xl transition-colors duration-150
                  ${selected
                    ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-300/40 active:opacity-80"
                    : "bg-slate-100 text-slate-300 cursor-not-allowed"
                  }`}
              >
                {isLast ? "診断結果を見る ✨" : "次の質問へ →"}
              </button>
            </div>
          </>
        )}

        <p className="text-center text-xs text-slate-400 mt-8 leading-relaxed font-sans">
          診断結果は参考情報です。合格を保証するものではありません。
        </p>
      </div>
    </div>
  );
}

function categoryLabel(cat: string): string {
  const map: Record<string, string> = {
    interest:          "興味・関心",
    career:            "将来の目標",
    learning:          "学び方",
    personality:       "性格・特性",
    activity:          "高校での活動",
    academic:          "学力・評定",
    location:          "地域志向",
    school_type:       "学校の種別",
    finance:           "学費・通学",
    subject:           "得意科目",
    club:              "部活動",
    graduation_vision: "卒業後の姿",
    campus_life:       "大学生活",
    info_gathering:    "情報収集",
  };
  return map[cat] || cat;
}
