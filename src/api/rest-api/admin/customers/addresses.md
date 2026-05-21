---
outline: false
apiType: rest
examples:
  - id: admin-customer-addresses
    title: Get Customer Addresses
    description: All saved addresses for a customer — used by the Create-Order screen's billing / shipping picker.
    query: |
      curl -X GET "https://your-domain.com/api/admin/customers/122/addresses" \
        -H "X-Admin-Key: <your-admin-api-key>" \
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

Returns the standard `{ data, meta }` envelope. Not paginated by the UI but
wrapped for consistency. 404 if the customer doesn't exist; 401 without an
admin Bearer token. Requires `X-Admin-Key`.
