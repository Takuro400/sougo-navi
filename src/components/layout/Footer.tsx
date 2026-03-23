import Link from "next/link";

interface FooterProps {
  variant?: "dark" | "light";
}

export default function Footer({ variant = "dark" }: FooterProps) {
  const isLight = variant === "light";

  return (
    <footer className={`border-t py-12 mt-0 ${
      isLight
        ? "bg-slate-50/70 border-slate-100"
        : "bg-slate-950 border-white/10"
    }`}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between gap-8 mb-10">
          <div>
            <p className={`font-display font-black text-xl mb-1 ${
              isLight
                ? "bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent"
            }`}>
              総合型選抜ナビ
            </p>
            <p className={`text-sm ${isLight ? "text-slate-400" : "text-white/40"}`}>
              自分に合う大学を見つける診断サービス
            </p>
          </div>
          <nav className={`flex flex-col gap-2 text-sm ${isLight ? "text-slate-400" : "text-white/50"}`}>
            <Link href="/quiz"    className={isLight ? "hover:text-violet-700 transition-colors" : "hover:text-white transition-colors"}>診断する</Link>
            <Link href="/mentors" className={isLight ? "hover:text-violet-700 transition-colors" : "hover:text-white transition-colors"}>先輩に相談</Link>
            <Link href="/compare" className={isLight ? "hover:text-violet-700 transition-colors" : "hover:text-white transition-colors"}>大学を比較</Link>
            <Link href="/mypage"  className={isLight ? "hover:text-violet-700 transition-colors" : "hover:text-white transition-colors"}>マイページ</Link>
          </nav>
        </div>
        <div className={`border-t pt-6 text-xs text-center space-y-1 ${
          isLight ? "border-slate-100 text-slate-300" : "border-white/10 text-white/25"
        }`}>
          <p>本サービスの診断結果・合格可能性表示は参考情報であり、合格を保証するものではありません。</p>
          <p>© 2024 総合型選抜ナビ（MVP版）</p>
        </div>
      </div>
    </footer>
  );
}
