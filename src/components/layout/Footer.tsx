import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 py-10 mt-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          <div>
            <p className="font-display font-black text-white text-lg mb-1">総合型選抜ナビ</p>
            <p className="text-sm">自分に合う大学を見つける診断サービス</p>
          </div>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/quiz" className="hover:text-white transition-colors">診断する</Link>
            <Link href="/mentors" className="hover:text-white transition-colors">先輩に相談</Link>
            <Link href="/mypage" className="hover:text-white transition-colors">マイページ</Link>
          </nav>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-xs text-center space-y-1">
          <p>本サービスの診断結果・合格可能性表示は参考情報であり、合格を保証するものではありません。</p>
          <p>© 2024 総合型選抜ナビ（MVP版）</p>
        </div>
      </div>
    </footer>
  );
}
