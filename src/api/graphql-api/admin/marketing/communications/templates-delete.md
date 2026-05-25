---
outline: false
examples:
  - id: gql
    title: Delete Email Template
    query: |
      mutation Delete($input: deleteAdminMarketingTemplateInput!) {
        deleteAdminMarketingTemplate(input: $input) {
          adminMarketingTemplate { id _id }
        }
      }
    variables: |
      { "input": { "id": "/api/admin/marketing/templates/1" } }
    response: |
      { "data": { "deleteAdminMarketingTemplate": { "adminMarketingTemplate": { "id": "/api/admin/marketing/templates/1", "_id": 1 } } } }
---

# Delete Email Template (GraphQL)

Mutation: `deleteAdminMarketingTemplate`.
