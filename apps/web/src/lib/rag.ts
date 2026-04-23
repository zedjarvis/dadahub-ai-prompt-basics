import { promises as fs } from "node:fs";
import path from "node:path";

import knowledgeEntries from "@/data/site-index.json";
import staticEmbeddings from "@/data/site-embeddings.json";
import { getOpenAIClient, models } from "@/lib/openai";
import type { EmbeddedChunk, KnowledgeEntry, RetrievedChunk } from "@/lib/types";

const entries = knowledgeEntries as KnowledgeEntry[];
let cachedEmbeddings: EmbeddedChunk[] | null =
  (staticEmbeddings as EmbeddedChunk[]).length > 0
    ? (staticEmbeddings as EmbeddedChunk[])
    : null;

function normalize(vector: number[]) {
  const magnitude = Math.sqrt(vector.reduce((sum, value) => sum + value ** 2, 0));
  return magnitude === 0 ? vector : vector.map((value) => value / magnitude);
}

function cosineSimilarity(a: number[], b: number[]) {
  const normalizedA = normalize(a);
  const normalizedB = normalize(b);
  return normalizedA.reduce((sum, value, index) => sum + value * normalizedB[index], 0);
}

function toChunkText(entry: KnowledgeEntry) {
  return `${entry.pageTitle}\n${entry.section}\n${entry.title}\n${entry.content}\nTags: ${entry.tags.join(", ")}`;
}

async function computeKnowledgeBaseEmbeddings() {
  const client = getOpenAIClient();
  const response = await client.embeddings.create({
    model: models.embedding,
    input: entries.map(toChunkText),
  });

  cachedEmbeddings = entries.map((entry, index) => ({
    ...entry,
    embedding: response.data[index].embedding,
  }));

  return cachedEmbeddings;
}

export async function getKnowledgeBaseEmbeddings() {
  if (cachedEmbeddings && cachedEmbeddings.length === entries.length) {
    return cachedEmbeddings;
  }

  return computeKnowledgeBaseEmbeddings();
}

export async function retrieveRelevantChunks(query: string, topK = 2) {
  const client = getOpenAIClient();
  const [knowledgeBase, queryEmbedding] = await Promise.all([
    getKnowledgeBaseEmbeddings(),
    client.embeddings.create({
      model: models.embedding,
      input: query,
    }),
  ]);

  const scored: RetrievedChunk[] = knowledgeBase
    .map((entry) => ({
      id: entry.id,
      pageTitle: entry.pageTitle,
      section: entry.section,
      url: entry.url,
      title: entry.title,
      content: entry.content,
      score: cosineSimilarity(entry.embedding, queryEmbedding.data[0].embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return {
    chunks: scored,
    topSimilarity: scored[0]?.score ?? 0,
  };
}

export async function saveEmbeddingsSnapshot() {
  const embeddings = await computeKnowledgeBaseEmbeddings();
  const outputPath = path.join(process.cwd(), "src/data/site-embeddings.json");

  await fs.writeFile(outputPath, JSON.stringify(embeddings, null, 2));
}
