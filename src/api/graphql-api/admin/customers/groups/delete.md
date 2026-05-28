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

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a customer group that exists in your store — use the [`adminCustomerGroups`](./list.md) query to discover valid ids.
:::
