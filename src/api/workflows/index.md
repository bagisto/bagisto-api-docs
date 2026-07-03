---
outline: false
---

# Workflows

A workflow is the ordered sequence of Bagisto API calls a client fires to complete a feature — and which call depends on which. Each page shows the dependency flow as a diagram, then links the endpoint page backing every step. Bagisto has no server-side workflow primitive; "workflow" here means the client call-sequence, framework-agnostic.

## How to read a workflow page

Every flow page uses the same blocks:

1. **Agent-ask inputs** — values the agent must ask you for. Today that is the **server URL** and the **storefront key**.
2. **Prerequisites** — what must exist first (key, cart token, auth).
3. **Dependency diagram** — a Mermaid flow you can follow top to bottom.
4. **Ordered call table** — step, endpoint (linked), what it depends on.
5. **End-to-end example** — the happy path, REST and GraphQL.
6. **Customize** — link to extend the flow.

## Shop

| Workflow | What it builds |
|----------|----------------|
| [Build a Storefront](/api/workflows/shop/build-a-storefront) | Catalog, cart, and checkout end to end |
| [Cart](/api/workflows/shop/cart) | Guest/customer cart, add/update items, coupons, merge on login |
| [Checkout](/api/workflows/shop/checkout) | Addresses, shipping, payment methods, place order |

## Admin

| Workflow | What it builds |
|----------|----------------|
| [Build an Admin Dashboard](/api/workflows/admin/build-an-admin-dashboard) | The complete blueprint — every admin menu mapped to its API |
| [Create-Order Flow](/api/workflows/admin/create-order-flow) | Placing an order for a customer (sequential draft-cart state machine) |
| [Product Management](/api/workflows/admin/product-management) | Create/edit products — 7 types, two-step create, image/inventory/price panels |
| [Order Fulfillment Actions](/api/workflows/admin/order-fulfillment-actions) | Invoice, ship, refund, cancel — per-order eligibility guards |
| [Customers (Impersonate & GDPR)](/api/workflows/admin/customers) | Impersonation token and GDPR delete/download flows |
| [Marketing](/api/workflows/admin/marketing) | Promotions, communications, search & SEO — rule reindex, campaigns, coupons, sitemaps |
| [Configuration](/api/workflows/admin/configuration) | Slug-scoped store settings via three generic endpoints |

## Customization

Extending the API itself (adding or changing endpoints) — see [Customization](/api/workflows/customization/).

::: tip Building with an AI agent?
See [Build with AI](/api/build-with-ai) for the `llms.txt` index, the agent skills, and the optional docs MCP server.
:::
