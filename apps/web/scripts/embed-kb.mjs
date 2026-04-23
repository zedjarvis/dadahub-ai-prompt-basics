import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import OpenAI from "openai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const faqPath = path.join(__dirname, "../src/data/faq.json");
const outputPath = path.join(__dirname, "../src/data/embeddings.json");

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("Missing OPENAI_API_KEY");
}

const client = new OpenAI({ apiKey });
const model = process.env.EMBEDDING_MODEL ?? "text-embedding-3-small";

const faqEntries = JSON.parse(await readFile(faqPath, "utf8"));
const input = faqEntries.map(
  (entry) => `${entry.title}\n${entry.content}\nTags: ${entry.tags.join(", ")}`,
);

const response = await client.embeddings.create({
  model,
  input,
});

const snapshot = faqEntries.map((entry, index) => ({
  ...entry,
  embedding: response.data[index].embedding,
}));

await writeFile(outputPath, JSON.stringify(snapshot, null, 2));
console.log(`Saved ${snapshot.length} embeddings to ${outputPath}`);
