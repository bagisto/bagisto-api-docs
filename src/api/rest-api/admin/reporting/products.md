---
outline: false
apiType: rest
examples:
  - id: admin-reporting-products
    title: Reporting — Products
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/products?type=total-sold-quantities" \
        -H "Authorization: Bearer <token>"
    response: |
      [
        {
          "entity": "products",
          "type": "total-sold-quantities",
          "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
          "statistics": {
            "quantities": { "previous": 82, "current": 13, "progress": -84.15 },
            "over_time": {
              "previous": [ { "label": "10 Apr", "total": 21 } ],
              "current": [ { "label": "10 May", "total": 5 } ]
            }
          }
        }
      ]
  - id: admin-reporting-products-filtered
    title: Reporting — Products (Filtered by date + channel)
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/products?type=total-sold-quantities&start=2026-05-10&end=2026-06-09&channel=default" \
        -H "Authorization: Bearer <token>"
    response: |
      [
        {
          "entity": "products",
          "type": "total-sold-quantities",
          "dateRange": { "previous": "10 Apr 2026 - 10 May 2026", "current": "10 May 2026 - 09 Jun 2026" },
          "statistics": {
            "quantities": { "previous": 82, "current": 13, "progress": -84.15 },
            "over_time": {
              "previous": [ { "label": "10 Apr", "total": 21 } ],
              "current": [ { "label": "10 May", "total": 5 } ]
            }
          }
        }
      ]
  - id: admin-reporting-products-view
    title: Reporting — Products (View Details)
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/products/view?type=top-selling-products-by-revenue" \
        -H "Authorization: Bearer <token>"
    response: |
      [
        {
          "entity": "products",
          "type": "top-selling-products-by-revenue",
          "dateRange": { "previous": "25 Mar - 24 Apr", "current": "25 Apr - 25 May" },
          "statistics": {
            "columns": [
              { "key": "name", "label": "Product" },
              { "key": "sku", "label": "SKU" },
              { "key": "revenue", "label": "Revenue" }
            ],
            "records": [
              { "name": "Wireless Headphones", "sku": "WH-100", "revenue": "$6,420.00" },
              { "name": "Cotton T-Shirt", "sku": "CT-220", "revenue": "$3,980.50" },
              { "name": "Leather Wallet", "sku": "LW-045", "revenue": "$2,610.75" }
            ]
          }
        }
      ]
  - id: admin-reporting-products-export
    title: Reporting — Products (Export CSV)
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/products/export?type=top-selling-products-by-revenue&format=csv" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: text/csv" \
        -o products-report.csv
    response: |
      Product,SKU,Revenue
      Wireless Headphones,WH-100,"$6,420.00"
      Cotton T-Shirt,CT-220,"$3,980.50"
---

# Reporting — Products

| Endpoint | Method |
|----------|--------|
| `/api/admin/reporting/products` | GET |
| `/api/admin/reporting/products/view` | GET |
| `/api/admin/reporting/products/export` | GET |

## Query Parameters

| Param | Type | Notes |
|-------|------|-------|
| `type` | enum | `total-sold-quantities` (default), `total-products-added-to-wishlist`, `top-selling-products-by-revenue`, `top-selling-products-by-quantity`, `products-with-most-reviews`, `products-with-most-visits`, `last-search-terms`, `top-search-terms`. |
| `start` | date | Start date. |
| `end` | date | End date. |
| `channel` | string | Channel code. |

::: warning Helper-method output
`statistics` shape depends on the chosen `type`.
:::

## View Details

`GET /api/admin/reporting/products/view` returns the same statistics as the summary `stats` endpoint, but in a detailed table form — the full list that sits behind a panel's **View Details** link. The `statistics` object carries:

- `columns` — an ordered list of `{ key, label }` describing each table column.
- `records` — the row data, each keyed by the column `key` values.

This is the expanded, row-by-row view; the summary `stats` endpoint returns the rolled-up headline figures instead.

## Export (CSV)

`GET /api/admin/reporting/products/export` streams the same detailed table as a `text/csv` attachment (the **Export** button). The header row is built from the column labels, followed by one line per record. Send `Accept: text/csv` and save the response to a file.

Only `?format=csv` is accepted — any other `format` value returns HTTP 422.

Both **View Details** and **Export** require only authentication; reporting has no permission gate.
