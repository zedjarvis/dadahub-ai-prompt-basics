# DadaHub AI Prompt Basics

Monorepo for Cedrouseroll OMondi's Dada Hub Residency workshop:

- theme: `Applied AI for African Contexts`
- session framing: `Building AI Tools that Solve Real African Problems`
- format: `Slidev deck + live demo chatbot`

## Apps

- `apps/web`
  Next.js full-stack workshop demo with:
  - OpenAI chat
  - persona-based prompting
  - embeddings for semantic retrieval
  - simple RAG flow
  - cost-aware routing
  - assistant-ui chat interface

- `apps/slides`
  Slidev deck for the workshop session.

## Local Development

Install dependencies:

```bash
pnpm install
```

Start both the launcher and presentation:

```bash
pnpm dev
```

Local URLs:

- launcher: `http://localhost:3000`
- chatbot demo: `http://localhost:3000/chat`
- slides: `http://localhost:3030`

## Environment

Create a local env file for the web app:

```bash
cp .env.example apps/web/.env.local
```

Required variables:

```bash
OPENAI_API_KEY=
OPENAI_MODEL_CHEAP=gpt-4.1-nano
OPENAI_MODEL_COMPLEX=gpt-4.1-mini
EMBEDDING_MODEL=text-embedding-3-small
```

`.env` files are gitignored. Keep secrets in local-only env files.

## Workspace Scripts

```bash
pnpm dev
pnpm dev:web
pnpm dev:slides
pnpm build
pnpm build:web
pnpm build:slides
pnpm lint:web
```

## Requirement Coverage

This repo is set up to support the original workshop brief:

1. `Setting up API access`
   Covered through `.env.local` setup and server-side OpenAI integration.

2. `Prompt engineering basics`
   Covered through personas and prompt structure in the chatbot flow.

3. `Building a simple chatbot`
   Covered by the Next.js demo app at `/chat`.

4. `Working with embeddings for semantic search`
   Covered by the local FAQ dataset, embeddings model, and retrieval layer.

5. `Cost optimization strategies for African markets`
   Covered by cheap-vs-standard model routing and limited retrieval/context.
