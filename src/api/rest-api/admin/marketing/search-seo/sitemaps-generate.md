---
outline: false
apiType: rest
examples:
  - id: admin-marketing-sitemap-generate
    title: Regenerate Sitemap
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/sitemaps/4/generate" \
        -H "Authorization: Bearer <token>"
    response: |
      { "id": 4, "sitemapId": 4, "indexFile": "/sitemap.xml", "generatedSitemaps": ["/sitemap-4-1.xml"], "generatedAt": "2026-05-23T11:02:55+00:00", "message": "Sitemap regenerated successfully." }
---

# Regenerate Sitemap

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/sitemaps/{id}/generate` | POST |

Walks every public Category / Product / Page and (re)writes the XML files under the public disk. Updates the sitemap row's `generated_at`, index file, and child sitemap list.

::: tip Synchronous generation
The endpoint runs `Webkul\Sitemap\Jobs\ProcessSitemap` via `dispatchSync` — the response carries the generated file paths once the job finishes (not queued in the background).
:::

Permission: `marketing.search_seo.sitemaps.edit`.
