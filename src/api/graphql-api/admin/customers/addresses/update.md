---
outline: false
examples:
  - id: admin-customer-address-update-gql
    title: Update Customer Address
    query: |
      mutation UpdateAddress($input: updateAdminCustomerAddressInput!) {
        updateAdminCustomerAddress(input: $input) {
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
          "id": "/api/admin/customers/14/addresses/27",
          "customerId": 14,
          "city": "Chicago",
          "postcode": "60601"
        }
      }
    response: |
      {
        "data": {
          "updateAdminCustomerAddress": {
            "adminCustomerAddress": {
              "id": "/api/admin/customers/14/addresses/27",
              "_id": 27,
              "customerId": 14,
              "addressType": "customer",
              "firstName": "Jane",
              "lastName": "Doe",
              "companyName": "Acme Inc.",
              "address": "742 Evergreen Terrace",
              "city": "Chicago",
              "state": "IL",
              "country": "US",
              "postcode": "60601",
              "email": "jane@example.com",
              "phone": "+15551234567",
              "vatId": "GB123456789",
              "defaultAddress": true
            }
          }
        }
      }
---

# Update Customer Address (GraphQL)

Updates an existing customer address. Send only the fields you want to change. `customerId` is **required** and must own the address — omitting it or passing a different customer returns `errors[]`.

Permission: `customers.addresses.edit`.

::: tip Menu overview
See the [Customer Addresses overview](/api/graphql-api/admin/customers/) for the full address-book flow.
:::

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a customer address that exists in your store — use the `adminCustomerAddresses` query to discover valid ids.
:::
