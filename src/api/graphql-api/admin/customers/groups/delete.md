---
outline: false
examples:
  - id: admin-customer-group-delete-gql
    title: Delete Customer Group
    query: |
      mutation Delete($input: deleteAdminCustomerGroupInput!) {
        deleteAdminCustomerGroup(input: $input) {
          adminCustomerGroup {
            id
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/customers/groups/5"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminCustomerGroup": {
            "adminCustomerGroup": null
          }
        }
      }
---

# Delete Customer Group (GraphQL)

Deletes a customer group. On success the deleted record is no longer addressable, so the `adminCustomerGroup` payload comes back `null`.

::: warning Guards
The delete is refused for system groups and for groups that still have customers attached. Permission: `customers.groups.delete`.
:::

::: tip Menu overview
See the [Customer Groups overview](/api/graphql-api/admin/customers/groups/) for what customer groups do and how they relate to the rest of the store.
:::

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a customer group that exists in your store — use the [`adminCustomerGroups`](./list.md) query to discover valid ids.
:::
