---
outline: false
apiType: rest
examples:
  - id: detail
    title: Campaign Detail
    description: Full payload for a single campaign, including the resolved template, event, channel, and customer-group names.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/campaigns/5" \
        -H "Authorization: Bearer <token>"
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
        "marketingEvent": {
          "id": 3,
          "name": "Holiday Sale",
          "date": "2026-12-25"
        },
        "createdAt": "2026-05-26T16:51:08+05:30",
        "updatedAt": "2026-05-26T16:51:28+05:30"
      }
---

# Campaign Detail

Returns a single campaign with its full field set — the data behind the admin
**Marketing → Communications → Campaigns** view screen.

::: tip
New here? Read the [Campaigns overview](/api/rest-api/admin/marketing/communications/campaigns/) for what a campaign does and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/campaigns/{id}` | GET |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- Unlike list rows, the detail endpoint resolves the `channel`, `customerGroup`,
  `marketingTemplate`, and `marketingEvent` objects. `marketingEvent` is an object
  or `null` when the campaign has no event.
- An unknown id returns a `404`.

## Response fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | int | Numeric id |
| `name` | string | Campaign name |
| `subject` | string | Email subject line |
| `status` | int | `0` inactive / `1` active |
| `channel` | object | The channel the campaign sends from — `{ id, code, name }`. Detail-only (`null` on list rows) |
| `customerGroup` | object | The customer group the campaign targets — `{ id, code, name }`. Detail-only (`null` on list rows) |
| `marketingTemplate` | object | The linked email template — `{ id, name, status }`. Detail-only (`null` on list rows) |
| `marketingEvent` | object | The linked event — `{ id, name, date }`, or `null` when the campaign has no event. Detail-only (`null` on list rows) |
| `createdAt` | string | Creation timestamp |
| `updatedAt` | string | Last-update timestamp |
