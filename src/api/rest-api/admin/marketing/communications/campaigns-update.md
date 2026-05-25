---
outline: false
apiType: rest
examples:
  - id: admin-marketing-campaign-update
    title: Update Marketing Campaign
    query: |
      curl -X PUT "https://your-domain.com/api/admin/marketing/campaigns/1" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "subject": "Updated subject", "status": 0 }'
    response: |
      { "id": 1, "subject": "Updated subject", "status": 0 }
---

# Update Marketing Campaign

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/campaigns/{id}` | PUT |

Permission: `marketing.communications.campaigns.edit`.
