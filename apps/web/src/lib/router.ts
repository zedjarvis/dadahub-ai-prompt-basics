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
  const longPrompt = normalized.length > 180;
  const hasComplexityKeyword = COMPLEXITY_KEYWORDS.some((keyword) =>
    normalized.includes(keyword),
  );
  const hasMultipleQuestions = (normalized.match(/\?/g) ?? []).length > 1;

  if (
    !longPrompt &&
    !hasComplexityKeyword &&
    !hasMultipleQuestions &&
    topSimilarity >= 0.78
  ) {
    return {
      model: models.cheap,
      tier: "cheap",
      reason:
        "Short factual query with strong retrieval match, so the cheaper faster model is enough.",
    };
  }

  return {
    model: models.standard,
    tier: "standard",
    reason:
      "Query looks more complex or retrieval confidence is lower, so route to the stronger model.",
  };
}
