---
outline: false
apiType: rest
examples:
  - id: admin-refunds-export
    title: Export Refunds (CSV)
    description: Download the refunds datagrid as a CSV file — the same data the admin Refunds "Export" button produces. Honours the same filters as the listing.
    query: |
      curl -X GET "https://your-domain.com/api/admin/refunds/export?format=csv" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: text/csv" \
        --output refunds.csv
    response: |
      # Binary response: a text/csv attachment is written to refunds.csv
      # (Content-Disposition: attachment; filename="refunds.csv"). Sample contents:

      ID,"Order ID","Refunded Amount","Billed To","Refund Date"
      1,105,"$4,233.00","John Doe","2025-04-16 22:13:30"
  - id: admin-refunds-export-xlsx
    title: Export Refunds (XLSX)
    description: Download the refunds datagrid as an XLSX file — the same data the admin Refunds "Export" button produces. Honours the same filters as the listing.
    query: |
      curl -X GET "https://your-domain.com/api/admin/refunds/export?format=xlsx" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" \
        --output refunds.xlsx
    response: |
      # Binary response: an XLSX workbook is written to disk
      # (Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
      #  Content-Disposition: attachment; filename="refunds.xlsx").
      # Same columns as the CSV export, as the first sheet's header row plus one row per record.
  - id: admin-refunds-export-xls
    title: Export Refunds (XLS)
    description: Download the refunds datagrid as an XLS file — the same data the admin Refunds "Export" button produces. Honours the same filters as the listing.
    query: |
      curl -X GET "https://your-domain.com/api/admin/refunds/export?format=xls" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/vnd.ms-excel" \
        --output refunds.xls
    response: |
      # Binary response: an XLS workbook is written to disk
      # (Content-Type: application/vnd.ms-excel
      #  Content-Disposition: attachment; filename="refunds.xls").
      # Same columns as the CSV export, as the first sheet's header row plus one row per record.
---

# Export Refunds

Downloads the refunds datagrid as a **csv, xls or xlsx file** — the same data the admin **Sales → Refunds** "Export" button produces. The response is a binary file attachment, not JSON. Requires the `sales.refunds.view` permission.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/refunds/export` | GET |

## Columns

The export carries the five datagrid columns, in order:

| Header | Value |
|--------|-------|
| `ID` | Refund id. |
| `Order ID` | The parent order's number. |
| `Refunded Amount` | The total amount refunded, in the store's base currency, formatted (e.g. `$4,233.00`) — this is the refund's grand total, not just the line-items subtotal. |
| `Billed To` | Name on the order's billing address. |
| `Refund Date` | When the refund was created. |

## Query parameters

`format` selects the export format — `csv` (the default), `xls` or `xlsx`; any other value returns `422`. Send an `Accept` header matching the format: `text/csv`, `application/vnd.ms-excel` or `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`.

The export honours the **same filters as the [listing](/api/rest-api/admin/sales/refunds/list)**, so you export exactly the rows you're viewing: `id`, `order_id`, `state`, `base_grand_total_from` / `_to`, `billed_to`, `created_at_from` / `_to`. (Pagination does not apply — the export returns every matching row.)

## Permission

`sales.refunds.view`
