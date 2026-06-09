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

::: tip
For what CMS Pages are, how multi-locale / multi-channel works, and the `previewUrl` / `htmlContent` semantics, see the [CMS Pages overview](/api/graphql-api/admin/cms/pages/).
:::

## Operation

| Operation | Type |
|-----------|------|
| `adminCmsPages` | Query (cursor) |

## Arguments

| Arg | Type | Notes |
|-----|------|-------|
| `first`, `after` | cursor pagination | Page size + cursor from a previous `pageInfo.endCursor`. |
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
| `createdAt` / `updatedAt` | `String` | ISO 8601. |

::: tip Field-selectable connections on the listing
`translations` and `channels` are **Relay connections** on the listing too — select them with `edges { node { … } }` and pick exactly the sub-fields you need. (Over REST they come back as plain JSON arrays.) Every scalar field above resolves over GraphQL — none come back `null` for transport reasons.
:::
