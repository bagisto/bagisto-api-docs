---
outline: false
examples:
  - id: admin-returns-list-gql
    title: List Returns
    description: Cursor pagination over the RMA queue. Detail-only fields (item, images, availableStatuses, information, packageCondition, canReopen, messagesCount) are null on the listing rows.
    query: |
      query AdminReturns($first: Int, $after: String) {
        adminReturns(first: $first, after: $after) {
          edges {
            cursor
            node {
              id
              _id
              orderId
              orderIncrementId
              orderStatus
              customerName
              customerEmail
              isGuest
              statusId
              statusTitle
              statusColor
              packageCondition
              information
              canReopen
              item
              images
              availableStatuses
              messagesCount
              createdAt
              updatedAt
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10
      }
    response: |
      {
        "data": {
          "adminReturns": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/rma/requests/12",
                  "_id": 12,
                  "orderId": 45,
                  "orderIncrementId": "000000045",
                  "orderStatus": "processing",
                  "customerName": "Jane Doe",
                  "customerEmail": "jane@example.com",
                  "isGuest": 0,
                  "statusId": 1,
                  "statusTitle": "Pending",
                  "statusColor": "#FDB022",
                  "packageCondition": null,
                  "information": null,
                  "canReopen": null,
                  "item": null,
                  "images": null,
                  "availableStatuses": null,
                  "messagesCount": null,
                  "createdAt": "2026-07-20T10:15:30+00:00",
                  "updatedAt": "2026-07-20T10:15:30+00:00"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "MA=="
            },
            "totalCount": 1
          }
        }
      }
  - id: admin-returns-list-filtered-gql
    title: Filtered + Sorted
    description: Returns for a given order and status, sorted by creation date descending. Filters, sorting and pagination combine in one query (multiple filters narrow the result — logical AND).
    query: |
      query AdminReturns(
        $first: Int
        $id: Int
        $order_id: Int
        $status: String
        $customer_name: String
        $sort: String
        $order: String
      ) {
        adminReturns(
          first: $first
          id: $id
          order_id: $order_id
          status: $status
          customer_name: $customer_name
          sort: $sort
          order: $order
        ) {
          edges {
            cursor
            node {
              id
              _id
              orderId
              orderIncrementId
              orderStatus
              customerName
              customerEmail
              isGuest
              statusId
              statusTitle
              statusColor
              createdAt
              updatedAt
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10,
        "order_id": 45,
        "status": "Pending",
        "customer_name": "Jane",
        "sort": "created_at",
        "order": "desc"
      }
    response: |
      {
        "data": {
          "adminReturns": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/rma/requests/12",
                  "_id": 12,
                  "orderId": 45,
                  "orderIncrementId": "000000045",
                  "orderStatus": "processing",
                  "customerName": "Jane Doe",
                  "customerEmail": "jane@example.com",
                  "isGuest": 0,
                  "statusId": 1,
                  "statusTitle": "Pending",
                  "statusColor": "#FDB022",
                  "createdAt": "2026-07-20T10:15:30+00:00",
                  "updatedAt": "2026-07-20T10:15:30+00:00"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "MA=="
            },
            "totalCount": 1
          }
        }
      }
---

# List Returns (GraphQL)

Returns the paginated RMA (return request) queue. Detail-only fields — `item`, `images`, `availableStatuses`, `information`, `packageCondition`, `canReopen`, `messagesCount` — are `null` on the listing rows; fetch them with [View Return](./view-return.md).

The `item`, `images`, and `availableStatuses` fields are JSON values — select them bare (no sub-selection).

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
| `id` | `Int` | Exact return id. |
| `order_id` | `Int` | Exact order id. |
| `status` | `String` | Status title (e.g. `Pending`, `Accept`, `Declined`). |
| `customer_name` | `String` | Partial customer name. |

### Sorting

| Argument | Type | Values |
|----------|------|--------|
| `sort` | `String` | `id` (default), `order_id`, `created_at` |
| `order` | `String` | `asc`, `desc` (default `desc`) |

::: tip
See the [Returns overview](/api/graphql-api/admin/sales/returns/) for the status workflow and action semantics.
:::

Permission: `sales.rma.requests`.

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
