---
outline: false
apiType: rest
examples:
  - id: create
    title: Create Campaign
    description: Create a campaign that pairs an email template with a customer group for a channel.
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/campaigns" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "name": "Holiday Newsletter",
          "subject": "Big Holiday Sale Inside",
          "marketing_template_id": 16,
          "channel_id": 1,
          "customer_group_id": 2,
          "marketing_event_id": null,
          "status": 1
        }'
    variables: |
      {}
    response: |
      {
        "id": 5,
        "name": "Holiday Newsletter",
        "subject": "Big Holiday Sale Inside",
        "status": 1,
        "channel": {
          "id": 1,
          "code": "default",
          "name": "Default"
        },
        "customerGroup": {
          "id": 2,
          "code": "general",
          "name": "General"
        },
        "marketingTemplate": {
          "id": 16,
          "name": "Holiday Template",
          "status": "active"
        },
        "marketingEvent": null,
        "createdAt": "2026-05-26T16:51:08+05:30",
        "updatedAt": "2026-05-26T16:51:08+05:30"
      }
---

# Create Campaign

Creates a campaign — the **Create Campaign** action on the admin **Marketing →
Communications → Campaigns** screen.

::: tip
New here? Read the [Campaigns overview](/api/rest-api/admin/marketing/communications/campaigns/) for what a campaign does and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/campaigns` | POST |

## Details

- Requires an admin Bearer token and the
  `marketing.communications.campaigns.create` permission.
- Returns the full campaign payload, including the resolved `channel`,
  `customerGroup`, `marketingTemplate`, and `marketingEvent` objects
  (`marketingEvent` is `null` when no event is linked).
- Creating a campaign does not send it — use the
  [send](/api/rest-api/admin/marketing/communications/campaigns-send) endpoint to
  queue the email.

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | yes | Campaign name |
| `subject` | string | yes | Email subject line |
| `marketing_template_id` | int | yes | Email template to send |
| `channel_id` | int | yes | Channel the campaign sends from |
| `customer_group_id` | int | yes | Customer group the campaign targets |
| `marketing_event_id` | int | no | Linked event, or `null` |
| `status` | int | no | `0` inactive / `1` active |
