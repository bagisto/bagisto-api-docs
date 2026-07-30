# Introduction

Bagisto provides comprehensive API solutions to help developers integrate and extend the platform's functionality. Whether you're building mobile apps, third-party integrations, or headless commerce solutions, our APIs offer the flexibility and power you need.

Both transports expose the **same** data and behaviour — pick the one that fits how you build. Full CRUD, pagination, and token authentication are available on both; the differences below are what actually set them apart.

## GraphQL API

The Bagisto GraphQL API enables flexible, efficient data fetching from a single endpoint. Ideal for:

- **Headless Commerce** - Power modern frontend frameworks
- **Mobile Apps** - Reduce bandwidth with precise data queries
- **Custom Storefronts** - Build unique shopping experiences
- **Composite Screens** - Fetch a whole screen's data in one request

**What sets it apart:**
- Single endpoint for every operation
- Fetch exactly the fields you need — no over- or under-fetching
- Related data (product + variants + images, or cart + items + totals) in one round-trip
- Cursor-based pagination
- Typed schema with introspection

GraphQL suits modern frontend frameworks like React, Vue, and React Native. See the [GraphQL API Guide](/api/graphql-api/introduction) to get started.

## REST API

The Bagisto REST API follows RESTful principles and provides complete access across all Bagisto features. Perfect for:

- **Mobile Applications** - Build native iOS/Android shopping apps
- **Third-party Integrations** - Connect with external systems and services
- **Progressive Web Apps (PWA)** - Create fast, app-like web experiences
- **Custom Admin Interfaces** - Build specialized admin tools

**What sets it apart:**
- Standard HTTP verbs (GET/POST/PUT/DELETE) and status codes
- One resource per URL — predictable and easy to cache
- Works with any HTTP client — no query language to learn
- Header-based pagination (`X-Total-Count`, `X-Page`, `X-Per-Page`, `X-Total-Pages`)
- Interactive "try it" documentation

New to REST? See the [REST API Guide](/api/rest-api/introduction) for setup and examples.

## Build with AI

These docs are built for AI coding agents (Claude Code, Codex, Antigravity) as much as for humans. A machine-readable [`llms.txt`](/llms.txt) indexes every endpoint, so an agent can discover the whole API surface in one fetch. Point your agent at **[Build with AI](/api/build-with-ai/)** — the hub that ties together every AI resource (`llms.txt`, agent skills, and the MCP server). Two ways to make an assistant productive on Bagisto:

### Agent Skills

Installable build-rules that teach an agent the storefront flows, the auth model, and the transport gotchas (`token` vs `apiToken`, `id` vs `_id`, filter and sort shapes) up front — so it writes correct calls instead of rediscovering them each session. Install once with `npx skills add bagisto/agent-skills`. See [Agent Skills](/api/build-with-ai/agent-skills).

### MCP Server

An optional local server that lets an agent search these docs on demand from inside the editor — it pulls the exact request and response for an endpoint mid-task instead of guessing. Runs on your machine, indexes the latest published docs. See [MCP Server](/api/build-with-ai/mcp-server).

## Workflows

Individual endpoint pages document one call; the [Workflows](/api/workflows/) show how to **chain** them into a real task — browse & filter catalog, cart, checkout, customer account, returns, and more — each with a dependency diagram and an ordered call table. Start here (agent or human) when building an end-to-end flow rather than a single request.

## What's Next?

Ready to start building? Choose your preferred API approach:

- ⚡ [GraphQL API Guide](/api/graphql-api/introduction) - Modern GraphQL for flexible queries
- 🔗 [REST API Guide](/api/rest-api/introduction) - RESTful API for traditional integrations
- 📚 [Setup](/api/setup) - Installation and setup
- 🔐 [Authentication](/api/authentication) - Authentication methods
- 📊 [Rate Limiting](/api/rate-limiting) - Understanding API rate limits
- 🤖 [Build with AI](/api/build-with-ai/) - Agent skills, `llms.txt`, and MCP server
- 🧭 [Workflows](/api/workflows/) - End-to-end call sequences
