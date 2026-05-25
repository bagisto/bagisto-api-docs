---
outline: false
apiType: rest
examples:
  - id: admin-marketing-subscriber-delete
    title: Delete Subscription
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/marketing/subscribers/1" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      { "message": "Subscription deleted." }
---

# Delete Subscription

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/subscribers/{id}` | DELETE |
