---
outline: false
examples:
  - id: create-eu-withdrawal
    title: File an EU Withdrawal
    description: File an EU right-of-withdrawal declaration against one of the authenticated customer's own orders.
    query: |
      mutation CreateEuWithdrawal(
        $orderId: Int!
        $reasonText: String
      ) {
        createEuWithdrawal(
          input: {
            orderId: $orderId
            reasonText: $reasonText
          }
        ) {
          euWithdrawal {
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
      }
    variables: |
      {
        "orderId": 12,
        "reasonText": "Changed my mind."
      }
    response: |
      {
        "data": {
          "createEuWithdrawal": {
            "euWithdrawal": {
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
        }
      }
    commonErrors:
      - error: orderId required
        cause: The orderId field is missing
        solution: Provide the numeric ID of one of your own orders
      - error: NOT_FOUND
        cause: The order is not the customer's, or the channel does not have EU withdrawal enabled
        solution: File only against your own orders on an EU-withdrawal-enabled channel
      - error: UNAUTHENTICATED
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
---

# File an EU Withdrawal

## About

The `createEuWithdrawal` mutation records an EU right-of-withdrawal declaration against one of the authenticated customer's **own** orders and triggers the durable-medium confirmation email. The declaration is created with status `received`.

Filing is **idempotent** — a second call for the same order returns the existing declaration instead of creating a duplicate.

## Authentication

This mutation requires an authenticated customer — send the storefront key and a customer Bearer token. See the [Authentication](/api/graphql-api/authentication) page.

## Input Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `orderId` | `Int!` | ✅ Yes | The numeric ID of one of the customer's own orders. |
| `reasonText` | `String` | ❌ No | An optional reason for withdrawing. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `euWithdrawal._id` | `Int!` | Numeric declaration ID. |
| `euWithdrawal.uuid` | `String!` | Stable public identifier for the declaration. |
| `euWithdrawal.orderId` | `Int!` | Numeric ID of the order the withdrawal applies to. |
| `euWithdrawal.orderIncrementId` | `String!` | Human-readable order number. |
| `euWithdrawal.isGuest` | `Boolean!` | Whether the declaration was filed on a guest order. |
| `euWithdrawal.customerEmail` | `String!` | Email address tied to the declaration. |
| `euWithdrawal.status` | `String!` | Declaration status: `received`, `declined`, `refunded`. |
| `euWithdrawal.reasonText` | `String` | The reason the shopper supplied, or `null`. |
| `euWithdrawal.receivedAt` | `DateTime` | Timestamp when the declaration was received. |
| `euWithdrawal.confirmationSentAt` | `DateTime` | Timestamp when the confirmation email was sent, or `null`. |
| `euWithdrawal.declinedAt` | `DateTime` | Timestamp when the withdrawal was declined, or `null`. |
| `euWithdrawal.declinedReason` | `String` | Reason the store declined the withdrawal, or `null`. |
| `euWithdrawal.refundedAt` | `DateTime` | Timestamp when the order was refunded, or `null`. |
| `euWithdrawal.refundNote` | `String` | Note attached to the refund, or `null`. |
| `euWithdrawal.createdAt` | `DateTime!` | Declaration creation timestamp. |
| `euWithdrawal.updatedAt` | `DateTime!` | Declaration last update timestamp. |

## Related Resources

- [File a Guest Withdrawal](/api/graphql-api/shop/eu-withdrawal/mutations/create-guest-eu-withdrawal)
- [List EU Withdrawals](/api/graphql-api/shop/eu-withdrawal/queries/list-eu-withdrawals)
- [EU Withdrawal Overview](/api/graphql-api/shop/eu-withdrawal/)
