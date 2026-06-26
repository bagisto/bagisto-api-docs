---
outline: false
apiType: rest
---

# Reporting

The Reporting menu returns the deep, dedicated reports behind the admin **Reporting** screens — **Sales**, **Customers** and **Products** — plus an API-only **Overview** convenience aggregation. Each report rolls up a chosen metric over a date window, compared against the previous equal-length window.

## How a report is selected — the `type` argument

Each report page exposes several metrics, and you pick one with the `?type=` query parameter (e.g. `?type=total-sales`). Omitting `type` falls back to that page's default (the first metric). The `statistics` payload is the raw aggregate for the chosen `type`, so its shape varies per metric — branch on `type` when consuming it.

## The four reports

| Report | What it covers | `type` values |
|--------|----------------|---------------|
| [Overview](/api/rest-api/admin/reporting/overview) | API-only top-line summary across the store | `total-sales` (default), `total-orders`, `total-customers`, `top-selling-products-by-revenue` |
| [Sales](/api/rest-api/admin/reporting/sales) | Revenue, orders, funnel, refunds, tax, shipping, payment methods | `total-sales` (default) + 8 more |
| [Customers](/api/rest-api/admin/reporting/customers) | New customers, traffic, top customers/groups | `total-customers` (default) + 5 more |
| [Products](/api/rest-api/admin/reporting/products) | Sold quantities, wishlists, top sellers, reviews, search terms | `total-sold-quantities` (default) + 7 more |

::: tip Overview has no matching admin screen
The admin Reporting menu goes straight to Sales / Customers / Products — there is **no** "Overview" screen in the panel. Overview is an API convenience that fetches one top-line number without calling the per-section endpoints.
:::

## Three shapes per report — Stats, View Details, Export

Sales / Customers / Products each expose the same metric in three forms:

| Form | Endpoint suffix | Shape | Mirrors |
|------|-----------------|-------|---------|
| **Stats** | *(none)* — e.g. `/reporting/sales` | Rolled-up headline figures (charts/progress) | the panel summary |
| **View Details** | `/view` | `{ columns, records }` — the full row-by-row table | the panel's **View Details** link |
| **Export (CSV)** | `/export?format=csv` | `text/csv` attachment | the **Export** button |

**Overview is summary-only** — it has no View Details and no Export.

## Date window

`start` / `end` (`YYYY-MM-DD`) bound the report and the `previous` baseline behind each `progress` percentage — the previous period is the same-length window immediately before `start`. `channel` (a channel **code**) scopes the figures to a single storefront channel. `dateRange` in the response reports the two comparison windows: `current` is the window you asked for, `previous` is the equal-length window immediately before it.

## Endpoints in this menu

| Action | Endpoint |
|--------|----------|
| [Overview](/api/rest-api/admin/reporting/overview) | `GET /api/admin/reporting/stats` |
| [Sales](/api/rest-api/admin/reporting/sales) | `GET /api/admin/reporting/sales` (+ `/view`, `/export`) |
| [Customers](/api/rest-api/admin/reporting/customers) | `GET /api/admin/reporting/customers` (+ `/view`, `/export`) |
| [Products](/api/rest-api/admin/reporting/products) | `GET /api/admin/reporting/products` (+ `/view`, `/export`) |

Reporting is read-only and requires only an admin Bearer token (no permission gate) — see [Authentication](/api/rest-api/admin/authentication).
