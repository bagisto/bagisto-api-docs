---
outline: false
apiType: rest
examples:
  - id: admin-marketing-campaign-detail
    title: Marketing Campaign Detail
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/campaigns/1" \
        -H "Authorization: Bearer <token>"
    response: |
      { "id": 1, "name": "July Newsletter", "subject": "Big July deals inside!", "status": 1, "marketingTemplateId": 1, "marketingEventId": 1, "channelId": 1, "customerGroupId": 1, "marketingTemplateName": "Welcome Email", "marketingEventName": "Holiday Sale Kickoff", "channelName": "Default", "customerGroupCode": "general" }
---

# Marketing Campaign Detail

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/campaigns/{id}` | GET |

Detail includes embedded `marketingTemplateName`, `marketingEventName`, `channelName`, and `customerGroupCode` (all null on listing rows).
