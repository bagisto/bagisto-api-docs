---
outline: false
examples:
  - id: admin-customer-address-update-gql
    title: Update Customer Address
    query: |
      mutation UpdateAddress($input: updateAdminCustomerAddressInput!) {
        updateAdminCustomerAddress(input: $input) { adminCustomerAddress { id _id city postcode } }
      }
    variables: |
      { "input": { "id": "/api/admin/customers/14/addresses/27", "customerId": 14, "city": "Chicago", "postcode": "60601" } }
    response: |
      { "data": { "updateAdminCustomerAddress": { "adminCustomerAddress": { "id": "/api/admin/customers/14/addresses/27", "_id": 27, "city": "Chicago", "postcode": "60601" } } } }
---

# Update Customer Address (GraphQL)

Cross-customer edits return errors[]. Permission: `customers.addresses.edit`.

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a customer address that exists in your store — use the `adminCustomerAddresses` query to discover valid ids.
:::
