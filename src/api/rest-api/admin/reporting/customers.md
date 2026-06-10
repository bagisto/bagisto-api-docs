---
outline: false
apiType: rest
examples:
  - id: admin-reporting-customers
    title: Reporting — Customers
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/customers?type=total-customers" \
        -H "Authorization: Bearer <token>"
    response: |
      [
        {
          "entity": "customers",
          "type": "total-customers",
          "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
          "statistics": {
            "customers": { "previous": 1, "current": 9, "progress": 800 },
            "over_time": {
              "previous": [ { "label": "23 May", "total": 1 } ],
              "current": [ { "label": "26 May", "total": 9 } ]
            }
          }
        }
      ]
  - id: admin-reporting-customers-filtered
    title: Reporting — Customers (Filtered by date + channel)
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/customers?type=total-customers&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Authorization: Bearer <token>"
    response: |
      [
        {
          "entity": "customers",
          "type": "total-customers",
          "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
          "statistics": {
            "customers": { "previous": 1, "current": 9, "progress": 800 },
            "over_time": {
              "previous": [ { "label": "23 May", "total": 1 } ],
              "current": [ { "label": "26 May", "total": 9 } ]
            }
          }
        }
      ]
  - id: admin-reporting-customers-view
    title: Reporting — Customers (View Details)
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/customers/view?type=customers-with-most-sales" \
        -H "Authorization: Bearer <token>"
    response: |
      [
        {
          "entity": "customers",
          "type": "customers-with-most-sales",
          "dateRange": { "previous": "25 Mar - 24 Apr", "current": "25 Apr - 25 May" },
          "statistics": {
            "columns": [
              { "key": "name", "label": "Customer" },
              { "key": "email", "label": "Email" },
              { "key": "total", "label": "Total Sales" }
            ],
            "records": [
              { "name": "Jane Cooper", "email": "jane@example.com", "total": "$4,820.00" },
              { "name": "Devon Lane", "email": "devon@example.com", "total": "$3,150.50" },
              { "name": "Arlene McCoy", "email": "arlene@example.com", "total": "$2,940.25" }
            ]
          }
        }
      ]
  - id: admin-reporting-customers-export
    title: Reporting — Customers (Export CSV)
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/customers/export?type=customers-with-most-sales&format=csv" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: text/csv" \
        -o customers-report.csv
    response: |
      Customer,Email,Total Sales
      Jane Cooper,jane@example.com,"$4,820.00"
      Devon Lane,devon@example.com,"$3,150.50"
---

# Reporting — Customers

| Endpoint | Method |
|----------|--------|
| `/api/admin/reporting/customers` | GET |
| `/api/admin/reporting/customers/view` | GET |
| `/api/admin/reporting/customers/export` | GET |

## Query Parameters

| Param | Type | Notes |
|-------|------|-------|
| `type` | enum | `total-customers` (default), `customers-traffic`, `customers-with-most-sales`, `customers-with-most-orders`, `customers-with-most-reviews`, `top-customer-groups`. |
| `start` | date | Start date. |
| `end` | date | End date. |
| `channel` | string | Channel code. |

::: warning Helper-method output
`statistics` shape depends on the chosen `type`.
:::

## View Details

`GET /api/admin/reporting/customers/view` returns the same statistics as the summary `stats` endpoint, but in a detailed table form — the full list that sits behind a panel's **View Details** link. The `statistics` object carries:

- `columns` — an ordered list of `{ key, label }` describing each table column.
- `records` — the row data, each keyed by the column `key` values.

This is the expanded, row-by-row view; the summary `stats` endpoint returns the rolled-up headline figures instead.

## Export (CSV)

`GET /api/admin/reporting/customers/export` streams the same detailed table as a `text/csv` attachment (the **Export** button). The header row is built from the column labels, followed by one line per record. Send `Accept: text/csv` and save the response to a file.

Only `?format=csv` is accepted — any other `format` value returns HTTP 422.

Both **View Details** and **Export** require only authentication; reporting has no permission gate.
