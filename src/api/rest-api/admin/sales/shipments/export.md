---
outline: false
apiType: rest
examples:
  - id: admin-shipments-export
    title: Export Shipments (CSV)
    description: Download the shipments datagrid as a CSV file — the same data the admin Shipments "Export" button produces. Honours the same filters as the listing.
    query: |
      curl -X GET "https://your-domain.com/api/admin/shipments/export?format=csv" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: text/csv" \
        --output shipments.csv
    response: |
      # Binary response: a text/csv attachment is written to shipments.csv
      # (Content-Disposition: attachment; filename="shipments.csv"). Sample contents:

      ID,"Order ID","Total Qty","Inventory Source","Shipped To","Shipment Date"
      15,172,1,Default,"John Doe","2026-04-23 22:06:13"
---

# Export Shipments

Downloads the shipments datagrid as a **CSV file** — the same data the admin **Sales → Shipments** "Export" button produces. The response is a binary `text/csv` attachment, not JSON. Requires the `sales.shipments.view` permission.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/shipments/export` | GET |

## Columns

The CSV carries the six datagrid columns, in order:

| Header | Value |
|--------|-------|
| `ID` | Shipment id. |
| `Order ID` | The parent order's number. |
| `Total Qty` | Total quantity of items in the shipment. |
| `Inventory Source` | The source the shipment was dispatched from. |
| `Shipped To` | Name on the order's shipping address. |
| `Shipment Date` | When the shipment was created. |

## Query parameters

`format` selects the export format — **only `csv` is supported** (the default); any other value returns `422`.

The export honours the **same filters as the [listing](/api/rest-api/admin/sales/shipments/list)**, so you export exactly the rows you're viewing: `id`, `order_id`, `total_qty`, `inventory_source_name`, `shipped_to`, `order_date_from` / `_to`, `created_at_from` / `_to`. (Pagination does not apply — the export returns every matching row.)

## Permission

`sales.shipments.view`
