---
outline: false
---

# Invoices

The Invoices menu is the store-wide list of every invoice that has been generated across all orders, plus the actions you can take on a single invoice. It mirrors the admin **Sales → Invoices** screen.

## When a row appears here

An invoice row exists only after an invoice has been **generated** for an order — created manually (the Create Invoice mutation) or auto-generated if your store enables auto-invoicing. Placing or paying for an order does not by itself create an invoice; until one is generated, the order has no row in this menu.

## `state` — what each value means

In practice the grid shows just two badges — **Paid** and **Pending**. The "Overdue by N days" you usually see is a *derived countdown* shown under a **Pending** invoice (see [the countdown](#payment-due-date-the-red-countdown) below), **not** a stored state.

| `state` | Badge | Meaning |
|---------|-------|---------|
| `paid` | green **Paid** | The invoiced amount has been **captured** — a payment transaction was recorded against it (cash-on-delivery, the "record transaction" option at create-invoice time, or a paid gateway). |
| `pending` | yellow **Pending** | The invoice exists but the money has **not been captured yet**. This is the everyday non-paid state. |
| `pending_payment` | yellow **Pending** | A programmatic variant of `pending` set by some payment flows; displayed identically. |
| `overdue` | red **Overdue** | A status you can set **manually** via [Mass Update Status](/api/graphql-api/admin/sales/invoices/mass-update-status). Rarely used day-to-day — the "Overdue by N days" the grid normally shows is the derived countdown under a **Pending** invoice, whose stored `state` is still `pending`. |

There is **no `refunded` invoice state** — refunds are tracked separately under [Refunds](/api/graphql-api/admin/sales/refunds/), not on an invoice's `state`.

**Why an order can still read "pending" after you invoice it.** Generating an invoice records *what is owed*, not that it has been *paid*. The invoice (and the order's payment state) flips to `paid` only when a payment transaction is recorded against it. So an invoiced order whose payment hasn't been captured — e.g. an offline method, or an invoice generated without recording a transaction — stays `pending` until the money is taken. Expected behaviour, not a defect.

## Payment due date & the red countdown

For a `pending` invoice the admin grid shows a small red line under the status: a countdown to the **payment due date**. That due date is the invoice's creation date plus your store's configured *payment term* — the "due duration" in days, set under **Sales → Invoice Settings → Payment Terms**. While the due date is in the future the line reads "N day(s) left"; once it passes it turns red and reads "**Overdue by N day(s)**". Either way the invoice's stored `state` is still `pending` — the countdown is a display only, never a separate state. The API returns the raw `state` and `createdAt`, so a client can reproduce the same line: `dueDate = createdAt + dueDuration(days)`, then compare to today.

## What each action does

| Action | What it does |
|--------|--------------|
| **Print Invoice (PDF)** | Downloads a print-ready PDF of the invoice — a binary `application/pdf` attachment. This is **REST only**; binary downloads aren't expressible over GraphQL. |
| **Send Duplicate Invoice** | Re-sends the invoice email to the customer. You can override the recipient with a custom email; otherwise it goes to the order's customer email. Re-delivers a copy without regenerating the invoice. |
| **Mass Update Status** | Bulk-sets the status flag (`pending` / `paid` / `overdue`) on the selected invoices. It is a **manual flag only** — it does **not** capture or reverse a payment, and it does not create a transaction. Use it to correct or annotate state, not to take money. |
| **Export (CSV)** | Downloads the invoices grid — with your current filters applied — as a CSV file. **REST only** (binary). |

Invoice **creation** is not in this menu — it runs against an order; see [Create Invoice](/api/graphql-api/admin/sales/orders/create-invoice).

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List invoices](/api/graphql-api/admin/sales/invoices/list) | `adminInvoices` query |
| [Get a single invoice](/api/graphql-api/admin/sales/orders/get-invoice) | `adminInvoice(id:)` query |
| [Print invoice (PDF)](/api/graphql-api/admin/sales/orders/print-invoice) | REST only (binary) |
| [Send duplicate invoice email](/api/graphql-api/admin/sales/orders/send-duplicate-invoice) | `createAdminInvoiceSendDuplicate` mutation |
| [Mass update status](/api/graphql-api/admin/sales/invoices/mass-update-status) | `createAdminInvoiceMassUpdateStatus` mutation |
| [Export invoices (CSV)](/api/rest-api/admin/sales/invoices/export) | REST only — `GET /api/admin/invoices/export` |

All Invoice operations require the `sales.invoices.view` permission and an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
