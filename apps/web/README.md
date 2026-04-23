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
- embeddings-based semantic retrieval
- simple RAG grounding from a local FAQ dataset
- cost-aware routing between cheaper and stronger models
- thread title generation from the first user message

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

- `src/app/api/thread-title/route.ts`
  auto-generates chat thread titles

- `src/lib/personas.ts`
  persona prompts

- `src/lib/rag.ts`
  retrieval logic

- `src/lib/router.ts`
  simple cost-aware model routing

- `src/data/faq.json`
  local knowledge base

## Notes

- `.env` files are ignored by git.
- `.env.example` lives at the repo root as the shared template.
