---
outline: false
examples:
  - id: gql
    title: List Email Templates
    query: |
      query AdminTemplates($first: Int) {
        adminMarketingTemplates(first: $first) {
          edges { node { id _id name status } }
        }
      }
    variables: |
      { "first": 10 }
    response: |
      { "data": { "adminMarketingTemplates": { "edges": [{ "node": { "id": "/api/admin/marketing/templates/1", "_id": 1, "name": "Welcome Email", "status": "active" } }] } } }
---

# List Email Templates (GraphQL)

Query: `adminMarketingTemplates`. Extra args: `name`, `status`, `sort`, `order`.
