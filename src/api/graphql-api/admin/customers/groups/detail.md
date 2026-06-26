---
outline: false
examples:
  - id: admin-customer-group-detail-gql
    title: Customer Group Detail
    query: |
      query AdminCustomerGroup($id: ID!) {
        adminCustomerGroup(id: $id) {
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
    variables: |
      {
        "id": "/api/admin/customers/groups/4"
      }
    response: |
      {
        "data": {
          "adminCustomerGroup": {
            "id": "/api/admin/customers/groups/4",
            "_id": 4,
            "code": "wholesale",
            "name": "Wholesale",
            "isUserDefined": 1,
            "customersCount": 23,
            "createdAt": "2026-05-01 09:00:00",
            "updatedAt": "2026-06-20 14:30:00"
          }
        }
      }
---

# Customer Group Detail (GraphQL)

Fetches a single customer group by id, including the detail-only `customersCount` (the number of customers currently assigned to the group).

::: tip Menu overview
See the [Customer Groups overview](/api/graphql-api/admin/customers/groups/) for what customer groups do and how they relate to the rest of the store.
:::
