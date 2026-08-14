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
  - id: admin-customer-groups-list-filtered
    title: Filtered + Sorted
    description: User-defined groups whose name matches a term, sorted by code ascending. Filter args, sorting and pagination all combine in one query (multiple filters narrow the result — logical AND).
    query: |
      query AdminCustomerGroups(
        $first: Int
        $code: String
        $name: String
        $is_user_defined: Int
        $sort: String
        $order: String
      ) {
        adminCustomerGroups(
          first: $first
          code: $code
          name: $name
          is_user_defined: $is_user_defined
          sort: $sort
          order: $order
        ) {
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
        "first": 10,
        "name": "wholesale",
        "is_user_defined": 1,
        "sort": "code",
        "order": "asc"
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
                  "id": "/api/admin/customers/groups/5",
                  "_id": 5,
                  "code": "wholesale",
                  "name": "Wholesale Buyers",
                  "isUserDefined": 1,
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

Lists customer groups as a cursor-paginated connection. Supports `code` / `name` / `is_user_defined` filter args and `sort` / `order`. `customersCount` is a detail-only field and comes back `null` on listing rows — fetch a single group to get its count.

## Arguments

All arguments are optional and combine in a single query — filter, sort and paginate together.

### Pagination

| Argument | Description |
|----------|-------------|
| `first` | Number of records to return. |
| `after` | Cursor to fetch the page after (from `pageInfo.endCursor`). |

### Filters

Each filter narrows the result; supplying more than one combines with logical **AND**.

| Argument | Type | Match |
|----------|------|-------|
| `code` | `String` | Partial code. |
| `name` | `String` | Partial name. |
| `is_user_defined` | `Int` | `0` (system) or `1` (user-defined). |

### Sorting

| Argument | Type | Values |
|----------|------|--------|
| `sort` | `String` | `id` (default), `code`, `name` |
| `order` | `String` | `asc`, `desc` (default `desc`) |

See the [Customer Groups overview](/api/graphql-api/admin/customers/groups/) for what customer groups do and how they relate to the rest of the store.
