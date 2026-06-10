---
outline: false
examples:
  - id: gql
    title: Update Email Template
    query: |
      mutation Update($input: updateAdminMarketingTemplateInput!) {
        updateAdminMarketingTemplate(input: $input) {
          adminMarketingTemplate { id _id name status }
        }
      }
    variables: |
      { "input": { "id": "/api/admin/marketing/templates/1", "name": "Welcome Email v2", "status": "active", "content": "<p>Welcome aboard!</p>" } }
    response: |
      { "data": { "updateAdminMarketingTemplate": { "adminMarketingTemplate": { "id": "/api/admin/marketing/templates/1", "_id": 1, "name": "Welcome Email v2", "status": "active" } } } }
---

# Update Email Template (GraphQL)

Mutation: `updateAdminMarketingTemplate`.

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a email template that exists in your store — use the [`adminMarketingTemplates`](./templates-list.md) query to discover valid ids.
:::
