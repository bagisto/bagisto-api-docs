---
outline: false
apiType: rest
examples:
  - id: admin-customer-group-update
    title: Update Customer Group
    query: |
      curl -X PUT "https://your-domain.com/api/admin/customers/groups/4" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "name": "Wholesale Tier A" }'
    response: |
      { "id": 4, "code": "wholesale", "name": "Wholesale Tier A" }
---

# Update Customer Group

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/groups/{id}` | PUT |

Partial. `code` uniqueness excludes self.

::: warning System group restrictions
For system groups (`is_user_defined=0`), attempting to change `code` or `is_user_defined` returns 422. Only `name` is editable.
:::

Permission: `customers.groups.edit`.
