/**
 * AI詳細分析 API エンドポイント
 *
 * 【環境変数の設定方法】
 * ローカル開発: プロジェクトルートに .env.local を作成し以下を追加
 *   ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxx
 *
 * Vercel へのデプロイ時:
 *   1. Vercel ダッシュボード → プロジェクト → Settings → Environment Variables
 *   2. Name: ANTHROPIC_API_KEY  /  Value: sk-ant-xxxxxxxxxxxxxxxxxxxx を追加
 *   3. Environments: Production / Preview / Development すべてにチェック
 *   4. 「Save」後、再デプロイすると反映される
 */

import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export interface AiAnalysisRequest {
  answers: Record<string, string>;
  userTypeLabel: string;
  topUniversityName: string;
  topFaculty: string;
}

export interface AiAnalysisResponse {
  oneLiner: string;       // あなたのタイプ一言表現
  features: string;       // 合う大学・学部の特徴（3〜4文）
  actions: string[];      // 今すぐ始めるべき3つのアクション
}

// 回答データを読みやすい文字列に変換
function formatAnswers(answers: Record<string, string>): string {
  const entries = Object.entries(answers);
  if (entries.length === 0) return "（回答データなし）";
  return entries.map(([k, v]) => `${k}: ${v}`).join("、");
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY が設定されていません" },
        { status: 500 }
      );
    }

    const body: AiAnalysisRequest = await req.json();
    const { answers, userTypeLabel, topUniversityName, topFaculty } = body;

    const client = new Anthropic({ apiKey });

    const prompt = `あなたは総合型選抜を受ける高校生の進路アドバイザーです。
以下の診断回答をもとに、この高校生に合う大学・学部の特徴と、
総合型選抜に向けて今すぐ始めるべき3つのアクションを教えてください。
また、この生徒のタイプ（強み・個性）を一言で表現してください。
回答は高校生にも分かりやすい言葉で、前向きな表現でお願いします。

診断回答：${formatAnswers(answers)}
診断結果のタイプ：${userTypeLabel}
最もおすすめの大学・学部：${topUniversityName}（${topFaculty}）

以下のJSON形式のみで回答してください（他のテキストは不要）：
{
  "oneLiner": "あなたのタイプを表す一言キャッチコピー（例：好奇心旺盛な探究者タイプ）",
  "features": "この生徒に合う大学・学部の特徴を3〜4文で説明したテキスト",
  "actions": [
    "今すぐ始めるべきアクション1",
    "今すぐ始めるべきアクション2",
    "今すぐ始めるべきアクション3"
  ]
}`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    });

    // レスポンスからテキストブロックを取得
    const textBlock = message.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("テキストレスポンスが取得できませんでした");
    }

    // JSON部分を抽出（コードブロックに囲まれている場合も対応）
    const raw = textBlock.text.trim();
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("JSONレスポンスのパースに失敗しました");
    }

    const parsed: AiAnalysisResponse = JSON.parse(jsonMatch[0]);

    // 必須フィールドのバリデーション
    if (!parsed.oneLiner || !parsed.features || !Array.isArray(parsed.actions)) {
      throw new Error("レスポンスの形式が正しくありません");
    }

    return NextResponse.json(parsed);
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      return NextResponse.json(
        { error: "APIキーが無効です。ANTHROPIC_API_KEY を確認してください" },
        { status: 401 }
      );
    }
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        { error: "APIの利用制限に達しました。しばらく後にお試しください" },
        { status: 429 }
      );
    }
    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        { error: `Claude APIエラー: ${error.message}` },
        { status: error.status ?? 500 }
      );
    }
    console.error("AI analysis error:", error);
    return NextResponse.json(
      { error: "分析中にエラーが発生しました。もう一度お試しください" },
      { status: 500 }
    );
  }
}
