---
outline: false
examples:
  - id: admin-customer-group-delete-gql
    title: Delete Customer Group
    query: |
      mutation Delete($input: deleteAdminCustomerGroupInput!) {
        deleteAdminCustomerGroup(input: $input) { adminCustomerGroup { id } }
      }
    variables: |
      { "input": { "id": "/api/admin/customers/groups/5" } }
    response: |
      { "data": { "deleteAdminCustomerGroup": { "adminCustomerGroup": null } } }
---

# Delete Customer Group (GraphQL)

::: warning Guards
Refuses for system groups or groups with customers attached. Permission: `customers.groups.delete`.
:::
