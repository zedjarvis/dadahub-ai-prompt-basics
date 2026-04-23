# AGENTS

## Project Context

This repository supports Cedrouseroll OMondi's Dada Hub Residency Week 3 workshop:

- Theme: `Applied AI for African Contexts`
- Session framing: `Building AI Tools that Solve Real African Problems`
- Workshop date: `Thursday, April 23, 2026`

The monorepo has two main apps:

- `apps/web`
  Next.js full-stack workshop demo app with OpenAI chat, persona prompting,
  embeddings-based semantic retrieval, simple RAG, and cost-aware routing.

- `apps/slides`
  Slidev presentation deck for the workshop.

## Workshop Scope

The slides and practical are intended to cover:

1. Setting up API access
2. Prompt engineering basics
3. Building a simple chatbot
4. Working with embeddings for semantic search
5. Cost optimization strategies for African markets

## Working Conventions

- Keep `.env` files out of git. Use `.env.example` as the committed template.
- Update README/docs when routes, workshop flow, or developer commands change.
- Default local dev flow:
  - `pnpm dev`
  - launcher at `http://localhost:3000`
  - chatbot at `http://localhost:3000/chat`
  - slides at `http://localhost:3030`

## Presentation Notes

- The deck uses the `theme-bricks` Slidev theme.
- The practical and slides are meant to be used together during the workshop.
