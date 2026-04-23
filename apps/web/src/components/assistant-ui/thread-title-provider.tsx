"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { useAuiState } from "@assistant-ui/react";

const STORAGE_KEY = "dadadevs-thread-titles";

type ThreadTitleContextValue = {
  titles: Record<string, string>;
  setTitle: (threadId: string, title: string) => void;
};

const ThreadTitleContext = createContext<ThreadTitleContextValue | null>(null);

function normalizeTitle(title: string) {
  return title.replace(/^["']|["']$/g, "").trim().slice(0, 60);
}

function getFirstUserText(messages: readonly unknown[]) {
  for (const message of messages) {
    if (
      typeof message === "object" &&
      message !== null &&
      "role" in message &&
      message.role === "user" &&
      "content" in message &&
      typeof message.content === "string" &&
      message.content.trim().length > 0
    ) {
      return message.content.trim();
    }

    if (
      typeof message === "object" &&
      message !== null &&
      "role" in message &&
      message.role === "user" &&
      "content" in message &&
      Array.isArray(message.content)
    ) {
      const text = message.content
        .filter(
          (part): part is { type: "text"; text: string } =>
            typeof part === "object" &&
            part !== null &&
            "type" in part &&
            part.type === "text" &&
            "text" in part &&
            typeof part.text === "string",
        )
        .map((part) => part.text)
        .join(" ")
        .trim();

      if (text) return text;
    }

    if (
      typeof message === "object" &&
      message !== null &&
      "role" in message &&
      message.role === "user" &&
      "parts" in message &&
      Array.isArray(message.parts)
    ) {
      const text = message.parts
        .filter(
          (part): part is { type: "text"; text: string } =>
            typeof part === "object" &&
            part !== null &&
            "type" in part &&
            part.type === "text" &&
            "text" in part &&
            typeof part.text === "string",
        )
        .map((part) => part.text)
        .join(" ")
        .trim();

      if (text) return text;
    }
  }

  return "";
}

function fallbackTitleFromQuestion(question: string) {
  return question.replace(/\s+/g, " ").trim().slice(0, 48);
}

function ThreadTitleGenerator() {
  const { titles, setTitle } = useThreadTitles();
  const threadId = useAuiState((s) => s.threads.mainThreadId);
  const messages = useAuiState((s) => s.thread.messages);
  const pendingRef = useRef<Set<string>>(new Set());
  const firstQuestion = getFirstUserText(messages);

  useEffect(() => {
    if (!threadId || !firstQuestion || titles[threadId]) return;
    if (pendingRef.current.has(threadId)) return;

    const pending = pendingRef.current;
    pending.add(threadId);

    const controller = new AbortController();

    void fetch("/api/thread-title", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: firstQuestion }),
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Failed to generate title");
        return (await response.json()) as { title?: string };
      })
      .then((data) => {
        const nextTitle = normalizeTitle(
          data.title || fallbackTitleFromQuestion(firstQuestion),
        );
        if (nextTitle) {
          setTitle(threadId, nextTitle);
        }
      })
      .catch(() => {
        const fallback = normalizeTitle(fallbackTitleFromQuestion(firstQuestion));
        if (fallback) {
          setTitle(threadId, fallback);
        }
      })
      .finally(() => {
        pending.delete(threadId);
      });

    return () => {
      controller.abort();
      pending.delete(threadId);
    };
  }, [firstQuestion, setTitle, threadId, titles]);

  return null;
}

export function ThreadTitleProvider({ children }: { children: ReactNode }) {
  const [titles, setTitles] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined") return {};

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return {};

    try {
      return JSON.parse(stored) as Record<string, string>;
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      return {};
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(titles));
  }, [titles]);

  const setTitle = useCallback((threadId: string, title: string) => {
    setTitles((current) => {
      if (current[threadId] === title) return current;
      return { ...current, [threadId]: title };
    });
  }, []);

  const value = useMemo(
    () => ({
      titles,
      setTitle,
    }),
    [setTitle, titles],
  );

  return (
    <ThreadTitleContext.Provider value={value}>
      <ThreadTitleGenerator />
      {children}
    </ThreadTitleContext.Provider>
  );
}

export function useThreadTitles() {
  const context = useContext(ThreadTitleContext);

  if (!context) {
    throw new Error(
      "useThreadTitles must be used within a ThreadTitleProvider.",
    );
  }

  return context;
}
