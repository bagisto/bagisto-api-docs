---
outline: false
apiType: rest
examples:
  - id: rest-products-total-sold-quantities
    title: Total Sold Quantities
    description: Default report. Total units sold in the window vs. the previous window, plus a per-day `over_time` series for the chart line.
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/products?type=total-sold-quantities&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer <id>|<token>"
    response: |
      [
        {
          "entity": "products",
          "type": "total-sold-quantities",
          "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
          "statistics": {
            "quantities": { "previous": 82, "current": 113, "progress": 37.8 },
            "over_time": {
              "previous": [
                { "label": "10 Apr", "total": 21 },
                { "label": "11 Apr", "total": 14 }
              ],
              "current": [
                { "label": "10 May", "total": 35 },
                { "label": "11 May", "total": 28 }
              ]
            }
          }
        }
      ]

  - id: rest-products-total-products-added-to-wishlist
    title: Total Products Added to Wishlist
    description: Count of wishlist additions in the window vs. the previous window, plus a per-day `over_time` series.
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/products?type=total-products-added-to-wishlist&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer <id>|<token>"
    response: |
      [
        {
          "entity": "products",
          "type": "total-products-added-to-wishlist",
          "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
          "statistics": {
            "wishlist": { "previous": 12, "current": 19, "progress": 58.33 },
            "over_time": {
              "previous": [
                { "label": "10 Apr", "total": 4 },
                { "label": "11 Apr", "total": 2 }
              ],
              "current": [
                { "label": "10 May", "total": 6 },
                { "label": "11 May", "total": 3 }
              ]
            }
          }
        }
      ]

  - id: rest-products-top-selling-products-by-revenue
    title: Top Selling Products by Revenue
    description: Best-selling products ranked by revenue. Here `statistics` is a flat array of product rows, each carrying a nested `images` array.
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/products?type=top-selling-products-by-revenue&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer <id>|<token>"
    response: |
      [
        {
          "entity": "products",
          "type": "top-selling-products-by-revenue",
          "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
          "statistics": [
            {
              "id": 2359,
              "name": "Horizon Arc 49\" OLED Curved Gaming Monitor",
              "price": "4000.0000",
              "formatted_price": "$3,899.00",
              "revenue": "38990.0000",
              "formatted_revenue": "$38,990.00",
              "progress": 142.6,
              "images": [
                {
                  "id": 786,
                  "type": "images",
                  "path": "product/2359/Whw0RJrR1dLPn5HHkyk7G7hiUpY6aH8BFYOE7rlc.webp",
                  "product_id": 2359,
                  "position": 1,
                  "url": "https://your-domain.com/storage/product/2359/Whw0RJrR1dLPn5HHkyk7G7hiUpY6aH8BFYOE7rlc.webp"
                }
              ]
            },
            {
              "id": 1184,
              "name": "Wireless Noise-Cancelling Headphones",
              "price": null,
              "formatted_price": "$0.00",
              "revenue": "12840.0000",
              "formatted_revenue": "$12,840.00",
              "progress": -8.4,
              "images": []
            }
          ]
        }
      ]

  - id: rest-products-top-selling-products-by-quantity
    title: Top Selling Products by Quantity
    description: Best-selling products ranked by units sold. `statistics` is a flat array; each row carries `total_qty_ordered` and a nested `images` array.
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/products?type=top-selling-products-by-quantity&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer <id>|<token>"
    response: |
      [
        {
          "entity": "products",
          "type": "top-selling-products-by-quantity",
          "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
          "statistics": [
            {
              "id": 1184,
              "name": "Wireless Noise-Cancelling Headphones",
              "price": "199.0000",
              "formatted_price": "$199.00",
              "total_qty_ordered": 64,
              "progress": 21.5,
              "images": [
                {
                  "id": 412,
                  "type": "images",
                  "path": "product/1184/8KpQ2mLnVxRtY7wZbN3cHaUjE9fGdSiO4lP6vTqA.webp",
                  "product_id": 1184,
                  "position": 1,
                  "url": "https://your-domain.com/storage/product/1184/8KpQ2mLnVxRtY7wZbN3cHaUjE9fGdSiO4lP6vTqA.webp"
                }
              ]
            },
            {
              "id": 2359,
              "name": "Horizon Arc 49\" OLED Curved Gaming Monitor",
              "price": "4000.0000",
              "formatted_price": "$3,899.00",
              "total_qty_ordered": 10,
              "progress": -3.2,
              "images": []
            }
          ]
        }
      ]

  - id: rest-products-products-with-most-reviews
    title: Products with Most Reviews
    description: Products ranked by review count in the window. `statistics` is a flat array of `{ product_id, product_name, reviews, progress }` rows.
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/products?type=products-with-most-reviews&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer <id>|<token>"
    response: |
      [
        {
          "entity": "products",
          "type": "products-with-most-reviews",
          "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
          "statistics": [
            {
              "product_id": 1184,
              "product_name": "Wireless Noise-Cancelling Headphones",
              "reviews": 18,
              "progress": 12.5
            },
            {
              "product_id": 2359,
              "product_name": "Horizon Arc 49\" OLED Curved Gaming Monitor",
              "reviews": 7,
              "progress": -10.0
            }
          ]
        }
      ]

  - id: rest-products-products-with-most-visits
    title: Products with Most Visits
    description: Products ranked by storefront visit count. `statistics` is a flat array of `{ visitable_id, name, visits, progress }` rows. Depends on visitor/analytics data — empty on a fresh store.
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/products?type=products-with-most-visits&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer <id>|<token>"
    response: |
      [
        {
          "entity": "products",
          "type": "products-with-most-visits",
          "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
          "statistics": [
            {
              "visitable_id": 1184,
              "name": "Wireless Noise-Cancelling Headphones",
              "visits": 432,
              "progress": 64.2
            },
            {
              "visitable_id": 2359,
              "name": "Horizon Arc 49\" OLED Curved Gaming Monitor",
              "visits": 281,
              "progress": 18.9
            }
          ]
        }
      ]

  - id: rest-products-last-search-terms
    title: Last Search Terms
    description: Most recent storefront search terms. `statistics` is a flat array of `{ id, term, results, uses, channel_id, locale }` rows.
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/products?type=last-search-terms&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer <id>|<token>"
    response: |
      [
        {
          "entity": "products",
          "type": "last-search-terms",
          "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
          "statistics": [
            {
              "id": 91,
              "term": "gaming monitor",
              "results": 14,
              "uses": 3,
              "channel_id": 1,
              "locale": "en"
            },
            {
              "id": 90,
              "term": "wireless headphones",
              "results": 22,
              "uses": 8,
              "channel_id": 1,
              "locale": "en"
            }
          ]
        }
      ]

  - id: rest-products-top-search-terms
    title: Top Search Terms
    description: Most-used storefront search terms. `statistics` is a flat array of `{ id, term, results, uses, channel_id, locale }` rows. This report has no View Details (table) form.
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/products?type=top-search-terms&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer <id>|<token>"
    response: |
      [
        {
          "entity": "products",
          "type": "top-search-terms",
          "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
          "statistics": [
            {
              "id": 90,
              "term": "wireless headphones",
              "results": 22,
              "uses": 8,
              "channel_id": 1,
              "locale": "en"
            },
            {
              "id": 91,
              "term": "gaming monitor",
              "results": 14,
              "uses": 3,
              "channel_id": 1,
              "locale": "en"
            }
          ]
        }
      ]

  - id: rest-products-view
    title: View Details (table form)
    description: The expanded, row-by-row table behind a panel's "View Details" link. `statistics` is `{ columns, records }` and honors the same `type` values (except `top-search-terms`, which has no table form).
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/products/view?type=top-selling-products-by-revenue&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer <id>|<token>"
    response: |
      [
        {
          "entity": "products",
          "type": "top-selling-products-by-revenue",
          "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
          "statistics": {
            "columns": [
              { "key": "id", "label": "ID" },
              { "key": "name", "label": "Name" },
              { "key": "formatted_price", "label": "Price" },
              { "key": "formatted_revenue", "label": "Total Revenue" }
            ],
            "records": [
              {
                "id": 2359,
                "name": "Horizon Arc 49\" OLED Curved Gaming Monitor",
                "price": "4000.0000",
                "formatted_price": "$3,899.00",
                "revenue": "38990.0000",
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
                ]
              }
            ]
          }
        }
      ]

  - id: rest-products-export
    title: Export (CSV)
    description: Streams the View Details table as a text/csv attachment (the "Export" button). Send Accept text/csv. Only format=csv is accepted; any other value returns 422.
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/products/export?type=top-selling-products-by-revenue&format=csv&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Authorization: Bearer <id>|<token>" \
        -H "Accept: text/csv" \
        -o products-report.csv
    response: |
      ID,Name,Price,Total Revenue
      2359,"Horizon Arc 49"" OLED Curved Gaming Monitor","$3,899.00","$38,990.00"
      1184,"Wireless Noise-Cancelling Headphones","$199.00","$12,840.00"
---

# Reporting — Products

Returns the aggregate statistics that power the Bagisto admin **Reporting → Products** screen — sold quantities, wishlist additions, top sellers, review counts, visit counts and search-term analytics.

| | |
|---|---|
| **Stats endpoint** | `GET /api/admin/reporting/products` |
| **View Details endpoint** | `GET /api/admin/reporting/products/view` |
| **Export endpoint** | `GET /api/admin/reporting/products/export` |
| **Returns** | A JSON **array** with a single element: `[ { entity, type, dateRange, statistics } ]` (`entity` is always `"products"`) |

All admin endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).

## Understanding `type` — the Products report is **eight** separate calls

This is the most important thing to understand about this API.

The Products reporting screen is **not one response**. Each panel is a separate request selected with the `?type=` query parameter. A single call returns **one report**, and the `statistics` payload **changes shape per `type`** — sometimes an object (the chart reports), sometimes a flat array (the ranked-list reports) — so always branch on `type` when consuming it.

`total-sold-quantities` is the default — if you omit `?type=`, you get the sold-quantities chart.

## Query parameters

| Param | Type | Required | Description |
|---|---|---|---|
| `type` | enum | No | One of the eight values listed below. Defaults to `total-sold-quantities`. An unknown value returns **400** (`invalid-type`). |
| `start` | date (YYYY-MM-DD) | No | Lower bound of the reporting window. Defaults to **30 days ago**. |
| `end` | date (YYYY-MM-DD) | No | Upper bound. Defaults to **today**. |
| `channel` | string | No | Channel **code** to scope the figures to a single channel. Defaults to all channels. |

`start` / `end` drive both the figures and the `previous` baseline used for each `progress` percentage — the previous period is the same-length window immediately before `start`.

## Response envelope

The endpoint always returns a **single-element array**: `[ { entity, type, dateRange, statistics } ]`.

- `entity` — always `"products"`.
- `type` — echoes back the requested report.
- `dateRange` — an **object** `{ previous, current }` with a human-readable label for each window (e.g. `{ "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" }`).
- `statistics` — an object or array whose shape depends on `type` (documented below).

## Response shapes by `type`

Figures with a `previous` / `current` / `progress` shape are period comparisons: `current` is the chosen window, `previous` is the preceding window of equal length, and `progress` is the percentage change (can be negative).

| `type` | `statistics` is | Shape |
|---|---|---|
| `total-sold-quantities` | object | `{ quantities: { previous, current, progress }, over_time: { previous: [{label,total}], current: [{label,total}] } }` |
| `total-products-added-to-wishlist` | object | `{ wishlist: { previous, current, progress }, over_time: { previous: [{label,total}], current: [{label,total}] } }` |
| `top-selling-products-by-revenue` | array | rows of `{ id, name, price, formatted_price, revenue, formatted_revenue, progress, images: [{id,type,path,product_id,position,url}] }` |
| `top-selling-products-by-quantity` | array | rows of `{ id, name, price, formatted_price, total_qty_ordered, progress, images: [{id,type,path,product_id,position,url}] }` |
| `products-with-most-reviews` | array | rows of `{ product_id, product_name, reviews, progress }` |
| `products-with-most-visits` | array | rows of `{ visitable_id, name, visits, progress }` |
| `last-search-terms` | array | rows of `{ id, term, results, uses, channel_id, locale }` |
| `top-search-terms` | array | rows of `{ id, term, results, uses, channel_id, locale }` |

### `total-sold-quantities`

| Key | Shape | Meaning |
|---|---|---|
| `quantities` | `{ previous, current, progress }` | Total units sold in the window vs. the previous window. |
| `over_time` | `{ previous: [{label,total}], current: [{label,total}] }` | Two per-day series (previous and current windows) for the chart line; `total` is units sold per bucket. |

### `total-products-added-to-wishlist`

| Key | Shape | Meaning |
|---|---|---|
| `wishlist` | `{ previous, current, progress }` | Wishlist additions in the window vs. the previous window. |
| `over_time` | `{ previous: [{label,total}], current: [{label,total}] }` | Two per-day series for the chart line; `total` is additions per bucket. |

### `top-selling-products-by-revenue`

`statistics` is an **array** of product rows. Each row: `id`, `name`, `price` (may be `null`), `formatted_price`, `revenue`, `formatted_revenue`, `progress`, and `images` (array of `{ id, type, path, product_id, position, url }` — empty when the product has no image).

### `top-selling-products-by-quantity`

`statistics` is an **array** of product rows. Each row: `id`, `name`, `price`, `formatted_price`, `total_qty_ordered`, `progress`, and `images` (array of `{ id, type, path, product_id, position, url }`).

### `products-with-most-reviews`

`statistics` is an **array**. Each row: `product_id`, `product_name`, `reviews` (count in the window), `progress`.

### `products-with-most-visits`

`statistics` is an **array**. Each row: `visitable_id`, `name`, `visits`, `progress`. Visit figures depend on the Bagisto visitor/analytics tables being populated; on a fresh store this report is **empty**.

### `last-search-terms`

`statistics` is an **array** of the most recent storefront searches. Each row: `id`, `term`, `results` (matches returned), `uses` (times searched), `channel_id`, `locale`.

### `top-search-terms`

`statistics` is an **array** of the most-used storefront searches — same row shape as `last-search-terms` (`id`, `term`, `results`, `uses`, `channel_id`, `locale`), ranked by `uses`. **This report has no View Details (table) form** — it is stats-only.

## View Details (table form)

`GET /api/admin/reporting/products/view` returns the same reports in a detailed table form — the full list behind a panel's **View Details** link. It honors the **same `type` values** as the stats endpoint (with the exception of `top-search-terms`, which has no table form). Here `statistics` is always an object with two keys:

- `columns` — an ordered list of `{ key, label }` describing each table column.
- `records` — the row data; each record is keyed by the column `key` values (records may carry extra fields beyond the displayed columns, e.g. the raw `revenue` / `images` alongside the formatted display values).

This is the expanded, row-by-row view; the summary stats endpoint returns the rolled-up headline figures instead.

## Export (CSV)

`GET /api/admin/reporting/products/export` streams the same detailed table as a `text/csv` attachment (the **Export** button). The header row is built from the column labels, followed by one line per record. Send `Accept: text/csv` and save the response to a file.

Only `?format=csv` is accepted — any other `format` value returns HTTP **422**.

Both **View Details** and **Export** require only authentication; reporting has no permission gate.

## Errors

| Condition | HTTP | Body |
|---|---|---|
| Missing / invalid Bearer token | `401` | `{ "message": "Unauthenticated.", "error": "unauthenticated" }` |
| Unknown `type` value | `400` | `{ ... "Invalid reporting stat type." }` |
| `format` other than `csv` on Export | `422` | `{ ... unsupported export format }` |

## See also

- [Reporting — Products (GraphQL)](/api/graphql-api/admin/reporting/products) — same data over the `statsAdminReportingProducts` query.
- [Dashboard Statistics](/api/rest-api/admin/dashboard/stats) — the at-a-glance dashboard figures.
