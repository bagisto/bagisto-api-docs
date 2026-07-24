---
outline: false
examples:
  - id: admin-eu-withdrawal-mark-refunded-gql
    title: Mark EU Withdrawal Refunded
    description: Records that a declaration has been honoured and the customer refunded out-of-band. Sets status to refunded and clears any prior decline metadata.
    query: |
      mutation MarkRefundedAdminEuWithdrawal($input: markRefundedAdminEuWithdrawalInput!) {
        markRefundedAdminEuWithdrawal(input: $input) {
          adminEuWithdrawal {
            _id
            uuid
            orderIncrementId
            customerEmail
            status
            declinedAt
            declinedReason
            refundedAt
            refundedByUserId
            refundedByName
            refundNote
            message
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/eu-withdrawals/7",
          "refundNote": "Refunded via original payment method."
        }
      }
    response: |
      {
        "data": {
          "markRefundedAdminEuWithdrawal": {
            "adminEuWithdrawal": {
              "_id": 7,
              "uuid": "b2f1c0de-5a2e-4d7a-9f2e-3c1a2b4d5e6f",
              "orderIncrementId": "000000012",
              "customerEmail": "jane@example.com",
              "status": "refunded",
              "declinedAt": null,
              "declinedReason": null,
              "refundedAt": "2026-07-21T14:00:00+00:00",
              "refundedByUserId": 1,
              "refundedByName": "Example Admin",
              "refundNote": "Refunded via original payment method.",
              "message": "Withdrawal marked as refunded.",
              "updatedAt": "2026-07-21T14:00:00+00:00"
            }
          }
        }
      }
---

# Mark EU Withdrawal Refunded

GraphQL counterpart of `POST /api/admin/eu-withdrawals/{id}/mark-refunded`. Records that a withdrawal declaration has been honoured and the customer refunded out-of-band. Sets `status` to `refunded` and records who marked it, when, and an optional note. Runs against the admin GraphQL endpoint `POST /api/admin/graphql`.

**Marking refunded clears any prior decline metadata** (`declinedAt`, `declinedReason`, `declinedByUserId`, `declinedByName`) so the declaration reflects a single current outcome.

## Operation

`markRefundedAdminEuWithdrawal` — pass the declaration IRI (`/api/admin/eu-withdrawals/{id}`) as `input.id`, with an optional `refundNote`. Select `_id` for the numeric id on the result.

## Input

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | ID! | yes | The declaration IRI. |
| `refundNote` | String | no | A note describing how the refund was issued. |

## Permission

`sales.eu_withdrawals.mark_refunded`
