"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import {
  AssistantChatTransport,
  useChatRuntime,
} from "@assistant-ui/react-ai-sdk";
import { useState } from "react";

import { Thread } from "@/components/assistant-ui/thread";
import { ThreadListSidebar } from "@/components/assistant-ui/threadlist-sidebar";
import { ThreadTitleProvider } from "@/components/assistant-ui/thread-title-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import knowledgeIndex from "@/data/site-index.json";
import { defaultPersonaId, personas } from "@/lib/personas";
import type {
  ChatDebug,
  ChatScopeMode,
  PersonaId,
  RetrievedChunk,
} from "@/lib/types";

const scopeModes: {
  id: ChatScopeMode;
  label: string;
  description: string;
}[] = [
  {
    id: "open",
    label: "Open chat",
    description:
      "Can answer general questions and use persona context when helpful.",
  },
  {
    id: "closed",
    label: "Closed scope",
    description:
      "Stays within the selected persona and deflects unrelated questions.",
  },
];

export default function Chat() {
  const [personaId, setPersonaId] = useState<PersonaId>(defaultPersonaId);
  const [scopeMode, setScopeMode] = useState<ChatScopeMode>("closed");
  const [debug, setDebug] = useState<ChatDebug | null>(null);
  const indexedPages = new Set(
    knowledgeIndex.map((entry) => entry.url),
  ).size;

  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({
      api: "/api/chat",
      body: { personaId, scopeMode },
    }),
    onData: (part) => {
      if (part.type === "data-debug") {
        setDebug(part.data as ChatDebug);
      }
    },
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <ThreadTitleProvider>
        <SidebarProvider>
          <div className="flex h-dvh w-full overflow-hidden bg-background">
            <ThreadListSidebar />

            <SidebarInset className="min-w-0 overflow-hidden">
              <div className="flex h-full min-w-0 overflow-hidden flex-col lg:flex-row">
                <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
                  <div className="min-h-0 flex-1">
                    <Thread />
                  </div>
                </main>

                <aside className="w-full shrink-0 border-t border-border/70 bg-card/70 lg:w-[24rem] lg:border-t-0 lg:border-l">
                  <div className="flex h-full min-h-0 flex-col gap-4 overflow-y-auto p-4 sm:p-5">
                    <Panel eyebrow="Assistant setup" title="Session controls">
                      <div className="flex flex-col gap-4">
                        <div className="rounded-2xl border border-border bg-background px-4 py-3">
                          <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
                            Stack
                          </p>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            Next.js full-stack app using OpenAI chat,
                            embeddings, and retrieval.
                          </p>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            Type `@` in the composer to tag a persona for a
                            single message.
                          </p>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label
                            className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground"
                            htmlFor="persona"
                          >
                            Persona
                          </label>
                          <select
                            id="persona"
                            className="h-11 rounded-2xl border border-border bg-background px-4 text-sm outline-none focus-visible:border-ring"
                            onChange={(event) =>
                              setPersonaId(event.target.value as PersonaId)
                            }
                            value={personaId}
                          >
                            {Object.entries(personas).map(([id, persona]) => (
                              <option key={id} value={id}>
                                {persona.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex flex-col gap-2">
                          <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
                            Chat scope
                          </p>
                          <div className="grid gap-2">
                            {scopeModes.map((mode) => {
                              const isActive = scopeMode === mode.id;

                              return (
                                <button
                                  key={mode.id}
                                  type="button"
                                  onClick={() => setScopeMode(mode.id)}
                                  className={`rounded-2xl border px-4 py-3 text-left transition-colors ${
                                    isActive
                                      ? "border-foreground bg-foreground text-background"
                                      : "border-border bg-background hover:bg-muted"
                                  }`}
                                >
                                  <div className="flex items-center justify-between gap-3">
                                    <strong className="text-sm font-semibold">
                                      {mode.label}
                                    </strong>
                                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.24em] opacity-70">
                                      {isActive ? "Active" : "Select"}
                                    </span>
                                  </div>
                                  <p
                                    className={`mt-1 text-sm leading-5 ${
                                      isActive
                                        ? "text-background/80"
                                        : "text-muted-foreground"
                                    }`}
                                  >
                                    {mode.description}
                                  </p>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </Panel>

                    <Panel
                      eyebrow="What this teaches"
                      title="Lesson checkpoints"
                    >
                      <ul className="flex list-disc flex-col gap-2 pl-5 text-sm leading-6 text-muted-foreground">
                        <li>API access via one OpenAI key</li>
                        <li>Persona-based prompt design</li>
                        <li>Scrape, chunk, embed, then retrieve</li>
                        <li>Embeddings before generation</li>
                        <li>Cheap vs stronger model routing</li>
                      </ul>
                    </Panel>

                    <Panel eyebrow="Embeddings" title="Knowledge base index">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-border bg-background px-4 py-3">
                          <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
                            Indexed pages
                          </p>
                          <p className="mt-2 text-2xl font-semibold tracking-tight">
                            {indexedPages}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-border bg-background px-4 py-3">
                          <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
                            Semantic chunks
                          </p>
                          <p className="mt-2 text-2xl font-semibold tracking-tight">
                            {knowledgeIndex.length}
                          </p>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-muted-foreground">
                        Retrieval now searches a structured index of Dada Devs
                        site content, not a hand-written FAQ.
                      </p>
                    </Panel>

                    <Panel eyebrow="Embeddings" title="Semantic search lab">
                      <SemanticSearchLab />
                    </Panel>

                    <Panel eyebrow="Debug" title="Routing and retrieval">
                      {debug ? (
                        <div className="flex flex-col gap-4 text-sm">
                          <DebugItem
                            label="Effective persona"
                            value={debug.personaLabel}
                          />
                          <DebugItem
                            label="Scope mode"
                            value={
                              debug.scopeMode === "open"
                                ? "Open chat"
                                : "Closed scope"
                            }
                          />
                          <DebugItem
                            label="Selected model"
                            value={debug.model}
                          />
                          <DebugItem
                            label="Cost tier"
                            value={
                              debug.tier === "cheap"
                                ? "Cheap / fast"
                                : "Standard / stronger"
                            }
                          />
                          <DebugItem
                            label="Retrieval depth"
                            value={`${debug.retrievalDepth} chunk${debug.retrievalDepth === 1 ? "" : "s"}`}
                          />
                          <DebugItem
                            label="Top similarity"
                            value={debug.topSimilarity.toFixed(3)}
                          />
                          <div>
                            <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
                              Router reason
                            </p>
                            <p className="mt-1 leading-6 text-muted-foreground">
                              {debug.routeReason}
                            </p>
                          </div>
                          <div>
                            <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
                              Retrieved chunks
                            </p>
                            <div className="mt-2 flex flex-col gap-3">
                              {debug.retrievedChunks.map((chunk) => (
                                <div
                                  key={chunk.id}
                                  className="rounded-2xl border border-border bg-background px-3 py-3"
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <strong className="text-sm">
                                      {chunk.title}
                                    </strong>
                                    <span className="font-mono text-xs text-muted-foreground">
                                      {chunk.score.toFixed(3)}
                                    </span>
                                  </div>
                                  <p className="mt-1 text-xs text-muted-foreground">
                                    {chunk.pageTitle} · {chunk.section}
                                  </p>
                                  <a
                                    className="mt-1 block text-xs text-[#F0570F] underline-offset-2 hover:underline"
                                    href={chunk.url}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {chunk.url}
                                  </a>
                                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    {chunk.content}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm leading-6 text-muted-foreground">
                          Send a message to see which model was chosen and which
                          site chunks were retrieved.
                        </p>
                      )}
                    </Panel>

                    <Panel eyebrow="Cost optimization" title="Current rules">
                      <ul className="flex list-disc flex-col gap-2 pl-5 text-sm leading-6 text-muted-foreground">
                        <li>Short factual queries use `gpt-4.1-nano`</li>
                        <li>Complex queries escalate to `gpt-4.1-mini`</li>
                        <li>Tight queries retrieve 2 chunks, broader ones retrieve 3-4</li>
                        <li>`text-embedding-3-small` powers semantic search</li>
                        <li>
                          `Closed scope` keeps answers tighter and easier to
                          ground
                        </li>
                      </ul>
                    </Panel>
                  </div>
                </aside>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </ThreadTitleProvider>
    </AssistantRuntimeProvider>
  );
}

function SemanticSearchLab() {
  const [query, setQuery] = useState(
    "How does Dada Devs help developers move into Bitcoin open source?",
  );
  const [results, setResults] = useState<RetrievedChunk[]>([]);
  const [topSimilarity, setTopSimilarity] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runSearch() {
    const trimmed = query.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/retrieve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
      });

      const data = (await response.json()) as {
        chunks?: RetrievedChunk[];
        topSimilarity?: number;
        message?: string;
      };

      if (!response.ok) {
        throw new Error(data.message ?? "Semantic search failed.");
      }

      setResults(data.chunks ?? []);
      setTopSimilarity(data.topSimilarity ?? null);
    } catch (searchError) {
      setResults([]);
      setTopSimilarity(null);
      setError(
        searchError instanceof Error
          ? searchError.message
          : "Semantic search failed.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm leading-6 text-muted-foreground">
        Run retrieval without generation to show what the embedding search is
        actually matching.
      </p>

      <div className="rounded-2xl border border-border bg-background p-3">
        <textarea
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          rows={3}
          className="w-full resize-none bg-transparent text-sm leading-6 outline-none"
          placeholder="Ask a semantic search question..."
        />
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            Uses `text-embedding-3-small` and cosine similarity.
          </p>
          <button
            type="button"
            onClick={runSearch}
            disabled={loading}
            className="rounded-full bg-[#F0570F] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#d84d0c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Searching..." : "Test retrieval"}
          </button>
        </div>
      </div>

      {topSimilarity !== null ? (
        <div className="rounded-2xl border border-border bg-background px-4 py-3">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
            Top similarity
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight">
            {topSimilarity.toFixed(3)}
          </p>
        </div>
      ) : null}

      {error ? (
        <p className="text-sm leading-6 text-destructive">{error}</p>
      ) : null}

      {results.length > 0 ? (
        <div className="flex flex-col gap-3">
          {results.map((chunk) => (
            <div
              key={chunk.id}
              className="rounded-2xl border border-border bg-background px-3 py-3"
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm">{chunk.title}</strong>
                <span className="font-mono text-xs text-muted-foreground">
                  {chunk.score.toFixed(3)}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {chunk.pageTitle} · {chunk.section}
              </p>
              <a
                className="mt-1 block text-xs text-[#F0570F] underline-offset-2 hover:underline"
                href={chunk.url}
                target="_blank"
                rel="noreferrer"
              >
                {chunk.url}
              </a>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {chunk.content}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Panel({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[1.4rem] border border-border bg-background p-4 shadow-sm transition-all duration-200 hover:border-[#F0570F] hover:shadow-[0_0_0_3px_rgba(240,87,15,0.12)] focus-within:border-[#F0570F] focus-within:shadow-[0_0_0_3px_rgba(240,87,15,0.14)]">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-lg font-semibold tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function DebugItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm leading-6 text-foreground">{value}</p>
    </div>
  );
}
