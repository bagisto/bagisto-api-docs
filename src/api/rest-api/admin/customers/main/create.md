---
outline: false
apiType: rest
examples:
  - id: admin-customer-create
    title: Create Customer
    description: Creates a new customer and returns the full customer record. When `send_password` is true (default) a random password is generated and the credentials are emailed to the customer.
    query: |
      curl -X POST "https://your-domain.com/api/admin/customers" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "first_name": "Jane", "last_name": "Doe", "email": "jane@example.com", "customer_group_id": 2, "status": 1, "send_password": true }'
    response: |
      {
        "id": 14,
        "firstName": "Jane",
        "lastName": "Doe",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "phone": null,
        "gender": null,
        "dateOfBirth": null,
        "channelId": 1,
        "status": 1,
        "subscribedToNewsLetter": false,
        "isVerified": 0,
        "isSuspended": 0,
        "group": {
          "id": 2,
          "code": "wholesale",
          "name": "Wholesale"
        },
        "totalAddresses": 0,
        "totalOrders": 0,
        "totalAmountSpent": 0,
        "createdAt": "2026-05-20 12:00:00",
        "updatedAt": "2026-05-20 12:00:00"
      }
---

# Create Customer

Creates a customer and returns the full customer record (group nested under `group`).

::: tip Overview
See the [Customers menu overview](/api/rest-api/admin/customers/main/) for the full feature flow.
:::

All admin endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers` | POST |

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `first_name` | string | yes | |
| `last_name` | string | yes | |
| `email` | string | yes | Unique. |
| `phone` | string | no | |
| `gender` | enum | no | `Male`, `Female`, `Other` |
| `date_of_birth` | date | no | |
| `customer_group_id` | integer | yes | |
| `channel_id` | integer | no | |
| `status` | integer | no | `0` or `1` (default `1`). |
| `subscribed_to_news_letter` | boolean | no | |
| `send_password` | boolean | no | Default `true` — a random password is generated and the credentials are emailed to the customer. When false, explicit `password` is required. |
| `password` | string | conditional | Required when `send_password=false`; min 6 chars. |

## Permission

`customers.customers.create`
