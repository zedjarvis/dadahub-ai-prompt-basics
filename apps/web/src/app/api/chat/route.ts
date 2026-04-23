import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  type UIMessage,
} from "ai";
import { openai } from "@ai-sdk/openai";

import { defaultPersonaId, personas } from "@/lib/personas";
import {
  extractTaggedPersonaId,
  stripMentionDirectives,
} from "@/lib/persona-mentions";
import { retrieveRelevantChunks } from "@/lib/rag";
import { pickModelForQuery } from "@/lib/router";
import type { ChatScopeMode, PersonaId } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 30;

function isPersonaId(value: string): value is PersonaId {
  return value in personas;
}

function isChatScopeMode(value: string): value is ChatScopeMode {
  return value === "open" || value === "closed";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      messages?: UIMessage[];
      personaId?: string;
      scopeMode?: string;
    };

    const messages = body.messages ?? [];
    const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");

    const latestText =
      latestUserMessage?.parts
        .filter((part) => part.type === "text")
        .map((part) => part.text)
        .join("\n")
        .trim() ?? "";

    if (!latestText) {
      return new Response("A user message is required.", { status: 400 });
    }

    const personaId =
      body.personaId && isPersonaId(body.personaId)
        ? body.personaId
        : defaultPersonaId;
    const taggedPersonaId = extractTaggedPersonaId(latestText);
    const effectivePersonaId = taggedPersonaId ?? personaId;
    const persona = personas[effectivePersonaId];
    const scopeMode =
      body.scopeMode && isChatScopeMode(body.scopeMode)
        ? body.scopeMode
        : "closed";
    const sanitizedLatestText = stripMentionDirectives(latestText);

    const initialRetrieval = await retrieveRelevantChunks(sanitizedLatestText, 2);
    const decision = pickModelForQuery(
      sanitizedLatestText,
      initialRetrieval.topSimilarity,
    );
    const retrieval =
      decision.topK > initialRetrieval.chunks.length
        ? await retrieveRelevantChunks(sanitizedLatestText, decision.topK)
        : initialRetrieval;

    const contextBlock =
      retrieval.chunks.length > 0
        ? retrieval.chunks
            .map(
              (chunk, index) =>
                `Source ${index + 1}: ${chunk.title}\nPage: ${chunk.pageTitle}\nSection: ${chunk.section}\nURL: ${chunk.url}\n${chunk.content}`,
            )
            .join("\n\n")
        : "No additional retrieved context.";

    const debug = {
      scopeMode,
      personaLabel: persona.label,
      model: decision.model,
      tier: decision.tier,
      routeReason: decision.reason,
      retrievalDepth: decision.topK,
      topSimilarity: retrieval.topSimilarity,
      usedRag: retrieval.chunks.length > 0,
      retrievedChunks: retrieval.chunks,
    } as const;

    const systemInstructions =
      scopeMode === "closed"
        ? `${persona.prompt}

You are operating in CLOSED SCOPE mode.
Only answer questions that fit this persona and the Dada Devs or Dada Hub context.
Prefer the retrieved context when it is relevant.
If the user asks for something outside this persona or outside the workshop context, do not answer the question directly. Briefly say that this mode is limited to ${persona.label} topics and ask the user to switch to Open chat for general questions.
Keep answers practical and short.`
        : `${persona.prompt}

You are operating in OPEN CHAT mode.
You can answer general questions as well as persona-specific ones.
When the retrieved Dada Devs context is relevant, use it to ground your answer.
If the user asks something general that is not covered by retrieved context, you may still answer from broader knowledge, but keep the answer concise and note uncertainty when appropriate.`;

    const result = streamText({
      model: openai(decision.model),
      temperature: 0.4,
      maxOutputTokens: decision.maxOutputTokens,
      system: `${systemInstructions}

Use the retrieved Dada Devs context when it is relevant. If the answer is not supported by the retrieved context, say what you do know and note uncertainty.
If you used retrieved context, end with a short "Sources used" list that names the page titles or sections you relied on.

Retrieved context:
${contextBlock}`,
      messages: await convertToModelMessages(
        messages.map((message) => ({
          ...message,
          parts: message.parts.map((part) =>
            part.type === "text"
              ? { ...part, text: stripMentionDirectives(part.text) }
              : part,
          ),
        })),
      ),
    });

    const stream = createUIMessageStream({
      originalMessages: messages,
      execute: ({ writer }) => {
        writer.write({
          type: "data-debug",
          data: debug,
        });

        writer.merge(
          result.toUIMessageStream({
            messageMetadata: ({ part }) => {
              if (part.type === "finish") {
                return {
                  usage: part.totalUsage,
                };
              }

              return undefined;
            },
          }),
        );
      },
      onError: (error) =>
        error instanceof Error ? error.message : "Something went wrong.",
    });

    return createUIMessageStreamResponse({ stream });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong.";

    return new Response(message, { status: 500 });
  }
}
