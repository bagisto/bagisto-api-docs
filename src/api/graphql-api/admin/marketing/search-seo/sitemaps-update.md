---
outline: false
examples:
  - id: update
    title: Update Sitemap
    description: Update a sitemap's file name. Update is a partial merge — send only the fields you change. It does not regenerate the XML.
    query: |
      mutation UpdateAdminMarketingSitemap(
        $input: updateAdminMarketingSitemapInput!
      ) {
        updateAdminMarketingSitemap(input: $input) {
          adminMarketingSitemap {
            id
            _id
            fileName
            path
            generatedAt
            indexFile
            generatedSitemaps
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/marketing/sitemaps/1",
          "fileName": "sitemap-v2.xml"
        }
      }
    response: |
      {
        "data": {
          "updateAdminMarketingSitemap": {
            "adminMarketingSitemap": {
              "id": "/api/admin/marketing/sitemaps/1",
              "_id": 1,
              "fileName": "sitemap-v2.xml",
              "path": "/",
              "generatedAt": null,
              "indexFile": null,
              "generatedSitemaps": [],
              "createdAt": "2026-06-20T10:00:00+05:30",
              "updatedAt": "2026-06-23T12:45:00+05:30"
            }
          }
        }
      }
---

# Update Sitemap

Updates an existing sitemap — the **Edit Sitemap** action on the admin
**Marketing → Search & SEO → Sitemaps** screen.

New here? Read the [Sitemaps overview](/api/graphql-api/admin/marketing/search-seo/sitemaps/) for what a sitemap does and how its fields behave.

### Updating does not regenerate the XML

Editing the definition does not rebuild the XML files. Call the
[generate](/api/graphql-api/admin/marketing/search-seo/sitemaps-generate)
mutation explicitly after an update.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `updateAdminMarketingSitemap` | Mutation | Update a sitemap definition |

## Details

- Requires an admin Bearer token and the `marketing.search_seo.sitemaps.edit`
  permission.
- Pass the sitemap's IRI as `id`. The update is a **partial merge** — send only
  the fields you want to change; omitted fields keep their existing values.
- The mutation returns the full updated sitemap payload.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | The sitemap's IRI |
| `fileName` | String | No | Index file name — letters, digits, `-`, `_`, `.`; must end with `.xml` |
| `path` | String | No | Directory the index file lives in — must start and end with `/`, no `//` |
