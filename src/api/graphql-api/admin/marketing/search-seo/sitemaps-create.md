---
outline: false
examples:
  - id: gql
    title: Create Sitemap
    query: |
      mutation Create($input: createAdminMarketingSitemapInput!) {
        createAdminMarketingSitemap(input: $input) {
          adminMarketingSitemap { id _id fileName path }
        }
      }
    variables: |
      { "input": { "fileName": "sitemap.xml", "path": "/" } }
    response: |
      { "data": { "createAdminMarketingSitemap": { "adminMarketingSitemap": { "id": "/api/admin/marketing/sitemaps/4", "_id": 4, "fileName": "sitemap.xml", "path": "/" } } } }
---

# Create Sitemap (GraphQL)

Mutation: `createAdminMarketingSitemap`.

::: warning Not auto-generated
Creating the row does NOT build the XML files. Call `createAdminMarketingSitemapGenerate` afterwards.
:::
