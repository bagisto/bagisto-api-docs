---
outline: false
examples:
  - id: gql
    title: Create URL Rewrite
    query: |
      mutation Create($input: createAdminMarketingUrlRewriteInput!) {
        createAdminMarketingUrlRewrite(input: $input) {
          adminMarketingUrlRewrite { id _id entityType requestPath targetPath redirectType locale }
        }
      }
    variables: |
      { "input": { "entity_type": "product", "request_path": "old-path", "target_path": "new-path", "redirect_type": "301", "locale": "en" } }
    response: |
      { "data": { "createAdminMarketingUrlRewrite": { "adminMarketingUrlRewrite": { "id": "/api/admin/marketing/url-rewrites/1", "_id": 1, "entityType": "product", "requestPath": "old-path", "targetPath": "new-path", "redirectType": "301", "locale": "en" } } } }
---

# Create URL Rewrite (GraphQL)

Mutation: `createAdminMarketingUrlRewrite`.
