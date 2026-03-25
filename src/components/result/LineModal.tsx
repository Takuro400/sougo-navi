"use client";

import { useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userTypeLabel: string;
}

const LINE_URL = "https://lin.ee/uJbAQ8f";

export default function LineModal({ isOpen, onClose, userTypeLabel }: Props) {
  // モーダル表示中はボディスクロールを禁止
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // ESCキーで閉じる
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    /* 背景オーバーレイ */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50"
      onClick={onClose}
    >
      {/* モーダル本体（クリック伝播を止める） */}
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* タイトル */}
        <h2 className="font-mincho font-bold text-[1.15rem] text-slate-800 leading-snug mb-4">
          📩 無料で合格戦略を受け取る
        </h2>

        {/* ユーザータイプ表示 */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2.5 mb-4">
          <p className="text-[13px] font-bold text-indigo-700 leading-snug">
            あなたは<span className="text-indigo-500">「{userTypeLabel}」</span>です
          </p>
        </div>

        {/* 説明文 */}
        <p className="text-[13px] text-slate-600 leading-relaxed mb-5">
          LINEに登録するだけで、あなたの診断結果に合わせた総合型選抜の戦略を無料でお届けします。おすすめ大学TOP3の詳細情報・出願スケジュール・準備リストをプレゼント！
        </p>

        {/* LINEボタン */}
        <a
          href={LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-white text-[15px] active:opacity-80 transition-opacity duration-150 mb-3"
          style={{ backgroundColor: "#06C755" }}
        >
          📲 LINEで無料で受け取る
        </a>

        {/* 免責小文字 */}
        <p className="text-[11px] text-slate-400 text-center leading-relaxed mb-4">
          ※登録は無料です。不要になったらいつでもブロックできます。
        </p>

        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="w-full py-3 text-[13px] font-medium text-slate-500 border border-slate-200 rounded-xl active:opacity-70 transition-opacity duration-150"
        >
          閉じる
        </button>
      </div>
    </div>
  );
}
