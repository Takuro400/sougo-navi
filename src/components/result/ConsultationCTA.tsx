"use client";

import Link from "next/link";
import { UserType } from "@/types";

interface Props {
  userType: UserType;
}

// タイプ別のパーソナライズされた訴求文
const TYPE_COPY: Record<UserType, { hook: string; sub: string; cta1: string; cta2: string }> = {
  global: {
    hook: "国際系の総合型選抜、\n志望理由書の「核」はできていますか？",
    sub: "英語力・留学経験がある一方で、「なぜこの大学でなければいけないか」の言語化で差がつきます。あなたの経験を選考に勝てる志望理由書に変えましょう。",
    cta1: "あなた専用の志望理由書戦略を受け取る",
    cta2: "合格者レベルまで志望理由を深める",
  },
  stem: {
    hook: "理工系・情報系の総合型選抜、\n探究活動をどう伝えますか？",
    sub: "研究への熱意がある一方で、それを「言葉で伝える力」に差が出ます。論理的に考える力を、選考で伝わる表現に変える準備を一緒にしましょう。",
    cta1: "探究活動を選考に活かす戦略を知る",
    cta2: "あなたの研究テーマを志望理由書に落とし込む",
  },
  community: {
    hook: "地域・社会貢献系の総合型選抜、\n活動実績をどう整理しますか？",
    sub: "豊富な経験がある一方で、「どれを・どう伝えるか」の選択と構成で合否が変わります。あなたの経験を、選考官に伝わるストーリーに変えましょう。",
    cta1: "あなたの活動実績を志望理由書に変える",
    cta2: "地域・社会系の合格者事例をもとに戦略を立てる",
  },
  business: {
    hook: "ビジネス・起業系の総合型選抜、\nアイデアを「伝わる言葉」にできますか？",
    sub: "行動力・アイデアがある一方で、「なぜ今の自分がやるのか」という説得力の構築が鍵です。あなたのビジョンを、審査員を動かす志望理由書に変えましょう。",
    cta1: "ビジネスアイデアを志望理由書に変える",
    cta2: "プレゼン・面接で熱量を伝える準備をする",
  },
  culture: {
    hook: "文化・人文系の総合型選抜、\n「なぜこの学問か」を語れますか？",
    sub: "深い関心と感受性がある一方で、それを「論理的な志望理由」に変える作業が最大の課題です。あなたの独自の視点を、選考で光る言葉に変えましょう。",
    cta1: "あなたの関心を志望理由書の核にする",
    cta2: "独自の視点を面接で伝える準備をする",
  },
};

export default function ConsultationCTA({ userType }: Props) {
  const copy = TYPE_COPY[userType];

  return (
    <div className="mb-6">
      {/* メインCTAカード */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-6 shadow-lg shadow-indigo-200/60 overflow-hidden relative">
        {/* 装飾 */}
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/5 rounded-full pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-white/5 rounded-full pointer-events-none" />

        {/* バッジ */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
            あなたの診断結果をもとに
          </span>
        </div>

        {/* フック */}
        <h3 className="font-mincho font-bold text-white text-lg leading-snug mb-3 whitespace-pre-line">
          {copy.hook}
        </h3>

        {/* サブコピー */}
        <p className="text-sm text-white/80 leading-relaxed mb-5">
          {copy.sub}
        </p>

        {/* CTAボタン */}
        <Link
          href="/mentors"
          className="block w-full text-center py-3.5 rounded-xl font-bold text-sm
            bg-white text-indigo-600 shadow-md active:opacity-80 transition-opacity duration-150 mb-2.5"
        >
          {copy.cta1} →
        </Link>
        <Link
          href="/mentors"
          className="block w-full text-center py-3 rounded-xl font-bold text-sm
            bg-white/15 text-white border border-white/30 active:opacity-70 transition-opacity duration-150"
        >
          {copy.cta2}
        </Link>
      </div>

      {/* セカンダリ：先輩相談 */}
      <div className="mt-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center shrink-0 text-lg">
            🎓
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-slate-800 mb-0.5">
              同じタイプの合格者に直接相談する
            </p>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              あなたと同じような経歴・志向で合格した先輩が、志望理由書・面接の準備を一緒に考えてくれます。
            </p>
            <Link
              href="/mentors"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-violet-600 active:opacity-70 transition-opacity duration-150"
            >
              先輩に相談してみる
              <span className="text-xs">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 補足 */}
      <p className="text-xs text-slate-400 text-center mt-3 leading-relaxed">
        押し売りは一切しません。まずは「今の自分の状況」を話してみるところから始められます。
      </p>
    </div>
  );
}
