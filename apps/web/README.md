# Workshop Web App

Next.js full-stack demo app for the Dada Hub Residency AI workshop.

## Routes

- `/`
  launcher page with two paths:
  - demo chatbot
  - presentation

- `/chat`
  workshop chatbot demo

## What The Demo Shows

- OpenAI API access through server-side route handlers
- prompt engineering through selectable personas
- `@` persona tagging in the composer
- Dada Devs site scraping into a structured knowledge index
- embeddings-based semantic retrieval
- simple RAG grounding from indexed Dada Devs content
- cost-aware routing between cheaper and stronger models
- thread title generation from the first user message
- a semantic search lab that shows retrieval before generation

## Run Locally

From the repo root:

```bash
pnpm dev:web
```

Or from this app directory:

```bash
pnpm dev
```

## Environment

Create `apps/web/.env.local`:

```bash
OPENAI_API_KEY=
OPENAI_MODEL_CHEAP=gpt-4.1-nano
OPENAI_MODEL_COMPLEX=gpt-4.1-mini
EMBEDDING_MODEL=text-embedding-3-small
```

## Key Files

- `src/app/page.tsx`
  launcher page

- `src/app/chat/page.tsx`
  main chatbot UI

- `src/app/api/chat/route.ts`
  chat route, RAG, scope handling, model routing

- `src/app/api/retrieve/route.ts`
  retrieval-only endpoint for the semantic search lab

- `src/app/api/thread-title/route.ts`
  auto-generates chat thread titles

- `src/lib/personas.ts`
  persona prompts

- `src/lib/rag.ts`
  retrieval logic

- `src/lib/router.ts`
  simple cost-aware model routing

- `scripts/scrape-dadadevs.mjs`
  builds the Dada Devs site index

- `scripts/embed-kb.mjs`
  generates embedding snapshots for the site index

- `src/data/site-index.json`
  structured knowledge base built from the Dada Devs website

- `src/data/site-embeddings.json`
  precomputed embeddings snapshot

- `src/data/site-manifest.json`
  page-level crawl manifest

## Knowledge Base Refresh

From the repo root:

```bash
pnpm --dir apps/web scrape:kb
pnpm --dir apps/web embed:kb
```

## Notes

- `.env` files are ignored by git.
- `.env.example` lives at the repo root as the shared template.
