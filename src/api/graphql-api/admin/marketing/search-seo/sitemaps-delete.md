---
outline: false
examples:
  - id: delete
    title: Delete Sitemap
    description: Delete a sitemap by id. A successful delete returns no errors; the row and its generated XML files are removed.
    query: |
      mutation DeleteAdminMarketingSitemap(
        $input: deleteAdminMarketingSitemapInput!
      ) {
        deleteAdminMarketingSitemap(input: $input) {
          adminMarketingSitemap {
            _id
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
          "deleteAdminMarketingSitemap": {
            "adminMarketingSitemap": null
          }
        }
      }
---

# Delete Sitemap

Deletes a sitemap — the **Delete** row action on the admin
**Marketing → Search & SEO → Sitemaps** screen. Removing a sitemap also deletes
its generated index and per-batch XML files from storage.

New here? Read the [Sitemaps overview](/api/graphql-api/admin/marketing/search-seo/sitemaps/) for what a sitemap does and how its fields behave.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminMarketingSitemap` | Mutation | Delete a sitemap |

## Details

- Requires an admin Bearer token and the `marketing.search_seo.sitemaps.delete`
  permission.
- Pass the sitemap's IRI as `id`. Use the
  [list](/api/graphql-api/admin/marketing/search-seo/sitemaps-list) query to
  discover valid ids.

### Confirm success via the absence of `errors`

The delete mutation returns a success acknowledgement, not the deleted sitemap's
data — `adminMarketingSitemap` resolves to `null` on the payload. **Treat a
response with no `errors[]` as a successful delete.** If you need a confirmation
message in the body, use the REST endpoint
(`DELETE /api/admin/marketing/sitemaps/{id}`), which returns
`{ "message": "Sitemap deleted." }`.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | The sitemap's IRI |
