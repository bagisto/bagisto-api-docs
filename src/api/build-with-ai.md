---
outline: false
---

# Build with AI

This documentation is built to be consumed by AI coding agents (Claude Code, Cursor, Windsurf, and others) as well as humans. If you're building an app on the Bagisto API — or extending the API itself — with an AI assistant, point it at the resources below.

**Recommended order for an AI agent:** install the skills below → open [`/llms.txt`](/llms.txt) to map the API → follow the [Workflows](/api/workflows/) for the exact call-sequence → open the linked endpoint page for each request/response shape.

## `llms.txt` — the machine-readable index

A single file lists every documented endpoint with a one-line description and a link, so an agent can discover the whole API surface in one fetch:

- **Index:** [`/llms.txt`](/llms.txt) — every Shop and Admin endpoint, grouped by transport and menu.
- **Full content:** [`/llms-full.txt`](/llms-full.txt) — the complete documentation concatenated into one file for full ingestion.

These follow the [llms.txt convention](https://llmstxt.org). An agent should fetch `llms.txt` first to map the surface, then open the specific endpoint page for the exact request and response shape.

## Agent skills

The [`bagisto/agent-skills`](https://github.com/bagisto/agent-skills) repository packages Bagisto's build-rules as installable **agent skills** — domain-specific instructions that teach an agent how to build on and extend the API. Install these first, then follow the [Workflows](/api/workflows/) for the call-sequence.

**Building an app that consumes the API:**

```bash
npx skills add bagisto/agent-skills --skill "bagisto-api-shop"
npx skills add bagisto/agent-skills --skill "bagisto-api-admin"
```

**Extending the API itself (custom endpoints):**

```bash
npx skills add bagisto/agent-skills --skill "bagisto-api-develop"
npx skills add bagisto/agent-skills --skill "pest-testing"
```

**Everything:**

```bash
npx skills add bagisto/agent-skills
```

Target a specific agent with `-a claude-code` or `-a cursor`.

| Skill | Use it to |
|-------|-----------|
| `bagisto-api-shop` | Build a storefront / customer app on the Shop API |
| `bagisto-api-admin` | Build an admin / back-office app on the Admin API |
| `bagisto-api-develop` | Add or extend a REST/GraphQL endpoint in the API package |
| `pest-testing` | Write the REST + GraphQL tests that lock both transports |

::: tip Grouped skills
The API skills live under `skills/api-platform-development/` and share a `reference/` tree. Installing one pulls the shared reference automatically, so prefer installing the pack (or the grouped skill) over copying a single file.
:::

## Optional: docs MCP server

Bagisto also provides an **optional** [MCP](https://modelcontextprotocol.io) server that lets an agent search this documentation on demand. It indexes the API pages and exposes tools like `search_api_docs`, `list_endpoints`, and `get_doc`.

- **Repository:** [`bagisto/mcp`](https://github.com/bagisto/mcp) — setup and the exact `claude mcp add` command are in the repo README.

You don't need the MCP server to build with AI — [`/llms.txt`](/llms.txt) and [`/llms-full.txt`](/llms-full.txt) cover the same need statically.

## How an agent should use these docs

1. Fetch [`/llms.txt`](/llms.txt) to discover the endpoint you need.
2. Open that endpoint's page for the exact request body, response shape, and errors — **never guess a payload**.
3. For end-to-end flows, follow the [Workflows](/api/workflows/) — ordered walkthroughs that chain real endpoint calls.
4. Mind the GraphQL rules: select **result fields** (`cartId`, `orderId`, `success`) on action mutations — not `id`; inputs are camelCase; the Shop and Admin GraphQL endpoints are separate.
