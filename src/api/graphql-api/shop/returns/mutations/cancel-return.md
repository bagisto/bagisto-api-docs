---
outline: false
examples:
  - id: cancel-return
    title: Cancel a Return
    description: Cancel the authenticated customer's own return (RMA) request.
    query: |
      mutation CancelCustomerReturn($id: ID!) {
        cancelCustomerReturn(input: { id: $id }) {
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
          "cancelCustomerReturn": {
            "customerReturn": {
              "_id": 12,
              "orderId": 45,
              "orderIncrementId": "000000045",
              "statusId": 4,
              "statusTitle": "Canceled",
              "statusColor": "#F04438",
              "canClose": false,
              "canReopen": true,
              "isExpired": false,
              "messagesCount": 2,
              "updatedAt": "2026-07-20T11:00:00+00:00"
            }
          }
        }
      }
    commonErrors:
      - error: already canceled
        cause: The return is already in a canceled state
        solution: A return can only be canceled once
      - error: UNAUTHENTICATED
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
      - error: NOT_FOUND
        cause: The return does not exist or is not owned by the authenticated customer
        solution: Only return IDs belonging to the logged-in customer can be canceled
---

# Cancel a Return

## About

The `cancelCustomerReturn` mutation cancels the customer's own return (RMA) request, unless it is already canceled. The result carries the updated return with its new status and action flags.

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
| `customerReturn.statusId` | `Int!` | Numeric status id after the cancel. |
| `customerReturn.statusTitle` | `String!` | Status label, e.g. `Canceled`. |
| `customerReturn.statusColor` | `String!` | Hex color for the status badge. |
| `customerReturn.canClose` | `Boolean` | Whether the return can be closed. |
| `customerReturn.canReopen` | `Boolean` | Whether the return can be reopened. |
| `customerReturn.isExpired` | `Boolean` | Whether the return is past its action window. |
| `customerReturn.messagesCount` | `Int!` | Number of conversation messages on the return. |
| `customerReturn.updatedAt` | `DateTime!` | Return last update timestamp. |

## Related Resources

- [Reopen a Return](/api/graphql-api/shop/returns/mutations/reopen-return)
- [View Return](/api/graphql-api/shop/returns/queries/view-return)
- [Returns Overview](/api/graphql-api/shop/returns/)
