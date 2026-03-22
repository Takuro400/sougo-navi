import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// ===========================
// トップページ
// ===========================
export default function TopPage() {
  const steps = [
    {
      num: "01",
      title: "10問の診断に答える",
      desc: "興味・価値観・学び方など10問に答えるだけ。約3分で完了します。",
      icon: "✏️",
    },
    {
      num: "02",
      title: "相性の良い大学が分かる",
      desc: "回答をもとに、あなたに合う大学・学部候補とおすすめ理由を表示します。",
      icon: "🎯",
    },
    {
      num: "03",
      title: "大学情報を効率よく収集",
      desc: "各大学の特色・総合型選抜との相性・外部サイトへのリンクも確認できます。",
      icon: "📚",
    },
    {
      num: "04",
      title: "実際の先輩に相談する",
      desc: "在籍している先輩大学生に、総合型選抜の体験や学生生活を直接聞けます。",
      icon: "💬",
    },
  ];

  const features = [
    {
      title: "質問診断機能",
      desc: "10問の質問で興味・価値観を分析し、おすすめ大学をスコア付きで提示。なぜおすすめかも明確に分かります。",
      icon: "🔍",
      color: "bg-blue-50 border-blue-100",
    },
    {
      title: "合格可能性の目安",
      desc: "現在の準備度・出願に必要な行動を参考情報として表示。断定せず、あくまでサポートとして提供します。",
      icon: "📊",
      color: "bg-green-50 border-green-100",
    },
    {
      title: "先輩大学生への相談",
      desc: "各大学に在籍する先輩メンターに相談申込ができます。総合型選抜の経験談を直接聞きましょう。",
      icon: "👥",
      color: "bg-orange-50 border-orange-100",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* ヒーローセクション */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-800 text-white pt-16 pb-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-5 tracking-wide">
            総合型選抜を受ける高校生へ
          </span>
          <h1 className="font-display font-black text-3xl md:text-4xl leading-tight mb-4">
            質問に答えるだけで<br />
            自分に合う大学が<br />
            <span className="text-yellow-300">見つかる</span>
          </h1>
          <p className="text-base text-white/80 mb-8 leading-relaxed">
            興味・価値観・学びたいことを10問で診断。<br />
            相性の良い大学候補とおすすめ理由を、すぐに表示します。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/quiz" className="btn-primary bg-white text-primary-700 hover:bg-yellow-50 shadow-xl text-base py-3.5 px-8">
              無料で診断する（約3分）
            </Link>
            <Link href="/mentors" className="btn-secondary border-white/40 text-white hover:bg-white/10 text-base py-3.5 px-6">
              先輩に相談する
            </Link>
          </div>
          <p className="text-xs text-white/60 mt-4">登録不要・無料でご利用いただけます</p>
        </div>
      </section>

      {/* ステップ説明 */}
      <section className="py-14 px-4 max-w-5xl mx-auto">
        <h2 className="text-center font-display font-black text-2xl text-gray-900 mb-8">
          使い方はたった4ステップ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div key={step.num} className="card text-center py-6">
              <div className="text-3xl mb-2">{step.icon}</div>
              <div className="text-xs font-black text-primary-400 mb-1 tracking-widest">STEP {step.num}</div>
              <h3 className="font-bold text-gray-900 text-base mb-2">{step.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 主要機能 */}
      <section className="py-12 px-4 bg-surface-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center font-display font-black text-2xl text-gray-900 mb-8">
            主な機能
          </h2>
          <div className="flex flex-col gap-4">
            {features.map((f) => (
              <div key={f.title} className={`card flex items-start gap-4 border ${f.color}`}>
                <div className="text-2xl shrink-0">{f.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 注意書き */}
      <section className="py-10 px-4">
        <div className="max-w-2xl mx-auto bg-yellow-50 border border-yellow-200 rounded-2xl p-5 text-sm text-yellow-800">
          <p className="font-bold mb-2">⚠️ ご利用にあたってのご注意</p>
          <ul className="list-disc list-inside space-y-1 text-xs leading-relaxed">
            <li>診断結果・合格可能性の目安は参考情報であり、合格を保証するものではありません</li>
            <li>最終的な進路決定は、学校の先生・保護者の方とご相談のうえ行ってください</li>
            <li>大学の入試情報は変更になる場合があります。必ず各大学の公式サイトをご確認ください</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 text-center bg-primary-600 text-white">
        <h2 className="font-display font-black text-2xl mb-3">
          まずは診断してみよう
        </h2>
        <p className="text-white/80 text-sm mb-6">10問・約3分。登録不要で今すぐ始められます。</p>
        <Link href="/quiz" className="btn-primary bg-white text-primary-700 hover:bg-yellow-50 shadow-xl text-base py-3.5 px-8">
          無料で診断を始める
        </Link>
      </section>

      <Footer />
    </div>
  );
}
