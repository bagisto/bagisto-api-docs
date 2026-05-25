---
outline: false
examples:
  - id: gql
    title: Marketing Campaign Detail
    query: |
      query AdminCampaign($id: ID!) {
        adminMarketingCampaign(id: $id) {
          id _id name subject status marketingTemplateName marketingEventName channelName customerGroupCode
        }
      }
    variables: |
      { "id": "/api/admin/marketing/campaigns/1" }
    response: |
      { "data": { "adminMarketingCampaign": { "id": "/api/admin/marketing/campaigns/1", "_id": 1, "name": "July Newsletter", "subject": "Big July deals inside!", "status": 1, "marketingTemplateName": "Welcome Email", "marketingEventName": "Holiday Sale Kickoff", "channelName": "Default", "customerGroupCode": "general" } } }
---

# Marketing Campaign Detail (GraphQL)

Query: `adminMarketingCampaign(id:)`.
