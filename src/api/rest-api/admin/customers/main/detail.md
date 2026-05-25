---
outline: false
apiType: rest
examples:
  - id: admin-customer-detail
    title: Customer Detail
    description: Eager-loads `group`, surfaces detail-only counters (`totalAddresses`, `totalOrders`, `totalAmountSpent`).
    query: |
      curl -X GET "https://your-domain.com/api/admin/customers/14" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "id": 14,
        "firstName": "Jane",
        "lastName": "Doe",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "phone": "+15551234567",
        "gender": "Female",
        "dateOfBirth": "1990-01-01",
        "customerGroupId": 2,
        "customerGroupName": "Wholesale",
        "channelId": 1,
        "status": 1,
        "subscribedToNewsLetter": false,
        "isVerified": 1,
        "isSuspended": 0,
        "totalAddresses": 2,
        "totalOrders": 5,
        "totalAmountSpent": 489.50,
        "createdAt": "2026-05-20 12:00:00",
        "updatedAt": "2026-05-20 12:00:00"
      }
---

# Customer Detail

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/{id}` | GET |

`totalAmountSpent` sums `orders.base_grand_total_invoiced` for this customer.
