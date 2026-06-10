---
outline: false
examples:
  - id: gql
    title: List URL Rewrites
    query: |
      query AdminRewrites($first: Int) {
        adminMarketingUrlRewrites(first: $first) {
          edges { node { id _id entityType requestPath targetPath redirectType locale } }
        }
      }
    variables: |
      { "first": 10 }
    response: |
      { "data": { "adminMarketingUrlRewrites": { "edges": [{ "node": { "id": "/api/admin/marketing/url-rewrites/1", "_id": 1, "entityType": "product", "requestPath": "old-path", "targetPath": "new-path", "redirectType": "301", "locale": "en" } }] } } }
---

# List URL Rewrites (GraphQL)

Query: `adminMarketingUrlRewrites`. Extra args: `entity_type`, `request_path`, `redirect_type`, `locale`, `sort`, `order`.
