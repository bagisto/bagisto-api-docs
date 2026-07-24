---
outline: false
---

# Agent Skills

The [`bagisto/agent-skills`](https://github.com/bagisto/agent-skills) repository packages Bagisto's build-rules as installable **agent skills** — domain-specific instructions that teach an AI agent how to build on and extend the API. This is the fastest way to make an assistant productive on Bagisto: install once, and the agent already knows the flows and the gotchas.

## Why install them

Without the skills, an agent rediscovers the same lessons every session — often by trial and error against a live store. The skills carry that knowledge up front:

- **The correct call sequences.** Catalog → cart → checkout → account are ordered, dependency-aware flows. The skill knows shipping rates need an address first, that a guest cart uses a cart token, and how to merge a guest cart on login.
- **The transport gotchas, baked in.** The token model (`token` is the Bearer, `apiToken` is legacy), `id` vs `_id` vs IRI, the JSON `filter:` string, `sortKey`/`reverse` — the agent applies these instead of guessing.
- **Storefront structure.** Which endpoints back the homepage, a category page, a product page, the cart drawer, and the account area — so the generated app matches how the store actually works.
- **Parity with the docs.** The skills and this documentation are kept in lockstep, so the agent's instructions and the reference pages agree.

The result: less back-and-forth, fewer wrong payloads, and generated code that follows the real API contract on the first pass.

## Install

**Building an app that consumes the API (storefront / customer app):**

```bash
npx skills add bagisto/agent-skills --skill "bagisto-api-shop"
```

**Building an admin / back-office app:**

```bash
npx skills add bagisto/agent-skills --skill "bagisto-api-admin"
```

**Extending the API itself (custom REST/GraphQL endpoints):**

```bash
npx skills add bagisto/agent-skills --skill "bagisto-api-develop"
npx skills add bagisto/agent-skills --skill "pest-testing"
```

**Everything:**

```bash
npx skills add bagisto/agent-skills
```

Target a specific agent with `-a claude-code` or `-a cursor`.

## The skills

| Skill | Use it to |
|-------|-----------|
| `bagisto-api-shop` | Build a storefront / customer app on the Shop API |
| `bagisto-api-admin` | Build an admin / back-office app on the Admin API |
| `bagisto-api-develop` | Add or extend a REST/GraphQL endpoint in the API package |
| `pest-testing` | Write the REST + GraphQL tests that lock both transports |

::: tip Grouped skills
The API skills live under `skills/api-platform-development/` and share a `reference/` tree. Installing one pulls the shared reference automatically, so prefer installing the pack (or the grouped skill) over copying a single file.
:::

## After installing

Point the agent at the [Build with AI](/api/build-with-ai/) start order — [Authentication](/api/authentication) and the [Storefront](/api/workflows/shop/) overview first, then [`/llms.txt`](/llms.txt) to find endpoints, then the [Workflows](/api/workflows/) for the call sequence. The skill supplies the rules; the docs supply the exact payloads.
