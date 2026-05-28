---
outline: false
examples:
  - id: gql
    title: Update URL Rewrite
    query: |
      mutation Update($input: updateAdminMarketingUrlRewriteInput!) {
        updateAdminMarketingUrlRewrite(input: $input) {
          adminMarketingUrlRewrite { id _id targetPath redirectType }
        }
      }
    variables: |
      { "input": { "id": "/api/admin/marketing/url-rewrites/1", "targetPath": "newer-path", "redirectType": "302" } }
    response: |
      { "data": { "updateAdminMarketingUrlRewrite": { "adminMarketingUrlRewrite": { "id": "/api/admin/marketing/url-rewrites/1", "_id": 1, "targetPath": "newer-path", "redirectType": "302" } } } }
---

# Update URL Rewrite (GraphQL)

Mutation: `updateAdminMarketingUrlRewrite`.
