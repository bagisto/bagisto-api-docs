---
outline: false
examples:
  - id: gql-customers-total-customers
    title: Total Customers
    description: New-customer registrations in the window, compared against the previous period, plus an over-time series (previous vs. current) for the chart line.
    query: |
      query AdminReportingCustomers($type: String, $start: String, $end: String, $channel: String) {
        statsAdminReportingCustomers(type: $type, start: $start, end: $end, channel: $channel) {
          entity
          type
          dateRange
          statistics
        }
      }
    variables: |
      {
        "type": "total-customers",
        "start": "2026-05-10",
        "end": "2026-06-09",
        "channel": "default"
      }
    response: |
      {
        "data": {
          "statsAdminReportingCustomers": {
            "entity": "customers",
            "type": "total-customers",
            "dateRange": {
              "previous": "10 Apr 2026 - 10 May 2026",
              "current": "10 May 2026 - 09 Jun 2026"
            },
            "statistics": {
              "customers": { "previous": 1, "current": 9, "progress": 800 },
              "over_time": {
                "previous": [
                  { "label": "23 Apr", "total": 1 }
                ],
                "current": [
                  { "label": "12 May", "total": 4 },
                  { "label": "26 May", "total": 5 }
                ]
              }
            }
          }
        }
      }

  - id: gql-customers-customers-traffic
    title: Customers Traffic
    description: Total vs. unique customer visits compared against the previous period, plus an over-time series. Requires visitor/analytics data — on a fresh store these figures are zero or empty.
    query: |
      query AdminReportingCustomers($type: String, $start: String, $end: String, $channel: String) {
        statsAdminReportingCustomers(type: $type, start: $start, end: $end, channel: $channel) {
          entity
          type
          dateRange
          statistics
        }
      }
    variables: |
      {
        "type": "customers-traffic",
        "start": "2026-05-10",
        "end": "2026-06-09",
        "channel": "default"
      }
    response: |
      {
        "data": {
          "statsAdminReportingCustomers": {
            "entity": "customers",
            "type": "customers-traffic",
            "dateRange": {
              "previous": "10 Apr 2026 - 10 May 2026",
              "current": "10 May 2026 - 09 Jun 2026"
            },
            "statistics": {
              "total": { "previous": 0, "current": 0, "progress": 0 },
              "unique": { "previous": 0, "current": 0, "progress": 0 },
              "over_time": {
                "previous": [],
                "current": []
              }
            }
          }
        }
      }

  - id: gql-customers-customers-with-most-sales
    title: Customers With Most Sales
    description: Top customers ranked by total spend in the window. `statistics` is a flat array; each row carries the customer's order count and formatted total. `id` may be null for guest checkouts.
    query: |
      query AdminReportingCustomers($type: String, $start: String, $end: String, $channel: String) {
        statsAdminReportingCustomers(type: $type, start: $start, end: $end, channel: $channel) {
          entity
          type
          dateRange
          statistics
        }
      }
    variables: |
      {
        "type": "customers-with-most-sales",
        "start": "2026-05-10",
        "end": "2026-06-09",
        "channel": "default"
      }
    response: |
      {
        "data": {
          "statsAdminReportingCustomers": {
            "entity": "customers",
            "type": "customers-with-most-sales",
            "dateRange": {
              "previous": "10 Apr 2026 - 10 May 2026",
              "current": "10 May 2026 - 09 Jun 2026"
            },
            "statistics": [
              {
                "id": 129,
                "email": "jane@example.com",
                "full_name": "Jane Cooper",
                "total": "4820.0000",
                "orders": 6,
                "progress": 152.4,
                "formatted_total": "$4,820.00"
              },
              {
                "id": null,
                "email": "devon@example.com",
                "full_name": "Devon Lane",
                "total": "3150.5000",
                "orders": 4,
                "progress": 88.1,
                "formatted_total": "$3,150.50"
              }
            ]
          }
        }
      }

  - id: gql-customers-customers-with-most-orders
    title: Customers With Most Orders
    description: Top customers ranked by order count in the window. `statistics` is a flat array. `id` may be null for guest checkouts.
    query: |
      query AdminReportingCustomers($type: String, $start: String, $end: String, $channel: String) {
        statsAdminReportingCustomers(type: $type, start: $start, end: $end, channel: $channel) {
          entity
          type
          dateRange
          statistics
        }
      }
    variables: |
      {
        "type": "customers-with-most-orders",
        "start": "2026-05-10",
        "end": "2026-06-09",
        "channel": "default"
      }
    response: |
      {
        "data": {
          "statsAdminReportingCustomers": {
            "entity": "customers",
            "type": "customers-with-most-orders",
            "dateRange": {
              "previous": "10 Apr 2026 - 10 May 2026",
              "current": "10 May 2026 - 09 Jun 2026"
            },
            "statistics": [
              {
                "id": 142,
                "email": "kesh@king.com",
                "full_name": "Kesh King",
                "orders": 10,
                "progress": 233.33
              },
              {
                "id": 129,
                "email": "jane@example.com",
                "full_name": "Jane Cooper",
                "orders": 6,
                "progress": 100
              }
            ]
          }
        }
      }

  - id: gql-customers-customers-with-most-reviews
    title: Customers With Most Reviews
    description: Top customers ranked by number of product reviews left in the window. `statistics` is a flat array. `id` may be null for guest reviews.
    query: |
      query AdminReportingCustomers($type: String, $start: String, $end: String, $channel: String) {
        statsAdminReportingCustomers(type: $type, start: $start, end: $end, channel: $channel) {
          entity
          type
          dateRange
          statistics
        }
      }
    variables: |
      {
        "type": "customers-with-most-reviews",
        "start": "2026-05-10",
        "end": "2026-06-09",
        "channel": "default"
      }
    response: |
      {
        "data": {
          "statsAdminReportingCustomers": {
            "entity": "customers",
            "type": "customers-with-most-reviews",
            "dateRange": {
              "previous": "10 Apr 2026 - 10 May 2026",
              "current": "10 May 2026 - 09 Jun 2026"
            },
            "statistics": [
              {
                "id": 129,
                "email": "jane@example.com",
                "full_name": "Jane Cooper",
                "reviews": 12,
                "progress": 50
              },
              {
                "id": 142,
                "email": "kesh@king.com",
                "full_name": "Kesh King",
                "reviews": 7,
                "progress": 16.67
              }
            ]
          }
        }
      }

  - id: gql-customers-top-customer-groups
    title: Top Customer Groups
    description: Customer groups ranked by total customers (or members) in the window. `statistics` is a flat array of group rows.
    query: |
      query AdminReportingCustomers($type: String, $start: String, $end: String, $channel: String) {
        statsAdminReportingCustomers(type: $type, start: $start, end: $end, channel: $channel) {
          entity
          type
          dateRange
          statistics
        }
      }
    variables: |
      {
        "type": "top-customer-groups",
        "start": "2026-05-10",
        "end": "2026-06-09",
        "channel": "default"
      }
    response: |
      {
        "data": {
          "statsAdminReportingCustomers": {
            "entity": "customers",
            "type": "top-customer-groups",
            "dateRange": {
              "previous": "10 Apr 2026 - 10 May 2026",
              "current": "10 May 2026 - 09 Jun 2026"
            },
            "statistics": [
              {
                "id": 1,
                "group_name": "General",
                "total": 142,
                "progress": 18.33
              },
              {
                "id": 2,
                "group_name": "Wholesale",
                "total": 23,
                "progress": 4.55
              },
              {
                "id": 3,
                "group_name": "Guest",
                "total": 9,
                "progress": -10
              }
            ]
          }
        }
      }

  - id: gql-customers-view
    title: View Details (table form)
    description: The expanded, row-by-row table behind a panel's "View Details" link, via the viewStatsAdminReportingCustomers query. Honors the same `type` — here `customers-with-most-sales`. `statistics` carries `columns` + `records`.
    query: |
      query AdminReportingCustomersView($type: String, $start: String, $end: String, $channel: String) {
        viewStatsAdminReportingCustomers(type: $type, start: $start, end: $end, channel: $channel) {
          entity
          type
          dateRange
          statistics
        }
      }
    variables: |
      {
        "type": "customers-with-most-sales",
        "start": "2026-05-10",
        "end": "2026-06-09",
        "channel": "default"
      }
    response: |
      {
        "data": {
          "viewStatsAdminReportingCustomers": {
            "entity": "customers",
            "type": "customers-with-most-sales",
            "dateRange": {
              "previous": "10 Apr 2026 - 10 May 2026",
              "current": "10 May 2026 - 09 Jun 2026"
            },
            "statistics": {
              "columns": [
                { "key": "full_name", "label": "Customer" },
                { "key": "email", "label": "Email" },
                { "key": "formatted_total", "label": "Total" }
              ],
              "records": [
                { "id": 129, "email": "jane@example.com", "full_name": "Jane Cooper", "total": "4820.0000", "orders": 6, "formatted_total": "$4,820.00" },
                { "id": null, "email": "devon@example.com", "full_name": "Devon Lane", "total": "3150.5000", "orders": 4, "formatted_total": "$3,150.50" }
              ]
            }
          }
        }
      }
---

# Reporting — Customers (GraphQL)

Returns the aggregate statistics that power the Bagisto admin **Reporting → Customers** report — new customers, traffic, top spenders, most orders, most reviews and top customer groups.

| | |
|---|---|
| **Query** | `statsAdminReportingCustomers` |
| **Endpoint** | `POST /api/admin/graphql` |
| **Returns** | A single object: `{ entity, type, dateRange, statistics }` |

## Understanding `type` — the report is **six** separate calls

The Customers report screen is **not one response**. It is assembled from **six independent queries**, one per panel, and each is selected with the `type` argument. These six groups are exactly the panels of the admin Reporting → Customers screen — no more, no less.

So a single call returns **one panel** of the report. To render the full screen, call `statsAdminReportingCustomers` once per `type` (or only for the panels you need). The `statistics` payload **changes shape per `type`** — sometimes an object, sometimes a flat array — so always branch on `type` when consuming it.

### Which `type` maps to which panel

| Report panel (admin) | `type` | `statistics` is |
|---|---|---|
| **Total Customers** chart | `total-customers` | object (with `over_time` series) |
| **Customers Traffic** chart | `customers-traffic` | object (with `over_time` series) |
| **Customers With Most Sales** list | `customers-with-most-sales` | array |
| **Customers With Most Orders** list | `customers-with-most-orders` | array |
| **Customers With Most Reviews** list | `customers-with-most-reviews` | array |
| **Top Customer Groups** list | `top-customer-groups` | array |

`total-customers` is the default — if you omit `type`, you get the "Total Customers" chart.

## Arguments

| Argument | Type | Required | Description |
|---|---|---|---|
| `type` | `String` | No | One of the six values above. Defaults to `total-customers`. An unknown value returns a GraphQL `errors[]` entry (`400`, `invalid-type`). |
| `start` | `String` (YYYY-MM-DD) | No | Lower bound of the reporting window. Defaults to **30 days ago**. |
| `end` | `String` (YYYY-MM-DD) | No | Upper bound. Defaults to **today**. |
| `channel` | `String` | No | Channel **code** to scope the figures to a single channel. Defaults to all channels. |

`start` / `end` drive both the figures and the `previous` baseline used for each `progress` percentage — the previous period is the same-length window immediately before `start`.

## Selection set

```graphql
query AdminReportingCustomers($type: String, $start: String, $end: String, $channel: String) {
  statsAdminReportingCustomers(type: $type, start: $start, end: $end, channel: $channel) {
    entity
    type
    dateRange
    statistics
  }
}
```

- `entity` — always `"customers"` for this report.
- `type` — echoes back the requested panel.
- `dateRange` — a JSON object `{ previous, current }`, each a human-readable label for the corresponding window. This **resolves correctly over GraphQL** for the reporting queries.
- `statistics` — a JSON scalar whose shape depends on `type` (documented below). Query it bare — it has no sub-fields to select.

## Response shapes by `type`

Figures with a `previous` / `current` / `progress` shape are period comparisons: `current` is the chosen window, `previous` is the preceding window of equal length, and `progress` is the percentage change (can be negative).

### `total-customers`

| Key | Shape | Meaning |
|---|---|---|
| `customers` | `{ previous, current, progress }` | New customers registered. |
| `over_time` | `{ previous: [{ label, total }], current: [{ label, total }] }` | Two series — previous and current windows — one bucket per day for the chart line. |

### `customers-traffic`

| Key | Shape | Meaning |
|---|---|---|
| `total` | `{ previous, current, progress }` | All customer visits. |
| `unique` | `{ previous, current, progress }` | Unique customer visits. |
| `over_time` | `{ previous: [{ label, total }], current: [{ label, total }] }` | Two daily series for the chart. |

This panel is chart-only — there is **no View Details** table for `customers-traffic`. Traffic figures depend on the Bagisto visitor/analytics tables being populated; on a fresh store the totals are `0` and the `over_time` series are empty.

### `customers-with-most-sales`

`statistics` is an **array**. Each row: `id` (may be `null` for guest checkouts), `email`, `full_name`, `total`, `orders`, `progress`, `formatted_total`.

### `customers-with-most-orders`

`statistics` is an **array**. Each row: `id` (may be `null` for guest checkouts), `email`, `full_name`, `orders`, `progress`.

### `customers-with-most-reviews`

`statistics` is an **array**. Each row: `id` (may be `null` for guest reviews), `email`, `full_name`, `reviews`, `progress`.

### `top-customer-groups`

`statistics` is an **array**. Each row: `id`, `group_name`, `total`, `progress`.

## View Details

`viewStatsAdminReportingCustomers` is the detailed table form of the matching `statsAdminReportingCustomers` query — its `statistics` carries `columns` (`{ key, label }`) and `records` (the row data behind a panel's **View Details** link), rather than the rolled-up headline figures. It honors the same `type` argument.

The table columns per `type`:

| `type` | `columns` (`key`) |
|---|---|
| `total-customers` | `label`, `total` |
| `customers-with-most-sales` | `full_name`, `email`, `formatted_total` |
| `customers-with-most-orders` | `full_name`, `email`, `orders` |
| `customers-with-most-reviews` | `full_name`, `email`, `reviews` |
| `top-customer-groups` | `group_name`, `total` |

`customers-traffic` is chart-only and has no table form.

The CSV **Export** is REST only (a binary `text/csv` download); there is no GraphQL equivalent — see the [REST endpoint](/api/rest-api/admin/reporting/customers).

## Errors

| Condition | Result |
|---|---|
| Missing / invalid Bearer token | `401 Unauthenticated` |
| Unknown `type` value | GraphQL `errors[]` — "Invalid reporting stat type." (`400`) |

## See also

- [Reporting — Customers (REST)](/api/rest-api/admin/reporting/customers) — same data; also serves the CSV Export.
- [Reporting](/api/graphql-api/admin/reporting/) — the sales, customers and products report endpoints.
