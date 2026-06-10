---
outline: false
apiType: rest
examples:
  - id: admin-marketing-event-update
    title: Update Marketing Event
    query: |
      curl -X PUT "https://your-domain.com/api/admin/marketing/events/1" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "date": "2026-12-22" }'
    response: |
      { "id": 1, "name": "Holiday Sale Kickoff", "date": "2026-12-22" }
---

# Update Marketing Event

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/events/{id}` | PUT |

Permission: `marketing.communications.events.edit`.
