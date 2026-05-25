---
outline: false
examples:
  - id: gql
    title: Create Email Template
    query: |
      mutation Create($input: createAdminMarketingTemplateInput!) {
        createAdminMarketingTemplate(input: $input) {
          adminMarketingTemplate { id _id name status }
        }
      }
    variables: |
      { "input": { "name": "Welcome Email", "status": "active", "content": "<p>Welcome to our store!</p>" } }
    response: |
      { "data": { "createAdminMarketingTemplate": { "adminMarketingTemplate": { "id": "/api/admin/marketing/templates/1", "_id": 1, "name": "Welcome Email", "status": "active" } } } }
---

# Create Email Template (GraphQL)

Mutation: `createAdminMarketingTemplate`.
