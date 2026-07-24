---
outline: false
examples:
  - id: list-return-reasons
    title: List Return Reasons
    description: List the active reasons a customer can pick when raising a return, filtered by resolution type.
    query: |
      query ReturnReasons($resolutionType: String!) {
        returnReasons(resolutionType: $resolutionType) {
          edges {
            cursor
            node {
              _id
              title
              position
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
        "resolutionType": "return"
      }
    response: |
      {
        "data": {
          "returnReasons": {
            "edges": [
              {
                "cursor": "MQ==",
                "node": {
                  "_id": 2,
                  "title": "Damaged product",
                  "position": 1
                }
              },
              {
                "cursor": "Mg==",
                "node": {
                  "_id": 3,
                  "title": "Wrong item delivered",
                  "position": 2
                }
              },
              {
                "cursor": "Mw==",
                "node": {
                  "_id": 4,
                  "title": "No longer needed",
                  "position": 3
                }
              }
            ],
            "pageInfo": {
              "startCursor": "MQ==",
              "endCursor": "Mw==",
              "hasNextPage": false,
              "hasPreviousPage": false
            },
            "totalCount": 3
          }
        }
      }
    commonErrors:
      - error: resolutionType required
        cause: The resolutionType argument is missing or not one of return / cancel_items
        solution: Provide a valid resolutionType — either "return" or "cancel_items"
      - error: UNAUTHENTICATED
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
---

# List Return Reasons

## About

The `returnReasons` query lists the active reasons a customer can pick when raising a return, filtered by the resolution type. Use a reason's `_id` as the `rmaReasonId` when calling [`createCustomerReturn`](/api/graphql-api/shop/returns/mutations/create-return).

## Authentication

This query requires an authenticated customer — send the storefront key and a customer Bearer token. See the [Authentication](/api/graphql-api/authentication) page.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `resolutionType` | `String!` | ✅ Yes | The resolution the reasons apply to — `return` or `cancel_items`. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[ReturnReasonEdge!]` | Array of reason edges with cursor and node. |
| `edges.cursor` | `String!` | Cursor for this edge, used in pagination. |
| `edges.node` | `ReturnReason!` | The return reason object. |
| `edges.node._id` | `Int!` | Numeric reason id — use as `rmaReasonId` when raising a return. |
| `edges.node.title` | `String!` | Reason label, e.g. `Damaged product`. |
| `edges.node.position` | `Int!` | Display order position. |
| `pageInfo` | `PageInfo!` | Pagination metadata. |
| `pageInfo.startCursor` | `String` | Cursor for the first item in the page. |
| `pageInfo.endCursor` | `String` | Cursor for the last item in the page. |
| `pageInfo.hasNextPage` | `Boolean!` | Whether more pages exist forward. |
| `pageInfo.hasPreviousPage` | `Boolean!` | Whether more pages exist backward. |
| `totalCount` | `Int!` | Total number of active reasons for the resolution type. |

## Related Resources

- [List Returnable Items](/api/graphql-api/shop/returns/queries/list-returnable-items)
- [Raise a Return](/api/graphql-api/shop/returns/mutations/create-return)
- [Returns Overview](/api/graphql-api/shop/returns/)
