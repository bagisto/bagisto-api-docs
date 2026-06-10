---
outline: false
apiType: rest
examples:
  - id: admin-customer-create
    title: Create Customer
    description: Creates a new customer. When `send_password` is true (default) a random password is generated and emailed via `Webkul\Admin\Mail\Customer\NewCustomerNotification`.
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
        "email": "jane@example.com",
        "customerGroupId": 2,
        "status": 1
      }
---

# Create Customer

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
| `send_password` | boolean | no | Default `true`. When false, explicit `password` is required. |
| `password` | string | conditional | Required when `send_password=false`; min 6 chars. |

::: tip Events
Fires `customer.registration.before/after` + `customer.create.before/after`.
:::

## Permission

`customers.customers.create`
