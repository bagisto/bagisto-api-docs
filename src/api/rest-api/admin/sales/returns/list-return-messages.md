---
outline: false
apiType: rest
examples:
  - id: admin-return-messages
    title: List Return Messages
    description: The conversation messages of an RMA request, newest first. Returned as a plain JSON array (no envelope).
    query: |
      curl -X GET "https://your-domain.com/api/admin/rma/messages?return_id=12" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    response: |
      [
        {
          "id": 90,
          "rmaId": 12,
          "message": "We have received your package.",
          "isAdmin": true,
          "attachment": null,
          "attachmentUrl": null,
          "createdAt": "2026-07-20T11:30:00+00:00"
        },
        {
          "id": 87,
          "rmaId": 12,
          "message": "The hoodie zipper is broken.",
          "isAdmin": false,
          "attachment": "rma/12/messages/zipper.jpg",
          "attachmentUrl": "https://example.com/storage/rma/12/messages/zipper.jpg",
          "createdAt": "2026-07-20T10:20:00+00:00"
        }
      ]
---

# List Return Messages

Returns the conversation thread of an RMA request, newest first. Returned as a **plain JSON array** (no `{ data, meta }` envelope). `isAdmin` distinguishes admin replies from customer messages; `attachmentUrl` is the public URL of an attached file (both `null` when there is no attachment).

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/rma/messages` | GET |

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `return_id` | integer | yes | The RMA request whose messages to list. |

## Permission

`sales.rma.requests`

See the [Returns overview](/api/rest-api/admin/sales/returns/) for the conversation flow.
