import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function TopPage() {
  const steps = [
    { num: "01", title: "15問の診断に答える",        desc: "興味・価値観・学び方など15問に答えるだけ。約3分で完了します。",                       icon: "✏️" },
    { num: "02", title: "相性の良い大学が分かる",     desc: "回答をもとに、あなたに合う大学・学部候補とおすすめ理由を表示します。",              icon: "🎯" },
    { num: "03", title: "大学情報を効率よく収集",     desc: "各大学の特色・総合型選抜との相性・外部サイトへのリンクも確認できます。",           icon: "📚" },
    { num: "04", title: "実際の先輩に相談する",       desc: "在籍している先輩大学生に、総合型選抜の体験や学生生活を直接聞けます。",               icon: "💬" },
  ];

  const features = [
    {
      title: "質問診断機能",
      desc: "15問の質問で興味・価値観を分析し、おすすめ大学をスコア付きで提示。なぜおすすめかも明確に分かります。",
      icon: "🔍",
      accent: "from-indigo-500/20 to-violet-500/20 border-indigo-500/20",
    },
    {
      title: "合格可能性の目安",
      desc: "現在の準備度・出願に必要な行動を参考情報として表示。断定せず、あくまでサポートとして提供します。",
      icon: "📊",
      accent: "from-emerald-500/20 to-teal-500/20 border-emerald-500/20",
    },
    {
      title: "先輩大学生への相談",
      desc: "各大学に在籍する先輩メンターに相談申込ができます。総合型選抜の経験談を直接聞きましょう。",
      icon: "👥",
      accent: "from-amber-500/20 to-orange-500/20 border-amber-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      {/* ヒーローセクション */}
      <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden pt-14">
        {/* グラデーションオーブ */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-2xl mx-auto px-4 text-center py-20">
          {/* バッジ */}
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/15 text-white/70 text-xs font-bold px-4 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            総合型選抜を受ける高校生へ
          </div>

          {/* ヘッドライン */}
          <h1 className="font-display font-black text-5xl md:text-6xl leading-[1.1] mb-6 text-white">
            質問に答えるだけで<br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              自分に合う大学
            </span>が<br />
            見つかる
          </h1>

          <p className="text-base text-white/50 mb-10 leading-relaxed">
            興味・価値観・学びたいことを15問で診断。<br />
            相性の良い大学候補とおすすめ理由を、今すぐ表示します。
          </p>

          {/* 統計 */}
          <div className="flex items-center justify-center gap-8 mb-10">
            {[
              { value: "15問", label: "質問数" },
              { value: "約3分", label: "所要時間" },
              { value: "無料", label: "登録不要" },
            ].map(({ value, label }, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-black bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">{value}</div>
                <div className="text-xs text-white/30 mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* CTAボタン */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/quiz" className="btn-primary text-base py-4 px-10 shadow-glow-indigo">
              🎯 無料で診断する（約3分）
            </Link>
            <Link href="/mentors" className="btn-secondary text-base py-4 px-8">
              先輩に相談する →
            </Link>
          </div>
          <p className="text-xs text-white/25 mt-4">完全無料・登録不要ですぐに始められます</p>
        </div>

        {/* スクロールヒント */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/20">
          <span className="text-xs tracking-widest uppercase">scroll</span>
          <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ステップ説明 */}
      <section className="py-24 px-4 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-indigo-400 tracking-widest uppercase mb-3">HOW IT WORKS</p>
            <h2 className="font-display font-black text-3xl text-white">使い方はたった4ステップ</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((step) => (
              <div key={step.num} className="card text-center py-7 hover:border-indigo-500/30 hover:shadow-indigo-500/10 transition-all duration-300 group">
                <div className="text-4xl mb-3">{step.icon}</div>
                <div className="text-xs font-black text-indigo-400/80 mb-2 tracking-widest group-hover:text-indigo-400 transition-colors">
                  STEP {step.num}
                </div>
                <h3 className="font-bold text-white text-base mb-2">{step.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 主要機能 */}
      <section className="py-24 px-4 bg-slate-950">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-indigo-400 tracking-widest uppercase mb-3">FEATURES</p>
            <h2 className="font-display font-black text-3xl text-white">主な機能</h2>
          </div>
          <div className="flex flex-col gap-4">
            {features.map((f) => (
              <div key={f.title} className={`card flex items-start gap-4 bg-gradient-to-r ${f.accent} hover:border-white/20 transition-all`}>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">{f.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 注意書き */}
      <section className="py-10 px-4 bg-slate-900/50">
        <div className="max-w-2xl mx-auto bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 text-sm text-amber-200/70">
          <p className="font-bold mb-2 text-amber-300/90">⚠️ ご利用にあたってのご注意</p>
          <ul className="list-disc list-inside space-y-1 text-xs leading-relaxed">
            <li>診断結果・合格可能性の目安は参考情報であり、合格を保証するものではありません</li>
            <li>最終的な進路決定は、学校の先生・保護者の方とご相談のうえ行ってください</li>
            <li>大学の入試情報は変更になる場合があります。必ず各大学の公式サイトをご確認ください</li>
          </ul>
        </div>
      </section>

      {/* ボトムCTA */}
      <section className="relative py-28 px-4 text-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-transparent to-violet-900/30 pointer-events-none" />
        <div className="relative">
          <p className="text-xs font-bold text-indigo-400 tracking-widest uppercase mb-4">START NOW</p>
          <h2 className="font-display font-black text-3xl text-white mb-3">
            まずは診断してみよう
          </h2>
          <p className="text-white/50 text-sm mb-8">15問・約3分。登録不要で今すぐ始められます。</p>
          <Link href="/quiz" className="btn-primary text-base py-4 px-12 shadow-glow-indigo">
            🎯 無料で診断を始める
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
