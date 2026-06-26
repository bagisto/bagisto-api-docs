---
outline: false
examples:
  - id: detail
    title: URL Rewrite Detail
    description: Full payload for a single URL rewrite.
    query: |
      query AdminMarketingUrlRewrite($id: ID!) {
        adminMarketingUrlRewrite(id: $id) {
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
    variables: |
      {
        "id": "/api/admin/marketing/url-rewrites/118"
      }
    response: |
      {
        "data": {
          "adminMarketingUrlRewrite": {
            "id": "/api/admin/marketing/url-rewrites/118",
            "_id": 118,
            "entityType": "cms_page",
            "requestPath": "cms-test",
            "targetPath": "testing",
            "redirectType": "301",
            "locale": "en",
            "createdAt": "2026-06-23T12:32:58+05:30",
            "updatedAt": "2026-06-23T12:32:58+05:30"
          }
        }
      }
---

# URL Rewrite Detail

Returns a single URL rewrite with its full field set — the data behind the admin
**Marketing → Search & SEO → URL Rewrites** view screen.

::: tip
New here? Read the [URL Rewrites overview](/api/graphql-api/admin/marketing/search-seo/url-rewrites/) for what a URL rewrite does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminMarketingUrlRewrite` | Query | Fetch one URL rewrite by id |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- Pass the rewrite's IRI (e.g. `/api/admin/marketing/url-rewrites/118`) as the `id`
  argument; `_id` in the response is the numeric id.

## Fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | ID | The rewrite's IRI |
| `_id` | Int | Numeric id |
| `entityType` | String | `product`, `category`, or `cms_page` |
| `requestPath` | String | Source path the shopper requests |
| `targetPath` | String | Destination path the request redirects to |
| `redirectType` | String | `301` permanent / `302` temporary |
| `locale` | String | Locale code the rewrite applies to |
| `createdAt` | String | Creation timestamp |
| `updatedAt` | String | Last-update timestamp |
