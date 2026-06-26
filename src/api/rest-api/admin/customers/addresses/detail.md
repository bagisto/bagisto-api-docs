---
outline: false
apiType: rest
examples:
  - id: admin-customer-address-detail
    title: Customer Address Detail
    query: |
      curl -X GET "https://your-domain.com/api/admin/customers/14/addresses/27" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "id": 27,
        "customerId": 14,
        "addressType": "customer",
        "firstName": "Jane",
        "lastName": "Doe",
        "companyName": "Acme Inc.",
        "address": "742 Evergreen Terrace",
        "city": "Springfield",
        "state": "IL",
        "country": "US",
        "postcode": "62704",
        "email": "jane@example.com",
        "phone": "+15551234567",
        "vatId": "GB123456789",
        "defaultAddress": true
      }
---

# Customer Address Detail

Returns a single saved address for a customer.

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/{customerId}/addresses/{id}` | GET |

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Address ID. |
| `customerId` | integer | The customer who owns the address. |
| `addressType` | string | Address type (e.g. `customer`). |
| `firstName`, `lastName` | string | Recipient name. |
| `companyName` | string \| null | Company name. |
| `address` | string | Street address (single string). |
| `city`, `state`, `country`, `postcode` | string | Location. |
| `email` | string \| null | Contact email. |
| `phone` | string | Contact phone. |
| `vatId` | string \| null | VAT identifier. |
| `defaultAddress` | boolean | Whether this is the customer's default address. |

An address whose owner doesn't match the path `customerId` is rejected with `403`; an unknown address → `404`.

::: tip
For address-book behaviour and the default-address rules, see the [Addresses overview](./index.md).
:::
