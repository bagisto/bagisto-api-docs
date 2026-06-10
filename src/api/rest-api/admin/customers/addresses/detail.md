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
      { "id": 27, "customerId": 14, "firstName": "Jane", "lastName": "Doe", "address": "742 Evergreen Terrace", "city": "Springfield", "state": "IL", "country": "US", "postcode": "62704", "phone": "+15551234567", "defaultAddress": true }
---

# Customer Address Detail

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/{customerId}/addresses/{id}` | GET |
