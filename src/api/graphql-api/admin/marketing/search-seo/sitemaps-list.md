---
outline: false
examples:
  - id: gql
    title: List Sitemaps
    query: |
      query AdminSitemaps($first: Int) {
        adminMarketingSitemaps(first: $first) {
          edges { node { id _id fileName path generatedAt } }
        }
      }
    variables: |
      { "first": 10 }
    response: |
      { "data": { "adminMarketingSitemaps": { "edges": [{ "node": { "id": "/api/admin/marketing/sitemaps/4", "_id": 4, "fileName": "sitemap.xml", "path": "/", "generatedAt": "2026-05-23T11:02:55+00:00" } }] } } }
---

# List Sitemaps (GraphQL)

Query: `adminMarketingSitemaps`. Extra args: `file_name`, `sort`, `order`.
