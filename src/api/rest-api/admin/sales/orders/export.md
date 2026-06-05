---
outline: false
apiType: rest
examples:
  - id: admin-orders-export
    title: Export Orders (CSV)
    description: Download the orders datagrid as a CSV file — the same data the admin Orders "Export" button produces. Honours the same filters as the listing.
    query: |
      curl -X GET "https://your-domain.com/api/admin/orders/export?format=csv" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: text/csv" \
        --output orders.csv
    response: |
      # Binary response: a text/csv attachment is written to orders.csv
      # (Content-Disposition: attachment; filename="orders.csv"). Sample contents:

      ID,Status,"Grand Total","Payment Method",Channel,Customer,Email,"Order Date"
      2413,processing,$554.00,"Money Transfer","Default Channel","John Doe",john@example.com,"2026-06-04 18:34:43"
---

# Export Orders

Downloads the orders datagrid as a **CSV file** — the same data the admin **Sales → Orders** "Export" button produces. The response is a binary `text/csv` attachment, not JSON. Requires the `sales.orders.view` permission.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/orders/export` | GET |

## Columns

The CSV carries the eight datagrid columns, in order:

| Header | Value |
|--------|-------|
| `ID` | Order number. |
| `Status` | The order status (e.g. `processing`, `completed`). |
| `Grand Total` | The order's total, in the store's base currency, formatted (e.g. `$554.00`). |
| `Payment Method` | The payment method used (e.g. `Money Transfer`). |
| `Channel` | The channel the order was placed on. |
| `Customer` | The customer's name. |
| `Email` | The customer's email. |
| `Order Date` | When the order was placed. |

## Query parameters

`format` selects the export format — **only `csv` is supported** (the default); any other value returns `422`.

The export honours the **same filters as the [listing](/api/rest-api/admin/sales/orders/list-orders)**, so you export exactly the rows you're viewing: `order_id`, `status`, `grand_total` (plus the `grand_total_from` / `_to` range), `channel`, `customer`, `email`, plus the date presets (`today` … `this_year`) and custom `date_from` / `date_to`. (Pagination does not apply — the export returns every matching row.)

## Permission

`sales.orders.view`
