---
outline: false
examples:
  - id: admin-send-return-message-gql
    title: Send Return Message
    description: Add an admin message to the RMA conversation. The customer is notified.
    query: |
      mutation SendReturnMessage($input: createAdminReturnMessageInput!) {
        createAdminReturnMessage(input: $input) {
          adminReturnMessage {
            id
            _id
            rmaId
            message
            isAdmin
            attachment
            attachmentUrl
            createdAt
          }
        }
      }
    variables: |
      {
        "input": {
          "returnId": 12,
          "message": "We have received your package."
        }
      }
    response: |
      {
        "data": {
          "createAdminReturnMessage": {
            "adminReturnMessage": {
              "id": "/api/admin/rma/messages/91",
              "_id": 91,
              "rmaId": 12,
              "message": "We have received your package.",
              "isAdmin": true,
              "attachment": null,
              "attachmentUrl": null,
              "createdAt": "2026-07-20T11:35:00+00:00"
            }
          }
        }
      }
---

# Send Return Message (GraphQL)

Adds an admin reply to an RMA request's conversation thread and notifies the customer.

## Input

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `returnId` | `Int` | yes | The RMA request to post on. |
| `message` | `String` | yes | The message body. |

Attaching a file is REST-only (multipart) — not available over GraphQL.

::: tip
See the [Returns overview](/api/graphql-api/admin/sales/returns/) for the conversation flow.
:::

Permission: `sales.rma.requests`.

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
