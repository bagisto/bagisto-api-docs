---
outline: false
---

# Recipe: Build an Admin Dashboard

An admin orders dashboard on the Admin API. Every request carries a pre-issued admin Integration token:

```
Authorization: Bearer <id>|<token>
```

## 1. List orders

[List Orders](/api/rest-api/admin/sales/orders) — `GET /api/admin/orders`. Returns the `{ data, meta }` envelope:

```json
{
  "data": [ /* order rows */ ],
  "meta": { "currentPage": 1, "perPage": 10, "lastPage": 14, "total": 137 }
}
```

Drive the table with `?page=` and `?per_page=` (default 10, cap 50) plus the listing filters (status, channel, customer, email, grand-total range, date range). Read the page-count headers (`X-Total-Count`, `X-Page`, `X-Per-Page`, `X-Total-Pages`) for pagination UI.

## 2. Order detail

[Order Detail](/api/rest-api/admin/sales/orders) — `GET /api/admin/orders/{id}`. Returns the full order: customer, addresses, type-aware items, invoices, shipments, refunds, payment, and totals — everything the order-view screen needs, no follow-up calls.

## 3. Run an action

From the order view, call the action endpoints (each has its own eligibility rules — open the page):

- [Cancel Order](/api/rest-api/admin/sales/orders/cancel) — `POST /api/admin/orders/{id}/cancel`
- [Create Invoice](/api/rest-api/admin/sales/orders/create-invoice) — `POST /api/admin/orders/{id}/invoices`
- [Create Shipment](/api/rest-api/admin/sales/orders/create-shipment) — `POST /api/admin/orders/{id}/shipments`
- [Create Refund](/api/rest-api/admin/sales/orders/create-refund) — `POST /api/admin/orders/{id}/refunds`
- [Add Order Comment](/api/rest-api/admin/sales/orders/add-comment) — `POST /api/admin/orders/{id}/comments`

## 4. Other admin menus

The same list → detail → action pattern (and the `{ data, meta }` envelope) applies across every admin menu — Catalog, Customers, Marketing, CMS, Settings. Browse the Admin API section or [`/llms.txt`](/llms.txt) for the full set.

## GraphQL variant

The same data is available at `POST /api/admin/graphql` (admin GraphQL is a separate endpoint and takes the admin token). Order actions are mutations — **select the result fields** they return (`orderId`, `incrementId`, `status`, `success`, `message`), not `id`.

## Status codes to handle

`200/201` success · `401` unauthenticated · `403` forbidden (permission) · `400` bad input · `404` not found · `422` validation / ineligible action.
