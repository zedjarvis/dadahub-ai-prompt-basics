import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export const runtime = "nodejs";
export const maxDuration = 10;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { question?: string };
    const question = body.question?.trim();

    if (!question) {
      return Response.json({ error: "Question is required." }, { status: 400 });
    }

    const { text } = await generateText({
      model: openai("gpt-4.1-nano"),
      temperature: 0.2,
      maxOutputTokens: 24,
      system:
        "Generate a very short chat thread title from the user's first message. Return only the title. Keep it under 6 words. No quotes. No punctuation unless necessary.",
      prompt: question,
    });

    return Response.json({
      title: text.replace(/\s+/g, " ").trim(),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong.";

    return Response.json({ error: message }, { status: 500 });
  }
}
