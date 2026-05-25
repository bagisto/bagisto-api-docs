---
outline: false
examples:
  - id: gql
    title: Delete URL Rewrite
    query: |
      mutation Delete($input: deleteAdminMarketingUrlRewriteInput!) {
        deleteAdminMarketingUrlRewrite(input: $input) {
          adminMarketingUrlRewrite { id _id }
        }
      }
    variables: |
      { "input": { "id": "/api/admin/marketing/url-rewrites/1" } }
    response: |
      { "data": { "deleteAdminMarketingUrlRewrite": { "adminMarketingUrlRewrite": { "id": "/api/admin/marketing/url-rewrites/1", "_id": 1 } } } }
---

# Delete URL Rewrite (GraphQL)

Mutation: `deleteAdminMarketingUrlRewrite`.
