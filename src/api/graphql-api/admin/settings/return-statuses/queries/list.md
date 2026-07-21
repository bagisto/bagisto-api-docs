---
outline: false
examples:
  - id: gql
    title: List Return Statuses
    query: |
      query AdminRmaStatuses($first: Int) {
        adminRmaStatuses(first: $first) {
          edges {
            cursor
            node {
              id
              _id
              title
              status
              color
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
          "adminRmaStatuses": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/rma/statuses/9",
                  "_id": 9,
                  "title": "Awaiting inspection",
                  "status": 1,
                  "color": "#FDB022",
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
      query AdminRmaStatuses(
        $first: Int
                $title: String
                $status: Int
        $sort: String
        $order: String
      ) {
        adminRmaStatuses(
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
              color
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
        "title": "Awaiting",
        "status": 1,
        "sort": "id",
        "order": "desc"
      }
    response: |
      {
        "data": {
          "adminRmaStatuses": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/rma/statuses/9",
                  "_id": 9,
                  "title": "Awaiting inspection",
                  "status": 1,
                  "color": "#FDB022",
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

# List RMA statuses

Returns the store's return statuses. Default statuses cannot be deleted. Nodes come back as a cursor-paginated connection.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminRmaStatuses(first: Int, after: String)` | QueryCollection | List RMA statuses with cursor pagination |

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
| `title` | `String` | Partial (contains). | `"Awaiting"` |
| `status` | `Int` | Exact — `1` active, `0` inactive. | `1` |

### Sorting

| Argument | Type | Values |
|----------|------|--------|
| `sort` | `String` | `id` (default), `title` |
| `order` | `String` | `asc`, `desc` (default `desc`) |

Select `_id` for the numeric id. For field meanings, see the [menu overview](./).
