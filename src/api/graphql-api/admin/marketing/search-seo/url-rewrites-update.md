---
outline: false
examples:
  - id: update
    title: Update URL Rewrite
    description: Update a URL rewrite's target path and redirect type. Update is a partial merge — send only the fields you change.
    query: |
      mutation UpdateAdminMarketingUrlRewrite(
        $input: updateAdminMarketingUrlRewriteInput!
      ) {
        updateAdminMarketingUrlRewrite(input: $input) {
          adminMarketingUrlRewrite {
            id
            _id
            entityType
            requestPath
            targetPath
            redirectType
            locale
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/marketing/url-rewrites/118",
          "targetPath": "testing-updated",
          "redirectType": "302"
        }
      }
    response: |
      {
        "data": {
          "updateAdminMarketingUrlRewrite": {
            "adminMarketingUrlRewrite": {
              "id": "/api/admin/marketing/url-rewrites/118",
              "_id": 118,
              "entityType": "cms_page",
              "requestPath": "cms-test",
              "targetPath": "testing-updated",
              "redirectType": "302",
              "locale": "en",
              "createdAt": "2026-06-23T12:32:58+05:30",
              "updatedAt": "2026-06-23T12:40:11+05:30"
            }
          }
        }
      }
---

# Update URL Rewrite

Updates an existing URL rewrite — the **Edit** action on the admin **Marketing →
Search & SEO → URL Rewrites** screen.

::: tip
New here? Read the [URL Rewrites overview](/api/graphql-api/admin/marketing/search-seo/url-rewrites/) for what a URL rewrite does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `updateAdminMarketingUrlRewrite` | Mutation | Update a URL rewrite |

## Details

- Requires an admin Bearer token and the `marketing.search_seo.url_rewrites.edit`
  permission.
- Pass the rewrite's IRI as `id`. The update is a **partial merge** — send only the
  fields you want to change; omitted fields keep their existing values.
- The mutation returns the full updated rewrite payload.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | The rewrite's IRI |
| `entityType` | String | No | `product`, `category`, or `cms_page` |
| `requestPath` | String | No | Source path the shopper requests |
| `targetPath` | String | No | Destination path the request redirects to |
| `redirectType` | String | No | `301` permanent / `302` temporary |
| `locale` | String | No | Locale code; must exist in the store's locales |
