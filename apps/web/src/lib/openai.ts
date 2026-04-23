import OpenAI from "openai";

let client: OpenAI | null = null;

export function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  client ??= new OpenAI({ apiKey });
  return client;
}

export const models = {
  cheap: process.env.OPENAI_MODEL_CHEAP ?? "gpt-4.1-nano",
  standard: process.env.OPENAI_MODEL_COMPLEX ?? "gpt-4.1-mini",
  embedding: process.env.EMBEDDING_MODEL ?? "text-embedding-3-small",
} as const;
