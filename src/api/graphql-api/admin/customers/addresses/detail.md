---
outline: false
examples:
  - id: admin-customer-address-detail-gql
    title: Customer Address Detail
    query: |
      query AdminCustomerAddress($customerId: Int!, $id: ID!) {
        adminCustomerAddress(customerId: $customerId, id: $id) {
          id _id customerId firstName lastName address city state country postcode phone defaultAddress
        }
      }
    variables: |
      { "customerId": 14, "id": "/api/admin/customers/14/addresses/27" }
    response: |
      { "data": { "adminCustomerAddress": { "id": "/api/admin/customers/14/addresses/27", "_id": 27, "customerId": 14, "firstName": "Jane", "lastName": "Doe", "address": "742 Evergreen Terrace", "city": "Springfield", "state": "IL", "country": "US", "postcode": "62704", "phone": "+15551234567", "defaultAddress": true } } }
---

# Customer Address Detail (GraphQL)
