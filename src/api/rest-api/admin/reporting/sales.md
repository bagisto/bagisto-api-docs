---
outline: false
apiType: rest
examples:
  - id: rest-sales-total-sales
    title: Total Sales
    description: Gross sales for the window vs. the previous period, plus an over-time series split into previous and current buckets. This is the default type.
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/sales?type=total-sales&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer <id>|<token>"
    response: |
      [
        {
          "entity": "sales",
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
                { "label": "11 Apr", "total": 1850.5, "count": 3 }
              ],
              "current": [
                { "label": "10 May", "total": 8500, "count": 12 },
                { "label": "11 May", "total": 1197.53, "count": 4 }
              ]
            }
          }
        }
      ]

  - id: rest-sales-average-sales
    title: Average Sales
    description: Average order value for the window vs. the previous period, plus the previous/current over-time series.
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/sales?type=average-sales&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer <id>|<token>"
    response: |
      [
        {
          "entity": "sales",
          "type": "average-sales",
          "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
          "statistics": {
            "sales": {
              "previous": 1135.15,
              "current": 606.1,
              "formatted_total": "$606.10",
              "progress": -46.61
            },
            "over_time": {
              "previous": [
                { "label": "10 Apr", "total": 700, "count": 6 },
                { "label": "11 Apr", "total": 616.83, "count": 3 }
              ],
              "current": [
                { "label": "10 May", "total": 708.33, "count": 12 },
                { "label": "11 May", "total": 299.38, "count": 4 }
              ]
            }
          }
        }
      ]

  - id: rest-sales-total-orders
    title: Total Orders
    description: Order count for the window vs. the previous period, plus the previous/current over-time series.
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/sales?type=total-orders&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer <id>|<token>"
    response: |
      [
        {
          "entity": "sales",
          "type": "total-orders",
          "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
          "statistics": {
            "orders": {
              "previous": 24,
              "current": 16,
              "progress": -33.33
            },
            "over_time": {
              "previous": [
                { "label": "10 Apr", "total": 4200, "count": 6 },
                { "label": "11 Apr", "total": 1850.5, "count": 3 }
              ],
              "current": [
                { "label": "10 May", "total": 8500, "count": 12 },
                { "label": "11 May", "total": 1197.53, "count": 4 }
              ]
            }
          }
        }
      ]

  - id: rest-sales-purchase-funnel
    title: Purchase Funnel
    description: The four funnel stages — visitors, product visitors, carts, orders — each with a running total and progress. This type has no over-time series and is not available in table form.
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/sales?type=purchase-funnel&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer <id>|<token>"
    response: |
      [
        {
          "entity": "sales",
          "type": "purchase-funnel",
          "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
          "statistics": {
            "visitors": { "total": 1820, "progress": 12.5 },
            "product_visitors": { "total": 940, "progress": 8.2 },
            "carts": { "total": 210, "progress": -4.1 },
            "orders": { "total": 16, "progress": -33.33 }
          }
        }
      ]

  - id: rest-sales-abandoned-carts
    title: Abandoned Carts
    description: Abandoned-cart sales value, cart count and abandonment rate (each vs. the previous period), plus the products most often left in abandoned carts.
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/sales?type=abandoned-carts&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer <id>|<token>"
    response: |
      [
        {
          "entity": "sales",
          "type": "abandoned-carts",
          "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
          "statistics": {
            "sales": {
              "previous": 8400,
              "current": 5210.75,
              "formatted_total": "$5,210.75",
              "progress": -37.97
            },
            "carts": {
              "previous": 38,
              "current": 27,
              "progress": -28.95
            },
            "rate": {
              "previous": 61.29,
              "current": 62.79,
              "progress": 2.45
            },
            "products": [
              { "id": 2359, "name": "Horizon Arc 49\" OLED Curved Gaming Monitor", "count": 9, "progress": 12.5 },
              { "id": 1184, "name": "Aero Knit Running Shoes", "count": 6, "progress": -10 }
            ]
          }
        }
      ]

  - id: rest-sales-refunds
    title: Refunds
    description: Refunded amount for the window vs. the previous period, plus the previous/current over-time series.
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/sales?type=refunds&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer <id>|<token>"
    response: |
      [
        {
          "entity": "sales",
          "type": "refunds",
          "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
          "statistics": {
            "refunds": {
              "previous": 1420,
              "current": 730.5,
              "formatted_total": "$730.50",
              "progress": -48.56
            },
            "over_time": {
              "previous": [
                { "label": "10 Apr", "total": 620, "count": 2 },
                { "label": "11 Apr", "total": 800, "count": 3 }
              ],
              "current": [
                { "label": "10 May", "total": 430.5, "count": 1 },
                { "label": "11 May", "total": 300, "count": 1 }
              ]
            }
          }
        }
      ]

  - id: rest-sales-tax-collected
    title: Tax Collected
    description: Tax collected for the window vs. the previous period, the top tax categories by collected amount, and the previous/current over-time series.
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/sales?type=tax-collected&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer <id>|<token>"
    response: |
      [
        {
          "entity": "sales",
          "type": "tax-collected",
          "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
          "statistics": {
            "tax_collected": {
              "previous": 2724.35,
              "current": 969.75,
              "formatted_total": "$969.75",
              "progress": -64.4
            },
            "top_categories": [
              { "id": 1, "tax_category_id": 1, "name": "Standard Rate", "total": 712.4, "progress": 14.2, "formatted_total": "$712.40" },
              { "id": 2, "tax_category_id": 2, "name": "Reduced Rate", "total": 257.35, "progress": -5.6, "formatted_total": "$257.35" }
            ],
            "over_time": {
              "previous": [
                { "label": "10 Apr", "total": 420, "count": 6 },
                { "label": "11 Apr", "total": 185.05, "count": 3 }
              ],
              "current": [
                { "label": "10 May", "total": 850, "count": 12 },
                { "label": "11 May", "total": 119.75, "count": 4 }
              ]
            }
          }
        }
      ]

  - id: rest-sales-shipping-collected
    title: Shipping Collected
    description: Shipping charges collected for the window vs. the previous period, the top shipping methods by collected amount, and the previous/current over-time series.
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/sales?type=shipping-collected&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer <id>|<token>"
    response: |
      [
        {
          "entity": "sales",
          "type": "shipping-collected",
          "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
          "statistics": {
            "shipping_collected": {
              "previous": 960,
              "current": 540,
              "formatted_total": "$540.00",
              "progress": -43.75
            },
            "top_methods": [
              { "id": "flatrate_flatrate", "title": "Flat Rate", "total": 420, "progress": 5.5, "formatted_total": "$420.00" },
              { "id": "free_free", "title": "Free Shipping", "total": 120, "progress": -12, "formatted_total": "$120.00" }
            ],
            "over_time": {
              "previous": [
                { "label": "10 Apr", "total": 180, "count": 6 },
                { "label": "11 Apr", "total": 90, "count": 3 }
              ],
              "current": [
                { "label": "10 May", "total": 360, "count": 12 },
                { "label": "11 May", "total": 60, "count": 4 }
              ]
            }
          }
        }
      ]

  - id: rest-sales-top-payment-methods
    title: Top Payment Methods
    description: Payment methods ranked by collected amount. Here `statistics` is a flat array of method rows, not an object.
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/sales?type=top-payment-methods&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer <id>|<token>"
    response: |
      [
        {
          "entity": "sales",
          "type": "top-payment-methods",
          "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
          "statistics": [
            {
              "id": 1,
              "method": "cashondelivery",
              "method_title": "Cash On Delivery",
              "title": "Cash On Delivery",
              "total": 6420.5,
              "base_total": 6420.5,
              "progress": 18.4,
              "formatted_total": "$6,420.50"
            },
            {
              "id": 2,
              "method": "moneytransfer",
              "method_title": "Money Transfer",
              "title": "Money Transfer",
              "total": 3277.03,
              "base_total": 3277.03,
              "progress": -9.2,
              "formatted_total": "$3,277.03"
            }
          ]
        }
      ]

  - id: rest-sales-sales-by-coupon
    title: Sales By Coupon
    description: Top coupon codes by discount given. Here `statistics` is a flat array of coupon rows, not an object.
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/sales?type=sales-by-coupon&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer <id>|<token>"
    response: |
      [
        {
          "entity": "sales",
          "type": "sales-by-coupon",
          "dateRange": { "previous": "07 May 2026 - 06 Jun 2026", "current": "06 Jun 2026 - 06 Jul 2026" },
          "statistics": [
            {
              "coupon_code": "SAVE10",
              "cart_rule_id": 1,
              "total": 12,
              "base_total": "2480.0000",
              "base_discount_total": "248.0000",
              "formatted_total": "$2,480.00",
              "formatted_discount_total": "$248.00",
              "link": "https://your-domain.com/admin/marketing/promotions/cart-rules/edit/1",
              "progress": 42.5,
              "datetime": null
            }
          ]
        }
      ]

  - id: rest-sales-view
    title: View Details (table form)
    description: The expanded, row-by-row table behind a panel's "View Details" link. `statistics` carries ordered `columns` plus the full `records` list — the same shape for every `type`.
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/sales/view?type=total-sales&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer <id>|<token>"
    response: |
      [
        {
          "entity": "sales",
          "type": "total-sales",
          "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
          "statistics": {
            "columns": [
              { "key": "label", "label": "Date" },
              { "key": "count", "label": "Orders" },
              { "key": "formatted_total", "label": "Total" }
            ],
            "records": [
              { "label": "10 May", "total": 8500, "count": 12, "formatted_total": "$8,500.00" },
              { "label": "11 May", "total": 1197.53, "count": 4, "formatted_total": "$1,197.53" }
            ]
          }
        }
      ]

  - id: rest-sales-export
    title: Export (CSV)
    description: The detailed table streamed as a text/csv attachment (the "Export" button). The header row is built from the column labels, followed by one line per record.
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/sales/export?type=total-sales&format=csv&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Authorization: Bearer <id>|<token>" \
        -H "Accept: text/csv" \
        -o sales-report.csv
    response: |
      Date,Orders,Total
      10 May,12,"$8,500.00"
      11 May,4,"$1,197.53"

  - id: rest-sales-export-xlsx
    title: Export (XLSX)
    description: The detailed table streamed as an XLSX workbook (the "Export" button). The header row is built from the column labels, followed by one line per record.
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/sales/export?type=total-sales&format=xlsx&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Authorization: Bearer <id>|<token>" \
        -H "Accept: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" \
        -o sales-report.xlsx
    response: |
      # Binary response: an XLSX workbook is written to disk
      # (Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
      #  Content-Disposition: attachment; filename="sales-<type>.xlsx").
      # Same columns as the CSV export, as the first sheet's header row plus one row per record.

---

# Reporting — Sales

Returns the aggregate statistics that power the Bagisto admin **Reporting → Sales** screen — total sales, average order value, order counts, the purchase funnel, abandoned carts, refunds, tax and shipping collected, and the top payment methods.

| | |
|---|---|
| **Stats endpoint** | `GET /api/admin/reporting/sales` |
| **View Details endpoint** | `GET /api/admin/reporting/sales/view` |
| **Export endpoint** | `GET /api/admin/reporting/sales/export` |
| **Returns** | A JSON **array** with a single element: `[ { entity, type, dateRange, statistics } ]` |

Reporting has **no permission gate**; any authenticated admin can read it.

## Understanding `type` — the Sales report is **ten** separate calls

This is the most important thing to understand about this API.

The Bagisto admin Sales report is **not one response**. The page is assembled from **ten independent requests**, one per panel, and each is selected with the `?type=` query parameter. These ten groups are exactly the panels of the admin Sales report screen — no more, no less.

So a single call returns **one panel** of the report. To render the full screen, call the endpoint once per `type` (or only for the panels you need). The `statistics` payload **changes shape per `type`** — sometimes an object, sometimes a flat array — so always branch on `type` when consuming it.

### Which `type` maps to which panel

| Sales report panel (admin) | `type` | `statistics` is |
|---|---|---|
| **Total Sales** chart | `total-sales` | object (with `over_time` series) |
| **Average Sales** chart | `average-sales` | object (with `over_time` series) |
| **Total Orders** chart | `total-orders` | object (with `over_time` series) |
| **Purchase Funnel** | `purchase-funnel` | object (no series; chart-only) |
| **Abandoned Carts** | `abandoned-carts` | object (with a `products` list) |
| **Refunds** chart | `refunds` | object (with `over_time` series) |
| **Tax Collected** | `tax-collected` | object (with `top_categories` + `over_time`) |
| **Shipping Collected** | `shipping-collected` | object (with `top_methods` + `over_time`) |
| **Top Payment Methods** | `top-payment-methods` | array |
| **Sales By Coupon** | `sales-by-coupon` | array |

`total-sales` is the default — if you omit `?type=`, you get the "Total Sales" panel.

## Query parameters

| Param | Type | Required | Description |
|---|---|---|---|
| `type` | enum | No | One of the ten values above. Defaults to `total-sales`. |
| `start` | date (YYYY-MM-DD) | No | Lower bound of the reporting window. Defaults to **30 days ago**. |
| `end` | date (YYYY-MM-DD) | No | Upper bound. Defaults to **today**. |
| `channel` | string | No | Channel **code** to scope the figures to a single channel. Defaults to all channels. |

`start` / `end` drive both the current figures and the `previous` baseline used for each `progress` percentage — the previous period is the same-length window immediately before `start`.

## Response envelope

The endpoint always returns a **single-element array**: `[ { entity, type, dateRange, statistics } ]`.

- `entity` — always `"sales"` for this endpoint.
- `type` — echoes back the requested panel.
- `dateRange` — an **object** `{ previous, current }` with a human-readable label for each window (e.g. `"10 May 2026 - 09 Jun 2026"`).
- `statistics` — an object or array whose shape depends on `type` (documented below).

## Response shapes by `type`

Figures with a `previous` / `current` / `progress` shape are period comparisons: `current` is the chosen window, `previous` is the preceding window of equal length, and `progress` is the percentage change (can be negative). The `over_time` series is split into a `previous` and a `current` array, each carrying one bucket per day with `{ label, total, count }`.

### `total-sales`

| Key | Shape | Meaning |
|---|---|---|
| `sales` | `{ previous, current, formatted_total, progress }` | Gross sales for the window. |
| `over_time` | `{ previous: [{ label, total, count }], current: [...] }` | Per-day series for the chart. `total` is sales, `count` is order count. |

### `average-sales`

| Key | Shape | Meaning |
|---|---|---|
| `sales` | `{ previous, current, formatted_total, progress }` | Average order value for the window. |
| `over_time` | `{ previous: [{ label, total, count }], current: [...] }` | Per-day series for the chart. |

### `total-orders`

| Key | Shape | Meaning |
|---|---|---|
| `orders` | `{ previous, current, progress }` | Order count for the window (no `formatted_total`). |
| `over_time` | `{ previous: [{ label, total, count }], current: [...] }` | Per-day series for the chart. |

### `purchase-funnel`

Object only — **no over-time series and no table (`/view`) form**.

| Key | Shape | Meaning |
|---|---|---|
| `visitors` | `{ total, progress }` | Store visitors. |
| `product_visitors` | `{ total, progress }` | Visitors who viewed a product. |
| `carts` | `{ total, progress }` | Carts created. |
| `orders` | `{ total, progress }` | Orders placed. |

Each stage carries a single running `total` plus `progress` — there is no `previous` / `current` split here.

### `abandoned-carts`

| Key | Shape | Meaning |
|---|---|---|
| `sales` | `{ previous, current, formatted_total, progress }` | Value left in abandoned carts. |
| `carts` | `{ previous, current, progress }` | Abandoned-cart count. |
| `rate` | `{ previous, current, progress }` | Abandonment rate (percent). |
| `products` | `array` of `{ id, name, count, progress }` | Products most often left in abandoned carts. |

### `refunds`

| Key | Shape | Meaning |
|---|---|---|
| `refunds` | `{ previous, current, formatted_total, progress }` | Refunded amount for the window. |
| `over_time` | `{ previous: [{ label, total, count }], current: [...] }` | Per-day series for the chart. |

### `tax-collected`

| Key | Shape | Meaning |
|---|---|---|
| `tax_collected` | `{ previous, current, formatted_total, progress }` | Tax collected for the window. |
| `top_categories` | `array` of `{ id, tax_category_id, name, total, progress, formatted_total }` | Tax categories ranked by collected amount. |
| `over_time` | `{ previous: [{ label, total, count }], current: [...] }` | Per-day series for the chart. |

### `shipping-collected`

| Key | Shape | Meaning |
|---|---|---|
| `shipping_collected` | `{ previous, current, formatted_total, progress }` | Shipping charges collected for the window. |
| `top_methods` | `array` of `{ id, title, total, progress, formatted_total }` | Shipping methods ranked by collected amount. |
| `over_time` | `{ previous: [{ label, total, count }], current: [...] }` | Per-day series for the chart. |

### `top-payment-methods`

`statistics` is an **array** (one row per payment method, ranked by collected amount). Each row: `id`, `method`, `method_title`, `title`, `total`, `base_total`, `progress`, `formatted_total`.

### `sales-by-coupon`

`statistics` is an **array** (one row per coupon code used, ranked by discount given). Each row: `coupon_code`, `cart_rule_id`, `total` (orders using the coupon), `base_total`, `base_discount_total`, `formatted_total`, `formatted_discount_total`, `link` (admin cart-rule edit URL, `null` if the rule was deleted), `progress`, `datetime`.

## View Details

`GET /api/admin/reporting/sales/view` returns the same statistics as the summary stats endpoint, but in a detailed table form — the full list that sits behind a panel's **View Details** link. The `statistics` object carries:

- `columns` — an ordered list of `{ key, label }` describing each table column.
- `records` — the row data, each keyed by the column `key` values.

The table shape is **uniform across every `type`** (`columns` + `records`); only the column set and row keys change. It honors the same `type`, `start`, `end` and `channel` parameters as the stats endpoint. (The `purchase-funnel` type is chart-only and has no table form.)

## Export (CSV)

`GET /api/admin/reporting/sales/export` streams the same detailed table as a csv, xls or xlsx attachment (the **Export** button). The header row is built from the column labels, followed by one line per record. Send the `Accept` header matching the requested format and save the response to a file. It honors the same `type`, `start`, `end` and `channel` parameters.

`?format=` accepts `csv` (the default), `xls` and `xlsx` — any other value returns HTTP **422**. Send an `Accept` header matching the format: `text/csv`, `application/vnd.ms-excel` or `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`.

## Errors

| Condition | HTTP | Body |
|---|---|---|
| Missing / invalid Bearer token | `401` | `{ "message": "Unauthenticated.", "error": "unauthenticated" }` |
| Unsupported `format` on export | `422` | `{ ... "Unsupported export format." }` |

## See also

- [Reporting — Sales (GraphQL)](/api/graphql-api/admin/reporting/sales) — same data over the `statsAdminReportingSales` query.
- [Reporting Overview](/api/rest-api/admin/reporting/) — the customer and product report endpoints.
