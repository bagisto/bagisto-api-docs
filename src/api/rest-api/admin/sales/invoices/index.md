---
outline: false
apiType: rest
---

# Invoices

The Invoices menu is the store-wide list of every invoice that has been generated across all orders, plus the actions you can take on a single invoice. It mirrors the admin **Sales → Invoices** screen.

## When a row appears here

An invoice row exists only after an invoice has been **generated** for an order — created manually (the Create Invoice action) or auto-generated if your store enables auto-invoicing. Placing or paying for an order does not by itself create an invoice; until one is generated, the order has no row in this menu.

## `state` — what each value means

| `state` | Meaning |
|---------|---------|
| `paid` | The invoiced amount has been **captured** — a payment transaction was recorded against it (cash-on-delivery, the "record transaction" option at create-invoice time, or a paid gateway). |
| `pending` / `pending_payment` | The invoice exists but the money has **not been captured yet**. |
| `overdue` | A pending invoice whose payment due date has passed. |
| `refunded` | Fully refunded. |

**Why an order can still read "pending" after you invoice it.** Generating an invoice records *what is owed*, not that it has been *paid*. The invoice (and the order's payment state) flips to `paid` only when a payment transaction is recorded against it. So an invoiced order whose payment hasn't been captured — e.g. an offline method, or an invoice generated without recording a transaction — stays `pending` until the money is taken. Expected behaviour, not a defect.

## Payment due date & the red countdown

For a `pending` invoice the admin grid shows a small red line under the status: a countdown to the **payment due date**. That due date is the invoice's creation date plus your store's configured *payment term* — the "due duration" in days, set under **Sales → Invoice Settings → Payment Terms**. While the due date is in the future the line reads "N days left"; once it passes it turns red and reads "**Overdue by N days**" (the negative number you see). The API returns the raw `state` and `createdAt`, so a client can reproduce the same countdown: `dueDate = createdAt + dueDuration(days)`, then compare to today.

## Endpoints in this menu

| Action | Endpoint |
|--------|----------|
| [List invoices](/api/rest-api/admin/sales/invoices/list) | `GET /api/admin/invoices` |
| [Get a single invoice](/api/rest-api/admin/sales/orders/get-invoice) | `GET /api/admin/invoices/{id}` |
| [Print invoice (PDF)](/api/rest-api/admin/sales/orders/print-invoice) | `GET /api/admin/invoices/{id}/print` |
| [Send duplicate invoice email](/api/rest-api/admin/sales/orders/send-duplicate-invoice) | `POST /api/admin/invoices/{id}/send-duplicate` |
| [Mass update status](/api/rest-api/admin/sales/invoices/mass-update-status) | `POST /api/admin/invoices/mass-update-status` |

Invoice **creation** runs against an order — see [Create Invoice](/api/rest-api/admin/sales/orders/create-invoice).

**Bulk status update** is a manual status flag (pending / paid / overdue) — it does **not** capture or reverse a payment.

All Invoice endpoints require the `sales.invoices.view` permission and an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).
