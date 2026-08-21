---
outline: false
examples:
  - id: generate
    title: Generate Sitemap
    description: Build the actual XML files for a sitemap. Walks public categories, products, and pages and records the written paths.
    query: |
      mutation CreateAdminMarketingSitemapGenerate(
        $input: createAdminMarketingSitemapGenerateInput!
      ) {
        createAdminMarketingSitemapGenerate(input: $input) {
          adminMarketingSitemapGenerate {
            sitemapId
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
              "indexFile": "/sitemap.xml",
              "generatedSitemaps": [
                "/sitemap-products-1.xml"
              ],
              "generatedAt": "2026-06-23T13:00:00+05:30",
              "message": "Sitemap generated successfully."
            }
          }
        }
      }
---

# Generate Sitemap

Builds the actual XML files for a sitemap — the **Generate** action on the admin
**Marketing → Search & SEO → Sitemaps** screen. It walks the store's public
categories, products, and pages, writes the index file plus per-batch XML files,
and records their paths on the sitemap.

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
- If sitemap generation is disabled in store configuration, the mutation still
  succeeds but writes no files (`generatedSitemaps` comes back empty).

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | The sitemap's IRI |

## Response fields

| Field | Type | Notes |
|-------|------|-------|
| `sitemapId` | Int | Numeric id of the generated sitemap |
| `indexFile` | String | Path of the written index file |
| `generatedSitemaps` | Array | Paths of the per-batch product / category / page files |
| `generatedAt` | String | Timestamp the generation finished |
| `message` | String | Human-readable success message |
