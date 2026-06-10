---
outline: false
apiType: rest
examples:
  - id: admin-marketing-campaign-delete
    title: Delete Marketing Campaign
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/marketing/campaigns/1" \
        -H "Authorization: Bearer <token>"
    response: |
      { "message": "Campaign deleted." }
---

# Delete Marketing Campaign

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/campaigns/{id}` | DELETE |

Permission: `marketing.communications.campaigns.delete`.
