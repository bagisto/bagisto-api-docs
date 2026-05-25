---
outline: false
apiType: rest
examples:
  - id: admin-customer-delete
    title: Delete Customer
    description: Refuses with HTTP 400 if the customer has any pending/processing orders.
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/customers/14" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      { "message": "Customer deleted." }
---

# Delete Customer

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/{id}` | DELETE |

::: warning Active orders guard
`CustomerRepository::haveActiveOrders($customer)` returns true when any order has `status IN ('pending','processing')`. Single delete throws HTTP 400 in that case — mirrors the monolith.
:::

Permission: `customers.customers.delete`.
