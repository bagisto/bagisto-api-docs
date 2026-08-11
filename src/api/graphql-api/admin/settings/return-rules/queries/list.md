---
outline: false
examples:
  - id: gql
    title: List Return Rules
    query: |
      query AdminRmaRules($first: Int) {
        adminRmaRules(first: $first) {
          edges {
            cursor
            node {
              id
              _id
              name
              description
              status
              returnPeriod
              default
              message
              createdAt
              updatedAt
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 3
      }
    response: |
      {
        "data": {
          "adminRmaRules": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/rma/rules/3",
                  "_id": 3,
                  "name": "Apparel 30-day returns",
                  "description": "Return window for all clothing.",
                  "status": 1,
                  "returnPeriod": 30,
                  "default": 0,
                  "message": null,
                  "createdAt": "2026-07-20T09:00:00+00:00",
                  "updatedAt": "2026-07-20T09:00:00+00:00"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "hasPreviousPage": false,
              "startCursor": "MA==",
              "endCursor": "MA=="
            },
            "totalCount": 1
          }
        }
      }
  - id: filtered
    title: Filtered + Sorted
    description: Filter, sort and paginate in one query. Supplying multiple filters narrows the result (logical AND).
    query: |
      query AdminRmaRules(
        $first: Int
                $name: String
                $status: Int
        $sort: String
        $order: String
      ) {
        adminRmaRules(
          first: $first
                name: $name
                status: $status
          sort: $sort
          order: $order
        ) {
          edges {
            cursor
            node {
              id
              _id
              name
              description
              status
              returnPeriod
              default
              message
              createdAt
              updatedAt
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10,
        "name": "Apparel",
        "status": 1,
        "sort": "id",
        "order": "desc"
      }
    response: |
      {
        "data": {
          "adminRmaRules": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/rma/rules/3",
                  "_id": 3,
                  "name": "Apparel 30-day returns",
                  "description": "Return window for all clothing.",
                  "status": 1,
                  "returnPeriod": 30,
                  "default": 0,
                  "message": null,
                  "createdAt": "2026-07-20T09:00:00+00:00",
                  "updatedAt": "2026-07-20T09:00:00+00:00"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "hasPreviousPage": false,
              "startCursor": "MA==",
              "endCursor": "MA=="
            },
            "totalCount": 1
          }
        }
      }
---

# List RMA rules

Returns the store's return rules. Nodes come back as a cursor-paginated connection.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminRmaRules(first: Int, after: String)` | QueryCollection | List RMA rules with cursor pagination |

## Arguments

All arguments are optional and combine in a single query.

### Pagination

| Argument | Description |
|----------|-------------|
| `first` | Number of records to return. |
| `after` | Cursor to fetch the page after (from `pageInfo.endCursor`). |

### Filters

Each filter narrows the result; supplying more than one combines with logical **AND**.

| Argument | Type | Match | Example |
|----------|------|-------|---------|
| `name` | `String` | Partial (contains). | `"Apparel"` |
| `status` | `Int` | Exact — `1` active, `0` inactive. | `1` |

### Sorting

| Argument | Type | Values |
|----------|------|--------|
| `sort` | `String` | `id` (default), `name` |
| `order` | `String` | `asc`, `desc` (default `desc`) |

Select `_id` for the numeric id. For field meanings, see the [menu overview](../).
