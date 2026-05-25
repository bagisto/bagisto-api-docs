---
outline: false
examples:
  - id: gql
    title: Update Sitemap
    query: |
      mutation Update($input: updateAdminMarketingSitemapInput!) {
        updateAdminMarketingSitemap(input: $input) {
          adminMarketingSitemap { id _id fileName path }
        }
      }
    variables: |
      { "input": { "id": "/api/admin/marketing/sitemaps/4", "file_name": "sitemap-v2.xml" } }
    response: |
      { "data": { "updateAdminMarketingSitemap": { "adminMarketingSitemap": { "id": "/api/admin/marketing/sitemaps/4", "_id": 4, "fileName": "sitemap-v2.xml", "path": "/" } } } }
---

# Update Sitemap (GraphQL)

Mutation: `updateAdminMarketingSitemap`.

::: warning No auto-regeneration
Updating fields does NOT regenerate the XML; call `createAdminMarketingSitemapGenerate`.
:::
