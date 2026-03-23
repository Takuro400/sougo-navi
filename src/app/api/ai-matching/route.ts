import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { universities } from "@/data/universities";
import { quizQuestions } from "@/data/quizQuestions";
import { QuizAnswers } from "@/types";

export interface AiMatchItem {
  universityId: string;
  score: number;
  matchReasons: string[];
  readinessLevel: "高" | "中" | "低";
  requiredActions: string[];
  aiComment: string;
}

export interface AiMatchingResponse {
  results: AiMatchItem[];
}

/** 回答IDとvalueから、質問文＋選択肢ラベルに変換 */
function formatAnswers(answers: QuizAnswers): string {
  return quizQuestions
    .map((q) => {
      const val = answers[q.id];
      if (!val) return null;
      const opt = q.options.find((o) => o.value === val);
      if (!opt) return null;
      return `・${q.text}\n  → ${opt.label}`;
    })
    .filter(Boolean)
    .join("\n");
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

    const body: { answers: QuizAnswers; region: string } = await req.json();
    const { answers, region } = body;

    // 大学データをプロンプト用に要約（全フィールド送るとトークン過多）
    const univList = universities
      .map(
        (u) =>
          `[${u.id}] ${u.name}／${u.faculty}（${u.majorField}・${u.type}・${u.region}・偏差値帯:${u.hensachiRange ?? "未設定"}・総合型選抜:${u.sougoCompatibility}）\n  学生像: ${u.idealStudent}`
      )
      .join("\n");

    const formattedAnswers = formatAnswers(answers);

    const systemPrompt = `あなたは総合型選抜専門の進路アドバイザーです。
高校生の診断回答をもとに、データベースの大学・学部の中から最も相性の良い5件を選んでください。

選ぶ基準：
1. 学びたい分野・興味関心との一致
2. 学び方のスタイルとの相性
3. 偏差値帯の現実的なマッチング
4. 将来のキャリアイメージとの一致
5. 地域・環境の希望との一致

出力形式はJSON配列で以下の構造にしてください：
[
  {
    "universityId": "string（大学IDをそのまま使用）",
    "score": number（0-100の整数）,
    "matchReasons": ["具体的な理由1", "具体的な理由2", "具体的な理由3"],
    "readinessLevel": "高" または "中" または "低",
    "requiredActions": ["今すぐできる行動1", "今すぐできる行動2", "今すぐできる行動3"],
    "aiComment": "AIからの一言・100文字以内・前向きな表現"
  }
]

注意：
- 必ずJSON配列のみを返してください（前後の説明文は不要）
- 日本語で回答してください
- 高校生に分かりやすい言葉を使ってください
- universityIdは必ず大学データの[id]の値をそのまま使用してください`;

    const userMessage = `【高校生の診断回答】
${formattedAnswers || "（回答データなし）"}

【希望地域】${region || "指定なし"}

【大学データベース】
${univList}`;

    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("テキストレスポンスが取得できませんでした");
    }

    const jsonMatch = textBlock.text.trim().match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("JSONレスポンスのパースに失敗しました");
    }

    const parsed: AiMatchItem[] = JSON.parse(jsonMatch[0]);

    if (!Array.isArray(parsed) || parsed.length === 0) {
      throw new Error("レスポンスの形式が正しくありません");
    }

    return NextResponse.json({ results: parsed } as AiMatchingResponse);
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
    console.error("AI matching error:", error);
    return NextResponse.json(
      { error: "AIマッチング中にエラーが発生しました。もう一度お試しください" },
      { status: 500 }
    );
  }
}
