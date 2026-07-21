---
outline: false
examples:
  - id: reopen-return
    title: Reopen a Return
    description: Reopen a canceled or declined return (RMA) request back to pending.
    query: |
      mutation ReopenCustomerReturn($id: ID!) {
        reopenCustomerReturn(input: { id: $id }) {
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
          "reopenCustomerReturn": {
            "customerReturn": {
              "_id": 12,
              "orderId": 45,
              "orderIncrementId": "000000045",
              "statusId": 1,
              "statusTitle": "Pending",
              "statusColor": "#FDB022",
              "canClose": true,
              "canReopen": false,
              "isExpired": false,
              "messagesCount": 2,
              "updatedAt": "2026-07-20T11:05:00+00:00"
            }
          }
        }
      }
    commonErrors:
      - error: reopen not allowed
        cause: The store's settings do not allow reopening returns
        solution: Reopening must be enabled in the store's admin configuration
      - error: UNAUTHENTICATED
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
      - error: NOT_FOUND
        cause: The return does not exist or is not owned by the authenticated customer
        solution: Only return IDs belonging to the logged-in customer can be reopened
---

# Reopen a Return

## About

The `reopenCustomerReturn` mutation reopens a canceled or declined return (RMA) request back to `Pending` — but only when the store's settings allow customers to reopen returns. If reopening is disabled, the mutation fails. The result carries the updated return.

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
| `customerReturn.statusId` | `Int!` | Numeric status id after the reopen — `1` (Pending). |
| `customerReturn.statusTitle` | `String!` | Status label. |
| `customerReturn.statusColor` | `String!` | Hex color for the status badge. |
| `customerReturn.canClose` | `Boolean` | Whether the return can be closed. |
| `customerReturn.canReopen` | `Boolean` | Whether the return can be reopened. |
| `customerReturn.isExpired` | `Boolean` | Whether the return is past its action window. |
| `customerReturn.messagesCount` | `Int!` | Number of conversation messages on the return. |
| `customerReturn.updatedAt` | `DateTime!` | Return last update timestamp. |

## Related Resources

- [Cancel a Return](/api/graphql-api/shop/returns/mutations/cancel-return)
- [Close a Return](/api/graphql-api/shop/returns/mutations/close-return)
- [Returns Overview](/api/graphql-api/shop/returns/)
