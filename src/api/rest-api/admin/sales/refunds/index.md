---
outline: false
apiType: rest
---

# Refunds

The Refunds menu is the store-wide, **read-only** list of every refund that has been issued across all orders. It mirrors the admin **Sales → Refunds** screen — browse refunds, open one for detail, and export the list. It does not create refunds (that happens against an order — see below).

## When a row appears here

A refund row exists only after a refund has been **issued** for an order. A refund records money returned to the customer for some or all of the order's items, plus an optional adjustment-refund (an extra amount returned beyond the line items) and an optional adjustment-fee (an amount withheld from the refund). Placing, invoicing, or shipping an order does not by itself create a refund; until one is issued, the order has no row in this menu.

Issuing a refund is an **order action**, not part of this menu — it runs against a specific order under [Orders → Create Refund](/api/rest-api/admin/sales/orders/create-refund) (with a [Refund Preview](/api/rest-api/admin/sales/orders/refund-preview) to compute totals first).

## Refunded Amount

The list's **Refunded Amount** is the refund's grand total in the store's base currency (subtotal + tax + shipping + adjustment-refund − adjustment-fee) — not just the line-items subtotal. In the API payload this is `formattedBaseGrandTotal` (raw: `baseGrandTotal`).

## Endpoints in this menu

| Action | Endpoint |
|--------|----------|
| [List refunds](/api/rest-api/admin/sales/refunds/list) | `GET /api/admin/refunds` |
| [Get a single refund](/api/rest-api/admin/sales/orders/get-refund) | `GET /api/admin/refunds/{id}` |
| [Export refunds (CSV)](/api/rest-api/admin/sales/refunds/export) | `GET /api/admin/refunds/export` |

All Refunds endpoints require the `sales.refunds.view` permission and an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).
