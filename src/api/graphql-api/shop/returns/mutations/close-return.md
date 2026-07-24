---
outline: false
examples:
  - id: close-return
    title: Close a Return
    description: Mark the authenticated customer's own return (RMA) request as solved.
    query: |
      mutation CloseCustomerReturn($id: ID!) {
        closeCustomerReturn(input: { id: $id }) {
          customerReturn {
            _id
            orderId
            orderIncrementId
            statusId
            statusTitle
            statusColor
            canClose
            canReopen
            isExpired
            messagesCount
            updatedAt
          }
        }
      }
    variables: |
      {
        "id": "/api/shop/returns/12"
      }
    response: |
      {
        "data": {
          "closeCustomerReturn": {
            "customerReturn": {
              "_id": 12,
              "orderId": 45,
              "orderIncrementId": "000000045",
              "statusId": 3,
              "statusTitle": "Solved",
              "statusColor": "#12B76A",
              "canClose": false,
              "canReopen": false,
              "isExpired": false,
              "messagesCount": 3,
              "updatedAt": "2026-07-20T11:10:00+00:00"
            }
          }
        }
      }
    commonErrors:
      - error: close not allowed
        cause: The return is not in a state that can be closed
        solution: Only a return whose canClose flag is true can be closed
      - error: UNAUTHENTICATED
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
      - error: NOT_FOUND
        cause: The return does not exist or is not owned by the authenticated customer
        solution: Only return IDs belonging to the logged-in customer can be closed
---

# Close a Return

## About

The `closeCustomerReturn` mutation marks the customer's own return (RMA) request as `Solved` and adds a note to the conversation thread. The result carries the updated return. A return can only be closed when its `canClose` flag is `true`.

## Authentication

This mutation requires an authenticated customer — send the storefront key and a customer Bearer token. See the [Authentication](/api/graphql-api/authentication) page.

## Input Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `ID!` | ✅ Yes | The return IRI, e.g. `/api/shop/returns/12`. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `customerReturn._id` | `Int!` | Numeric return ID. |
| `customerReturn.orderId` | `Int!` | Id of the order the item belongs to. |
| `customerReturn.orderIncrementId` | `String!` | Human-readable order number. |
| `customerReturn.statusId` | `Int!` | Numeric status id after closing — `3` (Solved). |
| `customerReturn.statusTitle` | `String!` | Status label, e.g. `Solved`. |
| `customerReturn.statusColor` | `String!` | Hex color for the status badge. |
| `customerReturn.canClose` | `Boolean` | Whether the return can be closed. |
| `customerReturn.canReopen` | `Boolean` | Whether the return can be reopened. |
| `customerReturn.isExpired` | `Boolean` | Whether the return is past its action window. |
| `customerReturn.messagesCount` | `Int!` | Number of conversation messages — incremented by the close note. |
| `customerReturn.updatedAt` | `DateTime!` | Return last update timestamp. |

## Related Resources

- [Reopen a Return](/api/graphql-api/shop/returns/mutations/reopen-return)
- [View Return](/api/graphql-api/shop/returns/queries/view-return)
- [Returns Overview](/api/graphql-api/shop/returns/)
