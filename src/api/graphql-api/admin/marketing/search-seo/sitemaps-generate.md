---
outline: false
examples:
  - id: generate
    title: Generate Sitemap
    description: Build the actual XML files for a sitemap, once per channel it covers, and record the written paths.
    query: |
      mutation CreateAdminMarketingSitemapGenerate(
        $input: createAdminMarketingSitemapGenerateInput!
      ) {
        createAdminMarketingSitemapGenerate(input: $input) {
          adminMarketingSitemapGenerate {
            sitemapId
            generatedFiles
            urls
            indexFile
            generatedSitemaps
            generatedAt
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/marketing/sitemaps/1"
        }
      }
    response: |
      {
        "data": {
          "createAdminMarketingSitemapGenerate": {
            "adminMarketingSitemapGenerate": {
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
          }
        }
      }
---

# Generate Sitemap

Builds the actual XML files for a sitemap — the **Generate** action on the admin
**Marketing → Search & SEO → Sitemaps** screen. It runs once per channel the
sitemap covers: for each, it walks that channel's root category subtree and the
products and pages assigned to it, writes an index file plus per-batch XML files
under `sitemaps/{channel}/`, and records what it wrote.

A sitemap that covers no channel has nothing to generate and is refused — assign
at least one channel first.

New here? Read the [Sitemaps overview](/api/graphql-api/admin/marketing/search-seo/sitemaps/) for what a sitemap does and how its fields behave.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminMarketingSitemapGenerate` | Mutation | Build the XML files for a sitemap |

## Details

- Requires an admin Bearer token and the `marketing.search_seo.sitemaps.edit`
  permission.
- Pass the sitemap's IRI (e.g. `/api/admin/marketing/sitemaps/1`) as `id`. Use
  the [list](/api/graphql-api/admin/marketing/search-seo/sitemaps-list) query to
  discover valid ids.
- Generation runs synchronously — the response carries the written paths once it
  finishes.
- Creating or updating a sitemap does **not** auto-generate. Call this mutation
  explicitly to (re)build the files.
- A sitemap that covers no channel is refused — there is nothing to walk.
- If sitemap generation is disabled in store configuration, the mutation still
  succeeds but writes no files (`generatedFiles` comes back empty).

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | The sitemap's IRI |

## Response fields

| Field | Type | Notes |
|-------|------|-------|
| `sitemapId` | Int | Numeric id of the generated sitemap |
| `generatedFiles` | Array | What the run wrote, one entry per channel: `channelId`, `channelCode`, `hostname`, `index`, `sitemaps[]` |
| `urls` | Array | Public index URL per channel — the link to submit to a search engine |
| `indexFile` | String | Index path of a sitemap generated before generation became channel-aware. `null` for anything generated since |
| `generatedSitemaps` | Array | Child paths of a sitemap generated before generation became channel-aware. Empty for anything generated since |
| `generatedAt` | String | Timestamp the generation finished |
| `message` | String | Human-readable success message |
