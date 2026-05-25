---
outline: false
examples:
  - id: gql
    title: Delete Marketing Campaign
    query: |
      mutation Delete($input: deleteAdminMarketingCampaignInput!) {
        deleteAdminMarketingCampaign(input: $input) {
          adminMarketingCampaign { id _id }
        }
      }
    variables: |
      { "input": { "id": "/api/admin/marketing/campaigns/1" } }
    response: |
      { "data": { "deleteAdminMarketingCampaign": { "adminMarketingCampaign": { "id": "/api/admin/marketing/campaigns/1", "_id": 1 } } } }
---

# Delete Marketing Campaign (GraphQL)

Mutation: `deleteAdminMarketingCampaign`.
