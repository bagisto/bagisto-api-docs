---
outline: false
examples:
  - id: gql
    title: Send Marketing Campaign
    query: |
      mutation Send($input: createAdminMarketingCampaignSendInput!) {
        createAdminMarketingCampaignSend(input: $input) {
          adminMarketingCampaignSend { campaignId queued message }
        }
      }
    variables: |
      { "input": { "campaignId": 12 } }
    response: |
      { "data": { "createAdminMarketingCampaignSend": { "adminMarketingCampaignSend": { "campaignId": 12, "queued": 5, "message": "Campaign queued for 5 recipient(s)." } } } }
---

# Send Marketing Campaign (GraphQL)

Mutation: `createAdminMarketingCampaignSend`.

::: warning Active campaigns only
Inactive campaigns (`status = 0`) return an error.
:::

::: tip Manual triggers ignore date gate
Bypasses the date-based event gate so admin can do test sends.
:::

Permission: `marketing.communications.campaigns.edit`.
