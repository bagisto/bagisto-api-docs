---
outline: false
apiType: rest
examples:
  - id: send
    title: Send Campaign
    description: Queue the campaign email to every subscribed member of its customer group.
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/campaigns/5/send" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{}'
    variables: |
      {}
    response: |
      {
        "campaignId": 5,
        "queued": 124,
        "message": "Campaign queued for 124 recipient(s)."
      }
---

# Send Campaign

Queues a campaign's email — the **Send** action on the admin **Marketing →
Communications → Campaigns** screen.

::: tip
New here? Read the [Campaigns overview](/api/rest-api/admin/marketing/communications/campaigns/) for what a campaign does and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/campaigns/{id}/send` | POST |

## Details

- Requires an admin Bearer token and the
  `marketing.communications.campaigns.edit` permission.
- Send an empty body (`{}`) with `Content-Type: application/json`.
- Queues the campaign's email template to every subscribed member of its
  customer group. When the group is the guest group, it sends to the guest
  newsletter subscribers instead.
- The send happens immediately and skips any event-date gate — useful for admin
  test sends.
- Refuses an inactive campaign (`status = 0`) with a `422`.
- An unknown id returns a `404`.

## Response fields

| Field | Type | Notes |
|-------|------|-------|
| `campaignId` | int | Id of the campaign that was sent |
| `queued` | int | Number of recipients the email was queued for |
| `message` | string | Confirmation message |
