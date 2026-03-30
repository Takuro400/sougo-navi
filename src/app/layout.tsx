import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sougo-navi.vercel.app";
const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: {
    default: "STORY 総合型対策 | AIが志望校を診断する無料サービス",
    template: "%s | STORY 総合型対策",
  },
  description:
    "15の質問に答えるだけで、AIがあなたにぴったりの大学・学部を提案。総合型選抜（AO入試）を受ける高校生のための無料診断サービス。登録不要・3分で完了。",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "STORY 総合型対策",
    title: "STORY 総合型対策 | AIが志望校を診断する無料サービス",
    description:
      "15の質問に答えるだけで、AIがあなたにぴったりの大学・学部を提案。総合型選抜（AO入試）対策の無料診断。登録不要・3分で完了。",
  },
  twitter: {
    card: "summary_large_image",
    title: "STORY 総合型対策 | AIが志望校を診断する無料サービス",
    description:
      "15の質問に答えるだけで、AIがあなたにぴったりの大学・学部を提案。総合型選抜（AO入試）対策の無料診断。",
  },
  robots: {
    index: true,
    follow: true,
  },
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
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
