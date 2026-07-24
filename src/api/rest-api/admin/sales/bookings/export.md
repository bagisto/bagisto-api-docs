---
outline: false
apiType: rest
examples:
  - id: admin-bookings-export
    title: Export Bookings (CSV)
    description: Download the bookings datagrid as a CSV file — the same data the admin Bookings "Export" button produces. Honours the same filters as the listing.
    query: |
      curl -X GET "https://your-domain.com/api/admin/bookings/export?format=csv" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: text/csv" \
        --output bookings.csv
    response: |
      # Binary response: a text/csv attachment is written to bookings.csv
      # (Content-Disposition: attachment; filename="bookings.csv"). Sample contents:

      ID,"Order ID",Qty,From,To,"Booking Date"
      17,2391,1,"20 May, 2026 13:00PM","20 May, 2026 14:00PM","2026-05-19 13:11:39"
  - id: admin-bookings-export-xlsx
    title: Export Bookings (XLSX)
    description: Download the bookings datagrid as an XLSX file — the same data the admin Bookings "Export" button produces. Honours the same filters as the listing.
    query: |
      curl -X GET "https://your-domain.com/api/admin/bookings/export?format=xlsx" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" \
        --output bookings.xlsx
    response: |
      # Binary response: an XLSX workbook is written to disk
      # (Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
      #  Content-Disposition: attachment; filename="bookings.xlsx").
      # Same columns as the CSV export, as the first sheet's header row plus one row per record.
  - id: admin-bookings-export-xls
    title: Export Bookings (XLS)
    description: Download the bookings datagrid as an XLS file — the same data the admin Bookings "Export" button produces. Honours the same filters as the listing.
    query: |
      curl -X GET "https://your-domain.com/api/admin/bookings/export?format=xls" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/vnd.ms-excel" \
        --output bookings.xls
    response: |
      # Binary response: an XLS workbook is written to disk
      # (Content-Type: application/vnd.ms-excel
      #  Content-Disposition: attachment; filename="bookings.xls").
      # Same columns as the CSV export, as the first sheet's header row plus one row per record.
---

# Export Bookings

Downloads the bookings datagrid as a **csv, xls or xlsx file** — the same data the admin **Sales → Bookings** "Export" button produces. The response is a binary file attachment, not JSON. Requires the `sales.bookings.view` permission.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/bookings/export` | GET |

## Columns

The export carries the six datagrid columns, in order:

| Header | Value |
|--------|-------|
| `ID` | Booking id. |
| `Order ID` | The parent order's number. |
| `Qty` | Quantity booked. |
| `From` | The slot's start, formatted (empty for non-time-based booking types). |
| `To` | The slot's end, formatted (empty for non-time-based booking types). |
| `Booking Date` | When the booking was created. |

## Query parameters

`format` selects the export format — `csv` (the default), `xls` or `xlsx`; any other value returns `422`. Send an `Accept` header matching the format: `text/csv`, `application/vnd.ms-excel` or `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`.

The export honours the **same filters as the [listing](/api/rest-api/admin/sales/bookings/list)**, so you export exactly the rows you're viewing: `id`, `order_id`, `qty`, `product_id`, `from_from` / `from_to`, `to_from` / `to_to`, `created_at_from` / `_to`. (Pagination does not apply — the export returns every matching row.)

## Permission

`sales.bookings.view`
