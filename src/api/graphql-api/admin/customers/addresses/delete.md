---
outline: false
examples:
  - id: admin-customer-address-delete-gql
    title: Delete Customer Address
    query: |
      mutation DeleteAddress($input: deleteAdminCustomerAddressInput!) {
        deleteAdminCustomerAddress(input: $input) {
          adminCustomerAddress {
            id
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
          "deleteAdminCustomerAddress": {
            "adminCustomerAddress": null
          }
        }
      }
---

# Delete Customer Address (GraphQL)

Removes an address from a customer's address book. `customerId` is **required** and must own the address — omitting it or passing a different customer returns `errors[]`. On success the deleted record is no longer addressable, so the `adminCustomerAddress` payload comes back `null`.

Permission: `customers.addresses.delete`.

::: tip Menu overview
See the [Customer Addresses overview](/api/graphql-api/admin/customers/) for the full address-book flow.
:::

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a customer address that exists in your store — use the `adminCustomerAddresses` query to discover valid ids.
:::
