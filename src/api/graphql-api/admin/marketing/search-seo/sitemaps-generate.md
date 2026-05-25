---
outline: false
examples:
  - id: gql
    title: Regenerate Sitemap
    query: |
      mutation Generate($input: createAdminMarketingSitemapGenerateInput!) {
        createAdminMarketingSitemapGenerate(input: $input) {
          adminMarketingSitemapGenerate { sitemapId indexFile generatedSitemaps generatedAt message }
        }
      }
    variables: |
      { "input": { "sitemapId": 4 } }
    response: |
      { "data": { "createAdminMarketingSitemapGenerate": { "adminMarketingSitemapGenerate": { "sitemapId": 4, "indexFile": "/sitemap.xml", "generatedSitemaps": ["/sitemap-4-1.xml"], "generatedAt": "2026-05-23T11:02:55+00:00", "message": "Sitemap regenerated successfully." } } } }
---

# Regenerate Sitemap (GraphQL)

Mutation: `createAdminMarketingSitemapGenerate`.

::: tip Synchronous generation
Runs `Webkul\Sitemap\Jobs\ProcessSitemap` via `dispatchSync` — the response carries the generated paths once finished (not queued).
:::

Permission: `marketing.search_seo.sitemaps.edit`.
