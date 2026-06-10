---
outline: false
apiType: rest
examples:
  - id: admin-customer-group-create
    title: Create Customer Group
    query: |
      curl -X POST "https://your-domain.com/api/admin/customers/groups" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "code": "vip", "name": "VIP" }'
    response: |
      { "id": 5, "code": "vip", "name": "VIP", "isUserDefined": 1 }
---

# Create Customer Group

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/groups` | POST |

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | string | yes | Unique. Validated by `Webkul\Core\Rules\Code` (regex `^[a-zA-Z]+[a-zA-Z0-9_]+$`). |
| `name` | string | yes | |

::: tip System groups
New groups are always created with `is_user_defined=1`. The API cannot create system groups.
:::

Fires `customer.customer_group.create.before/after`. Permission: `customers.groups.create`.
