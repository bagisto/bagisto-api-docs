---
outline: false
apiType: rest
examples:
  - id: generate
    title: Generate Sitemap
    description: Build the XML files for a sitemap. Send an empty body — the id comes from the URL.
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/sitemaps/1/generate" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "sitemapId": 1,
        "generatedFiles": [
          {
            "channelId": 1,
            "channelCode": "default",
            "hostname": "https://example.com",
            "index": "sitemaps/default/sitemap-1-1.xml",
            "sitemaps": [
              "sitemaps/default/sitemap-1-1-1.xml"
            ]
          }
        ],
        "urls": [
          "https://example.com/storage/sitemaps/default/sitemap-1-1.xml"
        ],
        "indexFile": null,
        "generatedSitemaps": [],
        "generatedAt": "2026-06-23T13:00:00+05:30",
        "message": "Sitemap generated successfully."
      }
---

# Generate Sitemap

Builds the XML files for a sitemap — the **Generate** row action on the admin
**Marketing → Search & SEO → Sitemaps** screen. Saving a sitemap does not build
its files, so this is the explicit step that produces them.

New here? Read the [Sitemaps overview](/api/rest-api/admin/marketing/search-seo/sitemaps/) for what a sitemap does and how its fields behave.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/sitemaps/{id}/generate` | POST |

## Details

- Requires an admin Bearer token and the `marketing.search_seo.sitemaps.edit`
  permission.
- Send an **empty body** — the sitemap id comes from the URL.
- Runs once per channel the sitemap covers: for each, it walks that channel's root
  category subtree and the products and pages assigned to it, then writes an index
  file plus the per-batch XML files under `sitemaps/{channel}/`, using the channel's
  own hostname for the URLs inside them.
- The response carries the generated file paths once the build finishes, grouped by
  channel.
- A sitemap that covers no channel has nothing to generate and is refused with a
  `422` — assign at least one channel first.
- If sitemap generation is disabled in the store configuration, the request still
  succeeds but produces no files (`generatedFiles` empty).

## Response fields

| Field | Type | Notes |
|-------|------|-------|
| `sitemapId` | int | Id of the sitemap that was generated |
| `generatedFiles` | object[] | What the run wrote, one entry per channel: `channelId`, `channelCode`, `hostname`, `index`, `sitemaps[]` |
| `urls` | string[] | Public index URL per channel — the link to submit to a search engine |
| `indexFile` | string | Index path of a sitemap generated before generation became channel-aware. `null` for anything generated since |
| `generatedSitemaps` | string[] | Child paths of a sitemap generated before generation became channel-aware. Empty for anything generated since |
| `generatedAt` | string | Timestamp of this generate run |
| `message` | string | Success message |
