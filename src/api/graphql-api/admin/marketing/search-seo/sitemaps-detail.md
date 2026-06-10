---
outline: false
examples:
  - id: gql
    title: Sitemap Detail
    query: |
      query AdminSitemap($id: ID!) {
        adminMarketingSitemap(id: $id) {
          id _id fileName path generatedAt indexFile generatedSitemaps
        }
      }
    variables: |
      { "id": "/api/admin/marketing/sitemaps/4" }
    response: |
      { "data": { "adminMarketingSitemap": { "id": "/api/admin/marketing/sitemaps/4", "_id": 4, "fileName": "sitemap.xml", "path": "/", "generatedAt": "2026-05-23T11:02:55+00:00", "indexFile": "/sitemap.xml", "generatedSitemaps": ["/sitemap-4-1.xml"] } } }
---

# Sitemap Detail (GraphQL)

Query: `adminMarketingSitemap(id:)`.
