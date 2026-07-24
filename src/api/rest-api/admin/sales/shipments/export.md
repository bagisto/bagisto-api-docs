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
  - id: admin-shipments-export-xlsx
    title: Export Shipments (XLSX)
    description: Download the shipments datagrid as an XLSX file — the same data the admin Shipments "Export" button produces. Honours the same filters as the listing.
    query: |
      curl -X GET "https://your-domain.com/api/admin/shipments/export?format=xlsx" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" \
        --output shipments.xlsx
    response: |
      # Binary response: an XLSX workbook is written to disk
      # (Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
      #  Content-Disposition: attachment; filename="shipments.xlsx").
      # Same columns as the CSV export, as the first sheet's header row plus one row per record.
  - id: admin-shipments-export-xls
    title: Export Shipments (XLS)
    description: Download the shipments datagrid as an XLS file — the same data the admin Shipments "Export" button produces. Honours the same filters as the listing.
    query: |
      curl -X GET "https://your-domain.com/api/admin/shipments/export?format=xls" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/vnd.ms-excel" \
        --output shipments.xls
    response: |
      # Binary response: an XLS workbook is written to disk
      # (Content-Type: application/vnd.ms-excel
      #  Content-Disposition: attachment; filename="shipments.xls").
      # Same columns as the CSV export, as the first sheet's header row plus one row per record.
---

# Export Shipments

Downloads the shipments datagrid as a **csv, xls or xlsx file** — the same data the admin **Sales → Shipments** "Export" button produces. The response is a binary file attachment, not JSON. Requires the `sales.shipments.view` permission.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/shipments/export` | GET |

## Columns

The export carries the six datagrid columns, in order:

| Header | Value |
|--------|-------|
| `ID` | Shipment id. |
| `Order ID` | The parent order's number. |
| `Total Qty` | Total quantity of items in the shipment. |
| `Inventory Source` | The source the shipment was dispatched from. |
| `Shipped To` | Name on the order's shipping address. |
| `Shipment Date` | When the shipment was created. |

## Query parameters

`format` selects the export format — `csv` (the default), `xls` or `xlsx`; any other value returns `422`. Send an `Accept` header matching the format: `text/csv`, `application/vnd.ms-excel` or `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`.

The export honours the **same filters as the [listing](/api/rest-api/admin/sales/shipments/list)**, so you export exactly the rows you're viewing: `id`, `order_id`, `total_qty`, `inventory_source_name`, `shipped_to`, `order_date_from` / `_to`, `created_at_from` / `_to`. (Pagination does not apply — the export returns every matching row.)

## Permission

`sales.shipments.view`
