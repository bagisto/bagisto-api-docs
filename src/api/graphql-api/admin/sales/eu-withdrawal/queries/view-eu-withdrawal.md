---
outline: false
examples:
  - id: admin-eu-withdrawal-view-gql
    title: Get EU Withdrawal
    description: A single withdrawal declaration with its full evidence timeline.
    query: |
      query AdminEuWithdrawal($id: ID!) {
        adminEuWithdrawal(id: $id) {
          _id
          uuid
          orderId
          orderIncrementId
          customerId
          customerName
          customerEmail
          isGuest
          channelId
          channelCode
          locale
          reasonText
          status
          receivedAt
          confirmationSentAt
          finalConfirmationSentAt
          confirmationError
          declinedAt
          declinedReason
          declinedByUserId
          declinedByName
          refundedAt
          refundedByUserId
          refundedByName
          refundNote
          createdAt
          updatedAt
        }
      }
    variables: |
      {
        "id": "/api/admin/eu-withdrawals/7"
      }
    response: |
      {
        "data": {
          "adminEuWithdrawal": {
            "_id": 7,
            "uuid": "b2f1c0de-5a2e-4d7a-9f2e-3c1a2b4d5e6f",
            "orderId": 12,
            "orderIncrementId": "000000012",
            "customerId": 5,
            "customerName": "Jane Doe",
            "customerEmail": "jane@example.com",
            "isGuest": false,
            "channelId": 1,
            "channelCode": "default",
            "locale": "en",
            "reasonText": "Changed my mind.",
            "status": "refunded",
            "receivedAt": "2026-07-20T09:00:00+00:00",
            "confirmationSentAt": "2026-07-20T09:00:05+00:00",
            "finalConfirmationSentAt": "2026-07-21T14:00:00+00:00",
            "confirmationError": null,
            "declinedAt": null,
            "declinedReason": null,
            "declinedByUserId": null,
            "declinedByName": null,
            "refundedAt": "2026-07-21T14:00:00+00:00",
            "refundedByUserId": 1,
            "refundedByName": "Example Admin",
            "refundNote": "Refunded via original payment method.",
            "createdAt": "2026-07-20T09:00:00+00:00",
            "updatedAt": "2026-07-21T14:00:00+00:00"
          }
        }
      }
---

# Get EU Withdrawal

GraphQL counterpart of `GET /api/admin/eu-withdrawals/{id}`. Returns a single withdrawal declaration with its full evidence timeline. Runs against the admin GraphQL endpoint `POST /api/admin/graphql`.

## Operation

`adminEuWithdrawal(id:)` — an item query. Pass the declaration IRI (`/api/admin/eu-withdrawals/{id}`) as `id`, and select `_id` for the numeric id.

## Permission

`sales.eu_withdrawals`

## Fields

| Field | Description |
|-------|-------------|
| `_id` | Declaration id. |
| `uuid` | Stable public identifier for the declaration. |
| `orderId` / `orderIncrementId` | The order the declaration was filed against. |
| `customerId` / `customerName` / `customerEmail` | Who filed the declaration. |
| `isGuest` | `true` when filed by a guest (no customer account). |
| `channelId` / `channelCode` | The channel the order was placed in. |
| `locale` | The locale the declaration was filed in (used for the confirmation email). |
| `reasonText` | The customer's free-text reason for withdrawing. |
| `status` | `received`, `declined`, or `refunded`. |
| `receivedAt` | When the declaration was received. |
| `confirmationSentAt` | When the durable-medium confirmation email was sent. |
| `finalConfirmationSentAt` | When a later confirmation was re-sent (if any). |
| `confirmationError` | The reason the confirmation email failed to send (if any). |
| `declinedAt` / `declinedReason` / `declinedByUserId` / `declinedByName` | Decline outcome details (populated only when declined). |
| `refundedAt` / `refundedByUserId` / `refundedByName` / `refundNote` | Refund outcome details (populated only when refunded). |
| `createdAt` / `updatedAt` | Record timestamps. |
