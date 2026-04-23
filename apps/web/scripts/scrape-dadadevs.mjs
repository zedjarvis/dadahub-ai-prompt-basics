import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.join(__dirname, "../src/data");
const outputPath = path.join(outputDir, "site-index.json");
const manifestPath = path.join(outputDir, "site-manifest.json");
const SITE_ORIGIN = "https://dadadevs.com";
const MAX_PAGES = 80;

const seedUrls = [
  "https://dadadevs.com/",
  "https://dadadevs.com/about/",
  "https://dadadevs.com/pathways/",
  "https://dadadevs.com/dada-citadel/",
  "https://dadadevs.com/workshop/",
  "https://dadadevs.com/blog/",
  "https://dadadevs.com/contact/",
  "https://dadadevs.com/pathways/mastering-bitcoin-track/#curriculum",
  "https://dadadevs.com/mentor-with-us/",
  "https://dadadevs.com/partner-with-us/",
];

function stripHash(url) {
  return url.split("#")[0];
}

function normalizeUrl(rawUrl) {
  const url = new URL(stripHash(rawUrl));
  url.search = "";

  if (!url.pathname.endsWith("/") && !url.pathname.includes(".")) {
    url.pathname = `${url.pathname}/`;
  }

  return url.toString();
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function decodeHtmlEntities(text) {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#038;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&hellip;/g, "…")
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "’")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”");
}

function cleanText(text) {
  return decodeHtmlEntities(
    text
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function extractMainHtml(html) {
  const mainMatch = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  if (mainMatch) return mainMatch[1];

  const bodyMatch = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  return bodyMatch ? bodyMatch[1] : html;
}

function getTitle(html) {
  return (
    cleanText(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "") ||
    "Dada Devs"
  );
}

function getDescription(html) {
  return cleanText(
    html.match(/<meta[^>]+name=['"]description['"][^>]+content=['"]([\s\S]*?)['"][^>]*>/i)?.[1] ??
      html.match(/<meta[^>]+property=['"]og:description['"][^>]+content=['"]([\s\S]*?)['"][^>]*>/i)?.[1] ??
      "",
  );
}

function extractTokens(mainHtml) {
  const sanitized = mainHtml
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
    .replace(/<svg[\s\S]*?<\/svg>/gi, "")
    .replace(/<form[\s\S]*?<\/form>/gi, "")
    .replace(/<figure[\s\S]*?<\/figure>/gi, "");

  const tokenRe = /<(h1|h2|h3|h4|p|li)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  const tokens = [];
  let match;

  while ((match = tokenRe.exec(sanitized)) !== null) {
    const type = match[1].toLowerCase();
    const text = cleanText(match[2]);
    if (!text) continue;
    tokens.push({ type, text });
  }

  return tokens;
}

function collectSections(pageTitle, description, tokens) {
  const sections = [];
  let currentHeading = "Overview";
  let paragraphs = [];

  const flush = () => {
    if (paragraphs.length === 0) return;
    sections.push({
      heading: currentHeading,
      text: paragraphs.join("\n\n"),
    });
    paragraphs = [];
  };

  if (description) {
    paragraphs.push(description);
  }

  for (const token of tokens) {
    if (token.type.startsWith("h")) {
      flush();
      currentHeading =
        token.text === pageTitle || token.text.length < 2 ? "Overview" : token.text;
      continue;
    }

    paragraphs.push(token.text);
  }

  flush();
  return sections;
}

function buildChunks(url, pageTitle, section) {
  const blocks = section.text
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  const chunks = [];
  let current = "";
  let chunkIndex = 0;

  for (const block of blocks) {
    const candidate = current ? `${current}\n\n${block}` : block;
    if (candidate.length <= 900) {
      current = candidate;
      continue;
    }

    if (current) {
      chunks.push({
        section: section.heading,
        chunkIndex,
        content: current,
      });
      chunkIndex += 1;
    }

    current = block;
  }

  if (current) {
    chunks.push({
      section: section.heading,
      chunkIndex,
      content: current,
    });
  }

  return chunks.map((chunk) => {
    const pathParts = new URL(url).pathname
      .split("/")
      .filter(Boolean)
      .map(slugify)
      .filter(Boolean);
    const pathTag = pathParts[pathParts.length - 1] ?? "home";
    const headingSlug = slugify(chunk.section || pageTitle || pathTag);
    const title =
      chunk.section && chunk.section !== "Overview"
        ? `${pageTitle} — ${chunk.section}`
        : pageTitle;

    return {
      id: `${pathTag}-${headingSlug}-${chunk.chunkIndex}`,
      pageTitle,
      section: chunk.section,
      url,
      title,
      content: chunk.content,
      tags: Array.from(
        new Set(
          [pathTag, ...pathParts, ...headingSlug.split("-"), ...slugify(pageTitle).split("-")].filter(Boolean),
        ),
      ),
    };
  });
}

function extractInternalLinks(html) {
  const links = new Set();
  const hrefRe =
    /href=["']((?:https:\/\/dadadevs\.com|\/)[^"'# ]*?)["']/gi;
  let match;

  while ((match = hrefRe.exec(html)) !== null) {
    const rawHref = match[1];

    try {
      const absolute = rawHref.startsWith("/")
        ? new URL(rawHref, SITE_ORIGIN).toString()
        : rawHref;
      const normalized = normalizeUrl(absolute);

      if (shouldVisitUrl(normalized)) {
        links.add(normalized);
      }
    } catch {
      continue;
    }
  }

  return [...links];
}

function shouldVisitUrl(url) {
  if (!url.startsWith(`${SITE_ORIGIN}/`)) return false;

  const pathname = new URL(url).pathname.toLowerCase();

  if (
    pathname.startsWith("/wp-json") ||
    pathname.startsWith("/wp-admin") ||
    pathname.startsWith("/author/") ||
    pathname.startsWith("/tag/") ||
    pathname.startsWith("/category/") ||
    pathname.startsWith("/feed/") ||
    pathname.startsWith("/comments/") ||
    pathname.includes("/embed/") ||
    pathname.includes("/amp/") ||
    pathname.includes("/page/") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".pdf") ||
    pathname.endsWith(".zip")
  ) {
    return false;
  }

  return true;
}

async function fetchPage(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "dadahub-workshop-indexer/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return {
    url: normalizeUrl(response.url),
    html: await response.text(),
  };
}

async function discoverSitemapUrls() {
  const discovered = new Set();

  try {
    const response = await fetch(`${SITE_ORIGIN}/robots.txt`, {
      headers: {
        "User-Agent": "dadahub-workshop-indexer/1.0",
      },
    });

    if (response.ok) {
      const robotsTxt = await response.text();
      const sitemapMatches = robotsTxt.matchAll(/sitemap:\s*(.+)$/gim);

      for (const match of sitemapMatches) {
        const sitemapUrl = match[1]?.trim();
        if (sitemapUrl) {
          discovered.add(sitemapUrl);
        }
      }
    }
  } catch {
    // Ignore robots.txt lookup failures and fall back to seeded pages.
  }

  discovered.add(`${SITE_ORIGIN}/wp-sitemap.xml`);
  return [...discovered];
}

async function fetchSitemapUrls() {
  const pageUrls = new Set();

  for (const sitemapUrl of await discoverSitemapUrls()) {
    try {
      const response = await fetch(sitemapUrl, {
        headers: {
          "User-Agent": "dadahub-workshop-indexer/1.0",
        },
      });

      if (!response.ok) continue;
      const xml = await response.text();

      for (const match of xml.matchAll(/<loc>(.*?)<\/loc>/gims)) {
        const loc = match[1]?.trim();
        if (!loc) continue;

        if (loc.endsWith(".xml")) {
          try {
            const nestedResponse = await fetch(loc, {
              headers: {
                "User-Agent": "dadahub-workshop-indexer/1.0",
              },
            });
            if (!nestedResponse.ok) continue;

            const nestedXml = await nestedResponse.text();
            for (const nestedMatch of nestedXml.matchAll(/<loc>(.*?)<\/loc>/gims)) {
              const nestedLoc = nestedMatch[1]?.trim();
              if (!nestedLoc) continue;

              const normalized = normalizeUrl(nestedLoc);
              if (shouldVisitUrl(normalized)) {
                pageUrls.add(normalized);
              }
            }
          } catch {
            continue;
          }
        } else {
          const normalized = normalizeUrl(loc);
          if (shouldVisitUrl(normalized)) {
            pageUrls.add(normalized);
          }
        }
      }
    } catch {
      continue;
    }
  }

  return [...pageUrls];
}

const queue = [
  ...new Set([...seedUrls, ...(await fetchSitemapUrls())].map(normalizeUrl)),
];
const visited = new Set();
const pageHtml = new Map();

while (queue.length > 0 && visited.size < MAX_PAGES) {
  const url = queue.shift();
  if (!url || visited.has(url)) continue;
  visited.add(url);

  let fetchedPage;
  try {
    fetchedPage = await fetchPage(url);
  } catch (error) {
    console.warn(
      `Skipping ${url}: ${
        error instanceof Error ? error.message : "fetch failed"
      }`,
    );
    continue;
  }

  pageHtml.set(fetchedPage.url, fetchedPage.html);

  for (const link of extractInternalLinks(fetchedPage.html)) {
    if (!visited.has(link) && !queue.includes(link) && shouldVisitUrl(link)) {
      queue.push(link);
    }
  }
}

const entries = [];
const seenContent = new Set();
const pageSummaries = [];

for (const [url, html] of pageHtml.entries()) {
  const pageTitle = getTitle(html).replace(/\s*-\s*Dada Devs\s*$/i, "").trim();
  const description = getDescription(html);
  const mainHtml = extractMainHtml(html);
  const tokens = extractTokens(mainHtml);
  const sections = collectSections(pageTitle, description, tokens);
  let pageChunkCount = 0;

  for (const section of sections) {
    for (const chunk of buildChunks(url, pageTitle, section)) {
      const key = `${chunk.title}::${chunk.content}`;
      if (seenContent.has(key)) continue;
      seenContent.add(key);
      entries.push(chunk);
      pageChunkCount += 1;
    }
  }

  if (pageChunkCount > 0) {
    pageSummaries.push({
      url,
      pageTitle,
      description,
      sectionCount: sections.length,
      chunkCount: pageChunkCount,
    });
  }
}

entries.sort((a, b) => a.url.localeCompare(b.url) || a.id.localeCompare(b.id));
pageSummaries.sort((a, b) => a.url.localeCompare(b.url));

if (entries.length === 0) {
  throw new Error(
    "Scrape produced zero knowledge chunks. Refusing to overwrite the site index.",
  );
}

await mkdir(outputDir, { recursive: true });
await writeFile(outputPath, JSON.stringify(entries, null, 2));
await writeFile(
  manifestPath,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      pageCount: pageSummaries.length,
      chunkCount: entries.length,
      pages: pageSummaries,
    },
    null,
    2,
  ),
);

console.log(`Saved ${entries.length} knowledge chunks to ${outputPath}`);
