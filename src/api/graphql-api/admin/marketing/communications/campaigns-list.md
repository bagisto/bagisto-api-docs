---
outline: false
examples:
  - id: gql
    title: List Marketing Campaigns
    query: |
      query AdminCampaigns($first: Int) {
        adminMarketingCampaigns(first: $first) {
          edges { node { id _id name subject status } }
        }
      }
    variables: |
      { "first": 10 }
    response: |
      { "data": { "adminMarketingCampaigns": { "edges": [{ "node": { "id": "/api/admin/marketing/campaigns/1", "_id": 1, "name": "July Newsletter", "subject": "Big July deals inside!", "status": 1 } }] } } }
---

# List Marketing Campaigns (GraphQL)

Query: `adminMarketingCampaigns`. Extra args: `name`, `status`, `marketing_template_id`, `marketing_event_id`, `channel_id`, `customer_group_id`, `sort`, `order`.
