---
outline: false
examples:
  - id: admin-customer-address-create-gql
    title: Create Customer Address
    query: |
      mutation CreateAddress($input: createAdminCustomerAddressInput!) {
        createAdminCustomerAddress(input: $input) {
          adminCustomerAddress {
            id
            _id
            customerId
            addressType
            firstName
            lastName
            companyName
            address
            city
            state
            country
            postcode
            email
            phone
            vatId
            defaultAddress
          }
        }
      }
    variables: |
      {
        "input": {
          "customerId": 14,
          "firstName": "Jane",
          "lastName": "Doe",
          "companyName": "Acme Inc.",
          "vatId": "GB123456789",
          "address": "742 Evergreen Terrace",
          "city": "Springfield",
          "state": "IL",
          "country": "US",
          "postcode": "62704",
          "email": "jane@example.com",
          "phone": "+15551234567",
          "defaultAddress": true
        }
      }
    response: |
      {
        "data": {
          "createAdminCustomerAddress": {
            "adminCustomerAddress": {
              "id": "/api/admin/customers/14/addresses/27",
              "_id": 27,
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
          }
        }
      }
---

# Create Customer Address (GraphQL)

Adds a new address to a customer's address book. When `defaultAddress` is `true`, the customer's previous default address has its flag cleared in the same call.

Permission: `customers.addresses.create`.

See the [Customer Addresses overview](/api/graphql-api/admin/customers/) for the full address-book flow.
