---
outline: false
---

# MCP Server

Bagisto provides an **optional** [MCP](https://modelcontextprotocol.io) (Model Context Protocol) server that lets an AI agent search this documentation on demand, from inside the editor, while it writes code.

It is optional: [`/llms.txt`](/llms.txt) and [`/llms-full.txt`](/llms-full.txt) cover the same knowledge statically. The MCP server is worth adding when you want the agent to pull the *exact* current page for an endpoint mid-task instead of ingesting the whole index.

## Why use it

- **Live lookup while coding.** The agent fetches the precise request/response shape for an endpoint at the moment it needs it — no copy-pasting docs into the chat.
- **Always current.** It indexes the published docs, so the agent reads the same reference you do, not a stale snapshot from its training data.
- **Smaller context.** Instead of loading `llms-full.txt`, the agent pulls only the page it is working on, leaving room for your actual code.

For building a storefront, that means when the agent reaches the checkout step it can look up the exact address-input fields and the shipping-then-payment sequence on demand, rather than guessing or asking you.

## Tools it exposes

| Tool | What it does |
|---|---|
| `search_api_docs` | Full-text search across the API documentation |
| `list_endpoints` | Enumerate documented endpoints (filterable by surface / menu) |
| `get_doc` | Fetch one page's full content by path |

## Install

- **Repository:** [`bagisto/mcp`](https://github.com/bagisto/mcp)

The repo README has the setup and the exact command to register the server with your agent (for example `claude mcp add` for Claude Code, or the editor's MCP settings for Cursor / Windsurf).

## Do you need it?

No — it is a convenience, not a requirement. If you have installed the [Agent Skills](/api/build-with-ai/agent-skills) and the agent can reach [`/llms.txt`](/llms.txt), you already have everything needed to build. Add the MCP server if you want on-demand, in-editor doc search on top of that.
