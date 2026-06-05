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
---

# Export Invoices

Downloads the invoices datagrid as a **CSV file** — the same data the admin **Sales → Invoices** "Export" button produces. The response is a binary `text/csv` attachment, not JSON. Requires the `sales.invoices.view` permission.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/invoices/export` | GET |

## Columns

The CSV carries the five datagrid columns, in order:

| Header | Value |
|--------|-------|
| `ID` | Invoice number. |
| `Order ID` | The parent order's number. |
| `Status` | The invoice state (e.g. `paid`, `pending`). |
| `Grand Total` | The invoice's total, in the store's base currency, formatted (e.g. `$554.00`). |
| `Invoice Date` | When the invoice was created. |

## Query parameters

`format` selects the export format — **only `csv` is supported** (the default); any other value returns `422`.

The export honours the **same filters as the [listing](/api/rest-api/admin/sales/invoices/list)**, so you export exactly the rows you're viewing: `id`, `order_id`, `state`, `base_grand_total_from` / `_to`, `created_at_from` / `_to`. (Pagination does not apply — the export returns every matching row.)

## Permission

`sales.invoices.view`
