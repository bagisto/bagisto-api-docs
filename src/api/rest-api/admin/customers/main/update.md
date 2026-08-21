---
outline: false
apiType: rest
examples:
  - id: admin-customer-update
    title: Update Customer
    description: Partial update. Email uniqueness excludes self. Returns the full customer record (group nested under `group`).
    query: |
      curl -X PUT "https://your-domain.com/api/admin/customers/14" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "first_name": "Janet", "status": 0 }'
    response: |
      {
        "id": 14,
        "firstName": "Janet",
        "lastName": "Doe",
        "name": "Janet Doe",
        "email": "jane@example.com",
        "phone": "+15551234567",
        "gender": "Female",
        "dateOfBirth": "1990-01-01",
        "channelId": 1,
        "status": 0,
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
        "updatedAt": "2026-05-21 09:00:00"
      }
---

# Update Customer

Partial update — send only the fields you want to change. Returns the full customer record (group nested under `group`).

See the [Customers menu overview](/api/rest-api/admin/customers/main/) for the full feature flow.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/{id}` | PUT |

Same fields as Create — all optional (partial update). `password` is hashed if supplied. Email uniqueness excludes self.

Permission: `customers.customers.edit`.
