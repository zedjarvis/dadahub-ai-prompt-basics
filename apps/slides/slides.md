---
theme: bricks
title: Building Useful AI Assistants Fast
info: |
  Dada Hub Residency workshop deck for Thursday, April 23, 2026.
class: text-left
transition: slide-left
drawings: false
mdc: true
colorSchema: light
themeConfig:
  primary: "#F0570F"
---

<style>
:root {
  --dada-orange: #F0570F;
  --dada-ink: #1B140F;
  --dada-sand: #FFF7F2;
  --dada-line: #F3D7C8;
}

.slidev-layout {
  background:
    radial-gradient(circle at top right, rgba(240, 87, 15, 0.08), transparent 26%),
    linear-gradient(180deg, #fffaf7 0%, #fffdfb 100%);
  color: var(--dada-ink);
}

h1, h2, h3 {
  letter-spacing: -0.03em;
}

h1 {
  color: var(--dada-ink);
}

a {
  color: var(--dada-orange);
}

code {
  color: #9f3300;
}

pre {
  border: 1px solid rgba(240, 87, 15, 0.12);
  border-radius: 18px;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  background: rgba(240, 87, 15, 0.08);
  border: 1px solid rgba(240, 87, 15, 0.16);
  color: var(--dada-orange);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.lead {
  font-size: 1.2rem;
  line-height: 1.6;
  color: rgba(27, 20, 15, 0.78);
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.card {
  border: 1px solid var(--dada-line);
  background: rgba(255, 255, 255, 0.88);
  border-radius: 24px;
  padding: 1rem 1.1rem;
  box-shadow: 0 10px 30px rgba(91, 48, 14, 0.05);
}

.mini-title {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--dada-orange);
  margin-bottom: 0.45rem;
}

.metric {
  border-radius: 24px;
  padding: 1rem 1.1rem;
  background: var(--dada-ink);
  color: white;
}

.metric strong {
  display: block;
  font-size: 1.5rem;
  line-height: 1.1;
  margin-bottom: 0.35rem;
}

.accent-box {
  border-left: 4px solid var(--dada-orange);
  background: rgba(240, 87, 15, 0.06);
  border-radius: 16px;
  padding: 0.9rem 1rem;
}

.compare {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.bad {
  border: 1px solid #efc8bc;
  background: #fff5f2;
  border-radius: 20px;
  padding: 1rem;
}

.good {
  border: 1px solid var(--dada-line);
  background: #fffdfa;
  border-radius: 20px;
  padding: 1rem;
}

.flow {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.node {
  padding: 0.75rem 1rem;
  border-radius: 999px;
  border: 1px solid var(--dada-line);
  background: white;
  font-weight: 600;
}

.arrow {
  color: var(--dada-orange);
  font-weight: 700;
}

.footer-note {
  font-size: 0.82rem;
  color: rgba(27, 20, 15, 0.62);
}

.resource-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.resource-item {
  border: 1px solid var(--dada-line);
  background: rgba(255, 255, 255, 0.88);
  border-radius: 22px;
  padding: 1rem 1.1rem;
}

.resource-item strong {
  display: block;
  margin-bottom: 0.35rem;
}

ul.tight li,
ol.tight li {
  margin-bottom: 0.35rem;
}
</style>

---
layout: cover
---

<div class="eyebrow">Dada Hub Residency • April 23, 2026</div>

<div class="mt-8"></div>

# Building Useful AI Assistants Fast

<div class="lead mt-6 max-w-180">
From API access to a simple RAG chatbot
</div>

<div class="grid-2 mt-10">
  <div class="card">
    <div class="mini-title">Speaker</div>
    <div><strong>Cedrouseroll OMondi</strong></div>
    <div class="footer-note">13:00–14:00 EAT</div>
  </div>
  <div class="card">
    <div class="mini-title">Focus</div>
    <div><strong>Practical AI building</strong></div>
    <div class="footer-note">API keys, prompts, chatbot, retrieval, costs</div>
  </div>
</div>

---

<div class="eyebrow">Today</div>

# What You’ll Leave With

<div class="grid-3 mt-8">
  <div class="card"><strong>API access</strong><br>OpenAI / Claude setup basics</div>
  <div class="card"><strong>Prompt structure</strong><br>Role, task, context, constraints</div>
  <div class="card"><strong>Chatbot flow</strong><br>UI, API route, model response</div>
  <div class="card"><strong>Embeddings</strong><br>Search by meaning</div>
  <div class="card"><strong>Simple RAG</strong><br>Retrieve, ground, answer</div>
  <div class="card"><strong>Cost thinking</strong><br>Build within real constraints</div>
</div>

<div class="accent-box mt-6">
Working starting point, not theory overload.
</div>

---

<div class="eyebrow">Use Case</div>

# One Example, End To End

## Dada Devs program assistant

<div class="grid-3 mt-8">
  <div class="card">
    <div class="mini-title">Relatable</div>
    <p>Cohort applications, program pathways, Dada Hub questions, mentor info</p>
  </div>
  <div class="card">
    <div class="mini-title">Flexible</div>
    <p>Works with multiple personas and a small knowledge base</p>
  </div>
  <div class="card">
    <div class="mini-title">Practical</div>
    <p>Easy to continue during the self-directed block</p>
  </div>
</div>

<div class="flow">
  <div class="node">Prompt</div>
  <div class="arrow">→</div>
  <div class="node">Data</div>
  <div class="arrow">→</div>
  <div class="node">Model</div>
  <div class="arrow">→</div>
  <div class="node">UI</div>
</div>

---

<div class="eyebrow">Setup</div>

# API Access In Practice

<div class="grid-2 mt-6">
  <div class="card">
    <ul class="tight">
      <li>Get a provider key</li>
      <li>Store it in <code>.env.local</code></li>
      <li>Keep secrets server-side</li>
      <li>Test with one request</li>
    </ul>
  </div>
  <div>

```bash
OPENAI_API_KEY=your_key_here
OPENAI_MODEL_CHEAP=gpt-4.1-nano
OPENAI_MODEL_COMPLEX=gpt-4.1-mini
EMBEDDING_MODEL=text-embedding-3-small
```

  </div>
</div>

---

<div class="eyebrow">Prompting</div>

# A Useful Prompt Has Structure

<div class="grid-3 mt-8">
  <div class="card"><strong>Role</strong><br>Who the assistant is</div>
  <div class="card"><strong>Task</strong><br>What it should do</div>
  <div class="card"><strong>Context</strong><br>What situation it is in</div>
  <div class="card"><strong>Constraints</strong><br>Length, honesty, limits</div>
  <div class="card"><strong>Output style</strong><br>Tone and format</div>
  <div class="card"><strong>Formula</strong><br>Role + Goal + Context + Constraints + Style</div>
</div>

<div class="compare mt-8">
  <div class="bad">
    <div class="mini-title">Weak</div>
    <p>Help users with this business.</p>
  </div>
  <div class="good">
    <div class="mini-title">Better</div>
    <p>You are a helpful support assistant for a small Nairobi-based electronics shop. Keep replies short and clear.</p>
  </div>
</div>

---

<div class="eyebrow">Personas</div>

# Same Model, Different Assistant

<div class="grid-3 mt-8">
  <div class="card">
    <div class="mini-title">Persona 1</div>
    <h3>Program Guide</h3>
    <p>Clear, structured, pathway-focused</p>
  </div>
  <div class="card">
    <div class="mini-title">Persona 2</div>
    <h3>Residency Support</h3>
    <p>Helpful, schedule-aware, operational</p>
  </div>
  <div class="card">
    <div class="mini-title">Persona 3</div>
    <h3>Contributor Guide</h3>
    <p>Contribution-oriented, technical, next-step driven</p>
  </div>
</div>

<div class="accent-box mt-8">
Prompting is product design.
</div>

---

<div class="eyebrow">Architecture</div>

# The Simplest Useful Chatbot Flow

<div class="flow mt-8">
  <div class="node">User</div>
  <div class="arrow">→</div>
  <div class="node">Next.js UI</div>
  <div class="arrow">→</div>
  <div class="node">API route</div>
  <div class="arrow">→</div>
  <div class="node">Model</div>
  <div class="arrow">→</div>
  <div class="node">Response</div>
</div>

<div class="grid-2 mt-10">
  <div class="card">
    <div class="mini-title">Keep</div>
    <ul class="tight">
      <li>One page</li>
      <li>One API route</li>
      <li>One model call</li>
      <li>One persona config</li>
    </ul>
  </div>
  <div class="card">
    <div class="mini-title">Skip for now</div>
    <ul class="tight">
      <li>Auth</li>
      <li>Database</li>
      <li>Agents</li>
      <li>Complex orchestration</li>
    </ul>
  </div>
</div>

---

<div class="eyebrow">Demo</div>

# What The App Is Doing

<div class="grid-2 mt-8">
  <div class="card">
    <div class="mini-title">Frontend</div>
    <ol class="tight">
      <li>Select persona</li>
      <li>Type message</li>
      <li>Send request</li>
      <li>Render answer</li>
    </ol>
  </div>
  <div class="card">
    <div class="mini-title">Backend</div>
    <ol class="tight">
      <li>Load persona prompt</li>
      <li>Retrieve relevant context</li>
      <li>Call the model</li>
      <li>Return grounded response</li>
    </ol>
  </div>
</div>

---

<div class="eyebrow">RAG</div>

# From Chatbot To Grounded Assistant

<div class="flow mt-8">
  <div class="node">Question</div>
  <div class="arrow">→</div>
  <div class="node">Retrieve notes</div>
  <div class="arrow">→</div>
  <div class="node">Add context</div>
  <div class="arrow">→</div>
  <div class="node">Generate answer</div>
</div>

<div class="grid-3 mt-10">
  <div class="card"><strong>Without retrieval</strong><br>General model knowledge</div>
  <div class="card"><strong>With retrieval</strong><br>Answers grounded in your data</div>
  <div class="card"><strong>Use cases</strong><br>Policies, FAQs, school rules, service info</div>
</div>

---

<div class="eyebrow">Embeddings</div>

# Semantic Search

<div class="compare mt-8">
  <div class="card">
    <div class="mini-title">User asks</div>
    <h3>How do I apply for the next cohort?</h3>
  </div>
  <div class="card">
    <div class="mini-title">System retrieves</div>
    <h3>Programs / who can apply</h3>
  </div>
</div>

<div class="grid-3 mt-8">
  <div class="card"><strong>Keyword search</strong><br>Exact words</div>
  <div class="card"><strong>Semantic search</strong><br>Meaning and intent</div>
  <div class="card"><strong>Embeddings</strong><br>Help find the right chunks</div>
</div>

---

<div class="eyebrow">Costs</div>

# Build For Real Constraints

<div class="grid-2 mt-8">
  <div class="card">
    <div class="mini-title">What increases cost</div>
    <ul class="tight">
      <li>Too much context</li>
      <li>Larger models by default</li>
      <li>Long responses</li>
      <li>Too many retrieved chunks</li>
    </ul>
  </div>
  <div class="card">
    <div class="mini-title">What reduces cost</div>
    <ul class="tight">
      <li>Use smaller models first</li>
      <li>Limit tokens</li>
      <li>Retrieve less, not more</li>
      <li>Cache repeated answers</li>
    </ul>
  </div>
</div>

<div class="accent-box mt-8">
Optimize for token budgets, mobile realities, and bandwidth limits.
</div>

---

<div class="eyebrow">Next</div>

# Self-Directed Block + Homework

## Build a chatbot for a local use case

<div class="grid-2 mt-8">
  <div class="card">
    <div class="mini-title">Examples</div>
    <ul class="tight">
      <li>Dada Devs cohort application assistant</li>
      <li>Dada Hub residency schedule assistant</li>
      <li>Bitcoin track FAQ assistant</li>
      <li>Mentor and partner inquiry assistant</li>
      <li>Open-source contribution guide</li>
    </ul>
  </div>
  <div class="card">
    <div class="mini-title">Keep scope small</div>
    <ul class="tight">
      <li>One audience</li>
      <li>One persona</li>
      <li>One knowledge base</li>
      <li>One simple UI</li>
    </ul>
  </div>
</div>

---
layout: default
---

<div class="eyebrow">Resources</div>

# Tools And References Used

<div class="resource-list mt-8">
  <div class="resource-item">
    <strong>Next.js</strong>
    App Router full-stack workshop app
    <br>
    <a href="https://nextjs.org/docs/app/getting-started/installation">nextjs.org/docs/app/getting-started/installation</a>
  </div>
  <div class="resource-item">
    <strong>shadcn/ui</strong>
    UI primitives and registry workflow
    <br>
    <a href="https://ui.shadcn.com/">ui.shadcn.com</a>
  </div>
  <div class="resource-item">
    <strong>AI SDK</strong>
    Chat route, streaming, UI integration
    <br>
    <a href="https://ai-sdk.dev/docs">ai-sdk.dev/docs</a>
  </div>
  <div class="resource-item">
    <strong>assistant-ui</strong>
    Chat interface primitives and timing UI
    <br>
    <a href="https://www.assistant-ui.com/examples/ai-sdk">assistant-ui.com/examples/ai-sdk</a>
  </div>
</div>

<div class="footer-note mt-6">
Core app stack for the practical: framework, UI layer, streaming, and chat interface.
</div>

---
layout: default
---

<div class="eyebrow">Resources</div>

# Workflow And Delivery References

<div class="resource-list mt-8">
  <div class="resource-item">
    <strong>OpenAI API</strong>
    Model calls and embeddings
    <br>
    <a href="https://platform.openai.com/docs">platform.openai.com/docs</a>
  </div>
  <div class="resource-item">
    <strong>Slidev</strong>
    Presentation authoring and delivery
    <br>
    <a href="https://sli.dev/">sli.dev</a>
  </div>
  <div class="resource-item">
    <strong>MCP</strong>
    Mentioned as part of the modern AI tooling ecosystem
    <br>
    <a href="https://modelcontextprotocol.io/">modelcontextprotocol.io</a>
  </div>
  <div class="resource-item">
    <strong>Codex + Skills</strong>
    Coding agent workflow using Slidev, Next.js, shadcn, and frontend design skills
    <br>
    OpenAI Codex coding agent
  </div>
</div>

<div class="footer-note mt-6">
Also used in this workflow: semantic retrieval, persona prompting, cost-aware routing, and local knowledge-base chunking.
</div>

---
layout: statement
---

# Build something useful.
# Keep it small.
# Make it continue after today.
