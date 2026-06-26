---
outline: false
examples:
  - id: send
    title: Send Campaign
    description: Queue a campaign's email template to every subscribed member of its customer group, right now.
    query: |
      mutation CreateAdminMarketingCampaignSend(
        $input: createAdminMarketingCampaignSendInput!
      ) {
        createAdminMarketingCampaignSend(input: $input) {
          adminMarketingCampaignSend {
            campaignId
            queued
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/marketing/campaigns/5"
        }
      }
    response: |
      {
        "data": {
          "createAdminMarketingCampaignSend": {
            "adminMarketingCampaignSend": {
              "campaignId": 5,
              "queued": 124,
              "message": "Campaign queued for 124 recipient(s)."
            }
          }
        }
      }
---

# Send Campaign

Sends a campaign now — the **Send** action on the admin
**Marketing → Communications → Campaigns** screen. It queues the campaign's email
template to every subscribed member of its customer group.

::: tip
New here? Read the [Campaigns overview](/api/graphql-api/admin/marketing/communications/campaigns/) for what a campaign does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminMarketingCampaignSend` | Mutation | Queue a campaign's email to its audience |

## Details

- Requires an admin Bearer token and the `marketing.communications.campaigns.edit`
  permission.
- Pass the campaign's IRI (e.g. `/api/admin/marketing/campaigns/5`) as `id`.
- The send queues the campaign's email template to all subscribed members of its
  customer group right now, skipping any event-date gate. For a guest group it
  queues to the guest newsletter subscribers.
- The response reports `campaignId`, `queued` (the number of recipients queued),
  and a `message`.

::: warning Active campaigns only
An inactive campaign (`status` = `0`) cannot be sent — the mutation returns a
`422` error. Activate the campaign first via
[update](/api/graphql-api/admin/marketing/communications/campaigns-update).
:::

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | The campaign's IRI |

## Response fields

| Field | Type | Notes |
|-------|------|-------|
| `campaignId` | Int | The campaign that was sent |
| `queued` | Int | Number of recipients queued |
| `message` | String | Human-readable result message |
