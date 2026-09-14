---
outline: false
examples:
  - id: create
    title: Create Sitemap
    description: Create a sitemap definition. Creating the row does not build the XML files — call generate afterwards.
    query: |
      mutation CreateAdminMarketingSitemap(
        $input: createAdminMarketingSitemapInput!
      ) {
        createAdminMarketingSitemap(input: $input) {
          adminMarketingSitemap {
            id
            _id
            fileName
            path
            channels
            urls
            generatedAt
            generatedFiles
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
          "fileName": "sitemap.xml",
          "path": "/",
          "channels": [1]
        }
      }
    response: |
      {
        "data": {
          "createAdminMarketingSitemap": {
            "adminMarketingSitemap": {
              "id": "/api/admin/marketing/sitemaps/1",
              "_id": 1,
              "fileName": "sitemap.xml",
              "path": "/",
              "channels": [1],
              "urls": [
                "https://example.com/storage/sitemaps/default/sitemap-1-1.xml"
              ],
              "generatedAt": null,
              "generatedFiles": [],
              "indexFile": null,
              "generatedSitemaps": [],
              "createdAt": "2026-06-20T10:00:00+05:30",
              "updatedAt": "2026-06-20T10:00:00+05:30"
            }
          }
        }
      }
---

# Create Sitemap

Creates a sitemap definition — the **Create Sitemap** action on the admin
**Marketing → Search & SEO → Sitemaps** screen.

New here? Read the [Sitemaps overview](/api/graphql-api/admin/marketing/search-seo/sitemaps/) for what a sitemap does and how its fields behave.

### Creating does not build the XML

Saving the row only stores the definition. To write the actual XML files, call
the [generate](/api/graphql-api/admin/marketing/search-seo/sitemaps-generate)
mutation explicitly — `generatedAt` and `generatedFiles` stay empty until then.

### One sitemap, one set of files per channel

A sitemap covers the channels listed in `channels`, and generation writes an index
plus its child files for each of them, using that channel's own hostname. `urls`
returns the public index URL per channel, which is the link to submit to a search
engine.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminMarketingSitemap` | Mutation | Create a sitemap definition |

## Details

- Requires an admin Bearer token and the `marketing.search_seo.sitemaps.create`
  permission.
- The mutation returns the full sitemap payload.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `fileName` | String | Yes | Index file name — letters, digits, `-`, `_`, `.`; must end with `.xml` |
| `path` | String | Yes | Directory the index file lives in — must start and end with `/`, no `//` |
| `channels` | [Int] | Yes | Channel ids the sitemap covers. At least one — generation walks the channels, so a sitemap covering none produces no files |
