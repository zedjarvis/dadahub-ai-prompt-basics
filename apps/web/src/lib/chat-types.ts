import type { UIMessage } from "ai";

export type WorkshopUIMessage = UIMessage<
  never,
  {
    debug: {
      model: string;
      tier: "cheap" | "standard";
      routeReason: string;
      topSimilarity: number;
      usedRag: boolean;
      retrievedChunks: {
        id: string;
        title: string;
        content: string;
        score: number;
      }[];
    };
  }
>;
