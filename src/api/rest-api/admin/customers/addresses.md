---
outline: false
apiType: rest
examples:
  - id: admin-customer-addresses
    title: Get Customer Addresses
    description: All saved addresses for a customer — used by the Create-Order screen's billing / shipping picker.
    query: |
      curl -X GET "https://your-domain.com/api/admin/customers/122/addresses" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 2638, "addressType": "customer",
            "firstName": "John", "lastName": "Doe", "companyName": "Webkul Softwares",
            "address": "Grand Trunk road, Sector-62", "city": "Noida",
            "state": "UP", "country": "IN", "postcode": "201556",
            "email": "john@example.com", "phone": "78787887",
            "vatId": null, "defaultAddress": false
          }
        ],
        "meta": { "currentPage": 1, "perPage": 1, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# Customer Addresses

All saved addresses for a customer — read-only sub-resource used by the
**Create-Order** screen's billing/shipping picker.

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/{customerId}/addresses` | GET |

## Response Fields

Returns the standard `{ data, meta }` envelope. Each row in `data`:

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Address ID. |
| `addressType` | string | Address type (e.g. `customer`). |
| `firstName`, `lastName` | string | Recipient name. |
| `companyName` | string \| null | Company name. |
| `address` | string | Street address. |
| `city`, `state`, `country`, `postcode` | string | Location. |
| `email` | string \| null | Contact email. |
| `phone` | string | Contact phone. |
| `vatId` | string \| null | VAT identifier. |
| `defaultAddress` | boolean | Whether this is the customer's default address. |

The `meta` object carries `currentPage`, `perPage`, `lastPage`, `total`, `from`, and `to`. Not paginated by the UI but wrapped for consistency. 404 if the customer doesn't exist; 401 without an admin Bearer token.

For default-address semantics and the address-book overview, see the [Addresses overview](./addresses/index.md).
