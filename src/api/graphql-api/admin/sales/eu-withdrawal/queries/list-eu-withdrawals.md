---
outline: false
examples:
  - id: admin-eu-withdrawals-list-gql
    title: List EU Withdrawals
    description: Cursor-paginated list of every right-of-withdrawal declaration, mirroring the admin Sales → EU Withdrawal datagrid.
    query: |
      query AdminEuWithdrawals(
        $first: Int
        $after: String
        $order_increment_id: String
        $customer_email: String
        $status: String
        $channel_code: String
        $received_at_from: String
        $received_at_to: String
        $confirmation_sent_at_from: String
        $confirmation_sent_at_to: String
        $sort: String
        $order: String
      ) {
        adminEuWithdrawals(
          first: $first
          after: $after
          order_increment_id: $order_increment_id
          customer_email: $customer_email
          status: $status
          channel_code: $channel_code
          received_at_from: $received_at_from
          received_at_to: $received_at_to
          confirmation_sent_at_from: $confirmation_sent_at_from
          confirmation_sent_at_to: $confirmation_sent_at_to
          sort: $sort
          order: $order
        ) {
          edges {
            cursor
            node {
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
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10,
        "status": "received"
      }
    response: |
      {
        "data": {
          "adminEuWithdrawals": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
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
                  "status": "received",
                  "receivedAt": "2026-07-20T09:00:00+00:00",
                  "confirmationSentAt": "2026-07-20T09:00:05+00:00",
                  "finalConfirmationSentAt": null,
                  "confirmationError": null,
                  "declinedAt": null,
                  "declinedReason": null,
                  "declinedByUserId": null,
                  "declinedByName": null,
                  "refundedAt": null,
                  "refundedByUserId": null,
                  "refundedByName": null,
                  "refundNote": null,
                  "createdAt": "2026-07-20T09:00:00+00:00",
                  "updatedAt": "2026-07-20T09:00:05+00:00"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "MA=="
            },
            "totalCount": 1
          }
        }
      }
---

# List EU Withdrawals

GraphQL counterpart of `GET /api/admin/eu-withdrawals`. Returns a cursor-paginated list of every right-of-withdrawal declaration — the same rows shown on the admin **Sales → EU Withdrawal** datagrid. Runs against the admin GraphQL endpoint `POST /api/admin/graphql`.

## Operation

`adminEuWithdrawals(first, after, order_increment_id, customer_email, status, channel_code, received_at_from, received_at_to, confirmation_sent_at_from, confirmation_sent_at_to, sort, order)` — a cursor `QueryCollection`.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `first`, `after` | Int / String | Cursor pagination. |
| `order_increment_id` | String | Partial match on the order increment id. |
| `customer_email` | String | Partial match on the customer email. |
| `status` | String | `received`, `refunded`, or `declined`. |
| `channel_code` | String | Filter by channel code. |
| `received_at_from` / `received_at_to` | String | Received-date range. |
| `confirmation_sent_at_from` / `confirmation_sent_at_to` | String | Confirmation-email-sent range. |
| `sort` | String | `id` (default), `received_at`, `status`. |
| `order` | String | `asc`, `desc` (default `desc`). |

## Permission

`sales.eu_withdrawals`

## Fields

Select `_id` for the numeric declaration id (`id` is the resource IRI). Every column of the declaration is populated on each row — the customer and order context, the evidence timeline (`receivedAt`, `confirmationSentAt`, `finalConfirmationSentAt`, `confirmationError`), and both outcome blocks (`declined*` and `refunded*`, whichever applies). To read one declaration on its own, fetch it by id with [`adminEuWithdrawal(id:)`](/api/graphql-api/admin/sales/eu-withdrawal/queries/view-eu-withdrawal).
