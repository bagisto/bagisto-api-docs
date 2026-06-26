---
outline: false
examples:
  - id: list
    title: List URL Rewrites
    description: Cursor-paginated list of every URL rewrite.
    query: |
      query AdminMarketingUrlRewrites($first: Int) {
        adminMarketingUrlRewrites(first: $first) {
          totalCount
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            cursor
            node {
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
      }
    variables: |
      {
        "first": 10
      }
    response: |
      {
        "data": {
          "adminMarketingUrlRewrites": {
            "totalCount": 24,
            "pageInfo": {
              "hasNextPage": true,
              "hasPreviousPage": false,
              "startCursor": "MA==",
              "endCursor": "OQ=="
            },
            "edges": [
              {
                "cursor": "MA==",
                "node": {
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
            ]
          }
        }
      }
  - id: list-filtered
    title: List URL Rewrites (filtered)
    description: Filter by entity type, request path, redirect type, and locale, sorted by redirect type.
    query: |
      query AdminMarketingUrlRewrites(
        $first: Int
        $entityType: String
        $requestPath: String
        $redirectType: String
        $locale: String
        $sort: String
        $order: String
      ) {
        adminMarketingUrlRewrites(
          first: $first
          entityType: $entityType
          requestPath: $requestPath
          redirectType: $redirectType
          locale: $locale
          sort: $sort
          order: $order
        ) {
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              _id
              entityType
              requestPath
              targetPath
              redirectType
              locale
              createdAt
            }
          }
        }
      }
    variables: |
      {
        "first": 10,
        "entityType": "cms_page",
        "requestPath": "cms",
        "redirectType": "301",
        "locale": "en",
        "sort": "redirect_type",
        "order": "asc"
      }
    response: |
      {
        "data": {
          "adminMarketingUrlRewrites": {
            "totalCount": 1,
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "MA=="
            },
            "edges": [
              {
                "node": {
                  "id": "/api/admin/marketing/url-rewrites/118",
                  "_id": 118,
                  "entityType": "cms_page",
                  "requestPath": "cms-test",
                  "targetPath": "testing",
                  "redirectType": "301",
                  "locale": "en",
                  "createdAt": "2026-06-23T12:32:58+05:30"
                }
              }
            ]
          }
        }
      }
---

# List URL Rewrites

Lists every URL rewrite in the store — the data behind the admin **Marketing →
Search & SEO → URL Rewrites** datagrid.

::: tip
New here? Read the [URL Rewrites overview](/api/graphql-api/admin/marketing/search-seo/url-rewrites/) for what a URL rewrite does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminMarketingUrlRewrites` | Query | Cursor-paginated list of all URL rewrites |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- **Cursor pagination** — pass `first` for the page size and `after` (the
  `endCursor` from the previous page) to advance. `totalCount` is the grand total.
- Each `node` carries the full flat field set shown in the example. There are no
  detail-only relation fields, so list rows and the
  [detail](/api/graphql-api/admin/marketing/search-seo/url-rewrites-detail) query
  resolve the same fields.

## Filtering

Pass any of these arguments alongside `first` / `after` (they mirror the admin
datagrid filters):

| Argument | Description |
|----------|-------------|
| `entityType` | `product` / `category` / `cms_page` |
| `requestPath` | Source path — partial match |
| `redirectType` | `301` (permanent) / `302` (temporary) |
| `locale` | Locale code (e.g. `en`) |
| `sort`, `order` | Sort field (`id`, `entity_type`, `locale`, `redirect_type`) + `asc` / `desc` (default `id desc`) |
