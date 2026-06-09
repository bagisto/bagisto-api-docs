---
outline: false
examples:
  - id: admin-cms-pages-detail
    title: CMS Page Detail
    description: Returns a single CMS page with the full htmlContent body, all translations, and channels. translations and channels are field-selectable connections — query them via edges { node { … } }. The id argument is the IRI from the listing node.
    query: |
      query CmsPage($id: ID!) {
        adminCmsPage(id: $id) {
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
                htmlContent
                metaTitle
                metaKeywords
                metaDescription
              }
            }
          }
        }
      }
    variables: |
      {
        "id": "/api/admin/cms/pages/1"
      }
    response: |
      {
        "data": {
          "adminCmsPage": {
            "id": "/api/admin/cms/pages/1",
            "_id": 1,
            "urlKey": "about-us",
            "pageTitle": "About Us",
            "htmlContent": "<div class=\"static-container\">\r\n<div class=\"mb-5\">We are dedicated to providing high-quality products and services to our customers. Our team is passionate about innovation and customer satisfaction. We believe in transparency, integrity, and building long-term relationships with our users.</div>\r\n</div>",
            "metaTitle": "about us",
            "metaKeywords": "aboutus",
            "metaDescription": "",
            "layout": null,
            "previewUrl": "https://your-domain.com/page/about-us",
            "locale": "en",
            "channel": "default",
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
                    "htmlContent": "<div class=\"static-container\">...</div>",
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
                    "htmlContent": "<div class=\"static-container\">...</div>",
                    "metaTitle": "about us",
                    "metaKeywords": "aboutus",
                    "metaDescription": ""
                  }
                }
              ]
            }
          }
        }
      }
---

# CMS Page — Detail

Equivalent to [`GET /api/admin/cms/pages/{id}`](/api/rest-api/admin/cms/pages-detail).

::: tip
For what CMS Pages are and how multi-locale / multi-channel works, see the [CMS Pages overview](/api/graphql-api/admin/cms/pages/).
:::

## Operation

| Operation | Type |
|-----------|------|
| `adminCmsPage(id: ID!)` | Query |

The `id` argument is the **IRI** (`/api/admin/cms/pages/{id}`) — the same value returned as `node.id` on the [listing](/api/graphql-api/admin/cms/pages/queries/list). A bare numeric ID is not accepted.

## Fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | `ID` | IRI. |
| `_id` | `Int` | Numeric page ID. |
| `urlKey` | `String` | URL slug for the active locale. |
| `pageTitle` | `String` | Title for the active locale. |
| `htmlContent` | `String` | The full page HTML body for the active locale. |
| `metaTitle` / `metaKeywords` / `metaDescription` | `String` | SEO fields. |
| `layout` | `String` | Page layout identifier. |
| `previewUrl` | `String` | Live storefront URL for the page (the "View" action). |
| `locale` / `channel` | `String` | Resolved locale / channel. |
| `channels` | Connection | Every assigned channel — query via `channels { edges { node { … } } }`. |
| `translations` | Connection | Per-locale content — query via `translations { edges { node { … } } }`. |

### `channels` — connection

A field-selectable Relay connection. Each `node` exposes:

| Field | Type | Notes |
|-------|------|-------|
| `id` | `ID` | Channel IRI (e.g. `/api/admin_cms_page_channels/1`). |
| `code` | `String` | Channel code. |
| `name` | `String` | Channel display name. |

### `translations` — connection

A field-selectable Relay connection — one entry per authored locale. Each `node` exposes:

| Field | Type | Notes |
|-------|------|-------|
| `locale` | `String` | Locale code for this translation. |
| `pageTitle` | `String` | Title in this locale. |
| `urlKey` | `String` | URL slug in this locale. |
| `htmlContent` | `String` | The full page body for this locale. |
| `metaTitle` / `metaKeywords` / `metaDescription` | `String` | SEO fields in this locale. |

`translations` returns one entry per authored locale; the `htmlContent` inside a translation is the full body for that locale.

::: tip Field-selectable connections
`channels` and `translations` are **Relay connections**, not opaque JSON. Select them with the `edges { node { … } }` syntax and pick exactly the sub-fields you need. (Over REST these come back as plain JSON arrays.)
:::

## Errors

| Code | Cause |
|------|-------|
| Not found | Page not found. |
