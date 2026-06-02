---
outline: false
apiType: rest
examples:
  - id: admin-marketing-event-create
    title: Create Marketing Event
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/events" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "name": "Holiday Sale Kickoff", "description": "Email blast to all subscribers.", "date": "2026-12-20" }'
    response: |
      { "id": 1, "name": "Holiday Sale Kickoff", "description": "Email blast to all subscribers.", "date": "2026-12-20" }
---

# Create Marketing Event

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/events` | POST |

## Request Body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | yes | |
| `description` | string | yes | |
| `date` | string | yes | YYYY-MM-DD. |

Permission: `marketing.communications.events.create`.
