---
outline: false
examples:
  - id: create
    title: Create URL Rewrite
    description: Create a 301 redirect from an old path to a target path for a CMS page.
    query: |
      mutation CreateAdminMarketingUrlRewrite(
        $input: createAdminMarketingUrlRewriteInput!
      ) {
        createAdminMarketingUrlRewrite(input: $input) {
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
          "entityType": "cms_page",
          "requestPath": "cms-test",
          "targetPath": "testing",
          "redirectType": "301",
          "locale": "en"
        }
      }
    response: |
      {
        "data": {
          "createAdminMarketingUrlRewrite": {
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
      }
---

# Create URL Rewrite

Creates a URL rewrite — the **Create** action on the admin **Marketing →
Search & SEO → URL Rewrites** screen.

::: tip
New here? Read the [URL Rewrites overview](/api/graphql-api/admin/marketing/search-seo/url-rewrites/) for what a URL rewrite does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminMarketingUrlRewrite` | Mutation | Create a URL rewrite |

## Details

- Requires an admin Bearer token and the `marketing.search_seo.url_rewrites.create`
  permission.
- The mutation returns the full rewrite payload.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `entityType` | String | Yes | `product`, `category`, or `cms_page` |
| `requestPath` | String | Yes | Source path the shopper requests |
| `targetPath` | String | Yes | Destination path the request redirects to |
| `redirectType` | String | Yes | `301` permanent / `302` temporary |
| `locale` | String | Yes | Locale code; must exist in the store's locales |
