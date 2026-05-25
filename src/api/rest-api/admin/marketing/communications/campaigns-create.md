---
outline: false
apiType: rest
examples:
  - id: admin-marketing-campaign-create
    title: Create Marketing Campaign
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/campaigns" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "name": "July Newsletter", "subject": "Big July deals inside!", "marketing_template_id": 1, "marketing_event_id": 1, "channel_id": 1, "customer_group_id": 1, "status": 1 }'
    response: |
      { "id": 1, "name": "July Newsletter", "subject": "Big July deals inside!", "status": 1 }
---

# Create Marketing Campaign

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/campaigns` | POST |

## Request Body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | yes | |
| `subject` | string | yes | |
| `marketing_template_id` | int | yes | |
| `marketing_event_id` | int | yes | |
| `channel_id` | int | yes | |
| `customer_group_id` | int | yes | |
| `status` | int | no | 0/1. |

Permission: `marketing.communications.campaigns.create`.
