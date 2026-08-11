---
outline: false
examples:
  - id: gql
    title: List Return Reasons
    query: |
      query AdminRmaReasons($first: Int) {
        adminRmaReasons(first: $first) {
          edges {
            cursor
            node {
              id
              _id
              title
              status
              position
              isAdmin
              resolutionType
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
          "adminRmaReasons": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/rma/reasons/2",
                  "_id": 2,
                  "title": "Damaged product",
                  "status": 1,
                  "position": 1,
                  "isAdmin": 0,
                  "resolutionType": [
                    "return",
                    "cancel_items"
                  ],
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
      query AdminRmaReasons(
        $first: Int
                $title: String
                $status: Int
        $sort: String
        $order: String
      ) {
        adminRmaReasons(
          first: $first
                title: $title
                status: $status
          sort: $sort
          order: $order
        ) {
          edges {
            cursor
            node {
              id
              _id
              title
              status
              position
              isAdmin
              resolutionType
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
        "title": "Damaged",
        "status": 1,
        "sort": "id",
        "order": "desc"
      }
    response: |
      {
        "data": {
          "adminRmaReasons": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/rma/reasons/2",
                  "_id": 2,
                  "title": "Damaged product",
                  "status": 1,
                  "position": 1,
                  "isAdmin": 0,
                  "resolutionType": [
                    "return",
                    "cancel_items"
                  ],
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

# List RMA reasons

Returns the store's return reasons. Nodes come back as a cursor-paginated connection.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminRmaReasons(first: Int, after: String)` | QueryCollection | List RMA reasons with cursor pagination |

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
| `title` | `String` | Partial (contains). | `"Damaged"` |
| `status` | `Int` | Exact — `1` active, `0` inactive. | `1` |

### Sorting

| Argument | Type | Values |
|----------|------|--------|
| `sort` | `String` | `id` (default), `position`, `title` |
| `order` | `String` | `asc`, `desc` (default `desc`) |

Select `_id` for the numeric id. For field meanings, see the [menu overview](../).
