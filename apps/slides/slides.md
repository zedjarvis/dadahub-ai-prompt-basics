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

<div class="grid-2 mt-7">
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

<div class="accent-box mt-8">
Good prompt = Role + Goal + Context + Constraints + Output style
</div>

---

<div class="eyebrow">Weak vs Better Prompt</div>

# Weak Prompt

<div class="bad mt-8">
  <div class="mini-title">Prompt</div>
  <p>Help users with Dada Devs.</p>
</div>

<div class="card mt-8">
  <div class="mini-title">What’s missing</div>
  <ul class="tight">
    <li>No assistant role</li>
    <li>No audience or use case context</li>
    <li>No rules about uncertainty</li>
    <li>No required output structure</li>
    <li>No examples of good answers</li>
  </ul>
</div>

---

<div class="eyebrow">Weak vs Better Prompt</div>

# Better Prompt Structure

<div class="good mt-8">
  <div class="mini-title">Prompt</div>
  <p><strong>Role:</strong> You are the Dada Devs Program Guide.</p>
  <p><strong>Task:</strong> Help users understand pathways, eligibility, Dada Hub, workshops, mentorship, and partner opportunities.</p>
  <p><strong>Context:</strong> Answer using retrieved Dada Devs website content when available. If the site content does not support a claim, say so.</p>
  <p><strong>Constraints:</strong> Keep answers concise, practical, and accurate. Do not invent dates, requirements, or promises.</p>
  <p><strong>Output format:</strong> Use short sections: <code>Answer</code>, <code>Recommended next step</code>, and <code>Sources used</code>.</p>
</div>

<div class="card mt-8">
  <div class="mini-title">What’s added</div>
  <ul class="tight">
    <li>Clear role and task</li>
    <li>Grounding rules for retrieval</li>
    <li>Explicit constraints</li>
    <li>Output structure</li>
    <li>No ambiguity about behavior</li>
  </ul>
</div>

---

<div class="eyebrow">Weak vs Better Prompt</div>

# Better Prompt Example

<div class="good mt-8">
  <div class="mini-title">Example input</div>
  <p>How can I move from learning into Bitcoin open-source contribution?</p>
</div>

<div class="good mt-6">
  <div class="mini-title">Example output</div>
  <p><strong>Answer:</strong> Start with the pathway that matches your level, then use Dada Hub and mentorship opportunities to move into practical contribution.</p>
  <p><strong>Recommended next step:</strong> Review the Pathways page and the Bitcoin track.</p>
  <p><strong>Sources used:</strong> Pathways, Dada Hub.</p>
</div>

<div class="card mt-8">
  <div class="mini-title">Why this is stronger</div>
  <ul class="tight">
    <li>Shows the exact response shape</li>
    <li>Makes formatting more consistent</li>
    <li>Sets expectations for grounded answers</li>
    <li>Works well with retrieval-based chatbots</li>
  </ul>
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

<div class="eyebrow">Before LLMs</div>

# How Chatbots Worked Before GPT-Style Models

<div class="flow mt-8">
  <div class="node">Tokenize text</div>
  <div class="arrow">→</div>
  <div class="node">TF-IDF vectors</div>
  <div class="arrow">→</div>
  <div class="node">Intent classifier</div>
  <div class="arrow">→</div>
  <div class="node">Pre-written response</div>
</div>

<div class="grid-2 mt-8">
  <div class="card">
    <div class="mini-title">Typical pipeline</div>
    <ol class="tight">
      <li>Split text into words, sentences, or paragraphs</li>
      <li>Vectorize with TF-IDF across the corpus</li>
      <li>Predict intent with models like Naive Bayes</li>
      <li>Select a predefined answer for that intent</li>
    </ol>
  </div>
  <div class="card">
    <div class="mini-title">Main limitation</div>
    <ul class="tight">
      <li>Rigid response set</li>
      <li>Weak handling of new phrasing</li>
      <li>No real synthesis across documents</li>
      <li>Heavy manual maintenance</li>
    </ul>
  </div>
</div>

<div class="accent-box mt-8">
Modern RAG chatbots still retrieve information, but LLMs replace the old fixed response layer with grounded generation.
</div>

---

<div class="eyebrow">Indexing</div>

# How We Build The Knowledge Base

<div class="flow mt-8">
  <div class="node">Scrape Dada Devs pages</div>
  <div class="arrow">→</div>
  <div class="node">Chunk sections</div>
  <div class="arrow">→</div>
  <div class="node">Create embeddings</div>
  <div class="arrow">→</div>
  <div class="node">Store site index</div>
</div>

<div class="grid-2 mt-10">
  <div class="card">
    <div class="mini-title">Source pages</div>
    <ul class="tight">
      <li>Home, About, Pathways, Workshop, Contact</li>
      <li>Dada Citadel, Mentor, Partner pages</li>
      <li>Bitcoin track curriculum</li>
      <li>Blog posts and related internal pages</li>
    </ul>
  </div>
  <div class="card">
    <div class="mini-title">Why this matters</div>
    <ul class="tight">
      <li>The chatbot answers from current org content</li>
      <li>We can inspect exactly what was indexed</li>
      <li>We avoid one giant prompt with all site text</li>
      <li>Retrieval becomes teachable, not hidden</li>
    </ul>
  </div>
</div>

---

<div class="eyebrow">Embeddings</div>

# What Embeddings Are Doing Here

<div class="grid-3 mt-8">
  <div class="card">
    <div class="mini-title">1. Convert</div>
    <p>Each text chunk becomes a numeric vector using <code>text-embedding-3-small</code>.</p>
  </div>
  <div class="card">
    <div class="mini-title">2. Compare</div>
    <p>The user query is embedded too, then compared against all chunk vectors.</p>
  </div>
  <div class="card">
    <div class="mini-title">3. Retrieve</div>
    <p>The closest chunks by meaning are passed to the model as grounded context.</p>
  </div>
</div>

<div class="accent-box mt-8">
Embeddings are not the answer. They are the search layer that helps us find the right context cheaply.
</div>

---

<div class="eyebrow">Embeddings</div>

# From Scraped Text To Searchable Chunk

<div class="grid-3 mt-8">
  <div class="card">
    <div class="mini-title">1. Scraped text</div>
    <p><strong>Source page:</strong> Mastering Bitcoin track</p>
    <p class="footer-note">Bitcoin Core Development Environment<br>Configuring the Core Build<br>Running a Bitcoin Node<br>A developer is needed for this session</p>
  </div>
  <div class="card">
    <div class="mini-title">2. Chunked record</div>
    <p><strong>Title:</strong> Mastering Bitcoin — Bitcoin Core</p>
    <p><strong>Section:</strong> Bitcoin Core</p>
    <p class="footer-note">Stored with URL, page title, section, tags, and chunk text.</p>
  </div>
  <div class="card">
    <div class="mini-title">3. Converted</div>
    <p><strong>Embedding vector:</strong></p>
    <p class="footer-note"><code>[0.014, -0.083, 0.221, 0.057, ...]</code></p>
    <p class="footer-note">The vector is long, but now this chunk can be compared by meaning instead of exact words.</p>
  </div>
</div>

<div class="accent-box mt-5">
This is the key move: website text becomes structured records, then vectorized search targets.
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
    <h3>How can I move from learning into real Bitcoin open-source contribution?</h3>
  </div>
  <div class="card">
    <div class="mini-title">System retrieves</div>
    <h3>Pathways, Dada Hub, mentor and partner pages</h3>
  </div>
</div>

<div class="accent-box mt-8">
The retrieved pages do not need to repeat the same exact words. They just need to be close in meaning.
</div>

---

<div class="eyebrow">Embeddings</div>

# Keyword Search vs Semantic Search

<div class="grid-2 mt-8">
  <div class="card">
    <div class="mini-title">Why keyword search is weak</div>
    <p>The best source might not literally contain the same words as the user query.</p>
  </div>
  <div class="card">
    <div class="mini-title">Why semantic search helps</div>
    <p>The app can connect related ideas like pathways, contribution, residency, curriculum, and mentorship.</p>
  </div>
</div>

<div class="grid-3 mt-8">
  <div class="card"><strong>Keyword search</strong><br>Finds exact terms</div>
  <div class="card"><strong>Semantic search</strong><br>Finds related meaning</div>
  <div class="card"><strong>Embedding match</strong><br>Shows which chunks are likely worth paying to send</div>
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
      <li>Retrieve only the top 2–4 relevant chunks</li>
      <li>Cache repeated answers</li>
    </ul>
  </div>
</div>

<div class="accent-box mt-8">
Optimize for token budgets, mobile realities, and bandwidth limits. In the demo, retrieval depth and model choice both change with query complexity.
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
layout: default
---

<div class="eyebrow">Resources</div>

# Embeddings And Open Models

<div class="resource-list mt-8">
  <div class="resource-item">
    <strong>OpenAI Embeddings Guide</strong>
    Official guide for creating and using embeddings
    <br>
    <a href="https://platform.openai.com/docs/guides/embeddings">platform.openai.com/docs/guides/embeddings</a>
  </div>
  <div class="resource-item">
    <strong>Sentence Transformers</strong>
    Strong open-source starting point for semantic search from scratch
    <br>
    <a href="https://www.sbert.net/docs/quickstart.html">sbert.net/docs/quickstart.html</a>
  </div>
  <div class="resource-item">
    <strong>Hugging Face Hub</strong>
    Explore pretrained models, embedding models, datasets, and transformers
    <br>
    <a href="https://huggingface.co/docs/hub/models">huggingface.co/docs/hub/models</a>
  </div>
  <div class="resource-item">
    <strong>Ollama</strong>
    Run open models locally, including Llama-family and other small models
    <br>
    <a href="https://docs.ollama.com/">docs.ollama.com</a>
  </div>
</div>

<div class="accent-box mt-6">
Good free path to explore after today: Sentence Transformers for embeddings, Hugging Face Hub for model discovery, and Ollama for local experimentation with open models.
</div>

---
layout: statement
---

# Build something useful.
# Keep it small.
# Make it continue after today.
