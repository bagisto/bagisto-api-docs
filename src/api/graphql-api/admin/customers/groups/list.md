---
outline: false
examples:
  - id: admin-customer-groups-list-gql
    title: List Customer Groups
    query: |
      query AdminCustomerGroups($first: Int) {
        adminCustomerGroups(first: $first) {
          totalCount
          edges {
            cursor
            node {
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
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    variables: |
      {
        "first": 10
      }
    response: |
      {
        "data": {
          "adminCustomerGroups": {
            "totalCount": 1,
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/customers/groups/1",
                  "_id": 1,
                  "code": "general",
                  "name": "General",
                  "isUserDefined": 0,
                  "customersCount": null,
                  "createdAt": "2026-05-01 09:00:00",
                  "updatedAt": "2026-06-20 14:30:00"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "MA=="
            }
          }
        }
      }
---

# List Customer Groups (GraphQL)

Lists customer groups as a cursor-paginated connection. Supports `code` / `name` / `isUserDefined` filter args and `sort` / `order`. `customersCount` is a detail-only field and comes back `null` on listing rows — fetch a single group to get its count.

::: tip Menu overview
See the [Customer Groups overview](/api/graphql-api/admin/customers/groups/) for what customer groups do and how they relate to the rest of the store.
:::
