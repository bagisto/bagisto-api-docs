---
outline: false
apiType: rest
examples:
  - id: admin-customer-update
    title: Update Customer
    description: Partial update. Email uniqueness excludes self.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/customers/14" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "first_name": "Janet", "status": 0 }'
    response: |
      { "id": 14, "firstName": "Janet", "status": 0 }
---

# Update Customer

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/{id}` | PUT |

Same fields as Create — all optional (partial update). `password` is hashed if supplied. Email uniqueness excludes self. Fires `customer.update.before/after`.

Permission: `customers.customers.edit`.
