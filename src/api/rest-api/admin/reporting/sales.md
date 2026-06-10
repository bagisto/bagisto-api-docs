---
outline: false
apiType: rest
examples:
  - id: admin-reporting-sales
    title: Reporting — Sales
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/sales?type=total-sales" \
        -H "Authorization: Bearer <token>"
    response: |
      [
        {
          "entity": "sales",
          "type": "total-sales",
          "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
          "statistics": {
            "sales": { "previous": 27243.5, "current": 9697.53, "formatted_total": "$9,697.53", "progress": -64.32 },
            "over_time": {
              "previous": [ { "label": "10 Apr", "total": 4200, "count": 6 } ],
              "current": [ { "label": "10 May", "total": 8500, "count": 12 } ]
            }
          }
        }
      ]
  - id: admin-reporting-sales-filtered
    title: Reporting — Sales (Filtered by date + channel)
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/sales?type=total-sales&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Authorization: Bearer <token>"
    response: |
      [
        {
          "entity": "sales",
          "type": "total-sales",
          "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
          "statistics": {
            "sales": { "previous": 27243.5, "current": 9697.53, "formatted_total": "$9,697.53", "progress": -64.32 },
            "over_time": {
              "previous": [ { "label": "10 Apr", "total": 4200, "count": 6 } ],
              "current": [ { "label": "10 May", "total": 8500, "count": 12 } ]
            }
          }
        }
      ]
  - id: admin-reporting-sales-view
    title: Reporting — Sales (View Details)
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/sales/view?type=total-sales" \
        -H "Authorization: Bearer <token>"
    response: |
      [
        {
          "entity": "sales",
          "type": "total-sales",
          "dateRange": { "previous": "25 Mar - 24 Apr", "current": "25 Apr - 25 May" },
          "statistics": {
            "columns": [
              { "key": "date", "label": "Date" },
              { "key": "total", "label": "Total" }
            ],
            "records": [
              { "date": "2026-04-25", "total": "$1,240.00" },
              { "date": "2026-04-26", "total": "$980.50" },
              { "date": "2026-04-27", "total": "$1,510.75" }
            ]
          }
        }
      ]
  - id: admin-reporting-sales-export
    title: Reporting — Sales (Export CSV)
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/sales/export?type=total-sales&format=csv" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: text/csv" \
        -o sales-report.csv
    response: |
      Date,Total
      2026-04-25,"$1,240.00"
      2026-04-26,"$980.50"
---

# Reporting — Sales

| Endpoint | Method |
|----------|--------|
| `/api/admin/reporting/sales` | GET |
| `/api/admin/reporting/sales/view` | GET |
| `/api/admin/reporting/sales/export` | GET |

## Query Parameters

| Param | Type | Notes |
|-------|------|-------|
| `type` | enum | `total-sales` (default), `average-sales`, `total-orders`, `purchase-funnel`, `abandoned-carts`, `refunds`, `tax-collected`, `shipping-collected`, `top-payment-methods`. |
| `start` | date | Start date. |
| `end` | date | End date. |
| `channel` | string | Channel code. |

::: warning Helper-method output
`statistics` payload is the raw helper aggregate keyed to the chosen `type`.
:::

## View Details

`GET /api/admin/reporting/sales/view` returns the same statistics as the summary `stats` endpoint, but in a detailed table form — the full list that sits behind a panel's **View Details** link. The `statistics` object carries:

- `columns` — an ordered list of `{ key, label }` describing each table column.
- `records` — the row data, each keyed by the column `key` values.

This is the expanded, row-by-row view; the summary `stats` endpoint returns the rolled-up headline figures instead.

## Export (CSV)

`GET /api/admin/reporting/sales/export` streams the same detailed table as a `text/csv` attachment (the **Export** button). The header row is built from the column labels, followed by one line per record. Send `Accept: text/csv` and save the response to a file.

Only `?format=csv` is accepted — any other `format` value returns HTTP 422.

Both **View Details** and **Export** require only authentication; reporting has no permission gate.
