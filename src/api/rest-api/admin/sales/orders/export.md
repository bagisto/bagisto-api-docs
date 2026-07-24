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
  - id: admin-orders-export-xlsx
    title: Export Orders (XLSX)
    description: Download the orders datagrid as an XLSX file — the same data the admin Orders "Export" button produces. Honours the same filters as the listing.
    query: |
      curl -X GET "https://your-domain.com/api/admin/orders/export?format=xlsx" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" \
        --output orders.xlsx
    response: |
      # Binary response: an XLSX workbook is written to disk
      # (Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
      #  Content-Disposition: attachment; filename="orders.xlsx").
      # Same columns as the CSV export, as the first sheet's header row plus one row per record.
  - id: admin-orders-export-xls
    title: Export Orders (XLS)
    description: Download the orders datagrid as an XLS file — the same data the admin Orders "Export" button produces. Honours the same filters as the listing.
    query: |
      curl -X GET "https://your-domain.com/api/admin/orders/export?format=xls" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/vnd.ms-excel" \
        --output orders.xls
    response: |
      # Binary response: an XLS workbook is written to disk
      # (Content-Type: application/vnd.ms-excel
      #  Content-Disposition: attachment; filename="orders.xls").
      # Same columns as the CSV export, as the first sheet's header row plus one row per record.
---

# Export Orders

Downloads the orders datagrid as a **csv, xls or xlsx file** — the same data the admin **Sales → Orders** "Export" button produces. The response is a binary file attachment, not JSON. Requires the `sales.orders.view` permission.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/orders/export` | GET |

## Columns

The export carries the eight datagrid columns, in order:

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

`format` selects the export format — `csv` (the default), `xls` or `xlsx`; any other value returns `422`. Send an `Accept` header matching the format: `text/csv`, `application/vnd.ms-excel` or `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`.

The export honours the **same filters as the [listing](/api/rest-api/admin/sales/orders/list-orders)**, so you export exactly the rows you're viewing: `order_id`, `status`, `grand_total` (plus the `grand_total_from` / `_to` range), `channel`, `customer`, `email`, plus the date presets (`today`, `yesterday`, `this_week`, `this_month`, `last_month`, `last_three_months`, `last_six_months`, `this_year`) and custom `date_from` / `date_to`. (Pagination does not apply — the export returns every matching row.)

## Permission

`sales.orders.view`
