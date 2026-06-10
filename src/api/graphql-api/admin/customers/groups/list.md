---
outline: false
examples:
  - id: admin-customer-groups-list-gql
    title: List Customer Groups
    query: |
      query AdminCustomerGroups($first: Int) {
        adminCustomerGroups(first: $first) {
          edges { cursor node { id _id code name isUserDefined } }
          pageInfo { hasNextPage endCursor }
          totalCount
        }
      }
    variables: |
      { "first": 10 }
    response: |
      { "data": { "adminCustomerGroups": { "edges": [{ "cursor": "MA==", "node": { "id": "/api/admin/customers/groups/1", "_id": 1, "code": "general", "name": "General", "isUserDefined": 0 } }], "pageInfo": { "hasNextPage": false, "endCursor": "MA==" }, "totalCount": 1 } } }
---

# List Customer Groups (GraphQL)
