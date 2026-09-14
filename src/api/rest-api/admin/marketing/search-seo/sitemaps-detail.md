---
outline: false
apiType: rest
examples:
  - id: detail
    title: Sitemap Detail
    description: Full payload for a single sitemap, including the built index file and child sitemap paths.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/sitemaps/1" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "id": 1,
        "fileName": "sitemap.xml",
        "path": "/",
        "channels": [1, 2],
        "urls": [
          "https://example.com/storage/sitemaps/default/sitemap-1-1.xml",
          "https://eu.example.com/storage/sitemaps/eu/sitemap-1-2.xml"
        ],
        "generatedAt": "2026-06-23T13:00:00+05:30",
        "generatedFiles": [
          {
            "channelId": 1,
            "channelCode": "default",
            "hostname": "https://example.com",
            "index": "sitemaps/default/sitemap-1-1.xml",
            "sitemaps": [
              "sitemaps/default/sitemap-1-1-1.xml"
            ]
          },
          {
            "channelId": 2,
            "channelCode": "eu",
            "hostname": "https://eu.example.com",
            "index": "sitemaps/eu/sitemap-1-2.xml",
            "sitemaps": [
              "sitemaps/eu/sitemap-1-2-1.xml"
            ]
          }
        ],
        "indexFile": null,
        "generatedSitemaps": [],
        "createdAt": "2026-06-20T10:00:00+05:30",
        "updatedAt": "2026-06-23T13:00:00+05:30"
      }
---

# Sitemap Detail

Returns a single sitemap with its full field set — the data behind the admin
**Marketing → Search & SEO → Sitemaps** view screen.

New here? Read the [Sitemaps overview](/api/rest-api/admin/marketing/search-seo/sitemaps/) for what a sitemap does and how its fields behave.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/sitemaps/{id}` | GET |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- Unlike list rows, the detail endpoint returns `generatedFiles` — the actual
  XML files produced by the last generate run, one entry per channel.
- `generatedFiles` is empty until the sitemap has been generated at least once.
- An unknown id returns a `404`.

## Response fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | int | Numeric id |
| `fileName` | string | Index file name (ends with `.xml`) |
| `path` | string | Path where the index file is written (starts and ends with `/`) |
| `channels` | integer[] | Channel ids the sitemap covers |
| `urls` | string[] | Public index URL per channel — the link to submit to a search engine |
| `generatedAt` | string | Timestamp of the last generate run, or `null` |
| `generatedFiles` | object[] | What the last run wrote, one entry per channel: `channelId`, `channelCode`, `hostname`, `index`, `sitemaps[]` |
| `indexFile` | string | Index path of a sitemap generated before generation became channel-aware. `null` for anything generated since — read `generatedFiles` |
| `generatedSitemaps` | string[] | Child paths of a sitemap generated before generation became channel-aware. Empty for anything generated since — read `generatedFiles` |
| `createdAt` | string | Creation timestamp |
| `updatedAt` | string | Last-update timestamp |
