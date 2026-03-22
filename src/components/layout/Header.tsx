"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const COMPARE_KEY = "sougo_navi_compare_ids";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [compareCount, setCompareCount] = useState(0);

  useEffect(() => {
    const read = () => {
      const raw = localStorage.getItem(COMPARE_KEY);
      setCompareCount(raw ? JSON.parse(raw).length : 0);
    };
    read();
    window.addEventListener("compare-updated", read);
    return () => window.removeEventListener("compare-updated", read);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* ロゴ */}
        <Link href="/" className="font-display font-black text-lg tracking-tight gradient-text">
          総合型選抜ナビ
        </Link>

        {/* デスクトップナビ */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white/60">
          <Link href="/quiz" className="hover:text-white transition-colors">
            診断する
          </Link>
          <Link href="/mentors" className="hover:text-white transition-colors">
            先輩に相談
          </Link>
          <Link href="/compare" className="hover:text-white transition-colors flex items-center gap-1.5">
            比較する
            {compareCount > 0 && (
              <span className="bg-indigo-500 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                {compareCount}
              </span>
            )}
          </Link>
          <Link href="/mypage" className="hover:text-white transition-colors">
            マイページ
          </Link>
          <Link href="/quiz" className="btn-primary text-sm py-2 px-5">
            無料で診断
          </Link>
        </nav>

        {/* モバイルメニューボタン */}
        <button
          className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
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
        <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10 px-4 py-4 flex flex-col gap-1">
          {[
            { href: "/quiz",    label: "診断する" },
            { href: "/mentors", label: "先輩に相談" },
            { href: "/mypage",  label: "マイページ" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="py-3 px-3 text-white/70 font-medium hover:text-white hover:bg-white/5 rounded-xl transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/compare"
            className="py-3 px-3 text-white/70 font-medium hover:text-white hover:bg-white/5 rounded-xl transition-colors flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            比較する
            {compareCount > 0 && (
              <span className="bg-indigo-500 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                {compareCount}
              </span>
            )}
          </Link>
          <div className="pt-2">
            <Link href="/quiz" className="btn-primary w-full justify-center py-3" onClick={() => setMenuOpen(false)}>
              無料で診断する
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
