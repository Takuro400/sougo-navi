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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-violet-50/40 to-sky-50/30">
      <Header variant="light" />

      {/* ===== ヒーローセクション ===== */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-14">
        {/* やわらかい背景オーブ */}
        <div className="absolute -top-40 -left-40 w-[560px] h-[560px] bg-violet-200/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[560px] h-[560px] bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-2xl mx-auto px-6 text-center py-24">

          {/* バッジ */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-violet-200/70 text-violet-600 text-xs font-semibold px-4 py-2 rounded-full mb-8 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            総合型選抜を受ける高校生へ
          </div>

          {/* ヘッドライン */}
          <h1 className="font-display font-bold text-4xl md:text-[2.75rem] leading-[1.25] mb-5 text-slate-800 tracking-tight">
            質問に答えるだけで<br />
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
              自分に合う大学
            </span>
            が見つかる
          </h1>

          {/* サブコピー */}
          <p className="text-[15px] text-slate-500 mb-10 leading-relaxed">
            興味・価値観・学びたいことを15問で診断。<br className="hidden sm:block" />
            相性の良い大学候補とおすすめ理由を、今すぐ表示します。
          </p>

          {/* 統計カード */}
          <div className="flex items-center justify-center gap-3 mb-10">
            {[
              { value: "15問",  label: "質問数" },
              { value: "約3分", label: "所要時間" },
              { value: "無料",  label: "登録不要" },
            ].map(({ value, label }, i) => (
              <div
                key={i}
                className="bg-white/75 backdrop-blur-sm border border-violet-100 rounded-2xl px-4 py-3 shadow-sm text-center min-w-[72px]"
              >
                <div className="text-lg font-black text-violet-700 leading-none">{value}</div>
                <div className="text-[11px] text-slate-400 mt-1 tracking-wide">{label}</div>
              </div>
            ))}
          </div>

          {/* CTAボタン */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center gap-2 px-8 py-4
                bg-gradient-to-r from-violet-600 to-indigo-500
                hover:from-violet-500 hover:to-indigo-400
                text-white font-bold rounded-2xl
                shadow-md shadow-violet-300/40 hover:shadow-violet-400/50
                transition-all duration-200 active:scale-95 text-base"
            >
              無料で診断する
              <svg className="w-4 h-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/mentors"
              className="inline-flex items-center justify-center gap-2 px-8 py-4
                bg-white/90 hover:bg-white text-slate-600 hover:text-slate-800 font-semibold rounded-2xl
                border border-slate-200 hover:border-violet-200
                shadow-sm transition-all duration-200 active:scale-95 text-base"
            >
              先輩に相談する
            </Link>
          </div>

          <p className="text-xs text-slate-400 mt-4 tracking-wide">完全無料・登録不要ですぐに始められます</p>
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
      <section className="py-24 px-6 bg-white/55 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold text-violet-500 tracking-[0.2em] uppercase mb-3">HOW IT WORKS</p>
            <h2 className="font-display font-bold text-2xl text-slate-800">使い方はたった4ステップ</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-white/80 backdrop-blur-sm border border-violet-100/70 rounded-2xl p-6 text-center
                  shadow-sm hover:shadow-md hover:border-violet-200 transition-all duration-300 group"
              >
                <div className="text-3xl mb-3">{step.icon}</div>
                <div className="text-[10px] font-bold text-violet-500/70 mb-2 tracking-[0.15em] group-hover:text-violet-600 transition-colors">
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
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold text-violet-500 tracking-[0.2em] uppercase mb-3">FEATURES</p>
            <h2 className="font-display font-bold text-2xl text-slate-800">主な機能</h2>
          </div>
          <div className="flex flex-col gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white/80 backdrop-blur-sm border border-violet-100/60 rounded-2xl p-5
                  flex items-start gap-4 shadow-sm hover:shadow-md hover:border-violet-200/80 transition-all duration-200"
              >
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-2xl shrink-0 ${f.iconBg}`}>
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
      <section className="py-10 px-6 bg-white/40">
        <div className="max-w-2xl mx-auto bg-amber-50/80 border border-amber-200/60 rounded-2xl p-5">
          <p className="font-bold mb-2 text-amber-700 text-sm">⚠️ ご利用にあたってのご注意</p>
          <ul className="list-disc list-inside space-y-1 text-xs leading-relaxed text-amber-700/70">
            <li>診断結果・合格可能性の目安は参考情報であり、合格を保証するものではありません</li>
            <li>最終的な進路決定は、学校の先生・保護者の方とご相談のうえ行ってください</li>
            <li>大学の入試情報は変更になる場合があります。必ず各大学の公式サイトをご確認ください</li>
          </ul>
        </div>
      </section>

      {/* ===== ボトムCTA ===== */}
      <section className="relative py-28 px-6 text-center overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/70 via-transparent to-sky-50/50 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-violet-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          <p className="text-[11px] font-bold text-violet-500 tracking-[0.2em] uppercase mb-4">START NOW</p>
          <h2 className="font-display font-bold text-2xl text-slate-800 mb-3">
            まずは診断してみよう
          </h2>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            15問・約3分。登録不要で今すぐ始められます。
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center gap-2 px-10 py-4
              bg-gradient-to-r from-violet-600 to-indigo-500
              hover:from-violet-500 hover:to-indigo-400
              text-white font-bold rounded-2xl
              shadow-md shadow-violet-300/40 hover:shadow-violet-400/50
              transition-all duration-200 active:scale-95 text-base"
          >
            無料で診断を始める
            <svg className="w-4 h-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
