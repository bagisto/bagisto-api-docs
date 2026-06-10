---
outline: false
apiType: rest
examples:
  - id: admin-marketing-campaigns-list
    title: List Marketing Campaigns
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/campaigns" \
        -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 1, "name": "July Newsletter", "subject": "Big July deals inside!", "status": 1, "marketingTemplateId": 1, "marketingEventId": 1, "channelId": 1, "customerGroupId": 1 }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
---

# List Marketing Campaigns

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/campaigns` | GET |

## Query Parameters

`page`, `per_page` (default 10, cap 50), `name`, `status`, `marketing_template_id`, `marketing_event_id`, `channel_id`, `customer_group_id`, `sort` (`id`, `name`), `order`.
