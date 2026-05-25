---
outline: false
apiType: rest
examples:
  - id: admin-marketing-event-detail
    title: Marketing Event Detail
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/events/1" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      { "id": 1, "name": "Holiday Sale Kickoff", "description": "Email blast to all subscribers.", "date": "2026-12-20" }
---

# Marketing Event Detail

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/events/{id}` | GET |
