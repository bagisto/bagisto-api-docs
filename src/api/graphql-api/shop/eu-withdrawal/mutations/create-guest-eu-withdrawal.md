---
outline: false
examples:
  - id: create-guest-eu-withdrawal
    title: File a Guest EU Withdrawal
    description: File an EU right-of-withdrawal declaration for a guest order, proving ownership with the order increment id and email.
    query: |
      mutation CreateGuestEuWithdrawal(
        $orderIncrementId: String!
        $email: String!
        $reasonText: String
      ) {
        createGuestEuWithdrawal(
          input: {
            orderIncrementId: $orderIncrementId
            email: $email
            reasonText: $reasonText
          }
        ) {
          guestEuWithdrawal {
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
            createdAt
          }
        }
      }
    variables: |
      {
        "orderIncrementId": "1000123",
        "email": "guest@example.com",
        "reasonText": "Changed my mind."
      }
    response: |
      {
        "data": {
          "createGuestEuWithdrawal": {
            "guestEuWithdrawal": {
              "_id": 9,
              "uuid": "a1c2e3f4-6b7c-4d8e-9a0b-1c2d3e4f5a6b",
              "orderId": 34,
              "orderIncrementId": "1000123",
              "isGuest": true,
              "customerEmail": "guest@example.com",
              "status": "received",
              "reasonText": "Changed my mind.",
              "receivedAt": "2026-07-20T09:30:00+00:00",
              "confirmationSentAt": "2026-07-20T09:30:05+00:00",
              "createdAt": "2026-07-20T09:30:00+00:00"
            }
          }
        }
      }
    commonErrors:
      - error: orderIncrementId required
        cause: The orderIncrementId field is missing
        solution: Provide the human-readable order number of the guest order
      - error: email required
        cause: The email field is missing
        solution: Provide the email address used on the guest order
      - error: NOT_FOUND
        cause: The order increment id and email do not match a guest order on an EU-withdrawal-enabled channel
        solution: Check the order number and email match the guest order exactly, then confirm the order's channel has EU withdrawal enabled — a disabled channel returns this same message
---

# File a Guest EU Withdrawal

## About

The `createGuestEuWithdrawal` mutation records an EU right-of-withdrawal declaration for a **guest** order. Ownership is proved by supplying the order increment id together with the email used on the order. The declaration is created with status `received` and the durable-medium confirmation email is sent.

Filing is **idempotent** — a second call for the same order returns the existing declaration instead of creating a duplicate.

## Authentication

This mutation requires only the storefront key — no customer token. See the [Authentication](/api/graphql-api/authentication) page.

## The channel must have withdrawal enabled

Filing only works when EU right of withdrawal is switched on for the channel the **order** belongs to. The setting is off by default. When it is off the mutation fails with the same not-found message an unknown order produces, so check the configuration before assuming the identifiers are wrong — see the [overview](/api/graphql-api/shop/eu-withdrawal/).

## Input Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `orderIncrementId` | `String!` | ✅ Yes | The human-readable order number of the guest order. |
| `email` | `String!` | ✅ Yes | The email address used on the guest order. |
| `reasonText` | `String` | ❌ No | An optional reason for withdrawing. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `guestEuWithdrawal._id` | `Int!` | Numeric declaration ID. |
| `guestEuWithdrawal.uuid` | `String!` | Stable public identifier for the declaration. |
| `guestEuWithdrawal.orderId` | `Int!` | Numeric ID of the order the withdrawal applies to. |
| `guestEuWithdrawal.orderIncrementId` | `String!` | Human-readable order number. |
| `guestEuWithdrawal.isGuest` | `Boolean!` | Whether the declaration was filed on a guest order. |
| `guestEuWithdrawal.customerEmail` | `String!` | Email address tied to the declaration. |
| `guestEuWithdrawal.status` | `String!` | Declaration status: `received`, `declined`, `refunded`. |
| `guestEuWithdrawal.reasonText` | `String` | The reason the shopper supplied, or `null`. |
| `guestEuWithdrawal.receivedAt` | `DateTime` | Timestamp when the declaration was received. |
| `guestEuWithdrawal.confirmationSentAt` | `DateTime` | Timestamp when the confirmation email was sent, or `null`. |
| `guestEuWithdrawal.createdAt` | `DateTime!` | Declaration creation timestamp. |

## Related Resources

- [File an EU Withdrawal (authenticated)](/api/graphql-api/shop/eu-withdrawal/mutations/create-eu-withdrawal)
- [EU Withdrawal Overview](/api/graphql-api/shop/eu-withdrawal/)
