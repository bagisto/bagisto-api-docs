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
      {
        "id": 27,
        "customerId": 14,
        "addressType": "customer",
        "firstName": "Jane",
        "lastName": "Doe",
        "companyName": "Acme Inc.",
        "address": "742 Evergreen Terrace",
        "city": "Chicago",
        "state": "IL",
        "country": "US",
        "postcode": "60601",
        "email": "jane@example.com",
        "phone": "+15551234567",
        "vatId": "GB123456789",
        "defaultAddress": true
      }
---

# Update Customer Address

Edits an existing customer address. The update is partial — send only the fields you want to change. The response is the full updated address detail.

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/{customerId}/addresses/{id}` | PUT |

::: warning Ownership guard
If the path `customerId` doesn't match the address's `customer_id`, the request returns 403. This prevents cross-customer edits via fabricated URLs.
:::

Permission: `customers.addresses.edit`.

::: tip
For default-address behaviour and the address-book overview, see the [Addresses overview](./index.md).
:::
