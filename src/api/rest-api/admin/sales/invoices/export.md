---
outline: false
apiType: rest
examples:
  - id: admin-invoices-export
    title: Export Invoices (CSV)
    description: Download the invoices datagrid as a CSV file — the same data the admin Invoices "Export" button produces. Honours the same filters as the listing.
    query: |
      curl -X GET "https://your-domain.com/api/admin/invoices/export?format=csv" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: text/csv" \
        --output invoices.csv
    response: |
      # Binary response: a text/csv attachment is written to invoices.csv
      # (Content-Disposition: attachment; filename="invoices.csv"). Sample contents:

      ID,"Order ID",Status,"Grand Total","Invoice Date"
      587,2413,paid,$554.00,"2026-06-04 18:34:43"
  - id: admin-invoices-export-xlsx
    title: Export Invoices (XLSX)
    description: Download the invoices datagrid as an XLSX file — the same data the admin Invoices "Export" button produces. Honours the same filters as the listing.
    query: |
      curl -X GET "https://your-domain.com/api/admin/invoices/export?format=xlsx" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" \
        --output invoices.xlsx
    response: |
      # Binary response: an XLSX workbook is written to disk
      # (Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
      #  Content-Disposition: attachment; filename="invoices.xlsx").
      # Same columns as the CSV export, as the first sheet's header row plus one row per record.
  - id: admin-invoices-export-xls
    title: Export Invoices (XLS)
    description: Download the invoices datagrid as an XLS file — the same data the admin Invoices "Export" button produces. Honours the same filters as the listing.
    query: |
      curl -X GET "https://your-domain.com/api/admin/invoices/export?format=xls" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/vnd.ms-excel" \
        --output invoices.xls
    response: |
      # Binary response: an XLS workbook is written to disk
      # (Content-Type: application/vnd.ms-excel
      #  Content-Disposition: attachment; filename="invoices.xls").
      # Same columns as the CSV export, as the first sheet's header row plus one row per record.
---

# Export Invoices

Downloads the invoices datagrid as a **csv, xls or xlsx file** — the same data the admin **Sales → Invoices** "Export" button produces. The response is a binary file attachment, not JSON. Requires the `sales.invoices.view` permission.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/invoices/export` | GET |

## Columns

The export carries the five datagrid columns, in order:

| Header | Value |
|--------|-------|
| `ID` | Invoice number. |
| `Order ID` | The parent order's number. |
| `Status` | The invoice state (e.g. `paid`, `pending`). |
| `Grand Total` | The invoice's total, in the store's base currency, formatted (e.g. `$554.00`). |
| `Invoice Date` | When the invoice was created. |

## Query parameters

`format` selects the export format — `csv` (the default), `xls` or `xlsx`; any other value returns `422`. Send an `Accept` header matching the format: `text/csv`, `application/vnd.ms-excel` or `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`.

The export honours the **same filters as the [listing](/api/rest-api/admin/sales/invoices/list)**, so you export exactly the rows you're viewing: `id`, `order_id`, `state`, `base_grand_total_from` / `_to`, `created_at_from` / `_to`. (Pagination does not apply — the export returns every matching row.)

## Permission

`sales.invoices.view`
