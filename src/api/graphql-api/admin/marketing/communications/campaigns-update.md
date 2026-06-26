---
outline: false
examples:
  - id: update
    title: Update Campaign
    description: Update a campaign's subject and status. Update is a partial merge — send only the fields you change.
    query: |
      mutation UpdateAdminMarketingCampaign(
        $input: updateAdminMarketingCampaignInput!
      ) {
        updateAdminMarketingCampaign(input: $input) {
          adminMarketingCampaign {
            id
            _id
            name
            subject
            status
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/marketing/campaigns/5",
          "subject": "Bigger Holiday Sale Inside",
          "status": 0
        }
      }
    response: |
      {
        "data": {
          "updateAdminMarketingCampaign": {
            "adminMarketingCampaign": {
              "id": "/api/admin/marketing/campaigns/5",
              "_id": 5,
              "name": "Holiday Newsletter",
              "subject": "Bigger Holiday Sale Inside",
              "status": 0,
              "createdAt": "2026-05-26T16:51:08+05:30",
              "updatedAt": "2026-05-26T16:51:28+05:30"
            }
          }
        }
      }
---

# Update Campaign

Updates an existing campaign — the **Edit** action on the admin
**Marketing → Communications → Campaigns** screen.

::: tip
New here? Read the [Campaigns overview](/api/graphql-api/admin/marketing/communications/campaigns/) for what a campaign does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `updateAdminMarketingCampaign` | Mutation | Update a campaign |

## Details

- Requires an admin Bearer token and the `marketing.communications.campaigns.edit`
  permission.
- Pass the campaign's IRI as `id`. The update is a **partial merge** — send only
  the fields you want to change; omitted fields keep their existing values.
- The mutation returns the campaign's scalar fields. The `channel`,
  `customerGroup`, and `marketingTemplate` objects do **not** resolve on the
  mutation payload — re-query the
  [detail](/api/graphql-api/admin/marketing/communications/campaigns-detail) to read them.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | The campaign's IRI |
| `name` | String | No | Campaign name |
| `subject` | String | No | Email subject line |
| `marketingTemplateId` | Int | No | Email template to send |
| `channelId` | Int | No | Channel the campaign sends in |
| `customerGroupId` | Int | No | Recipient customer group |
| `marketingEventId` | Int | No | Linked event, or `null` |
| `status` | Int | No | `0` inactive / `1` active |
