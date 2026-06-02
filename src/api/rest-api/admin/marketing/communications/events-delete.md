---
outline: false
apiType: rest
examples:
  - id: admin-marketing-event-delete
    title: Delete Marketing Event
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/marketing/events/1" \
        -H "Authorization: Bearer <token>"
    response: |
      { "message": "Marketing event deleted." }
---

# Delete Marketing Event

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/events/{id}` | DELETE |

Permission: `marketing.communications.events.delete`.
