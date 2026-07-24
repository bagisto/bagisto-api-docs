---
outline: false
examples:
  - id: view-eu-withdrawal
    title: View an EU Withdrawal
    description: Retrieve a single EU right-of-withdrawal declaration owned by the authenticated customer.
    query: |
      query EuWithdrawal($id: ID!) {
        euWithdrawal(id: $id) {
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
    variables: |
      {
        "id": "/api/shop/eu-withdrawals/7"
      }
    response: |
      {
        "data": {
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
    commonErrors:
      - error: UNAUTHENTICATED
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
      - error: NOT_FOUND
        cause: The declaration does not exist or is not owned by the authenticated customer
        solution: Only declaration IDs belonging to the logged-in customer can be viewed
---

# View EU Withdrawal

## About

The `euWithdrawal` query returns a single EU right-of-withdrawal declaration **owned by the authenticated customer**. Ownership is resolved through the underlying order. If the declaration does not exist or belongs to a different customer, the query returns a not-found error — a customer can only view their own declarations.

## Authentication

This query requires an authenticated customer — send the storefront key and a customer Bearer token. See the [Authentication](/api/graphql-api/authentication) page.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `ID!` | ✅ Yes | The declaration IRI, e.g. `/api/shop/eu-withdrawals/7`. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `_id` | `Int!` | Numeric declaration ID. |
| `uuid` | `String!` | Stable public identifier for the declaration. |
| `orderId` | `Int!` | Numeric ID of the order the withdrawal applies to. |
| `orderIncrementId` | `String!` | Human-readable order number. |
| `isGuest` | `Boolean!` | Whether the declaration was filed on a guest order. |
| `customerEmail` | `String!` | Email address tied to the declaration. |
| `status` | `String!` | Declaration status: `received`, `declined`, `refunded`. |
| `reasonText` | `String` | The reason the shopper supplied, or `null`. |
| `receivedAt` | `DateTime` | Timestamp when the declaration was received. |
| `confirmationSentAt` | `DateTime` | Timestamp when the confirmation email was sent, or `null`. |
| `declinedAt` | `DateTime` | Timestamp when the withdrawal was declined, or `null`. |
| `declinedReason` | `String` | Reason the store declined the withdrawal, or `null`. |
| `refundedAt` | `DateTime` | Timestamp when the order was refunded, or `null`. |
| `refundNote` | `String` | Note attached to the refund, or `null`. |
| `createdAt` | `DateTime!` | Declaration creation timestamp. |
| `updatedAt` | `DateTime!` | Declaration last update timestamp. |

## Related Resources

- [List EU Withdrawals](/api/graphql-api/shop/eu-withdrawal/queries/list-eu-withdrawals)
- [File a Withdrawal](/api/graphql-api/shop/eu-withdrawal/mutations/create-eu-withdrawal)
- [EU Withdrawal Overview](/api/graphql-api/shop/eu-withdrawal/)
