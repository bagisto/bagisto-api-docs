---
outline: false
examples:
  - id: admin-cms-pages-list
    title: List CMS Pages
    description: Cursor-paginated CMS pages listing. Mirrors REST GET /api/admin/cms/pages.
    query: |
      query CmsPages($first: Int, $after: String, $page_title: String, $sort: String, $order: String) {
        adminCmsPages(first: $first, after: $after, page_title: $page_title, sort: $sort, order: $order) {
          edges {
            cursor
            node { id _id urlKey pageTitle channel locale createdAt }
          }
          pageInfo { hasNextPage endCursor }
          totalCount
        }
      }
    variables: |
      {
        "first": 10,
        "sort": "id",
        "order": "desc"
      }
    response: |
      {
        "data": {
          "adminCmsPages": {
            "edges": [
              {
                "cursor": "MA==",
                "node": { "id": "/api/admin/cms_pages/7", "_id": 7, "urlKey": "about-us", "pageTitle": "About Us", "channel": "default", "locale": "en", "createdAt": "2026-01-12T08:15:00+00:00" }
              }
            ],
            "pageInfo": { "hasNextPage": true, "endCursor": "MA==" },
            "totalCount": 24
          }
        }
      }
---

# CMS Pages — List

Equivalent to [`GET /api/admin/cms/pages`](/api/rest-api/admin/cms/pages-list).

## Operation

| Operation | Type |
|-----------|------|
| `adminCmsPages` | Query (cursor) |

## Arguments

| Arg | Type | Notes |
|-----|------|-------|
| `first`, `after` | cursor pagination | |
| `id` | `Int` | Filter by ID. |
| `page_title` | `String` | Partial title match. |
| `url_key` | `String` | Partial url_key match. |
| `channel` | `Int` | Filter by channel ID. |
| `locale` | `String` | Locale for translation resolution. |
| `sort` | `String` | `id`, `page_title`, `url_key`, `created_at`. |
| `order` | `String` | `asc` or `desc`. |
