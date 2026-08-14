---
outline: false
examples:
  - id: admin-customer-address-set-default-gql
    title: Set Address as Default
    query: |
      mutation SetDefaultAdminCustomerAddress($input: setDefaultAdminCustomerAddressInput!) {
        setDefaultAdminCustomerAddress(input: $input) {
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
          "id": "/api/admin/customers/14/addresses/27"
        }
      }
    response: |
      {
        "data": {
          "setDefaultAdminCustomerAddress": {
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

# Set Customer Address as Default (GraphQL)

Marks the chosen address as the customer's default. All the customer's other addresses have their default flag cleared in the same call.

## Input

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `customerId` | Int! | yes | The customer who owns the address. |
| `id` | ID! | yes | The address IRI to make default. Must belong to `customerId` (otherwise error). |

Returns the updated address with `defaultAddress: true`.

Permission: `customers.addresses.edit`.

See the [Customer Addresses overview](/api/graphql-api/admin/customers/) for the full address-book flow.
