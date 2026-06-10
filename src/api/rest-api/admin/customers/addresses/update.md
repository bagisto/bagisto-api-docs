---
outline: false
apiType: rest
examples:
  - id: admin-customer-address-update
    title: Update Customer Address
    query: |
      curl -X PUT "https://your-domain.com/api/admin/customers/14/addresses/27" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "city": "Chicago", "postcode": "60601" }'
    response: |
      { "id": 27, "customerId": 14, "city": "Chicago", "postcode": "60601" }
---

# Update Customer Address

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/{customerId}/addresses/{id}` | PUT |

::: warning Ownership guard
If the path `customerId` doesn't match the address's `customer_id`, the request returns 403. This prevents cross-customer edits via fabricated URLs.
:::

Partial update. Permission: `customers.addresses.edit`.
