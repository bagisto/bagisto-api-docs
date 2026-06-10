---
outline: false
apiType: rest
examples:
  - id: admin-marketing-subscriber-toggle
    title: Toggle Subscription
    query: |
      curl -X PUT "https://your-domain.com/api/admin/marketing/subscribers/1" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "is_subscribed": false }'
    response: |
      { "id": 1, "isSubscribed": false }
---

# Toggle Newsletter Subscription

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/subscribers/{id}` | PUT |

Sets `is_subscribed` for the subscriber row and mirrors the flag onto the linked customer (if any).

## Request Body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `is_subscribed` | boolean | yes | |
