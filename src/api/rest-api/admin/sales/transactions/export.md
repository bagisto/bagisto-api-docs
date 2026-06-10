---
outline: false
apiType: rest
examples:
  - id: admin-transactions-export
    title: Export Transactions (CSV)
    description: Download the transactions datagrid as a CSV file — the same data the admin Transactions "Export" button produces. Honours the same filters as the listing.
    query: |
      curl -X GET "https://your-domain.com/api/admin/transactions/export?format=csv" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: text/csv" \
        --output transactions.csv
    response: |
      # Binary response: a text/csv attachment is written to transactions.csv
      # (Content-Disposition: attachment; filename="transactions.csv"). Sample contents:

      ID,"Transaction ID","Invoice ID","Order ID",Status,Date
      6,605a2919e8a49b907e98f3cc8f71397d,585,41,paid,"2026-06-04 17:52:47"
---

# Export Transactions

Downloads the transactions datagrid as a **CSV file** — the same data the admin **Sales → Transactions** "Export" button produces. The response is a binary `text/csv` attachment, not JSON. Requires the `sales.transactions.view` permission.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/transactions/export` | GET |

## Columns

The CSV carries the six datagrid columns, in order:

| Header | Value |
|--------|-------|
| `ID` | Transaction id. |
| `Transaction ID` | The payment gateway's transaction id. |
| `Invoice ID` | The related invoice's number. |
| `Order ID` | The parent order's number. |
| `Status` | The transaction status (e.g. `paid`, `pending`). |
| `Date` | When the transaction was recorded. |

## Query parameters

`format` selects the export format — **only `csv` is supported** (the default); any other value returns `422`.

The export honours the **same filters as the [listing](/api/rest-api/admin/sales/transactions/list)**, so you export exactly the rows you're viewing: `id`, `transaction_id`, `invoice_id`, `order_id`, `status`, `created_at_from` / `_to`. (Pagination does not apply — the export returns every matching row.)

## Permission

`sales.transactions.view`
