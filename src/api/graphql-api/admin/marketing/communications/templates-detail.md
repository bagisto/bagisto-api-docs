---
outline: false
examples:
  - id: gql
    title: Email Template Detail
    query: |
      query AdminTemplate($id: ID!) {
        adminMarketingTemplate(id: $id) { id _id name status content }
      }
    variables: |
      { "id": "/api/admin/marketing/templates/1" }
    response: |
      { "data": { "adminMarketingTemplate": { "id": "/api/admin/marketing/templates/1", "_id": 1, "name": "Welcome Email", "status": "active", "content": "<p>Welcome to our store!</p>" } } }
---

# Email Template Detail (GraphQL)

Query: `adminMarketingTemplate(id:)`.
