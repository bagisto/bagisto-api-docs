---
outline: false
examples:
  - id: admin-eu-withdrawal-decline-gql
    title: Decline EU Withdrawal
    description: Declines a declaration when the purchase is exempt from the right of withdrawal. Sets status to declined and clears any prior refund metadata.
    query: |
      mutation DeclineAdminEuWithdrawal($input: declineAdminEuWithdrawalInput!) {
        declineAdminEuWithdrawal(input: $input) {
          adminEuWithdrawal {
            _id
            uuid
            orderIncrementId
            customerEmail
            status
            declinedAt
            declinedReason
            declinedByUserId
            declinedByName
            refundedAt
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
          "declinedReason": "Item was a personalised good, exempt from withdrawal."
        }
      }
    response: |
      {
        "data": {
          "declineAdminEuWithdrawal": {
            "adminEuWithdrawal": {
              "_id": 7,
              "uuid": "b2f1c0de-5a2e-4d7a-9f2e-3c1a2b4d5e6f",
              "orderIncrementId": "000000012",
              "customerEmail": "jane@example.com",
              "status": "declined",
              "declinedAt": "2026-07-21T15:00:00+00:00",
              "declinedReason": "Item was a personalised good, exempt from withdrawal.",
              "declinedByUserId": 1,
              "declinedByName": "Example Admin",
              "refundedAt": null,
              "refundNote": null,
              "message": "Withdrawal declined.",
              "updatedAt": "2026-07-21T15:00:00+00:00"
            }
          }
        }
      }
---

# Decline EU Withdrawal

GraphQL counterpart of `POST /api/admin/eu-withdrawals/{id}/decline`. Declines a withdrawal declaration when the purchase is exempt from the right of withdrawal (for example a personalised good). Sets `status` to `declined` and records who declined it, when, and why. Runs against the admin GraphQL endpoint `POST /api/admin/graphql`.

**Declining clears any prior refund metadata** (`refundedAt`, `refundedByUserId`, `refundedByName`, `refundNote`) so the declaration reflects a single current outcome.

## Operation

`declineAdminEuWithdrawal` — pass the declaration IRI (`/api/admin/eu-withdrawals/{id}`) as `input.id`, and the required `declinedReason`. Select `_id` for the numeric id on the result.

## Input

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | ID! | yes | The declaration IRI. |
| `declinedReason` | String! | yes | The reason the declaration is being declined. |

## Permission

`sales.eu_withdrawals.decline`
