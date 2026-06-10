---
outline: false
apiType: rest
examples:
  - id: admin-customer-group-delete
    title: Delete Customer Group
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/customers/groups/4" \
        -H "Authorization: Bearer <token>"
    response: |
      { "message": "Customer group deleted." }
---

# Delete Customer Group

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/groups/{id}` | DELETE |

::: warning Two delete guards (HTTP 400)
- **System group** — refuses if `is_user_defined=0`.
- **In use** — refuses if `customers().count() > 0`.
:::

Fires `customer.customer_group.delete.before/after`. Permission: `customers.groups.delete`.
