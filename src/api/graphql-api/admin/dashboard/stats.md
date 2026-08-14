---
outline: false
examples:
  - id: gql-over-all
    title: Over-all
    description: Headline KPIs for the top "Overall Details" cards — customers, orders, sales, average order value and unpaid-invoice total, each compared against the previous period.
    query: |
      query AdminDashboard($type: String, $start: String, $end: String, $channel: String) {
        statsAdminDashboard(type: $type, start: $start, end: $end, channel: $channel) {
          type
          dateRange
          statistics
        }
      }
    variables: |
      {
        "type": "over-all",
        "start": "2026-05-03",
        "end": "2026-06-02",
        "channel": "default"
      }
    response: |
      {
        "data": {
          "statsAdminDashboard": {
            "type": "over-all",
            "dateRange": null,
            "statistics": {
              "total_customers": { "previous": 3, "current": 0, "progress": -100 },
              "total_orders": { "previous": 3, "current": 22, "progress": 633.33 },
              "total_sales": {
                "previous": 24247,
                "current": 90401,
                "formatted_total": "$90,401.00",
                "progress": 272.83
              },
              "avg_sales": {
                "previous": 8082.33,
                "current": 4109.14,
                "formatted_total": "$4,109.14",
                "progress": -49.16
              },
              "total_unpaid_invoices": {
                "total": 959719.38,
                "formatted_total": "$959,719.38"
              }
            }
          }
        }
      }

  - id: gql-today
    title: Today
    description: Today-only sales/orders/customers progress plus the list of orders placed today. Each order's `items` field is pre-rendered admin HTML, not structured data.
    query: |
      query AdminDashboard($type: String, $start: String, $end: String, $channel: String) {
        statsAdminDashboard(type: $type, start: $start, end: $end, channel: $channel) {
          type
          dateRange
          statistics
        }
      }
    variables: |
      {
        "type": "today",
        "start": "2026-05-03",
        "end": "2026-06-02"
      }
    response: |
      {
        "data": {
          "statsAdminDashboard": {
            "type": "today",
            "dateRange": null,
            "statistics": {
              "total_sales": { "previous": 0, "current": 1000, "formatted_total": "$1,000.00", "progress": 100 },
              "total_orders": { "previous": 0, "current": 2, "progress": 100 },
              "total_customers": { "previous": 0, "current": 0, "progress": 0 },
              "orders": [
                {
                  "id": 638,
                  "increment_id": 638,
                  "status": "processing",
                  "status_label": "Processing",
                  "payment_method": "Money Transfer",
                  "base_grand_total": "465.0000",
                  "formatted_base_grand_total": "$465.00",
                  "channel_name": "bagisto store",
                  "customer_email": "demo@gmail.com",
                  "customer_name": " ",
                  "items": "<div class=\"flex flex-wrap gap-1.5\">...pre-rendered admin HTML...</div>",
                  "billing_address": "test, India",
                  "created_at": "02 Jun 2026, 12:44:33"
                }
              ]
            }
          }
        }
      }

  - id: gql-stock-threshold-products
    title: Stock Threshold Products
    description: Up to 5 products at or under their inventory threshold. Here `statistics` is a flat array of product rows, not an object.
    query: |
      query AdminDashboard($type: String, $start: String, $end: String, $channel: String) {
        statsAdminDashboard(type: $type, start: $start, end: $end, channel: $channel) {
          type
          dateRange
          statistics
        }
      }
    variables: |
      {
        "type": "stock-threshold-products",
        "start": "2026-05-03",
        "end": "2026-06-02"
      }
    response: |
      {
        "data": {
          "statsAdminDashboard": {
            "type": "stock-threshold-products",
            "dateRange": null,
            "statistics": [
              {
                "id": 95,
                "sku": "Puma-White-variant-2-6",
                "name": "Variant 2 6",
                "price": "0.0000",
                "formatted_price": "$0.00",
                "total_qty": "0",
                "image": null
              },
              {
                "id": 97,
                "sku": "Puma-White-variant-4-6",
                "name": "Variant 4 6",
                "price": "0.0000",
                "formatted_price": "$0.00",
                "total_qty": "0",
                "image": null
              }
            ]
          }
        }
      }

  - id: gql-total-sales
    title: Total Sales (chart)
    description: Powers the "Store Stats" sales chart — order/sales progress plus an `over_time` series with one bucket per day across the range.
    query: |
      query AdminDashboard($type: String, $start: String, $end: String, $channel: String) {
        statsAdminDashboard(type: $type, start: $start, end: $end, channel: $channel) {
          type
          dateRange
          statistics
        }
      }
    variables: |
      {
        "type": "total-sales",
        "start": "2026-05-03",
        "end": "2026-06-02"
      }
    response: |
      {
        "data": {
          "statsAdminDashboard": {
            "type": "total-sales",
            "dateRange": null,
            "statistics": {
              "total_orders": { "previous": 3, "current": 22, "progress": 633.33 },
              "total_sales": { "previous": 24247, "current": 90401, "formatted_total": "$90,401.00", "progress": 272.83 },
              "over_time": [
                { "label": "11 May", "total": 0, "count": 0 },
                { "label": "12 May", "total": "909.0000", "count": 1 },
                { "label": "25 May", "total": "18094.0000", "count": 3 }
              ]
            }
          }
        }
      }

  - id: gql-total-visitors
    title: Total Visitors (chart)
    description: Powers the "Visitors" chart — total vs. unique visitor progress plus an `over_time` series (one bucket per day). Requires visitor/analytics data to be populated.
    query: |
      query AdminDashboard($type: String, $start: String, $end: String, $channel: String) {
        statsAdminDashboard(type: $type, start: $start, end: $end, channel: $channel) {
          type
          dateRange
          statistics
        }
      }
    variables: |
      {
        "type": "total-visitors",
        "start": "2026-05-03",
        "end": "2026-06-02"
      }
    response: |
      {
        "data": {
          "statsAdminDashboard": {
            "type": "total-visitors",
            "dateRange": null,
            "statistics": {
              "total": { "previous": 0, "current": 0, "progress": 0 },
              "unique": { "previous": 0, "current": 0, "progress": 0 },
              "over_time": [
                { "label": "31 May", "total": 0 },
                { "label": "01 Jun", "total": 0 },
                { "label": "02 Jun", "total": 0 }
              ]
            }
          }
        }
      }

  - id: gql-top-selling-products
    title: Top Selling Products
    description: Up to 5 best-selling products by revenue. `statistics` is a flat array; each row carries a nested `images` array.
    query: |
      query AdminDashboard($type: String, $start: String, $end: String, $channel: String) {
        statsAdminDashboard(type: $type, start: $start, end: $end, channel: $channel) {
          type
          dateRange
          statistics
        }
      }
    variables: |
      {
        "type": "top-selling-products",
        "start": "2026-05-03",
        "end": "2026-06-02"
      }
    response: |
      {
        "data": {
          "statsAdminDashboard": {
            "type": "top-selling-products",
            "dateRange": null,
            "statistics": [
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
      }

  - id: gql-top-customers
    title: Top Customers
    description: Up to 5 customers with the most sales in the range. `statistics` is a flat array. `id` may be null for guest checkouts.
    query: |
      query AdminDashboard($type: String, $start: String, $end: String, $channel: String) {
        statsAdminDashboard(type: $type, start: $start, end: $end, channel: $channel) {
          type
          dateRange
          statistics
        }
      }
    variables: |
      {
        "type": "top-customers",
        "start": "2026-05-03",
        "end": "2026-06-02"
      }
    response: |
      {
        "data": {
          "statsAdminDashboard": {
            "type": "top-customers",
            "dateRange": null,
            "statistics": [
              {
                "id": 129,
                "email": "demo@gmail.com",
                "full_name": "webkul bagisto",
                "total": "35776.0000",
                "orders": 6,
                "formatted_total": "$35,776.00",
                "datetime": null
              },
              {
                "id": null,
                "email": "kesh@king.com",
                "full_name": "Kesh King",
                "total": "26504.0000",
                "orders": 10,
                "formatted_total": "$26,504.00",
                "datetime": null
              }
            ]
          }
        }
      }
---

# Dashboard Statistics (GraphQL)

Returns the aggregate statistics that power the Bagisto admin **Dashboard** screen — sales, orders, customers, visitors, stock alerts, top products and top customers.

| | |
|---|---|
| **Query** | `statsAdminDashboard` |
| **Endpoint** | `POST /api/admin/graphql` |
| **Returns** | A single object: `{ type, dateRange, statistics }` |

## Understanding `type` — the dashboard is **seven** separate calls

This is the most important thing to understand about this API.

The Bagisto admin Dashboard you see in the panel is **not one response**. The page is assembled from **seven independent queries**, one per section, and each is selected with the `type` argument. These seven groups are exactly the sections of the admin Dashboard screen — no more, no less.

So a single call returns **one section** of the dashboard. To render the full screen, call `statsAdminDashboard` once per `type` (or only for the sections you need). The `statistics` payload **changes shape per `type`** — sometimes an object, sometimes a flat array — so always branch on `type` when consuming it.

### Which `type` maps to which part of the dashboard

| Dashboard section (admin panel) | `type` | `statistics` is |
|---|---|---|
| **Overall Details** cards (Total Sales / Orders / Customers / Average Order Sale / Total Unpaid Invoices) | `over-all` | object |
| **Today's Details** + today's order list | `today` | object |
| **Stock Threshold** product list | `stock-threshold-products` | array |
| **Store Stats** sales chart | `total-sales` | object (with `over_time` series) |
| **Visitors** chart | `total-visitors` | object (with `over_time` series) |
| **Top Selling Products** list | `top-selling-products` | array |
| **Customer With Most Sales** list | `top-customers` | array |

`over-all` is the default — if you omit `type`, you get the "Overall Details" cards.

## Arguments

| Argument | Type | Required | Description |
|---|---|---|---|
| `type` | `String` | No | One of the seven values above. Defaults to `over-all`. An unknown value returns a GraphQL `errors[]` entry (`400`, `invalid-type`). |
| `start` | `String` (YYYY-MM-DD) | No | Lower bound of the reporting window. Defaults to **30 days ago**. |
| `end` | `String` (YYYY-MM-DD) | No | Upper bound. Defaults to **today**. |
| `channel` | `String` | No | Channel **code** to scope the figures to a single channel. Defaults to all channels. |

`start` / `end` drive both the figures and the `previous` baseline used for each `progress` percentage — the previous period is the same-length window immediately before `start`.

## Selection set

```graphql
query AdminDashboard($type: String, $start: String, $end: String, $channel: String) {
  statsAdminDashboard(type: $type, start: $start, end: $end, channel: $channel) {
    type
    dateRange
    statistics
  }
}
```

- `type` — echoes back the requested group.
- `dateRange` — a human-readable label for the window (e.g. `"03 May - 02 Jun"`).
- `statistics` — a JSON scalar whose shape depends on `type` (documented below).

### `dateRange` is `null` over GraphQL

Due to a known GraphQL serialization limitation in this build, the camelCase `dateRange` field returns **`null`** over GraphQL. `type` and `statistics` are fully populated. If you need the formatted date-range label, read it from the [REST endpoint](/api/rest-api/admin/dashboard/stats), which returns it correctly — or reconstruct it from the `start` / `end` you sent.

## Response shapes by `type`

Figures with a `previous` / `current` / `progress` shape are period comparisons: `current` is the chosen window, `previous` is the preceding window of equal length, and `progress` is the percentage change (can be negative).

### `over-all`

| Key | Shape | Meaning |
|---|---|---|
| `total_customers` | `{ previous, current, progress }` | New customers registered. |
| `total_orders` | `{ previous, current, progress }` | Orders placed. |
| `total_sales` | `{ previous, current, formatted_total, progress }` | Gross sales; `formatted_total` is the current value in base currency. |
| `avg_sales` | `{ previous, current, formatted_total, progress }` | Average order value. |
| `total_unpaid_invoices` | `{ total, formatted_total }` | Outstanding invoice amount (no period comparison). |

### `today`

| Key | Shape | Meaning |
|---|---|---|
| `total_sales` | `{ previous, current, formatted_total, progress }` | Today's sales vs. yesterday. |
| `total_orders` | `{ previous, current, progress }` | Today's orders. |
| `total_customers` | `{ previous, current, progress }` | Today's new customers. |
| `orders` | `array` | Orders placed today. Each row: `id`, `increment_id`, `status`, `status_label`, `payment_method`, `base_grand_total`, `formatted_base_grand_total`, `channel_name`, `customer_email`, `customer_name`, `items`, `billing_address`, `created_at`. |

### `orders[].items` is admin HTML

The `items` field is a **pre-rendered admin-panel Blade snippet** (an HTML string of product thumbnails), carried over verbatim from core. It is not structured data — a headless client should ignore it and fetch line items from the Orders API (`/api/admin/orders/{id}`) when product detail is needed.

### `stock-threshold-products`

`statistics` is an **array** (up to 5 rows). Each row: `id`, `sku`, `name`, `price`, `formatted_price`, `total_qty`, `image` (base-image URL or `null`).

### `total-sales`

| Key | Shape | Meaning |
|---|---|---|
| `total_orders` | `{ previous, current, progress }` | Orders in the window. |
| `total_sales` | `{ previous, current, formatted_total, progress }` | Sales in the window. |
| `over_time` | `array` of `{ label, total, count }` | One bucket **per day** across `start`→`end` for the chart line. `total` is sales, `count` is order count. |

### `total-visitors`

| Key | Shape | Meaning |
|---|---|---|
| `total` | `{ previous, current, progress }` | All visits. |
| `unique` | `{ previous, current, progress }` | Unique visitors. |
| `over_time` | `array` of `{ label, total }` | One bucket per day for the chart. |

Visitor figures depend on the Bagisto visitor/analytics tables being populated; on a fresh store they are `0`.

### `top-selling-products`

`statistics` is an **array** (up to 5 rows). Each row: `id`, `name`, `price`, `formatted_price`, `revenue`, `formatted_revenue`, and `images` (array of `{ id, type, path, product_id, position, url }`).

### `top-customers`

`statistics` is an **array** (up to 5 rows). Each row: `id` (may be `null` for guest checkouts), `email`, `full_name` (may be `null`), `total`, `orders`, `formatted_total`, `datetime`.

## Errors

| Condition | Result |
|---|---|
| Missing / invalid Bearer token | `401 Unauthenticated` |
| Unknown `type` value | GraphQL `errors[]` — "Invalid dashboard stat type." (`400`) |

## See also

- [Dashboard Statistics (REST)](/api/rest-api/admin/dashboard/stats) — same data; also returns `dateRange`.
- [Reporting](/api/graphql-api/admin/reporting/) — deeper, dedicated sales / customer / product report endpoints.
