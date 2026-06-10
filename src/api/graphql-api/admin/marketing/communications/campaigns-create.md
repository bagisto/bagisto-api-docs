---
outline: false
examples:
  - id: gql
    title: Create Marketing Campaign
    query: |
      mutation Create($input: createAdminMarketingCampaignInput!) {
        createAdminMarketingCampaign(input: $input) {
          adminMarketingCampaign { id _id name subject status }
        }
      }
    variables: |
      { "input": { "name": "July Newsletter", "subject": "Big July deals inside!", "marketingTemplateId": 1, "marketingEventId": 1, "channelId": 1, "customerGroupId": 1, "status": 1 } }
    response: |
      { "data": { "createAdminMarketingCampaign": { "adminMarketingCampaign": { "id": "/api/admin/marketing/campaigns/1", "_id": 1, "name": "July Newsletter", "subject": "Big July deals inside!", "status": 1 } } } }
---

# Create Marketing Campaign (GraphQL)

Mutation: `createAdminMarketingCampaign`.
