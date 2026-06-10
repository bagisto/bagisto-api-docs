---
outline: false
examples:
  - id: admin-customer-address-delete-gql
    title: Delete Customer Address
    query: |
      mutation DeleteAddress($input: deleteAdminCustomerAddressInput!) {
        deleteAdminCustomerAddress(input: $input) { adminCustomerAddress { id } }
      }
    variables: |
      { "input": { "id": "/api/admin/customers/14/addresses/27" } }
    response: |
      { "data": { "deleteAdminCustomerAddress": { "adminCustomerAddress": null } } }
---

# Delete Customer Address (GraphQL)

Same ownership guard. Permission: `customers.addresses.delete`.

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a customer address that exists in your store — use the `adminCustomerAddresses` query to discover valid ids.
:::
