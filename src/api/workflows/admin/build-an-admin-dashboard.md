---
outline: false
---

# Build an Admin Dashboard

The **complete admin blueprint** — every admin-panel menu mapped to its Admin API. The API mirrors the admin panel menu-for-menu, so any back-office screen can be rebuilt from it. Use this as the map; for the two flows with real sequencing/structure gotchas, see [Create-Order](/api/workflows/admin/create-order-flow) and [Product Management](/api/workflows/admin/product-management).

Every request carries the admin Integration token:

```
Authorization: Bearer <id>|<token>
```

## Agent-ask inputs

- **Integration token** — ask the user; generated in the admin panel's Integration menu. No admin login; never mint it.
- **Server URL** — ask the user for their Bagisto server's base URL (e.g. `https://store.example.com`) and prefix every endpoint path with it. Never assume localhost or a demo domain.

## The pattern behind every screen

**list → detail → action** — a `{ data, meta }` listing (`?page` + `?per_page` + filters), a detail GET with relations embedded, then create/update/delete + per-record actions (each permission-gated → `403` if the token's role lacks it). See the [Admin Workflows overview](/api/workflows/admin/) for the envelope, pagination headers, and GraphQL rules.

## 1. Dashboard & Reporting

- **[Dashboard](/api/rest-api/admin/dashboard/)** — the headline stats behind the admin home (`?type=` picks a stat group; `?start`/`?end`/`?channel` bound the window).
- **[Reporting](/api/rest-api/admin/reporting/)** — sales / customers / products report groups, a table "view details" mode, and CSV export.

## 2. Sales

The order lifecycle and its documents:

- **[Orders](/api/rest-api/admin/sales/orders/)** — list + detail (customer, addresses, type-aware items, invoices, shipments, refunds, payment, totals — all embedded), plus per-order **actions**: cancel, create invoice / shipment / refund, add comment. Eligibility + gotchas: fulfillment actions each have their own guards.
- **[Invoices](/api/rest-api/admin/sales/invoices/)** · **[Shipments](/api/rest-api/admin/sales/shipments/)** · **[Refunds](/api/rest-api/admin/sales/refunds/)** — the document datagrids (list, detail, export; invoice print PDF + mass-update-status).
- **[Transactions](/api/rest-api/admin/sales/transactions/list)** — payment records; includes Record-Payment create.
- **[Bookings](/api/rest-api/admin/sales/bookings/)** — bookable-product reservations (read-only).
- **[Returns / RMA](/api/rest-api/admin/sales/returns/)** — the return queue: list, detail, status moves, customer messages, reopen, and admin-raised returns. Status transitions are constrained per request — see the [Returns / RMA flow →](/api/workflows/admin/returns-rma).
- **[EU Withdrawal](/api/rest-api/admin/sales/eu-withdrawal/)** — right-of-withdrawal declarations with their evidence timeline: decline, mark refunded, resend the acknowledgement. See the [EU Withdrawal flow →](/api/workflows/admin/eu-withdrawal).
- **[Create-Order flow →](/api/workflows/admin/create-order-flow)** — place an order for a customer through a draft cart.

## 3. Catalog

- **[Products](/api/rest-api/admin/catalog/products/)** — the datagrid, CRUD, copy, mass-actions, export, and the image/inventory/price sub-panels. The two-step create + partial-update traps live in **[Product Management →](/api/workflows/admin/product-management)**.
- **[Categories](/api/rest-api/admin/catalog/categories/)** — flat datagrid + nested tree; CRUD (move = update with `parent_id`+`position`); mass-actions; root-category delete guards.
- **[Attributes](/api/rest-api/admin/catalog/attributes/)** — the dynamic fields + their options sub-resource; system-attribute + in-use guards.
- **[Attribute Families](/api/rest-api/admin/catalog/families/)** — attribute groupings chosen at product-create; last-family / product-attached delete guards.

## 4. Customers

- **[Customers](/api/rest-api/admin/customers/)** — list/detail/CRUD, addresses, notes, **impersonate** ("login as customer" → a short-lived customer token), mass-actions; groups; reviews moderation; GDPR requests. Delete is guarded when the customer has active orders.

## 5. Marketing

- **[Marketing](/api/rest-api/admin/marketing/)** — Cart Rules (+ coupons: single/bulk-generate/mass-delete), Catalog Rules, Email Templates, Events, Campaigns (+ send), Newsletter Subscribers, Search Terms, Search Synonyms, URL Rewrites, Sitemaps (+ generate).

## 6. CMS

- **[CMS Pages](/api/rest-api/admin/cms/pages/)** — list/detail/CRUD + mass-delete. Create broadcasts to every locale; update is **locale-nested**.

## 7. Settings

Reference data and access control — mostly straight CRUD (+ mass-delete where the panel has it), each with its own delete guards (last-of-kind, in-use):

- **[Currencies](/api/rest-api/admin/settings/currencies/list)** · **[Locales](/api/rest-api/admin/settings/locales/list)** · **[Exchange Rates](/api/rest-api/admin/settings/exchange-rates/list)** · **[Channels](/api/rest-api/admin/settings/channels/list)**
- **[Inventory Sources](/api/rest-api/admin/settings/inventory-sources/list)** · **[Tax Rates](/api/rest-api/admin/settings/tax-rates/list)** · **[Tax Categories](/api/rest-api/admin/settings/tax-categories/list)**
- **[Users](/api/rest-api/admin/settings/users/list)** · **[Roles](/api/rest-api/admin/settings/roles/list)** · **[Themes](/api/rest-api/admin/settings/themes/list)** · **[Data Transfer Imports](/api/rest-api/admin/settings/data-transfer-imports/)**
- **[Return Reasons](/api/rest-api/admin/settings/return-reasons/list)** · **[Return Statuses](/api/rest-api/admin/settings/return-statuses/list)** · **[Return Rules](/api/rest-api/admin/settings/return-rules/list)** · **[Return Custom Fields](/api/rest-api/admin/settings/return-custom-fields/list)** — the RMA reference data. Rules gate eligibility, so configure one before the storefront return form can offer anything.

## 8. Configuration

- **[Configuration](/api/rest-api/admin/configuration/)** — the whole `core_config` key/value store via three generic endpoints (menu schema, read values by slug, update by slug). Writes are scoped to the slug — a key outside it is rejected.

## GraphQL variant

Every menu is available at `POST /api/admin/graphql` (admin token, no storefront key). Remember the **result-field / `id` rule** on action + mass-action mutations (select `success` / `message` / `orderId` / … — not a generic `id`). Details in the [Admin Workflows overview](/api/workflows/admin/#graphql-the-must-know-rules).

## Status codes to handle

Every call below links to its **REST** endpoint page for concreteness. The sequence is transport-agnostic — the same flow works over GraphQL with the equivalent query or mutation, and each REST page cross-links to its GraphQL twin. Pick whichever transport your client uses; only the request shape changes, never the order of steps.

`200/201` success · `401` unauthenticated · `403` forbidden (permission) · `400` bad input / guard · `404` not found · `409` wrong step order (Create-Order) · `422` validation / ineligible action.
