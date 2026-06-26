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

Removes an address from a customer's address book. Returns a confirmation message.

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/{customerId}/addresses/{id}` | DELETE |

Same ownership guard as Update — an address whose owner doesn't match the path `customerId` is rejected with `403`. Permission: `customers.addresses.delete`.

::: tip
For the address-book overview, see the [Addresses overview](./index.md).
:::
