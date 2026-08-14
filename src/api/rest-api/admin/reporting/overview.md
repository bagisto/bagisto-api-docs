---
outline: false
apiType: rest
examples:
  - id: rest-overview-total-sales
    title: Total Sales
    description: Total revenue for the period (default `type`). Carries a previous-vs-current comparison plus a per-day `over_time` series for charting.
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/stats?type=total-sales&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer <id>|<token>"
    response: |
      [
        {
          "entity": "overview",
          "type": "total-sales",
          "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
          "statistics": {
            "sales": {
              "previous": 27243.5,
              "current": 9697.53,
              "formatted_total": "$9,697.53",
              "progress": -64.32
            },
            "over_time": {
              "previous": [
                { "label": "10 Apr", "total": 4200, "count": 6 },
                { "label": "11 Apr", "total": 1875.5, "count": 3 }
              ],
              "current": [
                { "label": "10 May", "total": 8500, "count": 12 },
                { "label": "11 May", "total": 1197.53, "count": 4 }
              ]
            }
          }
        }
      ]

  - id: rest-overview-total-orders
    title: Total Orders
    description: Number of orders placed in the period. Same previous-vs-current shape as Total Sales, with an integer `over_time` series.
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/stats?type=total-orders&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer <id>|<token>"
    response: |
      [
        {
          "entity": "overview",
          "type": "total-orders",
          "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
          "statistics": {
            "orders": {
              "previous": 41,
              "current": 58,
              "progress": 41.46
            },
            "over_time": {
              "previous": [
                { "label": "10 Apr", "total": 6, "count": 6 },
                { "label": "11 Apr", "total": 3, "count": 3 }
              ],
              "current": [
                { "label": "10 May", "total": 12, "count": 12 },
                { "label": "11 May", "total": 4, "count": 4 }
              ]
            }
          }
        }
      ]

  - id: rest-overview-total-customers
    title: Total Customers
    description: Number of new customers registered in the period. Note the `over_time` rows carry only `label` and `total` — no `count`.
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/stats?type=total-customers&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer <id>|<token>"
    response: |
      [
        {
          "entity": "overview",
          "type": "total-customers",
          "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
          "statistics": {
            "customers": {
              "previous": 18,
              "current": 25,
              "progress": 38.89
            },
            "over_time": {
              "previous": [
                { "label": "10 Apr", "total": 2 },
                { "label": "11 Apr", "total": 1 }
              ],
              "current": [
                { "label": "10 May", "total": 4 },
                { "label": "11 May", "total": 3 }
              ]
            }
          }
        }
      ]

  - id: rest-overview-top-selling-products-by-revenue
    title: Top Selling Products by Revenue
    description: Up to ~5 best-selling products by revenue. Here `statistics` is a flat array of product rows (no previous-vs-current shape), each carrying a nested `images` array.
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/stats?type=top-selling-products-by-revenue&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer <id>|<token>"
    response: |
      [
        {
          "entity": "overview",
          "type": "top-selling-products-by-revenue",
          "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
          "statistics": [
            {
              "id": 2359,
              "name": "Horizon Arc 49\" OLED Curved Gaming Monitor",
              "price": 4000,
              "formatted_price": "$3,899.00",
              "revenue": 38990,
              "formatted_revenue": "$38,990.00",
              "images": [
                {
                  "id": 786,
                  "type": "images",
                  "path": "product/2359/Whw0RJrR1dLPn5HHkyk7G7hiUpY6aH8BFYOE7rlc.webp",
                  "product_id": 2359,
                  "position": 1,
                  "url": "https://your-domain.com/storage/product/2359/Whw0RJrR1dLPn5HHkyk7G7hiUpY6aH8BFYOE7rlc.webp"
                }
              ],
              "progress": 12.5
            },
            {
              "id": 1804,
              "name": "Aurora Mesh Ergonomic Office Chair",
              "price": 520,
              "formatted_price": "$520.00",
              "revenue": 15600,
              "formatted_revenue": "$15,600.00",
              "images": [
                {
                  "id": 612,
                  "type": "images",
                  "path": "product/1804/Kp3mZ8aQ1wXfR2tLvHsN4cYbE9dUoG7iMxPq0Jr.webp",
                  "product_id": 1804,
                  "position": 1,
                  "url": "https://your-domain.com/storage/product/1804/Kp3mZ8aQ1wXfR2tLvHsN4cYbE9dUoG7iMxPq0Jr.webp"
                }
              ],
              "progress": -4.18
            }
          ]
        }
      ]
---

# Reporting — Overview

| | |
|---|---|
| **Endpoint** | `GET /api/admin/reporting/stats` |
| **Returns** | A JSON **array** with a single element: `[ { entity, type, dateRange, statistics } ]` |

The Overview endpoint returns a single headline figure across the whole store for the chosen `type`. It is an API convenience aggregation — there is **no** matching "Overview" screen in the admin panel (the admin Reporting menu goes straight to Sales / Customers / Products). Use it to fetch one top-line number without having to call the per-section endpoints.

## Understanding `type` — Overview is **four** separate headlines

A single call returns **one** headline. The `type` argument picks which:

- `total-sales` (default) — total revenue for the period.
- `total-orders` — number of orders placed.
- `total-customers` — number of new customers registered.
- `top-selling-products-by-revenue` — the best-selling products by revenue.

The `statistics` payload **changes shape per `type`** — for the three comparison headlines it is an object with a previous-vs-current figure plus an `over_time` series; for `top-selling-products-by-revenue` it is a flat array of product rows. Always branch on `type` when consuming it.

`total-sales` is the default — if you omit `?type=`, you get the total-revenue headline.

## Query parameters

| Param | Type | Required | Description |
|---|---|---|---|
| `type` | enum | No | One of the four values above. Defaults to `total-sales`. |
| `start` | date (YYYY-MM-DD) | No | Lower bound of the reporting window. Defaults to **30 days ago**. |
| `end` | date (YYYY-MM-DD) | No | Upper bound. Defaults to **today**. |
| `channel` | string | No | Channel **code** (e.g. `default`) to scope the figures to a single storefront channel. Defaults to all channels. |

`start` / `end` drive both the figures and the `previous` baseline used for each `progress` percentage — the previous period is the same-length window immediately before `start`.

## Response envelope

The endpoint always returns a **single-element array**: `[ { entity, type, dateRange, statistics } ]`.

- `entity` — always `"overview"`.
- `type` — echoes back the requested headline.
- `dateRange` — an **object** `{ previous, current }` naming the two comparison windows. `current` is the window you asked for; `previous` is the equal-length window immediately before it.
- `statistics` — an object or array whose shape depends on `type` (documented below).

Figures with a `previous` / `current` / `progress` shape are period comparisons: `current` is the chosen window, `previous` is the preceding window of equal length, and `progress` is the percentage change (can be negative).

### No View Details, no Export

Unlike the Sales / Customers / Products pages, the Overview endpoint has **no View Details and no Export** — it is a top-line summary only. Reporting requires only authentication; there is no permission gate.

## Response shapes by `type`

### `total-sales`

| Key | Shape | Meaning |
|---|---|---|
| `sales` | `{ previous, current, formatted_total, progress }` | Gross sales in the window; `formatted_total` is the current value in base currency. |
| `over_time` | `{ previous, current }` — each an array of `{ label, total, count }` | One bucket **per day** for the chart line, given for both the previous and current windows. `total` is sales, `count` is order count. |

### `total-orders`

| Key | Shape | Meaning |
|---|---|---|
| `orders` | `{ previous, current, progress }` | Orders placed in the window. |
| `over_time` | `{ previous, current }` — each an array of `{ label, total, count }` | One bucket per day for both windows. `total` is the order count for the day; `count` mirrors it. |

### `total-customers`

| Key | Shape | Meaning |
|---|---|---|
| `customers` | `{ previous, current, progress }` | New customers registered in the window. |
| `over_time` | `{ previous, current }` — each an array of `{ label, total }` | One bucket per day for both windows. |

### `over_time` rows differ for customers

For `total-customers`, the `over_time` rows carry only `label` and `total` — there is **no** `count` field (unlike `total-sales` / `total-orders`).

### `top-selling-products-by-revenue`

`statistics` is a flat **array** (up to ~5 rows) — there is no previous-vs-current wrapper. Each row: `id`, `name`, `price`, `formatted_price`, `revenue`, `formatted_revenue`, `images` (array of `{ id, type, path, product_id, position, url }`), and `progress` (the row's change vs. the previous window, can be negative).

## Errors

| Condition | HTTP | Body |
|---|---|---|
| Missing / invalid Bearer token | `401` | `{ "message": "Unauthenticated.", "error": "unauthenticated" }` |

## See also

- [Reporting — Overview (GraphQL)](/api/graphql-api/admin/reporting/overview) — same data over the `statsAdminReportingOverview` query.
- [Dashboard Statistics](/api/rest-api/admin/dashboard/stats) — the headline cards behind the admin Dashboard screen.
