---
outline: false
examples:
  - id: admin-customer-delete-gql
    title: Delete Customer
    query: |
      mutation DeleteAdminCustomer($input: deleteAdminCustomerInput!) {
        deleteAdminCustomer(input: $input) { adminCustomer { id } }
      }
    variables: |
      { "input": { "id": "/api/admin/customers/14" } }
    response: |
      { "data": { "deleteAdminCustomer": { "adminCustomer": null } } }
---

# Delete Customer (GraphQL)

::: warning Active orders guard
Refuses (errors[]) if the customer has any pending/processing orders.
:::

Permission: `customers.customers.delete`.
