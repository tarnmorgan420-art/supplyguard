import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const { copy } = await request.json();

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `You are an FDA compliance expert for dietary supplement companies. 
        
Rewrite the following supplement product copy to be FDA compliant by:
1. Removing any disease claims (e.g. "cures", "treats", "prevents disease")
2. Replacing them with allowed structure/function claims (e.g. "supports", "promotes", "helps maintain")
3. Adding the required FDA disclaimer if needed: "This statement has not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease."
4. Flagging any other compliance issues

Original copy:
${copy}

Respond in this format:
REWRITTEN COPY:
[your rewritten version]

CHANGES MADE:
[list what you changed and why]

FDA DISCLAIMER NEEDED: [Yes/No]`,
      },
    ],
  });

  const result = (message.content[0] as { type: string; text: string }).text;
  return NextResponse.json({ result });
}