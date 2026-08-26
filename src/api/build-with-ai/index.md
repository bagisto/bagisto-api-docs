---
outline: false
---

# Build with AI

This documentation is built to be consumed by AI coding agents (Claude Code, Codex, Antigravity, and other MCP-capable editors) as well as humans. If you are building a storefront or an app on the Bagisto API — or extending the API itself — with an AI assistant, point it at the resources on this page.

Three things make an agent productive here, in order of how much they help:

| Resource | What it gives the agent | Page |
|---|---|---|
| **Agent Skills** | The full build playbook — call sequences, gotchas (token model, `id` vs `_id`, filters) baked in, so the agent doesn't rediscover them | [Agent Skills](/api/build-with-ai/agent-skills) |
| **LLM Index** | A one-fetch machine index (`llms.txt`) of every endpoint, grouped by surface + transport | [Build with AI](/api/build-with-ai/#llm-index) |
| **MCP Server** *(optional)* | Live doc search from inside the editor while coding | [MCP Server](/api/build-with-ai/mcp-server) |

## LLM Index

A single file lists every documented endpoint with a one-line description and a link, so an agent can discover the whole API surface in one fetch:

- **Index:** [`/llms.txt`](/llms.txt) — every Shop and Admin endpoint, grouped by transport and menu.
- **Full content:** [`/llms-full.txt`](/llms-full.txt) — the complete documentation concatenated into one file for full ingestion.

These follow the [llms.txt convention](https://llmstxt.org). The index opens with a **Shop vs Admin** primer and two cross-cutting references every agent should read first — [Authentication](/api/authentication) and [Identifiers](/api/graphql-api/identifiers).

## Where an agent should start

1. **[Authentication](/api/authentication)** and the [Storefront](/api/workflows/shop/) overview — the credential model and the surface it is about to work on.
2. **[`/llms.txt`](/llms.txt)** — discover the exact endpoint needed.
3. That endpoint's page — the exact request body, response shape, and errors. **Never guess a payload.**
4. For end-to-end flows, the [Workflows](/api/workflows/) — ordered walkthroughs that chain real endpoint calls.

Mind the GraphQL rules: on action mutations select **result fields** (`cartId`, `orderId`, `success`) — not `id`; inputs are camelCase; the Shop and Admin GraphQL endpoints are separate (`/api/graphql` vs `/api/admin/graphql`).

**Extending the API rather than consuming it?** Point the agent at [For Developers](/api/for-developers/) instead — the registration wiring, the resource/provider/processor pattern, and the conventions an added endpoint has to follow. The skills do not carry that; these pages are the reference for it.

## Two ways to give the agent this knowledge

- **[Agent Skills](/api/build-with-ai/agent-skills)** — install packaged build-rules once; the agent then knows the storefront flows, the auth model, and the transport gotchas without you pasting context. **Start here.**
- **[MCP Server](/api/build-with-ai/mcp-server)** *(optional)* — let the agent search these docs on demand from inside the editor. Useful alongside the skills; not required, since `llms.txt` covers the same need statically.
