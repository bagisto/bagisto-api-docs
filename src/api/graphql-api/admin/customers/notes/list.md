---
outline: false
examples:
  - id: admin-customer-notes-list-gql
    title: List Customer Notes
    query: |
      query AdminCustomerNotes($customerId: Int!) {
        adminCustomerNotes(customerId: $customerId) {
          edges {
            node {
              id
              _id
              note
              customerId
              customerNotified
              createdAt
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    variables: |
      { "customerId": 14 }
    response: |
      {
        "data": {
          "adminCustomerNotes": {
            "edges": [
              {
                "node": {
                  "id": "/api/admin/customer_notes/7",
                  "_id": 7,
                  "note": "Called the customer about delivery.",
                  "customerId": 14,
                  "customerNotified": false,
                  "createdAt": "2026-06-09 10:15:00"
                }
              },
              {
                "node": {
                  "id": "/api/admin/customer_notes/5",
                  "_id": 5,
                  "note": "Followed up about return RMA-1023",
                  "customerId": 14,
                  "customerNotified": true,
                  "createdAt": "2026-05-25 10:00:00"
                }
              }
            ],
            "pageInfo": { "hasNextPage": false, "endCursor": "MQ==" }
          }
        }
      }
---

# List Customer Notes (GraphQL)

Returns the customer's notes, newest-first, as a cursor-paginated connection.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `customerId` | Int! | yes | The customer whose notes to list. Unknown customer → error. |

Each node carries `id`, `_id`, `note`, `customerId`, `customerNotified`, and `createdAt`.

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
