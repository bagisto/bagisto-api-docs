---
outline: false
examples:
  - id: admin-customer-group-update-gql
    title: Update Customer Group
    query: |
      mutation Update($input: updateAdminCustomerGroupInput!) {
        updateAdminCustomerGroup(input: $input) {
          adminCustomerGroup {
            id
            _id
            code
            name
            isUserDefined
            customersCount
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/customers/groups/4",
          "name": "Wholesale Tier A"
        }
      }
    response: |
      {
        "data": {
          "updateAdminCustomerGroup": {
            "adminCustomerGroup": {
              "id": "/api/admin/customers/groups/4",
              "_id": 4,
              "code": "wholesale",
              "name": "Wholesale Tier A",
              "isUserDefined": 1,
              "customersCount": null,
              "createdAt": "2026-05-01 09:00:00",
              "updatedAt": "2026-06-24 10:15:00"
            }
          }
        }
      }
---

# Update Customer Group (GraphQL)

Updates a customer group. Send only the fields you want to change.

::: warning System groups
System groups (`isUserDefined: 0`) only allow `name` updates; changing `code` or the system flag returns `errors[]`. Permission: `customers.groups.edit`.
:::

::: tip Menu overview
See the [Customer Groups overview](/api/graphql-api/admin/customers/groups/) for what customer groups do and how they relate to the rest of the store.
:::

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a customer group that exists in your store — use the [`adminCustomerGroups`](./list.md) query to discover valid ids.
:::
