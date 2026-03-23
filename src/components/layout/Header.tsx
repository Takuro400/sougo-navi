"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const COMPARE_KEY = "sougo_navi_compare_ids";

interface HeaderProps {
  variant?: "dark" | "light";
}

export default function Header({ variant = "dark" }: HeaderProps) {
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

  const isLight = variant === "light";

  const headerBg   = isLight ? "bg-white/80 border-b border-violet-100/70"  : "bg-slate-950/80 border-b border-white/10";
  const logoClass  = isLight ? "font-display font-black text-lg tracking-tight bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent"
                             : "font-display font-black text-lg tracking-tight gradient-text";
  const navLink    = isLight ? "hover:text-violet-700 transition-colors text-slate-500"
                             : "hover:text-white transition-colors text-white/60";
  const menuBtn    = isLight ? "p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-violet-50 transition-colors"
                             : "p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors";
  const ctaClass   = isLight
    ? "inline-flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-500 hover:to-indigo-400 text-white font-bold rounded-xl shadow-sm shadow-violet-200 text-sm transition-all duration-200 active:scale-95"
    : "btn-primary text-sm py-2 px-5";
  const mobileBg   = isLight ? "bg-white/95 border-t border-violet-100 backdrop-blur-xl"
                             : "bg-slate-900/95 backdrop-blur-xl border-t border-white/10";
  const mobileLink = isLight ? "py-3 px-3 text-slate-600 font-medium hover:text-violet-700 hover:bg-violet-50 rounded-xl transition-colors"
                             : "py-3 px-3 text-white/70 font-medium hover:text-white hover:bg-white/5 rounded-xl transition-colors";

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl ${headerBg}`}>
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* ロゴ */}
        <Link href="/" className={logoClass}>
          総合型選抜ナビ
        </Link>

        {/* デスクトップナビ */}
        <nav className={`hidden md:flex items-center gap-6 text-sm font-medium ${isLight ? "text-slate-500" : "text-white/60"}`}>
          <Link href="/quiz"    className={navLink}>診断する</Link>
          <Link href="/mentors" className={navLink}>先輩に相談</Link>
          <Link href="/compare" className={`${navLink} flex items-center gap-1.5`}>
            比較する
            {compareCount > 0 && (
              <span className="bg-indigo-500 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                {compareCount}
              </span>
            )}
          </Link>
          <Link href="/mypage" className={navLink}>マイページ</Link>
          <Link href="/quiz" className={ctaClass}>無料で診断</Link>
        </nav>

        {/* モバイルメニューボタン */}
        <button
          className={`md:hidden ${menuBtn}`}
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
        <div className={`md:hidden px-4 py-4 flex flex-col gap-1 ${mobileBg}`}>
          {[
            { href: "/quiz",    label: "診断する" },
            { href: "/mentors", label: "先輩に相談" },
            { href: "/mypage",  label: "マイページ" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className={mobileLink} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <Link href="/compare" className={`${mobileLink} flex items-center gap-2`} onClick={() => setMenuOpen(false)}>
            比較する
            {compareCount > 0 && (
              <span className="bg-indigo-500 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                {compareCount}
              </span>
            )}
          </Link>
          <div className="pt-2">
            <Link href="/quiz" className={`${ctaClass} w-full justify-center py-3`} onClick={() => setMenuOpen(false)}>
              無料で診断する
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
