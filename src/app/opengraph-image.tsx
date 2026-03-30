import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "STORY 総合型選抜塾 | あなただけの合格戦略を用意します";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #e8f4fd 0%, #cde8f7 40%, #a8d4f0 100%)",
          padding: "0",
          position: "relative",
          overflow: "hidden",
          fontFamily: "serif",
        }}
      >
        {/* 背景の光沢カード */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 60,
            width: 780,
            height: 480,
            background: "rgba(255,255,255,0.55)",
            borderRadius: 24,
            boxShadow: "0 4px 40px rgba(100,160,220,0.18)",
          }}
        />

        {/* 上部：ラベル + タイトル */}
        <div
          style={{
            position: "absolute",
            top: 52,
            left: 90,
            display: "flex",
            alignItems: "center",
            gap: 28,
          }}
        >
          <span style={{ fontSize: 28, color: "#1a1a2e", fontWeight: 700 }}>
            総合型選抜
          </span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 38,
                color: "#e02020",
                fontWeight: 900,
                borderBottom: "3px solid #e02020",
                paddingBottom: 2,
                letterSpacing: 2,
              }}
            >
              STORY 総合型選抜塾
            </span>
          </div>
        </div>

        {/* メインコピー */}
        <div
          style={{
            position: "absolute",
            top: 160,
            left: 90,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 52,
              color: "#e02020",
              fontWeight: 900,
              letterSpacing: 1,
            }}
          >
            あなただけの
          </span>
          <span
            style={{
              fontSize: 140,
              color: "#0a1f6e",
              fontWeight: 900,
              lineHeight: 1,
              borderBottom: "6px solid #0a1f6e",
              paddingBottom: 4,
              letterSpacing: -2,
            }}
          >
            合格戦略
          </span>
        </div>

        {/* サブコピー */}
        <div
          style={{
            position: "absolute",
            bottom: 130,
            left: 480,
            fontSize: 52,
            color: "#0a1f6e",
            fontWeight: 700,
          }}
        >
          用意します
        </div>

        {/* フッターテキスト */}
        <div
          style={{
            position: "absolute",
            bottom: 52,
            right: 80,
            fontSize: 28,
            color: "#1a3a6e",
            fontWeight: 500,
            letterSpacing: 1,
          }}
        >
          まずは公式LINE無料相談から
        </div>
      </div>
    ),
    { ...size }
  );
}
