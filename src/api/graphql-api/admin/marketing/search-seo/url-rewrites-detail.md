---
outline: false
examples:
  - id: gql
    title: URL Rewrite Detail
    query: |
      query AdminRewrite($id: ID!) {
        adminMarketingUrlRewrite(id: $id) { id _id entityType requestPath targetPath redirectType locale }
      }
    variables: |
      { "id": "/api/admin/marketing/url-rewrites/1" }
    response: |
      { "data": { "adminMarketingUrlRewrite": { "id": "/api/admin/marketing/url-rewrites/1", "_id": 1, "entityType": "product", "requestPath": "old-path", "targetPath": "new-path", "redirectType": "301", "locale": "en" } } }
---

# URL Rewrite Detail (GraphQL)

Query: `adminMarketingUrlRewrite(id:)`.
