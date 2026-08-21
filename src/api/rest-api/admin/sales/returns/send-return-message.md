---
outline: false
apiType: rest
examples:
  - id: admin-send-return-message
    title: Send Return Message
    description: Add an admin message to the RMA conversation. The customer is notified. Optional file attachment via multipart file.
    query: |
      curl -X POST "https://your-domain.com/api/admin/rma/messages" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "return_id": 12,
          "message": "We have received your package."
        }'
    variables: |
      {
        "return_id": 12,
        "message": "We have received your package."
      }
    response: |
      {
        "id": 91,
        "rmaId": 12,
        "message": "We have received your package.",
        "isAdmin": true,
        "attachment": null,
        "attachmentUrl": null,
        "createdAt": "2026-07-20T11:35:00+00:00"
      }
---

# Send Return Message

Adds an admin reply to an RMA request's conversation thread and notifies the customer.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/rma/messages` | POST |

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `return_id` | integer | yes | The RMA request to post on. |
| `message` | string | yes | The message body. |

To attach a file, send the request as `multipart/form-data` with `return_id`, `message`, and a `file` part.

## Permission

`sales.rma.requests`

See the [Returns overview](/api/rest-api/admin/sales/returns/) for the conversation flow.
