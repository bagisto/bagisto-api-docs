---
outline: false
examples:
  - id: gql
    title: Delete Sitemap
    query: |
      mutation Delete($input: deleteAdminMarketingSitemapInput!) {
        deleteAdminMarketingSitemap(input: $input) {
          adminMarketingSitemap { id _id }
        }
      }
    variables: |
      { "input": { "id": "/api/admin/marketing/sitemaps/4" } }
    response: |
      { "data": { "deleteAdminMarketingSitemap": { "adminMarketingSitemap": { "id": "/api/admin/marketing/sitemaps/4", "_id": 4 } } } }
---

# Delete Sitemap (GraphQL)

Mutation: `deleteAdminMarketingSitemap`. Removes the DB row and generated XML files.
