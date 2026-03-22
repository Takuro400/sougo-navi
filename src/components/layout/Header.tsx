"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-surface-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* ロゴ */}
        <Link href="/" className="font-display font-black text-primary-600 text-lg tracking-tight">
          総合型選抜ナビ
        </Link>

        {/* デスクトップナビ */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/quiz" className="hover:text-primary-600 transition-colors">
            診断する
          </Link>
          <Link href="/mentors" className="hover:text-primary-600 transition-colors">
            先輩に相談
          </Link>
          <Link href="/mypage" className="hover:text-primary-600 transition-colors">
            マイページ
          </Link>
          <Link href="/quiz" className="btn-primary text-sm py-2 px-4">
            無料で診断
          </Link>
        </nav>

        {/* モバイルメニューボタン */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-surface-100"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* モバイルメニュー */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-surface-200 px-4 py-3 flex flex-col gap-3">
          <Link href="/quiz" className="py-2 text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>
            診断する
          </Link>
          <Link href="/mentors" className="py-2 text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>
            先輩に相談
          </Link>
          <Link href="/mypage" className="py-2 text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>
            マイページ
          </Link>
          <Link href="/quiz" className="btn-primary text-sm py-2.5" onClick={() => setMenuOpen(false)}>
            無料で診断する
          </Link>
        </div>
      )}
    </header>
  );
}
