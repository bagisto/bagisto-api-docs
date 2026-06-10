---
outline: false
---

# Build with AI

This documentation is built to be consumed by AI coding agents (Claude Code, Cursor, Windsurf, and others) as well as humans. If you're building an app on the Bagisto API — or extending the API itself — with an AI assistant, point it at the resources below.

## `llms.txt` — the machine-readable index

A single file lists every documented endpoint with a one-line description and a link, so an agent can discover the whole API surface in one fetch:

- **Index:** [`/llms.txt`](/llms.txt) — every Shop and Admin endpoint, grouped by transport and menu.
- **Full content:** [`/llms-full.txt`](/llms-full.txt) — the complete documentation concatenated into one file for full ingestion.

These follow the [llms.txt convention](https://llmstxt.org). An agent should fetch `llms.txt` first to map the surface, then open the specific endpoint page for the exact request and response shape.

## Agent skills

The [`bagisto/api-agent-skills`](https://github.com/bagisto/bagisto-api) repository packages this knowledge as installable **agent skills** — reusable instructions that teach an agent how to install the stack, build apps on the API, and extend the API package.

Install all skills into your agent:

```bash
npx skills add bagisto/api-agent-skills
```

Install for a specific agent, or a single skill:

```bash
npx skills add bagisto/api-agent-skills -a claude-code
npx skills add bagisto/api-agent-skills --skill "bagisto-api-build-app"
```

| Skill | Use it to |
|-------|-----------|
| `bagisto-api-install` | Install Bagisto + the API package |
| `bagisto-api-build-app` | Build a storefront / admin / mobile / custom UI on the API |
| `bagisto-api-develop` | Add or extend an endpoint in the API package |
| `bagisto-api-dev-cycle` | Run the package's tests, lint, and cache cycle |
| `bagisto-api-code-review` | Review a change to the package |
| `bagisto-api-git` | Branch / stage / prepare a PR |

## Optional: local docs MCP server

The skills repo also ships an **optional** local [MCP](https://modelcontextprotocol.io) server that lets an agent search this documentation on demand — no hosting required. It indexes the API pages locally and exposes `search_api_docs`, `list_endpoints`, and `get_doc` tools.

```bash
claude mcp add bagisto-api -- node /absolute/path/to/api-agent-skills/mcp/src/index.mjs
```

You don't need the MCP server to build with AI — `llms.txt` and `llms-full.txt` cover the same need statically. See the [`mcp/README.md`](https://github.com/bagisto/bagisto-api) in the skills repo for setup.

## How an agent should use these docs

1. Fetch [`/llms.txt`](/llms.txt) to discover the endpoint you need.
2. Open that endpoint's page for the exact request body, response shape, and errors — **never guess a payload**.
3. For end-to-end flows, follow the [Recipes](/api/recipes/) — ordered walkthroughs that chain real endpoint calls.
4. Mind the GraphQL rules: select **result fields** (`cartId`, `orderId`, `success`) on action mutations — not `id`; inputs are camelCase; the Shop and Admin GraphQL endpoints are separate.
