---
outline: false
---

# Reporting

The Reporting menu returns the deep, dedicated reports behind the admin **Reporting** screens — **Sales**, **Customers** and **Products** — plus an API-only **Overview** convenience aggregation. Each report rolls up a chosen metric over a date window, compared against the previous equal-length window.

## How a report is selected — the `type` argument

Each report query exposes several metrics, and you pick one with the `type` argument (e.g. `type: "total-sales"`). Omitting `type` falls back to that report's default (the first metric). The `statistics` payload is the raw aggregate for the chosen `type`, so its shape varies per metric — branch on `type` when consuming it.

## The four reports

| Report | Query | `type` values |
|--------|-------|---------------|
| [Overview](/api/graphql-api/admin/reporting/overview) | `statsAdminReportingOverview` | `total-sales` (default), `total-orders`, `total-customers`, `top-selling-products-by-revenue` |
| [Sales](/api/graphql-api/admin/reporting/sales) | `statsAdminReportingSales` | `total-sales` (default) + 8 more |
| [Customers](/api/graphql-api/admin/reporting/customers) | `statsAdminReportingCustomers` | `total-customers` (default) + 5 more |
| [Products](/api/graphql-api/admin/reporting/products) | `statsAdminReportingProducts` | `total-sold-quantities` (default) + 7 more |

### Overview has no matching admin screen

The admin Reporting menu goes straight to Sales / Customers / Products — there is **no** "Overview" screen in the panel. Overview is an API convenience that fetches one top-line number without calling the per-section queries.

## Two query forms per report — Stats and View Details

Sales / Customers / Products each expose the same metric in two query forms:

| Form | Query | Shape | Mirrors |
|------|-------|-------|---------|
| **Stats** | `statsAdminReporting{Sales,Customers,Products}` | Rolled-up headline figures (charts/progress) | the panel summary |
| **View Details** | `viewStatsAdminReporting{Sales,Customers,Products}` | `{ columns, records }` — the full row-by-row table | the panel's **View Details** link |

**Overview is summary-only** — it has only the `statsAdminReportingOverview` query, no View Details. CSV **Export** is REST-only (binary streams aren't expressible over GraphQL) — see the [REST reporting pages](/api/rest-api/admin/reporting/).

## Date window

`start` / `end` (`YYYY-MM-DD`) bound the report and the `previous` baseline behind each `progress` percentage — the previous period is the same-length window immediately before `start`. `channel` (a channel **code**) scopes the figures to a single storefront channel. `dateRange` reports the two comparison windows: `current` is the window you asked for, `previous` is the equal-length window immediately before it.

## Queries in this menu

| Action | Query |
|--------|-------|
| [Overview](/api/graphql-api/admin/reporting/overview) | `statsAdminReportingOverview` |
| [Sales](/api/graphql-api/admin/reporting/sales) | `statsAdminReportingSales` (+ `viewStatsAdminReportingSales`) |
| [Customers](/api/graphql-api/admin/reporting/customers) | `statsAdminReportingCustomers` (+ `viewStatsAdminReportingCustomers`) |
| [Products](/api/graphql-api/admin/reporting/products) | `statsAdminReportingProducts` (+ `viewStatsAdminReportingProducts`) |

Reporting is read-only and requires only an admin Bearer token (no permission gate) — see [Authentication](/api/graphql-api/admin/authentication).
