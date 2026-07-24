---
outline: false
examples:
  - id: gql
    title: List Return Custom Fields
    query: |
      query AdminRmaCustomFields($first: Int) {
        adminRmaCustomFields(first: $first) {
          edges {
            cursor
            node {
              id
              _id
              code
              label
              type
              isRequired
              position
              inputValidation
              status
              options {
                id
                name
                value
              }
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
          "adminRmaCustomFields": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/rma/custom-fields/4",
                  "_id": 4,
                  "code": "preferred_resolution",
                  "label": "Preferred resolution",
                  "type": "select",
                  "isRequired": 1,
                  "position": 1,
                  "inputValidation": null,
                  "status": 1,
                  "options": [
                    {
                      "id": 11,
                      "name": "Refund",
                      "value": "refund"
                    },
                    {
                      "id": 12,
                      "name": "Replacement",
                      "value": "replacement"
                    }
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
      query AdminRmaCustomFields(
        $first: Int
                $code: String
                $label: String
                $type: String
                $status: Int
        $sort: String
        $order: String
      ) {
        adminRmaCustomFields(
          first: $first
                code: $code
                label: $label
                type: $type
                status: $status
          sort: $sort
          order: $order
        ) {
          edges {
            cursor
            node {
              id
              _id
              code
              label
              type
              isRequired
              position
              inputValidation
              status
              options {
                id
                name
                value
              }
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
        "code": "resolution",
        "label": "Preferred",
        "type": "select",
        "status": 1,
        "sort": "id",
        "order": "desc"
      }
    response: |
      {
        "data": {
          "adminRmaCustomFields": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/rma/custom-fields/4",
                  "_id": 4,
                  "code": "preferred_resolution",
                  "label": "Preferred resolution",
                  "type": "select",
                  "isRequired": 1,
                  "position": 1,
                  "inputValidation": null,
                  "status": 1,
                  "options": [
                    {
                      "id": 11,
                      "name": "Refund",
                      "value": "refund"
                    },
                    {
                      "id": 12,
                      "name": "Replacement",
                      "value": "replacement"
                    }
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

# List RMA custom fields

Returns the store's return custom fields. `options` is populated only for `select` / `multiselect` / `checkbox` / `radio` types. Nodes come back as a cursor-paginated connection.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminRmaCustomFields(first: Int, after: String)` | QueryCollection | List RMA custom fields with cursor pagination |

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
| `code` | `String` | Partial (contains). | `"resolution"` |
| `label` | `String` | Partial (contains). | `"Preferred"` |
| `type` | `String` | Exact input type. | `"select"` |
| `status` | `Int` | Exact — `1` active, `0` inactive. | `1` |

### Sorting

| Argument | Type | Values |
|----------|------|--------|
| `sort` | `String` | `id` (default), `position`, `code` |
| `order` | `String` | `asc`, `desc` (default `desc`) |

Select `_id` for the numeric id. For field meanings, see the [menu overview](./).
