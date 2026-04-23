export type PersonaId =
  | "program-guide"
  | "residency-support"
  | "contributor-guide";

export type ChatScopeMode = "open" | "closed";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type KnowledgeEntry = {
  id: string;
  pageTitle: string;
  section: string;
  url: string;
  title: string;
  content: string;
  tags: string[];
};

export type EmbeddedChunk = {
  id: string;
  pageTitle: string;
  section: string;
  url: string;
  title: string;
  content: string;
  tags: string[];
  embedding: number[];
};

export type RetrievedChunk = {
  id: string;
  pageTitle: string;
  section: string;
  url: string;
  title: string;
  content: string;
  score: number;
};

export type RouterDecision = {
  model: string;
  tier: "cheap" | "standard";
  reason: string;
  topK: number;
  maxOutputTokens: number;
};

export type ChatDebug = {
  scopeMode: ChatScopeMode;
  personaLabel: string;
  model: string;
  tier: "cheap" | "standard";
  routeReason: string;
  retrievalDepth: number;
  topSimilarity: number;
  usedRag: boolean;
  retrievedChunks: RetrievedChunk[];
};
