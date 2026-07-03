---
outline: false
---

# Admin Workflows

The back-office call-sequences — how a client drives the Admin API (`/api/admin/*` REST + `POST /api/admin/graphql`) to rebuild any admin-panel screen. The Admin API mirrors the admin panel **menu-for-menu**.

## Agent-ask inputs

- **Integration token** — ask the user for a pre-issued admin Integration token (generated in the admin panel's Integration menu). Send it as `Authorization: Bearer <id>|<token>`. There is no admin login; the agent never mints this token.
- **Server URL** — ask the user for their Bagisto server's base URL (e.g. `https://store.example.com`) and prefix every endpoint path with it. Never assume localhost or a demo domain.

## The core pattern: list → detail → action

Almost every admin screen is the same shape:

- **List** — `GET /api/admin/<resource>` → a `{ data, meta }` envelope. Drive tables with `?page=` + `?per_page=` (default 10, cap 50) + the screen's filters. Page-count headers: `X-Total-Count`, `X-Page`, `X-Per-Page`, `X-Total-Pages`.
- **Detail** — `GET /api/admin/<resource>/{id}` → the full record with relations embedded (no follow-up calls).
- **Action** — `POST` / `PUT` / `DELETE` for create/update/delete plus per-record actions (cancel order, create invoice, mass-update, …). Each action has its own eligibility rules and permission gate — a forbidden action returns **403**.

## Start here

- **[Build an Admin Dashboard](/api/workflows/admin/build-an-admin-dashboard)** — the complete blueprint: every admin menu (Sales, Catalog, Customers, Marketing, CMS, Settings, Configuration, Dashboard/Reporting) mapped to its API. Read this for the whole picture.

## Complicated flows (with theory)

| Workflow | Why it needs its own page |
|----------|---------------------------|
| [Create-Order Flow](/api/workflows/admin/create-order-flow) | A strict sequential draft-cart state machine (409 on wrong step), booking-blocked, non-saleable guard, action-results have no selectable `id`. |
| [Product Management](/api/workflows/admin/product-management) | Attributes → families → product schema chain, two-step create (7 types, `super_attributes`), partial-update wipe traps, image/inventory/price sub-panels. |
| [Order Fulfillment Actions](/api/workflows/admin/order-fulfillment-actions) | Invoice/ship/refund/cancel eligibility guards, PayPal-invoice block, per-SKU qty, inventory-at-source, `canCreateTransaction`. |
| [Customers (Impersonate & GDPR)](/api/workflows/admin/customers) | Impersonate issues a short-lived customer token; GDPR process cascades a delete; download-data dumps every related table. |
| [Marketing](/api/workflows/admin/marketing) | Catalog-rule reindex timeout on a `sync` queue, campaign send (recipient resolution + status guard), coupon generate, sitemap sync-generate. |
| [Configuration](/api/workflows/admin/configuration) | Generic slug-scoped schema/values/update, anti-scope-escape, server-side validation, file-upload REST-only. |

## GraphQL — the must-know rules

- **Separate endpoint:** `POST /api/admin/graphql`, admin token only, **no** storefront key (the shop and admin GraphQL endpoints don't share a schema).
- **Result-field / `id` rule (most common mistake):** fetchable resources (order, product, customer…) expose `id` + `_id`; **action / result mutations** (cancel, create invoice/shipment/refund, place order, cart writes, mass-actions) return a **result object** — select the documented result fields (`success`, `message`, `orderId`, `cartId`, …), not a generic `id`.
- **Inputs are camelCase** (`customerId`, `orderId`, `indices`). Custom list filters are explicit per-query args (use the names the endpoint page shows — not auto-discoverable).
- **Collections use cursor pagination** (`first` / `after` / `edges { node }` / `pageInfo`); REST uses the `{ data, meta }` envelope instead.
- **Nested lists** (order items, invoice items, addresses) are often **plain JSON**, not connections — query them as bare fields (`items { sku qtyOrdered }`), following the endpoint's docs example.

## How to read a flow page

Intent → Agent-ask inputs → the flow/diagram → ordered calls (links to the exact endpoint pages) → theory/gotchas. Flow pages own the sequence and the non-obvious behavior; endpoint detail lives on the linked API pages.
