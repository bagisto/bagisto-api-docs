---
outline: false
examples:
  - id: get-cms-page-by-id
    title: Get Single CMS Page
    description: Retrieve a single CMS page by its ID, including the resolved-locale translation and every stored translation.
    query: |
      query getCmsPageDetail {
        page(id: "/api/shop/pages/1") {
          id
          _id
          layout
          createdAt
          updatedAt
          translation {
            id
            _id
            pageTitle
            urlKey
            htmlContent
            metaTitle
            metaDescription
            metaKeywords
            locale
            cmsPageId
          }
          translations(first: 10) {
            edges {
              node {
                _id
                locale
                pageTitle
                urlKey
              }
              cursor
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
            totalCount
          }
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "page": {
            "id": "/api/shop/pages/1",
            "_id": 1,
            "layout": null,
            "createdAt": "2024-04-16T16:14:17+05:30",
            "updatedAt": "2024-04-16T16:14:17+05:30",
            "translation": {
              "id": "/api/shop/page_translations/1",
              "_id": 1,
              "pageTitle": "About Us",
              "urlKey": "about-us",
              "htmlContent": "<div class=\"static-container\">\r\n<div class=\"mb-5\">We are dedicated to providing high-quality products and services to our customers. Our team is passionate about innovation and customer satisfaction. We believe in transparency, integrity, and building long-term relationships with our users.</div>\r\n</div>",
              "metaTitle": "about us",
              "metaDescription": "",
              "metaKeywords": "aboutus",
              "locale": "en",
              "cmsPageId": "1"
            },
            "translations": {
              "edges": [
                {
                  "node": {
                    "_id": 42,
                    "locale": "AR",
                    "pageTitle": "\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0639\u0646\u0627",
                    "urlKey": "about-us"
                  },
                  "cursor": "MA=="
                },
                {
                  "node": {
                    "_id": 1,
                    "locale": "en",
                    "pageTitle": "About Us",
                    "urlKey": "about-us"
                  },
                  "cursor": "MQ=="
                }
              ],
              "pageInfo": {
                "hasNextPage": false,
                "hasPreviousPage": false,
                "startCursor": "MA==",
                "endCursor": "MQ=="
              },
              "totalCount": 2
            }
          }
        }
      }
  - id: get-cms-page-by-numeric-id
    title: Get Single CMS Page by Numeric ID
    description: The same query addressed with a plain numeric ID instead of the IRI form.
    query: |
      query getCmsPageByNumericId {
        page(id: "1") {
          id
          _id
          layout
          createdAt
          updatedAt
          translation {
            id
            _id
            pageTitle
            urlKey
            htmlContent
            metaTitle
            metaDescription
            metaKeywords
            locale
            cmsPageId
          }
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "page": {
            "id": "/api/shop/pages/1",
            "_id": 1,
            "layout": null,
            "createdAt": "2024-04-16T16:14:17+05:30",
            "updatedAt": "2024-04-16T16:14:17+05:30",
            "translation": {
              "id": "/api/shop/page_translations/1",
              "_id": 1,
              "pageTitle": "About Us",
              "urlKey": "about-us",
              "htmlContent": "<div class=\"static-container\">\r\n<div class=\"mb-5\">We are dedicated to providing high-quality products and services to our customers. Our team is passionate about innovation and customer satisfaction. We believe in transparency, integrity, and building long-term relationships with our users.</div>\r\n</div>",
              "metaTitle": "about us",
              "metaDescription": "",
              "metaKeywords": "aboutus",
              "locale": "en",
              "cmsPageId": "1"
            }
          }
        }
      }
    commonErrors:
      - error: Page not found
        cause: No CMS page exists for the supplied ID
        solution: List the available pages with the pages query first; the response carries `data.page` as `null` alongside an entry in `errors`
      - error: Invalid ID format
        cause: The ID is neither an IRI (`/api/shop/pages/1`) nor a numeric ID
        solution: Pass either form — `"/api/shop/pages/1"` or `"1"`
      - error: Missing storefront key
        cause: The request did not carry the storefront key header
        solution: Send `X-STOREFRONT-KEY` with every storefront GraphQL request

---

# Single CMS Page

## About

The `page(id:)` query retrieves a single CMS (Content Management System) page. Use this query to:

- Render a specific CMS page (e.g. About Us, Privacy Policy) in the storefront
- Retrieve the full HTML content of a page for display
- Access SEO metadata (meta title, description, keywords) for a specific page
- Fetch locale-specific translation data for a page
- Build dynamic page routes using `urlKey`
- Validate whether a page exists before rendering

The query returns the page with `translation` — the single translation for the resolved locale — and `translations`, a cursor-paginated connection of every stored translation for that page. Use the `pages` query to list all available pages.

The `id` argument accepts both the IRI form (`/api/shop/pages/1`) and a plain numeric ID (`1`); both resolve to the same page.

## Locale Handling

The locale is resolved per request, in this order:

1. The `X-Locale` header, when the supplied code is one of the locales enabled on the current channel.
2. The channel's default locale, when `X-Locale` is absent or names a locale the channel does not have enabled.

The two translation fields then behave as follows:

- **Resolved locale** — `translation` carries the record for the locale resolved above.
- **Fallback** — when the page has no translation for that locale, `translation` falls back to the application's fallback locale (`en` by default). If neither exists, `translation` is `null`.
- **Reported locale** — the `locale` field inside `translation` always states which locale the returned content actually came from.
- **All languages** — `translations` is unaffected by the request locale. It returns every stored translation, so a client can cache all languages of a page in one call.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `ID!` | ✅ Yes | Identifier of the page — IRI form (`/api/shop/pages/1`) or numeric (`1`). |

## Possible Returns

### Page Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | IRI-style unique identifier (e.g. `/api/shop/pages/1`). |
| `_id` | `Int!` | Numeric database ID. |
| `layout` | `String` | Page layout template name. `null` when no layout is assigned. |
| `createdAt` | `String` | ISO 8601 timestamp of when the page was created. |
| `updatedAt` | `String` | ISO 8601 timestamp of when the page was last updated. |
| `translation` | `PageTranslation` | Translation for the resolved locale. `null` when the page has no translation at all. |
| `translations` | `PageTranslationCursorConnection` | Cursor connection over every stored translation for this page. |

### PageTranslation Fields

Returned by `translation` and by each `translations` edge node.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | IRI-style ID of the translation record. |
| `_id` | `Int!` | Numeric translation record ID. |
| `pageTitle` | `String!` | Display title of the CMS page. |
| `urlKey` | `String!` | URL slug used to access the page (e.g. `about-us`). |
| `htmlContent` | `String` | Full HTML body content of the page. |
| `metaTitle` | `String` | SEO meta title tag. |
| `metaDescription` | `String` | SEO meta description tag. |
| `metaKeywords` | `String` | SEO meta keywords. |
| `locale` | `String!` | Locale code this translation belongs to (e.g. `en`, `fr`). |
| `cmsPageId` | `String!` | ID of the page this translation belongs to. |

### Translations Connection Fields

| Field | Type | Description |
|-------|------|-------------|
| `edges[].node` | `PageTranslation` | A single translation record — fields as above. |
| `edges[].cursor` | `String!` | Cursor for this edge, used as `after` on the next request. |
| `pageInfo.hasNextPage` | `Boolean!` | Whether more translations follow the current slice. |
| `pageInfo.hasPreviousPage` | `Boolean!` | Whether translations precede the current slice. |
| `pageInfo.startCursor` | `String` | Cursor of the first edge in the slice. |
| `pageInfo.endCursor` | `String` | Cursor of the last edge in the slice. |
| `totalCount` | `Int` | Total translations stored for this page. |

## Use Cases

### 1. Render a CMS Page
Fetch a specific page by ID and render its `htmlContent` on a dedicated page route in the storefront.

### 2. SEO Head Tags
Use `metaTitle`, `metaDescription`, and `metaKeywords` from the translation to populate `<meta>` tags dynamically.

### 3. Page Validation
Query a page before rendering to check whether it exists; handle a `null` page with a 404 page.

### 4. Multi-language Content
Send `X-Locale` to fetch a specific language, or read the whole `translations` connection to build a language switcher without one request per locale.

### 5. Dynamic Page Routing
Use `urlKey` to implement client-side routing so users access pages via human-readable URLs (e.g. `/about-us`).

## Best Practices

1. **Send the storefront key** — every storefront GraphQL request needs the `X-STOREFRONT-KEY` header; without it the request is rejected before the query runs
2. **Pick one ID form and keep it** — both the IRI (`/api/shop/pages/1`) and the numeric (`1`) form work; the IRI form matches what `id` returns, so round-tripping a response value needs no conversion
3. **Check `data.page` and `errors` together** — an unknown or malformed ID returns `data.page` as `null` with an entry in `errors`; treat that as a 404 rather than an outage
4. **Read `translation.locale`** — it reports the locale the content actually came from, which differs from the requested one whenever the fallback applies
5. **Sanitize `htmlContent`** — the field is raw HTML authored in the admin panel; sanitize it before injecting into the DOM
6. **Cache per page and locale** — cache keyed by page ID alone will serve the wrong language once a second locale is enabled
7. **Fetch only needed fields** — omit `htmlContent` and `translations` when only the title and URL are needed; both grow the response several times over, and `htmlContent` carries a full HTML body
8. **Use `urlKey` for links** — build storefront URLs from `urlKey` for SEO-friendly, human-readable routes

## Related Resources

- [Get All CMS Pages](/api/graphql-api/shop/queries/get-pages) - Query all CMS pages
- [Theme Customisations](/api/graphql-api/shop/queries/theme-customisations) - Query storefront theme customisations
- [Pagination Guide](/api/graphql-api/pagination) - Cursor pagination documentation
- [Shop API Overview](/api/graphql-api/shop-api) - Overview of Shop API resources
