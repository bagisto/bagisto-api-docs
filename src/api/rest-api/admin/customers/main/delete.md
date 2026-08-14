---
outline: false
apiType: rest
examples:
  - id: admin-customer-delete
    title: Delete Customer
    description: Refuses with HTTP 400 if the customer has any pending/processing orders.
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/customers/14" \
        -H "Authorization: Bearer <token>"
    response: |
      { "message": "Customer deleted." }
---

# Delete Customer

See the [Customers menu overview](/api/rest-api/admin/customers/main/) for the full feature flow.

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/{id}` | DELETE |

### Active orders guard

A customer with any pending or processing order cannot be deleted — the request returns HTTP 400.

Permission: `customers.customers.delete`.
