---
outline: false
examples:
  - id: admin-eu-withdrawal-resend-confirmation-gql
    title: Resend EU Withdrawal Confirmation
    description: Re-sends the durable-medium confirmation email in the declaration's locale and refreshes confirmationSentAt.
    query: |
      mutation ResendConfirmationAdminEuWithdrawal($input: resendConfirmationAdminEuWithdrawalInput!) {
        resendConfirmationAdminEuWithdrawal(input: $input) {
          adminEuWithdrawal {
            _id
            uuid
            orderIncrementId
            customerEmail
            status
            confirmationSentAt
            confirmationError
            message
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/eu-withdrawals/7"
        }
      }
    response: |
      {
        "data": {
          "resendConfirmationAdminEuWithdrawal": {
            "adminEuWithdrawal": {
              "_id": 7,
              "uuid": "b2f1c0de-5a2e-4d7a-9f2e-3c1a2b4d5e6f",
              "orderIncrementId": "000000012",
              "customerEmail": "jane@example.com",
              "status": "received",
              "confirmationSentAt": "2026-07-21T16:30:00+00:00",
              "confirmationError": null,
              "message": "Confirmation email re-sent.",
              "updatedAt": "2026-07-21T16:30:00+00:00"
            }
          }
        }
      }
---

# Resend EU Withdrawal Confirmation

GraphQL counterpart of `POST /api/admin/eu-withdrawals/{id}/resend-confirmation`. Re-sends the durable-medium confirmation email for a declaration in its own locale and refreshes `confirmationSentAt`. Use this when the original acknowledgement bounced or the customer requests another copy. Runs against the admin GraphQL endpoint `POST /api/admin/graphql`.

## Operation

`resendConfirmationAdminEuWithdrawal` — pass the declaration IRI (`/api/admin/eu-withdrawals/{id}`) as `input.id`. No other input is required. Select `_id` for the numeric id on the result.

## Input

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | ID! | yes | The declaration IRI. |

## Permission

`sales.eu_withdrawals.resend_confirmation`
