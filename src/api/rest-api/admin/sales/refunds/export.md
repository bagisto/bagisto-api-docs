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
---

# Export Refunds

Downloads the refunds datagrid as a **CSV file** — the same data the admin **Sales → Refunds** "Export" button produces. The response is a binary `text/csv` attachment, not JSON. Requires the `sales.refunds.view` permission.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/refunds/export` | GET |

## Columns

The CSV carries the five datagrid columns, in order:

| Header | Value |
|--------|-------|
| `ID` | Refund id. |
| `Order ID` | The parent order's number. |
| `Refunded Amount` | The total amount refunded, in the store's base currency, formatted (e.g. `$4,233.00`) — this is the refund's grand total, not just the line-items subtotal. |
| `Billed To` | Name on the order's billing address. |
| `Refund Date` | When the refund was created. |

## Query parameters

`format` selects the export format — **only `csv` is supported** (the default); any other value returns `422`.

The export honours the **same filters as the [listing](/api/rest-api/admin/sales/refunds/list)**, so you export exactly the rows you're viewing: `id`, `order_id`, `state`, `base_grand_total_from` / `_to`, `billed_to`, `created_at_from` / `_to`. (Pagination does not apply — the export returns every matching row.)

## Permission

`sales.refunds.view`
