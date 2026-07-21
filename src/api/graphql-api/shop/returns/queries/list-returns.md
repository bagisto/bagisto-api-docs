---
outline: false
examples:
  - id: list-returns
    title: List Own Returns
    description: Retrieve a paginated list of the authenticated customer's own return (RMA) requests, newest first.
    query: |
      query CustomerReturns($status: Int) {
        customerReturns(
          first: 10
          after: null
          status: $status
        ) {
          edges {
            cursor
            node {
              _id
              orderId
              orderIncrementId
              statusId
              statusTitle
              statusColor
              packageCondition
              information
              canClose
              canReopen
              isExpired
              item
              images
              messagesCount
              createdAt
              updatedAt
            }
          }
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          totalCount
        }
      }
    variables: |
      {
        "status": 1
      }
    response: |
      {
        "data": {
          "customerReturns": {
            "edges": [
              {
                "cursor": "MQ==",
                "node": {
                  "_id": 12,
                  "orderId": 45,
                  "orderIncrementId": "000000045",
                  "statusId": 1,
                  "statusTitle": "Pending",
                  "statusColor": "#FDB022",
                  "packageCondition": "opened",
                  "information": "Item arrived damaged.",
                  "canClose": null,
                  "canReopen": null,
                  "isExpired": null,
                  "item": {
                    "id": 30,
                    "order_item_id": 78,
                    "sku": "COASTALBREEZEMENSHOODIE",
                    "name": "Coastal Breeze Men's Blue Zipper Hoodie",
                    "quantity": 1,
                    "resolution": "return",
                    "reason_id": 2,
                    "reason": "Damaged product",
                    "variant_id": null
                  },
                  "images": null,
                  "messagesCount": 2,
                  "createdAt": "2026-07-20T10:15:30+00:00",
                  "updatedAt": "2026-07-20T10:15:30+00:00"
                }
              }
            ],
            "pageInfo": {
              "startCursor": "MQ==",
              "endCursor": "MQ==",
              "hasNextPage": false,
              "hasPreviousPage": false
            },
            "totalCount": 1
          }
        }
      }
    commonErrors:
      - error: UNAUTHENTICATED
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
---

# List Returns

## About

The `customerReturns` query returns a paginated list of the authenticated customer's **own** return (RMA) requests. Requests are always scoped to the logged-in customer — you can never see another customer's returns. Results are ordered newest first. The detail-only action flags (`canClose`, `canReopen`, `isExpired`) and the `images` array come back `null` on the listing — fetch a single return to get them.

## Authentication

This query requires an authenticated customer — send the storefront key and a customer Bearer token. See the [Authentication](/api/graphql-api/authentication) page.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `first` | `Int` | ❌ No | Number of items to return (forward pagination). |
| `after` | `String` | ❌ No | Cursor for forward pagination. Use `endCursor` from a previous response. |
| `status` | `Int` | ❌ No | Filter by return status id. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[CustomerReturnEdge!]` | Array of return edges with cursor and node. |
| `edges.cursor` | `String!` | Cursor for this edge, used in pagination. |
| `edges.node` | `CustomerReturn!` | The return object. |
| `edges.node._id` | `Int!` | Numeric return ID. |
| `edges.node.orderId` | `Int!` | Id of the order the item belongs to. |
| `edges.node.orderIncrementId` | `String!` | Human-readable order number. |
| `edges.node.statusId` | `Int!` | Numeric status id. |
| `edges.node.statusTitle` | `String!` | Status label, e.g. `Pending`. |
| `edges.node.statusColor` | `String!` | Hex color for the status badge. |
| `edges.node.packageCondition` | `String` | Reported package condition, e.g. `opened`. |
| `edges.node.information` | `String` | Free-text note supplied when the return was raised. |
| `edges.node.canClose` | `Boolean` | Whether the return can be closed. `null` on the listing. |
| `edges.node.canReopen` | `Boolean` | Whether the return can be reopened. `null` on the listing. |
| `edges.node.isExpired` | `Boolean` | Whether the return is past its action window. `null` on the listing. |
| `edges.node.item` | `Object` | The returned item — `id`, `order_item_id`, `sku`, `name`, `quantity`, `resolution`, `reason_id`, `reason`, `variant_id`. Query bare (a JSON object). |
| `edges.node.images` | `Array` | Attached images (`id`, `path`, `url`). `null` on the listing. Query bare (a JSON array). |
| `edges.node.messagesCount` | `Int!` | Number of conversation messages on the return. |
| `edges.node.createdAt` | `DateTime!` | Return creation timestamp. |
| `edges.node.updatedAt` | `DateTime!` | Return last update timestamp. |
| `pageInfo` | `PageInfo!` | Pagination metadata. |
| `pageInfo.startCursor` | `String` | Cursor for the first item in the page. |
| `pageInfo.endCursor` | `String` | Cursor for the last item in the page. |
| `pageInfo.hasNextPage` | `Boolean!` | Whether more pages exist forward. |
| `pageInfo.hasPreviousPage` | `Boolean!` | Whether more pages exist backward. |
| `totalCount` | `Int!` | Total number of the customer's returns. |

## Related Resources

- [View Return](/api/graphql-api/shop/returns/queries/view-return)
- [Raise a Return](/api/graphql-api/shop/returns/mutations/create-return)
- [Returns Overview](/api/graphql-api/shop/returns/)
