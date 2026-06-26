---
outline: false
examples:
  - id: mass-delete
    title: Mass Delete URL Rewrites
    description: Delete several URL rewrites in one call. Non-existent ids are silently skipped.
    query: |
      mutation CreateAdminMarketingUrlRewriteMassDelete(
        $input: createAdminMarketingUrlRewriteMassDeleteInput!
      ) {
        createAdminMarketingUrlRewriteMassDelete(input: $input) {
          adminMarketingUrlRewriteMassDelete {
            deleted
            skipped
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "indices": [118, 119]
        }
      }
    response: |
      {
        "data": {
          "createAdminMarketingUrlRewriteMassDelete": {
            "adminMarketingUrlRewriteMassDelete": {
              "deleted": [118, 119],
              "skipped": [],
              "message": "URL rewrites deleted."
            }
          }
        }
      }
---

# Mass Delete URL Rewrites

Deletes several URL rewrites in one call — the **Mass Delete** action on the admin
**Marketing → Search & SEO → URL Rewrites** datagrid.

::: tip
New here? Read the [URL Rewrites overview](/api/graphql-api/admin/marketing/search-seo/url-rewrites/) for what a URL rewrite does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminMarketingUrlRewriteMassDelete` | Mutation | Delete multiple URL rewrites |

## Details

- Requires an admin Bearer token and the `marketing.search_seo.url_rewrites.delete`
  permission.
- Pass the numeric rewrite ids in `indices`. Non-existent ids are **silently
  skipped** (returned in `skipped`); the ids actually removed are returned in
  `deleted`.
- An empty or missing `indices` list returns a `422` error.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | Array | Yes | Non-empty list of numeric rewrite ids to delete |
