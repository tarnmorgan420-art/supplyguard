import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    // Check if user is logged in via auth header
    const authHeader = request.headers.get("authorization");
    let isPaidUser = false;

    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data: { user } } = await supabase.auth.getUser(token);

      if (user) {
        const adminSupabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        );
        const { data: sub } = await adminSupabase
          .from("subscriptions")
          .select("status")
          .eq("user_id", user.id)
          .single();

        if (sub?.status === "active") isPaidUser = true;
      }
    }

    // Check free usage limit for non-paid users
    if (!isPaidUser) {
      const cookieHeader = request.headers.get("cookie") || "";
      const usageMatch = cookieHeader.match(/free_usage=(\d+)/);
      const usageCount = usageMatch ? parseInt(usageMatch[1]) : 0;

      if (usageCount >= 3) {
        return NextResponse.json({ error: "FREE_LIMIT_REACHED" }, { status: 429 });
      }
    }

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

    if (!isPaidUser) {
      const cookieHeader = request.headers.get("cookie") || "";
      const usageMatch = cookieHeader.match(/free_usage=(\d+)/);
      const usageCount = usageMatch ? parseInt(usageMatch[1]) : 0;
      const newCount = usageCount + 1;
      const response = NextResponse.json({ result, usageCount: newCount, limit: 3 });
      response.cookies.set("free_usage", String(newCount), {
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
        path: "/",
      });
      return response;
    }

    return NextResponse.json({ result, isPaidUser: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}