---
outline: false
apiType: rest
examples:
  - id: update
    title: Update Campaign
    description: Update a campaign's subject and status. Update is a partial merge — send only the fields you change.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/marketing/campaigns/5" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "subject": "Holiday Sale — Final Hours",
          "status": 0
        }'
    variables: |
      {}
    response: |
      {
        "id": 5,
        "name": "Holiday Newsletter",
        "subject": "Holiday Sale — Final Hours",
        "status": 0,
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
        "marketingEvent": {
          "id": 3,
          "name": "Holiday Sale",
          "date": "2026-12-25"
        },
        "createdAt": "2026-05-26T16:51:08+05:30",
        "updatedAt": "2026-05-26T16:55:42+05:30"
      }
---

# Update Campaign

Updates an existing campaign — the **Edit Campaign** action on the admin
**Marketing → Communications → Campaigns** screen.

::: tip
New here? Read the [Campaigns overview](/api/rest-api/admin/marketing/communications/campaigns/) for what a campaign does and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/campaigns/{id}` | PUT |

## Details

- Requires an admin Bearer token and the
  `marketing.communications.campaigns.edit` permission.
- The update is a **partial merge** — send only the fields you want to change;
  omitted fields keep their existing values.
- Returns the full updated campaign payload, including the resolved `channel`,
  `customerGroup`, `marketingTemplate`, and `marketingEvent` objects
  (`marketingEvent` is `null` when no event is linked).

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | no | Campaign name |
| `subject` | string | no | Email subject line |
| `marketing_template_id` | int | no | Email template to send |
| `channel_id` | int | no | Channel the campaign sends from |
| `customer_group_id` | int | no | Customer group the campaign targets |
| `marketing_event_id` | int | no | Linked event, or `null` |
| `status` | int | no | `0` inactive / `1` active |
