---
outline: false
apiType: rest
examples:
  - id: admin-shipments-list
    title: List Shipments (Datagrid)
    description: One row per shipment. Every column plus the order/customer context and both addresses is populated on each row — only the shipped line items are detail-only.
    query: |
      curl -X GET "https://your-domain.com/api/admin/shipments?per_page=10" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    response: |
      {
        "data": [
          {
            "id": 7,
            "orderId": 8,
            "orderIncrementId": "00000000008",
            "shippedTo": "John Doe",
            "orderDate": "2026-05-20 10:00:00",
            "orderStatus": "processing",
            "orderStatusLabel": "Processing",
            "channelName": "Default",
            "customerName": "John Doe",
            "customerEmail": "john.doe@example.com",
            "status": null,
            "totalQty": 2,
            "totalWeight": null,
            "carrierCode": null,
            "carrierTitle": "UPS",
            "trackNumber": "1Z999AA1",
            "emailSent": false,
            "inventorySourceId": 1,
            "inventorySourceName": "Default",
            "billingAddress": {
              "id": 16,
              "addressType": "order_billing",
              "firstName": "John",
              "lastName": "Doe",
              "city": "Los Angeles",
              "country": "US",
              "postcode": "90001",
              "email": "john.doe@example.com",
              "phone": "5551234567"
            },
            "shippingAddress": {
              "id": 15,
              "addressType": "order_shipping",
              "firstName": "John",
              "lastName": "Doe",
              "city": "Los Angeles",
              "country": "US",
              "postcode": "90001",
              "email": "john.doe@example.com",
              "phone": "5551234567"
            },
            "createdAt": "2026-05-20 12:00:00",
            "updatedAt": "2026-05-20 12:00:00",
            "items": []
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# List Shipments (Datagrid)

Mirrors the admin **Sales → Shipments** datagrid. Every shipment **column** plus the order/customer context and both the billing and shipping addresses are populated on each row — the field set is identical to [Shipment Detail](/api/rest-api/admin/sales/orders/get-shipment) except for the shipped line `items`, which are returned only by the detail endpoint (`[]` on the listing).

::: tip How this menu works
For when a shipment row appears and what each field means, see the [Shipments overview](/api/rest-api/admin/sales/shipments/).
:::

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
