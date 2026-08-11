---
outline: false
apiType: rest
examples:
  - id: register-claude-code
    title: Register — Claude Code
    description: Run from inside the cloned repo so $(pwd) fills the absolute path. Verify shows the server connected.
    request: |
      cd /path/to/mcp
      npm install

      claude mcp add bagisto-mcp -- node "$(pwd)/src/index.mjs"
    response: |
      $ claude mcp list
      bagisto-mcp   node …/src/index.mjs   ✓ Connected
  - id: register-codex
    title: Register — Codex CLI
    description: Codex reads MCP servers from ~/.codex/config.toml. Recent builds can also add it from the CLI (run inside the cloned repo).
    request: |
      cd /path/to/mcp
      npm install

      codex mcp add bagisto-mcp -- node "$(pwd)/src/index.mjs"
    response: |
      # ~/.codex/config.toml (equivalent)
      [mcp_servers.bagisto-mcp]
      command = "node"
      args = ["<ABSOLUTE_PATH_TO_REPO>/src/index.mjs"]

      $ codex mcp list
      bagisto-mcp
  - id: register-antigravity
    title: Register — Antigravity
    description: Antigravity reads a JSON MCP config. Add a stdio server pointing node at the absolute path to src/index.mjs.
    request: |
      {
        "mcpServers": {
          "bagisto-mcp": {
            "command": "node",
            "args": ["<ABSOLUTE_PATH_TO_REPO>/src/index.mjs"]
          }
        }
      }
    response: |
      Server "bagisto-mcp" appears in the MCP panel with 4 tools:
      search_api_docs, list_endpoints, get_doc, refresh_api_docs
---

# MCP Server

An **optional** [MCP](https://modelcontextprotocol.io) server that lets an AI agent search this documentation on demand, from inside the editor, while it writes code. It **runs locally** — nothing to host — and by default indexes the latest published docs, so the agent reads the same reference you do.

It is optional: [`/llms.txt`](/llms.txt) and [`/llms-full.txt`](/llms-full.txt) cover the same knowledge statically. Add the MCP server when you want the agent to pull the *exact* current page for an endpoint mid-task instead of ingesting the whole index.

## Why use it

- **Live lookup while coding.** The agent fetches the precise request/response shape for an endpoint the moment it needs it — no copy-pasting docs into the chat.
- **Always current.** It indexes the published docs, not a stale snapshot from training data.
- **Smaller context.** The agent pulls only the page it is working on, leaving room for your code.

## Tools it exposes

| Tool | What it does |
|---|---|
| `search_api_docs` | Ranked full-text search across the API documentation |
| `list_endpoints` | Enumerate endpoints, filterable by transport (`rest`/`graphql`) and menu |
| `get_doc` | Fetch one page's full content by path |
| `refresh_api_docs` | Re-pull the latest docs in-session, no restart |

## Install

```bash
git clone https://github.com/bagisto/mcp
cd mcp
npm install
```

Requires **Node 18+**. Then register it with your agent — the panel on the right has the exact command for **Claude Code**, **Codex**, and **Antigravity**. Any other MCP client (Cursor, Windsurf, VS Code) uses the same stdio `node <path>/src/index.mjs` form.

- **Repository:** [`bagisto/mcp`](https://github.com/bagisto/mcp)

## Docs source

By default the server fetches `https://api-docs.bagisto.com/llms-full.txt` and caches it locally. To pin a local snapshot or point at a mirror, set `BAGISTO_DOCS_LLMS` to a URL or file path when registering. Call `refresh_api_docs` to pull newly-published docs mid-session.

## Do you need it?

No — it is a convenience, not a requirement. With the [Agent Skills](/api/build-with-ai/agent-skills) installed and [`/llms.txt`](/llms.txt) reachable, you already have everything needed to build. Add the MCP server for on-demand, in-editor doc search on top of that.
