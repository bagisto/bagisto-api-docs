---
outline: false
examples:
  - id: create
    title: Create Campaign
    description: Create a campaign that pairs an email template with a customer group for a channel.
    query: |
      mutation CreateAdminMarketingCampaign(
        $input: createAdminMarketingCampaignInput!
      ) {
        createAdminMarketingCampaign(input: $input) {
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
          "name": "Holiday Newsletter",
          "subject": "Big Holiday Sale Inside",
          "marketingTemplateId": 16,
          "channelId": 1,
          "customerGroupId": 2,
          "marketingEventId": null,
          "status": 1
        }
      }
    response: |
      {
        "data": {
          "createAdminMarketingCampaign": {
            "adminMarketingCampaign": {
              "id": "/api/admin/marketing/campaigns/5",
              "_id": 5,
              "name": "Holiday Newsletter",
              "subject": "Big Holiday Sale Inside",
              "status": 1,
              "createdAt": "2026-05-26T16:51:08+05:30",
              "updatedAt": "2026-05-26T16:51:08+05:30"
            }
          }
        }
      }
---

# Create Campaign

Creates a campaign — the **Create Campaign** action on the admin
**Marketing → Communications → Campaigns** screen. A campaign pairs an email
template with a recipient customer group for a channel.

::: tip
New here? Read the [Campaigns overview](/api/graphql-api/admin/marketing/communications/campaigns/) for what a campaign does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminMarketingCampaign` | Mutation | Create a campaign |

## Details

- Requires an admin Bearer token and the `marketing.communications.campaigns.create`
  permission.
- The mutation returns the campaign's scalar fields. The `channel`,
  `customerGroup`, and `marketingTemplate` objects do **not** resolve on the
  mutation payload — re-query the
  [detail](/api/graphql-api/admin/marketing/communications/campaigns-detail) to read them.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | String | Yes | Campaign name |
| `subject` | String | Yes | Email subject line |
| `marketingTemplateId` | Int | Yes | Email template to send |
| `channelId` | Int | Yes | Channel the campaign sends in |
| `customerGroupId` | Int | Yes | Recipient customer group |
| `marketingEventId` | Int | No | Optional linked event, or `null` |
| `status` | Int | No | `0` inactive / `1` active |
