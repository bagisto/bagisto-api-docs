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
- **Docs-first by design.** Each skill routes a task to a reference page that names the endpoints and the flow, then hands off to these docs for the exact request and response. The skill supplies the rules; the pages supply the payloads.

The result: less back-and-forth, fewer wrong payloads, and generated code that follows the real API contract on the first pass.

## Requirements

The installer is the [`skills`](https://www.npmjs.com/package/skills) CLI, which needs **Node 22.20 or newer**. On an older Node the command does not fail gracefully — it aborts with a raw `SyntaxError: The requested module 'node:util' does not provide an export named 'styleText'`, which looks like a broken package rather than a version problem. Check with `node -v` first.

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

Dropping `--skill` installs **every** skill in the repository, not only the four API ones — the repo also carries theme, package, payment-method, shipping-method, product-type, and Blade skills. Name the skills you want unless you intend to load all of them. `npx skills add bagisto/agent-skills --list` prints the full set without installing anything.

## Running it from inside an agent

You can hand these commands to the assistant and let it install its own skills. The CLI detects that it is running inside a coding agent — Claude Code, Codex, Antigravity and others set an environment variable it looks for — and then it skips every prompt and installs to that agent automatically. No extra flags are needed in that case.

Run the same command yourself in a terminal and it is interactive instead: it asks which agents to install to, and how to link the files. Two flags cover the difference:

| Flag | Use it when |
|---|---|
| `-a <agent>` | Targeting a specific agent — `claude-code`, `codex`, `antigravity`, `cursor`, `zed`, and ~70 more |
| `-y` | Scripting the install (CI, a setup script) where nothing can answer a prompt |

`npx skills add bagisto/agent-skills --skill "bagisto-api-shop" -a claude-code -y` is the fully non-interactive form.

## The skills

| Skill | Use it to |
|-------|-----------|
| `bagisto-api-shop` | Build a storefront / customer app on the Shop API |
| `bagisto-api-admin` | Build an admin / back-office app on the Admin API |
| `bagisto-api-develop` | Add or extend a REST/GraphQL endpoint in the API package |
| `pest-testing` | Write the REST + GraphQL tests that lock both transports |

The three API skills live together under `skills/api-platform-development/`, and each carries its own `reference/` tree — the flows, menus, and checklists it routes to. Installing a skill brings its reference pages with it, so a single `--skill` install is self-contained.

## What the skills do not cover yet

The skills are a router over the most-used surfaces, not a mirror of this documentation. Three feature areas are documented here but have no reference page in any skill, on either the shop or the admin side:

| Area | Documented under |
|---|---|
| Returns / RMA | [Shop](/api/workflows/shop/returns-rma) and [Admin](/api/workflows/admin/returns-rma) |
| EU Withdrawal | [Shop](/api/workflows/shop/eu-withdrawal) and [Admin](/api/workflows/admin/eu-withdrawal) |
| GDPR data requests | [Shop](/api/rest-api/shop/gdpr-requests/) |

Together with the Settings menus that configure returns — reasons, statuses, rules, and custom fields — that is roughly one page in seven of this documentation. An agent following only the skill's routing tables will not find them, so when you are building any of those, point it at [`/llms.txt`](/llms.txt) and the pages above directly. Everything it needs is documented; the skill just does not signpost it.

The `bagisto-api-develop` skill targets Bagisto 2.3.8 and pins an older API Platform dependency set. If you are extending the API on 2.4.x, treat its install steps as out of date and follow the package's own requirements instead — the rest of its conventions still apply.

## After installing

Point the agent at the [Build with AI](/api/build-with-ai/) start order — [Authentication](/api/authentication) and the [Storefront](/api/workflows/shop/) overview first, then [`/llms.txt`](/llms.txt) to find endpoints, then the [Workflows](/api/workflows/) for the call sequence. The skill supplies the rules; the docs supply the exact payloads.
