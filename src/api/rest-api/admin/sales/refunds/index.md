---
outline: false
apiType: rest
---

# Refunds

The Refunds menu is the store-wide list of every refund that has been issued across all orders. It mirrors the admin **Sales → Refunds** screen.

## When a row appears here

A refund row exists only after a refund has been **created** for an order (the Create Refund action). A refund records money returned to the customer for some or all of the order's items, plus an optional adjustment-refund (an extra amount returned beyond the line items) and an optional adjustment-fee (an amount withheld from the refund). Placing, invoicing, or shipping an order does not by itself create a refund; until one is created, the order has no row in this menu.

## Previewing a refund

Before creating a refund you can run a **Refund Preview**, which computes the resulting totals (subtotal, discount, tax, shipping, grand total) from the same input without writing anything. Use it to show a live "Total Refund" figure as quantities and adjustments change.

## Endpoints in this menu

| Action | Endpoint |
|--------|----------|
| [List refunds](/api/rest-api/admin/sales/refunds/list) | `GET /api/admin/refunds` |
| [Get a single refund](/api/rest-api/admin/sales/orders/get-refund) | `GET /api/admin/refunds/{id}` |
| [Create refund](/api/rest-api/admin/sales/orders/create-refund) | `POST /api/admin/orders/{id}/refunds` |
| [Refund preview](/api/rest-api/admin/sales/orders/refund-preview) | `POST /api/admin/orders/{id}/refunds/preview` |

Refund **creation** runs against an order — see [Create Refund](/api/rest-api/admin/sales/orders/create-refund).

All Refunds endpoints require the `sales.refunds.view` permission and an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).
