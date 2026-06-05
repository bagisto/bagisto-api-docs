---
outline: false
---

# Refunds

The Refunds menu is the store-wide, **read-only** list of every refund that has been issued across all orders. It mirrors the admin **Sales → Refunds** screen — browse refunds and open one for detail. It does not create refunds (that happens against an order — see below).

## When a row appears here

A refund row exists only after a refund has been **issued** for an order. A refund records money returned to the customer for some or all of the order's items, plus an optional adjustment-refund (an extra amount returned beyond the line items) and an optional adjustment-fee (an amount withheld from the refund). Placing, invoicing, or shipping an order does not by itself create a refund; until one is issued, the order has no row in this menu.

Issuing a refund is an **order action**, not part of this menu — it runs against a specific order under [Orders → Create Refund](/api/graphql-api/admin/sales/orders/create-refund) (with a [Refund Preview](/api/graphql-api/admin/sales/orders/refund-preview) to compute totals first).

## Refunded Amount

The list's **Refunded Amount** is the refund's grand total in the store's base currency (subtotal + tax + shipping + adjustment-refund − adjustment-fee) — not just the line-items subtotal. In the API payload this is `formattedBaseGrandTotal` (raw: `baseGrandTotal`).

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List refunds](/api/graphql-api/admin/sales/refunds/list) | `adminRefunds` query |
| [Get a single refund](/api/graphql-api/admin/sales/orders/get-refund) | `adminRefund(id:)` query |
| [Export refunds (CSV)](/api/rest-api/admin/sales/refunds/export) | REST only (binary download) |

All Refunds operations require the `sales.refunds.view` permission and an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
