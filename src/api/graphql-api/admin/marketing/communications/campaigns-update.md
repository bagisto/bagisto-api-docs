---
outline: false
examples:
  - id: gql
    title: Update Marketing Campaign
    query: |
      mutation Update($input: updateAdminMarketingCampaignInput!) {
        updateAdminMarketingCampaign(input: $input) {
          adminMarketingCampaign { id _id subject status }
        }
      }
    variables: |
      { "input": { "id": "/api/admin/marketing/campaigns/1", "subject": "Updated subject", "status": 0 } }
    response: |
      { "data": { "updateAdminMarketingCampaign": { "adminMarketingCampaign": { "id": "/api/admin/marketing/campaigns/1", "_id": 1, "subject": "Updated subject", "status": 0 } } } }
---

# Update Marketing Campaign (GraphQL)

Mutation: `updateAdminMarketingCampaign`.

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a campaign that exists in your store — use the [`adminMarketingCampaigns`](./campaigns-list.md) query to discover valid ids.
:::
