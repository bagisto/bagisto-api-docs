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
            firstName
            lastName
            address
            city
            state
            country
            postcode
            phone
            defaultAddress
          }
        }
      }
    variables: |
      { "input": { "customerId": 14, "id": "/api/admin/customers/14/addresses/27" } }
    response: |
      {
        "data": {
          "setDefaultAdminCustomerAddress": {
            "adminCustomerAddress": {
              "id": "/api/admin/customers/14/addresses/27",
              "_id": 27,
              "customerId": 14,
              "firstName": "Jane",
              "lastName": "Doe",
              "address": "742 Evergreen Terrace",
              "city": "Springfield",
              "state": "IL",
              "country": "US",
              "postcode": "62704",
              "phone": "+15551234567",
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

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
