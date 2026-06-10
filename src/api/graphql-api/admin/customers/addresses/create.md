---
outline: false
examples:
  - id: admin-customer-address-create-gql
    title: Create Customer Address
    query: |
      mutation CreateAddress($input: createAdminCustomerAddressInput!) {
        createAdminCustomerAddress(input: $input) { adminCustomerAddress { id _id customerId address city } }
      }
    variables: |
      { "input": { "customerId": 14, "firstName": "Jane", "lastName": "Doe", "address": "742 Evergreen Terrace", "city": "Springfield", "country": "US", "postcode": "62704", "phone": "+15551234567" } }
    response: |
      { "data": { "createAdminCustomerAddress": { "adminCustomerAddress": { "id": "/api/admin/customers/14/addresses/27", "_id": 27, "customerId": 14, "address": "742 Evergreen Terrace", "city": "Springfield" } } } }
---

# Create Customer Address (GraphQL)

Permission: `customers.addresses.create`.
