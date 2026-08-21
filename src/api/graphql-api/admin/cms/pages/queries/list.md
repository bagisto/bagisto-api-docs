---
outline: false
examples:
  - id: admin-cms-pages-list
    title: List CMS Pages
    description: Cursor-paginated CMS pages listing. translations and channels are field-selectable connections — query them via edges { node { … } }.
    query: |
      query CmsPages($first: Int, $after: String, $page_title: String, $sort: String, $order: String) {
        adminCmsPages(first: $first, after: $after, page_title: $page_title, sort: $sort, order: $order) {
          edges {
            cursor
            node {
              id
              _id
              urlKey
              pageTitle
              htmlContent
              metaTitle
              metaKeywords
              metaDescription
              layout
              previewUrl
              locale
              channel
              createdAt
              updatedAt
              channels {
                edges {
                  node {
                    id
                    code
                    name
                  }
                }
              }
              translations {
                edges {
                  node {
                    locale
                    pageTitle
                    urlKey
                    metaTitle
                    metaKeywords
                    metaDescription
                  }
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 1,
        "sort": "id",
        "order": "asc"
      }
    response: |
      {
        "data": {
          "adminCmsPages": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/cms/pages/1",
                  "_id": 1,
                  "urlKey": "about-us",
                  "pageTitle": "About Us",
                  "htmlContent": "<div class=\"static-container\">\r\n<div class=\"mb-5\">We are dedicated to providing high-quality products and services to our customers...</div>\r\n</div>",
                  "metaTitle": "about us",
                  "metaKeywords": "aboutus",
                  "metaDescription": "",
                  "layout": null,
                  "previewUrl": "https://your-domain.com/page/about-us",
                  "locale": "en",
                  "channel": "default",
                  "createdAt": "2024-04-16T21:44:17+05:30",
                  "updatedAt": "2024-04-16T21:44:17+05:30",
                  "channels": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/admin_cms_page_channels/1",
                          "code": "default",
                          "name": "Default"
                        }
                      }
                    ]
                  },
                  "translations": {
                    "edges": [
                      {
                        "node": {
                          "locale": "ar",
                          "pageTitle": "معلومات عنا",
                          "urlKey": "about-us",
                          "metaTitle": "معلومات عنا",
                          "metaKeywords": "معلومات عنا",
                          "metaDescription": "معلومات عنا"
                        }
                      },
                      {
                        "node": {
                          "locale": "en",
                          "pageTitle": "About Us",
                          "urlKey": "about-us",
                          "metaTitle": "about us",
                          "metaKeywords": "aboutus",
                          "metaDescription": ""
                        }
                      }
                    ]
                  }
                }
              }
            ],
            "pageInfo": { "hasNextPage": true, "endCursor": "MA==" },
            "totalCount": 13
          }
        }
      }
---

# CMS Pages — List

Equivalent to [`GET /api/admin/cms/pages`](/api/rest-api/admin/cms/pages-list). Cursor pagination via `first` / `after`.

For what CMS Pages are, how multi-locale and multi-channel work, and the `previewUrl` and `htmlContent` semantics, see the [CMS Pages overview](/api/graphql-api/admin/cms/pages/).

## Operation

| Operation | Type |
|-----------|------|
| `adminCmsPages` | Query (cursor) |

## Arguments

| Arg | Type | Notes |
|-----|------|-------|
| `first` | `Int` | Page size, default `10`, capped at `50`. |
| `after` | `String` | Cursor from a previous `pageInfo.endCursor`. |
| `last` | `Int` | Page size when paging backwards. |
| `before` | `String` | Cursor from a previous `pageInfo.startCursor`. |
| `id` | `Int` | Filter by ID. |
| `page_title` | `String` | Partial title match. |
| `url_key` | `String` | Partial url_key match. |
| `channel` | `Int` | Filter by channel ID. |
| `locale` | `String` | Locale for translation resolution. |
| `sort` | `String` | `id`, `page_title`, `url_key`, `created_at`. |
| `order` | `String` | `asc` or `desc`. |

## Node fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | `ID` | IRI (`/api/admin/cms/pages/{id}`). |
| `_id` | `Int` | Numeric page ID. |
| `urlKey` | `String` | Storefront URL slug. |
| `pageTitle` | `String` | Title for the active locale. |
| `htmlContent` | `String` | The full page HTML body for the active locale. |
| `metaTitle` / `metaKeywords` / `metaDescription` | `String` | SEO fields. |
| `layout` | `String` | Page layout identifier. |
| `previewUrl` | `String` | Live storefront URL for the page (the "View" action). |
| `locale` | `String` | Resolved locale code. |
| `channel` | `String` | Resolved channel code. |
| `channels` | Connection | Every assigned channel — query via `channels { edges { node { … } } }` (node: `id`, `code`, `name`). |
| `translations` | Connection | Per-locale content — query via `translations { edges { node { … } } }` (node: `locale`, `pageTitle`, `urlKey`, `htmlContent`, `metaTitle`, `metaKeywords`, `metaDescription`). |
| `createdAt` / `updatedAt` | `String` | ISO 8601 with offset. |
| `message` | `String` | Always `null` on a read. It carries the confirmation text on a delete result only. |

### Connections Resolve on the Listing Too

`translations` and `channels` are Relay connections here, not just on the detail query — select them with `edges { node { … } }` and take only the sub-fields you need. Over REST the same data arrives as plain JSON arrays, so the two transports are not shape-compatible.

Both nested node types carry a **routeless `id`** — `/api/admin_cms_page_translations/<id>` and `/api/admin_cms_page_channels/<id>`. Neither is a queryable path; read `_id` instead. Only the page's own `id` (`/api/admin/cms/pages/<id>`) can be followed.

Filters combine with AND. Note `page_title` and `url_key` are snake_case while the fields they match are camelCase, and `channel` filters by numeric channel **id** even though the `channel` field returns a code string.
