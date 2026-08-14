---
outline: false
apiType: rest
examples:
  - id: admin-refunds-list
    title: List Refunds (Datagrid)
    description: Paginated refunds listing. Every refund column + billing/shipping addresses are populated per row (line items are detail-only).
    query: |
      curl -X GET "https://your-domain.com/api/admin/refunds?per_page=10" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    response: |
      {
        "data": [
          {
            "id": 1,
            "orderId": 105,
            "orderIncrementId": "105",
            "state": "refunded",
            "emailSent": true,
            "totalQty": 3,
            "orderCurrencyCode": "USD",
            "baseCurrencyCode": "USD",
            "subTotal": 4203,
            "formattedSubTotal": "$4,203.00",
            "baseSubTotal": 4203,
            "grandTotal": 4233,
            "baseGrandTotal": 4233,
            "formattedBaseGrandTotal": "$4,233.00",
            "taxAmount": 0,
            "discountAmount": 0,
            "shippingAmount": 30,
            "adjustmentRefund": 0,
            "adjustmentFee": 0,
            "createdAt": "2026-05-20 14:00:00",
            "updatedAt": "2026-05-20 14:00:02",
            "billedTo": "John Doe",
            "orderStatus": "closed",
            "orderStatusLabel": "Closed",
            "channelName": "bagisto store",
            "customerName": "John Doe",
            "customerEmail": "john.doe@example.com",
            "billingAddress": { "id": 493, "addressType": "order_billing", "firstName": "John", "lastName": "Doe", "city": "Los Angeles", "country": "US", "postcode": "90001", "email": "john.doe@example.com", "phone": "5551234567" },
            "shippingAddress": { "id": 492, "addressType": "order_shipping", "firstName": "John", "lastName": "Doe", "city": "Los Angeles", "country": "US", "postcode": "90001", "email": "john.doe@example.com", "phone": "5551234567" },
            "paymentMethod": null,
            "items": []
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# List Refunds

Mirrors the admin **Sales → Refunds** datagrid. Every refund **column** plus the billing/shipping addresses are populated per row — only the line `items` (and payment info) are detail-only. Field reference is identical to [Get Refund](/api/rest-api/admin/sales/orders/get-refund).

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/refunds` | GET |

## Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page`, `per_page` | integer | Pagination (default `per_page=10`, cap `50`). |
| `id` | string | Filter by refund id (int or comma-list). |
| `order_id` | string | Partial match on `orders.increment_id`. |
| `state` | string | Refund state. |
| `base_grand_total_from` / `_to` | number | Refund amount range. |
| `billed_to` | string | Partial billing-address full-name match. |
| `created_at_from` / `_to` | date | Created range. |
| `sort` | string | `id`, `order_id`, `state`, `base_grand_total`, `billed_to`, `created_at`. |
| `order` | string | `asc`, `desc`. |

## Permission

`sales.refunds.view`

Refund **detail**, **create**, and **preview** live under [Orders](/api/rest-api/admin/sales/orders/get-refund).
