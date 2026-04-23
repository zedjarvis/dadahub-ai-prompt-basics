import { models } from "@/lib/openai";
import type { RouterDecision } from "@/lib/types";

const COMPLEXITY_KEYWORDS = [
  "compare",
  "tradeoff",
  "strategy",
  "explain why",
  "design",
  "roadmap",
  "plan",
  "difference",
  "recommend",
];

export function pickModelForQuery(
  query: string,
  topSimilarity: number,
): RouterDecision {
  const normalized = query.toLowerCase();
  const longPrompt = normalized.length > 220;
  const hasComplexityKeyword = COMPLEXITY_KEYWORDS.some((keyword) =>
    normalized.includes(keyword),
  );
  const hasMultipleQuestions = (normalized.match(/\?/g) ?? []).length > 1;
  const needsBroaderRetrieval =
    longPrompt || hasComplexityKeyword || hasMultipleQuestions;

  if (
    !needsBroaderRetrieval &&
    topSimilarity >= 0.78
  ) {
    return {
      model: models.cheap,
      tier: "cheap",
      reason:
        "Short factual query with a strong semantic match, so the cheaper faster model and a tight retrieval window are enough.",
      topK: 2,
      maxOutputTokens: 240,
    };
  }

  return {
    model: models.standard,
    tier: "standard",
    reason:
      "Query looks more complex or retrieval confidence is lower, so route to the stronger model and retrieve more context.",
    topK: topSimilarity >= 0.7 ? 3 : 4,
    maxOutputTokens: 420,
  };
}
