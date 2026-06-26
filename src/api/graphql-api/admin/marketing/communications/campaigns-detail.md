---
outline: false
examples:
  - id: detail
    title: Campaign Detail
    description: Full payload for a single campaign, including the resolved template, event, channel, and customer-group names.
    query: |
      query AdminMarketingCampaign($id: ID!) {
        adminMarketingCampaign(id: $id) {
          id
          _id
          name
          subject
          status
          channel {
            id
            _id
            code
            name
          }
          customerGroup {
            id
            _id
            code
            name
          }
          marketingTemplate {
            id
            _id
            name
            status
          }
          createdAt
          updatedAt
        }
      }
    variables: |
      {
        "id": "/api/admin/marketing/campaigns/5"
      }
    response: |
      {
        "data": {
          "adminMarketingCampaign": {
            "id": "/api/admin/marketing/campaigns/5",
            "_id": 5,
            "name": "Holiday Newsletter",
            "subject": "Big Holiday Sale Inside",
            "status": 1,
            "channel": {
              "id": "/api/admin_marketing_channel_refs/1",
              "_id": 1,
              "code": "default",
              "name": "Default"
            },
            "customerGroup": {
              "id": "/api/admin_marketing_customer_group_refs/2",
              "_id": 2,
              "code": "general",
              "name": "General"
            },
            "marketingTemplate": {
              "id": "/api/admin_marketing_template_refs/16",
              "_id": 16,
              "name": "Holiday Template",
              "status": "active"
            },
            "createdAt": "2026-05-26T16:51:08+05:30",
            "updatedAt": "2026-05-26T16:51:28+05:30"
          }
        }
      }
---

# Campaign Detail

Returns a single campaign with its full field set — the data behind the admin
**Marketing → Communications → Campaigns** view screen.

::: tip
New here? Read the [Campaigns overview](/api/graphql-api/admin/marketing/communications/campaigns/) for what a campaign does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminMarketingCampaign` | Query | Fetch one campaign by id |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- Pass the campaign's IRI (e.g. `/api/admin/marketing/campaigns/5`) as the `id`
  argument; `_id` in the response is the numeric id.
- Unlike list rows, the detail query resolves the `channel`, `customerGroup`, and
  `marketingTemplate` objects — sub-select the fields you need from each.
- The campaign's event is **REST-only**: it is not field-selectable over GraphQL.
  Read it via the [REST detail](/api/rest-api/admin/marketing/communications/campaigns-detail)
  (`marketingEvent`), which is an object or `null` when the campaign has no event.

## Fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | ID | The campaign's IRI |
| `_id` | Int | Numeric id |
| `name` | String | Campaign name |
| `subject` | String | Email subject line |
| `status` | Int | `0` inactive / `1` active |
| `channel` | Object | The channel the campaign sends in — sub-select `id`, `_id`, `code`, `name`. Detail-only (`null` on list rows) |
| `customerGroup` | Object | The recipient customer group — sub-select `id`, `_id`, `code`, `name`. Detail-only (`null` on list rows) |
| `marketingTemplate` | Object | The linked email template — sub-select `id`, `_id`, `name`, `status`. Detail-only (`null` on list rows) |
| `marketingEvent` | — | The linked event. **REST-only** — not field-selectable over GraphQL; read it via the REST detail |
| `createdAt` | String | Creation timestamp |
| `updatedAt` | String | Last-update timestamp |
