---
outline: false
apiType: rest
examples:
  - id: admin-customer-address-delete
    title: Delete Customer Address
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/customers/14/addresses/27" \
        -H "Authorization: Bearer <token>"
    response: |
      { "message": "Address deleted." }
---

# Delete Customer Address

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/{customerId}/addresses/{id}` | DELETE |

Same ownership guard as Update. Permission: `customers.addresses.delete`.
