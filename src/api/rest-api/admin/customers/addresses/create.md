---
outline: false
apiType: rest
examples:
  - id: admin-customer-address-create
    title: Create Customer Address
    description: Create a new address under a customer. Setting `default_address=true` unsets the previous default for that customer.
    query: |
      curl -X POST "https://your-domain.com/api/admin/customers/14/addresses" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
              "first_name": "Jane",
              "last_name": "Doe",
              "address": "742 Evergreen Terrace",
              "city": "Springfield",
              "state": "IL",
              "country": "US",
              "postcode": "62704",
              "phone": "+15551234567",
              "default_address": true
            }'
    response: |
      { "id": 27, "customerId": 14, "address": "742 Evergreen Terrace", "city": "Springfield", "country": "US", "postcode": "62704", "defaultAddress": true }
---

# Create Customer Address

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/{customerId}/addresses` | POST |

## Request Body

Required: `first_name`, `last_name`, `address`, `city`, `country`, `postcode`, `phone`. Optional: `company_name`, `vat_id`, `state`, `address2` (legacy lines joined into `address` with `PHP_EOL`), `default_address` (boolean).

::: tip `address` column convention
Bagisto's `addresses` table renamed `address1 → address` in 2024 and dropped `address2`. Pass `address` as a single string. Legacy multi-line arrays are joined with `PHP_EOL`.
:::

Permission: `customers.addresses.create`.
