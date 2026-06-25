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

Removes a customer group. Returns a confirmation message.

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/groups/{id}` | DELETE |

::: warning Two delete guards (HTTP 400)
- **System group** — refuses if `is_user_defined=0`.
- **In use** — refuses if `customers().count() > 0`.
:::

Permission: `customers.groups.delete`.

::: tip
For the system-group and in-use delete rules, see the [Customer Groups overview](./index.md).
:::
