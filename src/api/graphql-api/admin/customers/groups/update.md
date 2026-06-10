---
outline: false
examples:
  - id: admin-customer-group-update-gql
    title: Update Customer Group
    query: |
      mutation Update($input: updateAdminCustomerGroupInput!) {
        updateAdminCustomerGroup(input: $input) { adminCustomerGroup { id _id code name } }
      }
    variables: |
      { "input": { "id": "/api/admin/customers/groups/4", "name": "Wholesale Tier A" } }
    response: |
      { "data": { "updateAdminCustomerGroup": { "adminCustomerGroup": { "id": "/api/admin/customers/groups/4", "_id": 4, "code": "wholesale", "name": "Wholesale Tier A" } } } }
---

# Update Customer Group (GraphQL)

::: warning System groups
System groups (`is_user_defined=0`) only allow `name` updates; other fields return errors[]. Permission: `customers.groups.edit`.
:::

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a customer group that exists in your store — use the [`adminCustomerGroups`](./list.md) query to discover valid ids.
:::
