---
outline: false
apiType: rest
examples:
  - id: admin-customer-detail
    title: Customer Detail
    description: Returns the full customer record with the group as a nested object plus the detail-only counters (`totalAddresses`, `totalOrders`, `totalAmountSpent`).
    query: |
      curl -X GET "https://your-domain.com/api/admin/customers/14" \
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
        "channelId": 1,
        "status": 1,
        "subscribedToNewsLetter": false,
        "isVerified": 1,
        "isSuspended": 0,
        "group": {
          "id": 2,
          "code": "wholesale",
          "name": "Wholesale"
        },
        "totalAddresses": 2,
        "totalOrders": 5,
        "totalAmountSpent": 489.50,
        "createdAt": "2026-05-20 12:00:00",
        "updatedAt": "2026-05-20 12:00:00"
      }
---

# Customer Detail

Returns one customer with the group as a nested `group` object and the detail-only counters (`totalAddresses`, `totalOrders`, `totalAmountSpent`).

See the [Customers menu overview](/api/rest-api/admin/customers/main/) for the full feature flow.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/{id}` | GET |

`totalAmountSpent` is the total invoiced amount across this customer's orders.
