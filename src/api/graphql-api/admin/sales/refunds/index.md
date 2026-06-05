---
outline: false
---

# Refunds

The Refunds menu is the store-wide list of every refund that has been issued across all orders. It mirrors the admin **Sales → Refunds** screen.

## When a row appears here

A refund row exists only after a refund has been **created** for an order (the Create Refund mutation). A refund records money returned to the customer for some or all of the order's items, plus an optional adjustment-refund (an extra amount returned beyond the line items) and an optional adjustment-fee (an amount withheld from the refund). Placing, invoicing, or shipping an order does not by itself create a refund; until one is created, the order has no row in this menu.

## Previewing a refund

Before creating a refund you can run a **Refund Preview**, which computes the resulting totals (subtotal, discount, tax, shipping, grand total) from the same input without writing anything. Use it to show a live "Total Refund" figure as quantities and adjustments change.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List refunds](/api/graphql-api/admin/sales/refunds/list) | `adminRefunds` query |
| [Get a single refund](/api/graphql-api/admin/sales/orders/get-refund) | `adminRefund(id:)` query |
| [Create refund](/api/graphql-api/admin/sales/orders/create-refund) | `createAdminRefund` mutation |
| [Refund preview](/api/graphql-api/admin/sales/orders/refund-preview) | `previewAdminRefund` mutation |

Refund **creation** runs against an order — see [Create Refund](/api/graphql-api/admin/sales/orders/create-refund).

All Refunds operations require the `sales.refunds.view` permission and an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
