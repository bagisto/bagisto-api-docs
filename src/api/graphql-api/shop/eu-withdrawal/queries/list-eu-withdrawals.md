---
outline: false
examples:
  - id: list-eu-withdrawals
    title: List Own EU Withdrawals
    description: Retrieve a paginated list of the authenticated customer's own EU right-of-withdrawal declarations, newest first.
    query: |
      query EuWithdrawals(
        $first: Int
        $after: String
      ) {
        euWithdrawals(
          first: $first
          after: $after
        ) {
          edges {
            cursor
            node {
              _id
              uuid
              orderId
              orderIncrementId
              isGuest
              customerEmail
              status
              reasonText
              receivedAt
              confirmationSentAt
              declinedAt
              declinedReason
              refundedAt
              refundNote
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
        "first": 10,
        "after": null
      }
    response: |
      {
        "data": {
          "euWithdrawals": {
            "edges": [
              {
                "cursor": "MQ==",
                "node": {
                  "_id": 7,
                  "uuid": "b2f1c0de-5a2e-4d7a-9f2e-3c1a2b4d5e6f",
                  "orderId": 12,
                  "orderIncrementId": "000000012",
                  "isGuest": false,
                  "customerEmail": "jane@example.com",
                  "status": "received",
                  "reasonText": "Changed my mind.",
                  "receivedAt": "2026-07-20T09:00:00+00:00",
                  "confirmationSentAt": "2026-07-20T09:00:05+00:00",
                  "declinedAt": null,
                  "declinedReason": null,
                  "refundedAt": null,
                  "refundNote": null,
                  "createdAt": "2026-07-20T09:00:00+00:00",
                  "updatedAt": "2026-07-20T09:00:05+00:00"
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

# List EU Withdrawals

## About

The `euWithdrawals` query returns a paginated list of the authenticated customer's **own** EU right-of-withdrawal declarations. Declarations are always scoped to the logged-in customer — you can never see another customer's declarations. Results are ordered newest first.

## Authentication

This query requires an authenticated customer — send the storefront key and a customer Bearer token. See the [Authentication](/api/graphql-api/authentication) page.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `first` | `Int` | ❌ No | Number of items to return (forward pagination). |
| `after` | `String` | ❌ No | Cursor for forward pagination. Use `endCursor` from a previous response. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[EuWithdrawalEdge!]` | Array of declaration edges with cursor and node. |
| `edges.cursor` | `String!` | Cursor for this edge, used in pagination. |
| `edges.node` | `EuWithdrawal!` | The withdrawal declaration object. |
| `edges.node._id` | `Int!` | Numeric declaration ID. |
| `edges.node.uuid` | `String!` | Stable public identifier for the declaration. |
| `edges.node.orderId` | `Int!` | Numeric ID of the order the withdrawal applies to. |
| `edges.node.orderIncrementId` | `String!` | Human-readable order number. |
| `edges.node.isGuest` | `Boolean!` | Whether the declaration was filed on a guest order. |
| `edges.node.customerEmail` | `String!` | Email address tied to the declaration. |
| `edges.node.status` | `String!` | Declaration status: `received`, `declined`, `refunded`. |
| `edges.node.reasonText` | `String` | The reason the shopper supplied, or `null`. |
| `edges.node.receivedAt` | `DateTime` | Timestamp when the declaration was received. |
| `edges.node.confirmationSentAt` | `DateTime` | Timestamp when the confirmation email was sent, or `null`. |
| `edges.node.declinedAt` | `DateTime` | Timestamp when the withdrawal was declined, or `null`. |
| `edges.node.declinedReason` | `String` | Reason the store declined the withdrawal, or `null`. |
| `edges.node.refundedAt` | `DateTime` | Timestamp when the order was refunded, or `null`. |
| `edges.node.refundNote` | `String` | Note attached to the refund, or `null`. |
| `edges.node.createdAt` | `DateTime!` | Declaration creation timestamp. |
| `edges.node.updatedAt` | `DateTime!` | Declaration last update timestamp. |
| `pageInfo` | `PageInfo!` | Pagination metadata. |
| `pageInfo.startCursor` | `String` | Cursor for the first item in the page. |
| `pageInfo.endCursor` | `String` | Cursor for the last item in the page. |
| `pageInfo.hasNextPage` | `Boolean!` | Whether more pages exist forward. |
| `pageInfo.hasPreviousPage` | `Boolean!` | Whether more pages exist backward. |
| `totalCount` | `Int!` | Total number of the customer's declarations. |

## Related Resources

- [View EU Withdrawal](/api/graphql-api/shop/eu-withdrawal/queries/view-eu-withdrawal)
- [File a Withdrawal](/api/graphql-api/shop/eu-withdrawal/mutations/create-eu-withdrawal)
- [EU Withdrawal Overview](/api/graphql-api/shop/eu-withdrawal/)
