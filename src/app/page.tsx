import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function TopPage() {
  const steps = [
    { num: "01", title: "15問の診断に答える",    desc: "興味・価値観・学び方など15問に答えるだけ。約3分で完了します。",                  icon: "✏️" },
    { num: "02", title: "相性の良い大学が分かる", desc: "回答をもとに、あなたに合う大学・学部候補とおすすめ理由を表示します。",           icon: "🎯" },
    { num: "03", title: "大学情報を効率よく収集", desc: "各大学の特色・総合型選抜との相性・外部サイトへのリンクも確認できます。",          icon: "📚" },
    { num: "04", title: "実際の先輩に相談する",   desc: "在籍している先輩大学生に、総合型選抜の体験や学生生活を直接聞けます。",            icon: "💬" },
  ];

  const features = [
    {
      title: "質問診断機能",
      desc: "15問の質問で興味・価値観を分析し、おすすめ大学をスコア付きで提示。なぜおすすめかも明確に分かります。",
      icon: "🔍",
      iconBg: "bg-violet-50 border-violet-100",
    },
    {
      title: "合格可能性の目安",
      desc: "現在の準備度・出願に必要な行動を参考情報として表示。断定せず、あくまでサポートとして提供します。",
      icon: "📊",
      iconBg: "bg-sky-50 border-sky-100",
    },
    {
      title: "先輩大学生への相談",
      desc: "各大学に在籍する先輩メンターに相談申込ができます。総合型選抜の経験談を直接聞きましょう。",
      icon: "👥",
      iconBg: "bg-indigo-50 border-indigo-100",
    },
  ];

  const previewTags = ["グローバル志向", "研究・探究", "地域貢献"];
  const previewReasons = [
    "グローバルな学びへの関心と大学の強みが一致",
    "総合型選抜との相性は「高」です",
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header variant="light" />

      {/* ===== ヒーローセクション ===== */}
      <section className="relative min-h-[88vh] flex flex-col justify-center overflow-hidden pt-14">
        {/* 背景グラデーション */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/70 via-white to-sky-50/50 pointer-events-none" />
        <div className="absolute -top-32 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-violet-100/35 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-sky-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-20 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 xl:gap-20">

            {/* ── 左：テキスト ── */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">

              {/* バッジ */}
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-violet-200/70 text-violet-600 text-xs font-semibold px-4 py-2 rounded-full mb-7 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                総合型選抜を受ける高校生へ
              </div>

              {/* ヘッドライン */}
              <h1 className="font-display font-bold text-[2.2rem] md:text-[2.7rem] leading-[1.22] mb-5 text-slate-800 tracking-tight">
                15の質問で、<br />
                <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
                  自分に合う大学
                </span>
                が見つかる。
              </h1>

              {/* サブコピー */}
              <p className="text-[15px] text-slate-500 mb-7 leading-[1.85] max-w-md">
                興味・価値観・将来の目標を入力するだけ。あなたにぴったりの大学候補と、おすすめ理由をすぐに表示します。
              </p>

              {/* ソーシャルプルーフ */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex -space-x-2.5">
                  {[
                    { bg: "bg-violet-400", initial: "A" },
                    { bg: "bg-sky-400",    initial: "K" },
                    { bg: "bg-emerald-400",initial: "S" },
                    { bg: "bg-rose-400",   initial: "Y" },
                  ].map(({ bg, initial }, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full ${bg} border-2 border-white flex items-center justify-center text-[11px] font-bold text-white shadow-sm`}
                    >
                      {initial}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-500 leading-snug">
                  すでに <span className="font-bold text-slate-700">2,000人以上</span> が<br className="sm:hidden" />診断済み
                </p>
              </div>

              {/* 統計ピル */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-9">
                {[
                  { value: "15問",  label: "質問数" },
                  { value: "約3分", label: "所要時間" },
                  { value: "無料",  label: "登録不要" },
                ].map(({ value, label }, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-violet-100 rounded-xl px-4 py-2.5 shadow-sm"
                  >
                    <span className="text-sm font-black text-violet-700">{value}</span>
                    <span className="text-[11px] text-slate-400 tracking-wide">{label}</span>
                  </div>
                ))}
              </div>

              {/* CTAボタン */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center gap-2 px-8 py-[14px]
                    bg-gradient-to-r from-violet-600 to-indigo-500
                    hover:from-violet-500 hover:to-indigo-400
                    text-white font-bold rounded-2xl text-base
                    shadow-md shadow-violet-300/40 hover:shadow-lg hover:shadow-violet-300/50
                    transition-all duration-200 active:scale-95"
                >
                  無料で診断する
                  <svg className="w-4 h-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/mentors"
                  className="inline-flex items-center justify-center gap-2 px-8 py-[14px]
                    bg-white hover:bg-violet-50/60 text-slate-600 hover:text-violet-700 font-semibold rounded-2xl text-base
                    border border-slate-200 hover:border-violet-200
                    shadow-sm transition-all duration-200 active:scale-95"
                >
                  先輩に相談する
                </Link>
              </div>

              <p className="text-xs text-slate-400 mt-4 tracking-wide">完全無料・登録不要ですぐに始められます</p>
            </div>

            {/* ── 右：プレビューカード（lg以上） ── */}
            <div className="hidden lg:flex items-center justify-center shrink-0 relative w-[300px] xl:w-[320px]">
              {/* 背景グロー */}
              <div className="absolute -inset-10 bg-gradient-to-br from-violet-100/50 to-sky-100/30 rounded-full blur-2xl" />

              {/* メインカード */}
              <div className="relative bg-white/95 backdrop-blur-md rounded-3xl border border-violet-100/80 shadow-2xl shadow-violet-200/40 p-6 w-full animate-float">

                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-slate-400 tracking-[0.15em] uppercase">Match Result</span>
                  <span className="text-[10px] bg-green-50 text-green-600 border border-green-200/80 px-2.5 py-0.5 rounded-full font-semibold">相性スコア</span>
                </div>

                <div className="flex items-end gap-1.5 mb-4">
                  <span className="text-5xl font-black bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent leading-none">87</span>
                  <span className="text-slate-400 text-sm mb-1.5">点</span>
                  <div className="ml-auto w-10 h-10 rounded-full bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100 flex items-center justify-center text-xl">
                    🎓
                  </div>
                </div>

                <div className="mb-3 pb-3 border-b border-slate-100">
                  <p className="font-bold text-slate-800 text-sm leading-snug">○○大学 △△学部</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">国立大学・九州地区</p>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3.5">
                  {previewTags.map((tag) => (
                    <span key={tag} className="text-[10px] bg-violet-50 text-violet-600 border border-violet-100 px-2.5 py-0.5 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-1.5">
                  {previewReasons.map((r, i) => (
                    <p key={i} className="text-[11px] text-slate-500 flex items-start gap-1.5">
                      <span className="text-violet-400 shrink-0 mt-0.5 font-bold">✓</span>
                      {r}
                    </p>
                  ))}
                </div>
              </div>

              {/* フローティングバッジ：あなたのタイプ */}
              <div className="absolute -top-3 -right-4 bg-white rounded-2xl border border-violet-100 shadow-lg px-3.5 py-2.5">
                <p className="text-[9px] text-slate-400 font-medium mb-0.5">あなたのタイプ</p>
                <p className="text-xs font-bold text-violet-700">🌍 グローバル志向型</p>
              </div>

              {/* フローティングバッジ：準備度 */}
              <div className="absolute -bottom-3 -left-4 bg-white rounded-2xl border border-emerald-100 shadow-lg px-3.5 py-2.5">
                <p className="text-[9px] text-slate-400 font-medium mb-0.5">準備度</p>
                <p className="text-xs font-bold text-emerald-600">◎ 高い</p>
              </div>
            </div>

          </div>
        </div>

        {/* スクロールヒント */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-300">
          <span className="text-[10px] tracking-widest uppercase">scroll</span>
          <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ===== ステップ説明 ===== */}
      <section className="py-24 px-6 bg-slate-50/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold text-violet-500 tracking-[0.25em] uppercase mb-3">HOW IT WORKS</p>
            <h2 className="font-display font-bold text-[1.65rem] text-slate-800">使い方はたった4ステップ</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-white border border-slate-100 rounded-2xl p-6 text-center
                  shadow-sm hover:shadow-md hover:border-violet-200/70 transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-2xl bg-violet-50 border border-violet-100/80 flex items-center justify-center text-xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  {step.icon}
                </div>
                <div className="text-[10px] font-bold text-violet-400 mb-2 tracking-[0.15em] group-hover:text-violet-500 transition-colors">
                  STEP {step.num}
                </div>
                <h3 className="font-bold text-slate-800 text-[13px] mb-2 leading-snug">{step.title}</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 主要機能 ===== */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] font-bold text-violet-500 tracking-[0.25em] uppercase mb-3">FEATURES</p>
            <h2 className="font-display font-bold text-[1.65rem] text-slate-800">主な機能</h2>
          </div>
          <div className="flex flex-col gap-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white border border-slate-100 rounded-2xl p-5 flex items-start gap-4
                  shadow-sm hover:shadow-md hover:border-violet-200/60 transition-all duration-200"
              >
                <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center text-xl shrink-0 ${f.iconBg}`}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1 text-[15px]">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 注意書き ===== */}
      <section className="py-8 px-6 bg-slate-50/60">
        <div className="max-w-2xl mx-auto bg-amber-50/80 border border-amber-200/50 rounded-2xl p-5">
          <p className="font-semibold mb-2 text-amber-700 text-sm">⚠️ ご利用にあたってのご注意</p>
          <ul className="list-disc list-inside space-y-1 text-xs leading-relaxed text-amber-700/70">
            <li>診断結果・合格可能性の目安は参考情報であり、合格を保証するものではありません</li>
            <li>最終的な進路決定は、学校の先生・保護者の方とご相談のうえ行ってください</li>
            <li>大学の入試情報は変更になる場合があります。必ず各大学の公式サイトをご確認ください</li>
          </ul>
        </div>
      </section>

      {/* ===== ボトムCTA ===== */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-violet-50/30 to-indigo-50/20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-violet-100/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-md mx-auto text-center">
          <div className="bg-white/80 backdrop-blur-sm border border-violet-100/70 rounded-3xl p-10 shadow-lg shadow-violet-100/30">
            <p className="text-[10px] font-bold text-violet-500 tracking-[0.25em] uppercase mb-4">START NOW</p>
            <h2 className="font-display font-bold text-[1.7rem] text-slate-800 mb-3 leading-snug">
              まずは診断してみよう
            </h2>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              15問・約3分。登録不要で<br />今すぐ始められます。
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center gap-2 px-10 py-4
                bg-gradient-to-r from-violet-600 to-indigo-500
                hover:from-violet-500 hover:to-indigo-400
                text-white font-bold rounded-2xl text-base
                shadow-md shadow-violet-300/40 hover:shadow-lg hover:shadow-violet-300/50
                transition-all duration-200 active:scale-95 w-full sm:w-auto"
            >
              無料で診断を始める
              <svg className="w-4 h-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer variant="light" />
    </div>
  );
}
