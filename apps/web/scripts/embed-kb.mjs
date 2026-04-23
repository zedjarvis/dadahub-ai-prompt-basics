import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import OpenAI from "openai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "../src/data/site-index.json");
const outputPath = path.join(__dirname, "../src/data/site-embeddings.json");

async function loadLocalEnv() {
  const envPath = path.join(__dirname, "../.env.local");

  try {
    const raw = await readFile(envPath, "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const separator = trimmed.indexOf("=");
      if (separator === -1) continue;

      const key = trimmed.slice(0, separator).trim();
      const value = trimmed.slice(separator + 1).trim();

      if (!(key in process.env)) {
        process.env[key] = value;
      }
    }
  } catch {
    // ignore missing local env file
  }
}

await loadLocalEnv();

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("Missing OPENAI_API_KEY");
}

const client = new OpenAI({ apiKey });
const model = process.env.EMBEDDING_MODEL ?? "text-embedding-3-small";

const knowledgeEntries = JSON.parse(await readFile(dataPath, "utf8"));
const input = knowledgeEntries.map(
  (entry) =>
    `${entry.pageTitle}\n${entry.section}\n${entry.title}\n${entry.content}\nTags: ${entry.tags.join(", ")}`,
);

const response = await client.embeddings.create({
  model,
  input,
});

const snapshot = knowledgeEntries.map((entry, index) => ({
  ...entry,
  embedding: response.data[index].embedding,
}));

await writeFile(outputPath, JSON.stringify(snapshot, null, 2));
console.log(`Saved ${snapshot.length} embeddings to ${outputPath}`);
