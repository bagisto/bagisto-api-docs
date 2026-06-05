---
outline: false
---

# Transactions

The Transactions menu is a read-only record of every payment transaction recorded against orders and their invoices. It mirrors the admin **Sales → Transactions** screen. This menu is **read-only** — list and detail only; transactions are recorded automatically and cannot be created or edited through the API.

## When a row appears here

A row appears whenever a payment transaction is recorded — written by the payment gateway during checkout, or when a payment is recorded against an invoice. Each transaction carries its gateway transaction id, status, amount, the payment method, and a raw gateway data blob, plus a summary of the order it belongs to.

## How a transaction relates to an invoice

A transaction is the **payment** event; an invoice is the **billing** document. When a transaction settles an invoice it carries that `invoiceId`, and the matching invoice flips to `paid` (see the [Invoices overview](/api/graphql-api/admin/sales/invoices/) for why an invoice can stay `pending` until a transaction lands). Offline methods (cash-on-delivery, money transfer) record a transaction only when the payment is actually taken, so an order can have an invoice with no transaction yet.

## The gateway `data` blob

`data` holds the **verbatim response the payment gateway returned** for the transaction. Its shape is entirely gateway-specific — read only the keys you know your gateway emits. For offline methods it is often minimal or `null`. Query it as a whole field; treat it as opaque pass-through, not a stable contract.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List transactions](/api/graphql-api/admin/sales/transactions/list) | `adminTransactions` query |
| [Get a single transaction](/api/graphql-api/admin/sales/transactions/detail) | `adminTransaction(id:)` query |

All Transactions operations require the `sales.transactions.view` permission and an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
