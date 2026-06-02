---
outline: false
apiType: rest
examples:
  - id: admin-marketing-campaign-send
    title: Send Marketing Campaign
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/campaigns/12/send" \
        -H "Authorization: Bearer <token>"
    response: |
      { "id": 12, "campaignId": 12, "queued": 5, "message": "Campaign queued for 5 recipient(s)." }
---

# Send Marketing Campaign

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/campaigns/{id}/send` | POST |

Queues the campaign email for every subscriber in its customer group (or guest subscribers when the group code is `guest`).

::: warning Active campaigns only
Send is only allowed on campaigns with `status = 1`. Inactive campaigns return HTTP 422.
:::

::: tip Manual triggers ignore the event date gate
Unlike the scheduled `Campaign::process` helper, manual sends ignore the date-based event gate — useful for admin test sends.
:::

Permission: `marketing.communications.campaigns.edit`.
