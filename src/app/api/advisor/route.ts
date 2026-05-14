import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const { message, products } = await request.json();

  const productList = products?.length
    ? `Available products:\n${products.map((p: { name: string; description: string }) => `- ${p.name}: ${p.description}`).join("\n")}`
    : "No specific products provided — give general supplement advice.";

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 512,
    messages: [
      {
        role: "user",
        content: `You are a helpful supplement advisor for a health brand. Based on the customer's goals or symptoms, recommend the most relevant products from the list below. Be friendly, concise, and helpful. Never make disease claims.

${productList}

Customer message: ${message}`,
      },
    ],
  });

  const reply = (response.content[0] as { type: string; text: string }).text;
  return NextResponse.json({ reply });
}