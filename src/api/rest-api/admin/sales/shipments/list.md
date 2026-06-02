---
outline: false
apiType: rest
examples:
  - id: admin-shipments-list
    title: List Shipments (Datagrid)
    description: DataGrid-parity listing of every shipment across all orders.
    query: |
      curl -X GET "https://your-domain.com/api/admin/shipments?per_page=10" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "data": [
          {
            "id": 7,
            "orderId": 8,
            "orderIncrementId": "00000000008",
            "totalQty": 2,
            "inventorySourceName": "Default",
            "shippedTo": "John Doe",
            "orderDate": "2026-05-20 10:00:00",
            "createdAt": "2026-05-20 12:00:00"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# List Shipments (Datagrid)

Mirrors the admin **Sales → Shipments** datagrid.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/shipments` | GET |

## Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page`, `per_page` | integer | Pagination (default `per_page=10`, cap `50`). |
| `id` | string | Filter by shipment id (int or comma-list). |
| `order_id` | string | Partial match on `orders.increment_id`. |
| `total_qty` | integer | Exact total quantity. |
| `inventory_source_name` | string | Partial source name. |
| `shipped_to` | string | Partial shipped-to (address full-name). |
| `order_date_from` / `order_date_to` | date | Order created range. |
| `created_at_from` / `created_at_to` | date | Shipment created range. |
| `sort` | string | `id`, `order_id`, `total_qty`, `inventory_source_name`, `shipped_to`, `order_date`, `created_at`. |
| `order` | string | `asc`, `desc`. |

## Permission

`sales.shipments.view`

::: info
Shipment **detail** + **create** live under [Orders](/api/rest-api/admin/sales/orders/get-shipment).
:::
