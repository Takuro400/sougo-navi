import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "総合型選抜ナビ | 自分に合う大学を見つけよう",
  description:
    "総合型選抜を受ける高校生のための進路発見・大学研究・合格戦略支援サービス。質問に答えるだけで自分に合う大学が分かります。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@400;500;700;900&family=Zen+Kaku+Gothic+New:wght@700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-slate-950 text-white min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
