---
outline: false
examples:
  - id: get-cms-pages-basic
    title: Get All CMS Pages
    description: Retrieve all CMS pages with their translation details using cursor-based pagination.
    query: |
      query getCmsPagesDetails {
        pages {
          edges {
            node {
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
              }
            }
          }
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "pages": {
            "edges": [
              {
                "node": {
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
                    "htmlContent": "<div class=\"static-container\"><div class=\"mb-5\">We are dedicated to providing high-quality products and services to our customers...</div></div>",
                    "metaTitle": "about us",
                    "metaDescription": "",
                    "metaKeywords": "aboutus",
                    "locale": "en"
                  }
                }
              },
              {
                "node": {
                  "id": "/api/shop/pages/2",
                  "_id": 2,
                  "layout": null,
                  "createdAt": "2024-04-16T16:14:17+05:30",
                  "updatedAt": "2024-04-16T16:14:17+05:30",
                  "translation": {
                    "id": "/api/shop/page_translations/2",
                    "_id": 2,
                    "pageTitle": "Return Policy",
                    "urlKey": "return-policy",
                    "htmlContent": "<div class=\"static-container\"><div class=\"mb-5\">If you are not satisfied with your purchase, you can return it within 30 days...</div></div>",
                    "metaTitle": "return policy",
                    "metaDescription": "",
                    "metaKeywords": "return, policy",
                    "locale": "en"
                  }
                }
              },
              {
                "node": {
                  "id": "/api/shop/pages/3",
                  "_id": 3,
                  "layout": null,
                  "createdAt": "2024-04-16T16:14:17+05:30",
                  "updatedAt": "2024-04-16T16:14:17+05:30",
                  "translation": {
                    "id": "/api/shop/page_translations/3",
                    "_id": 3,
                    "pageTitle": "Refund Policy",
                    "urlKey": "refund-policy",
                    "htmlContent": "<div class=\"static-container\"><div class=\"mb-5\">We offer a 30-day refund policy on eligible products...</div></div>",
                    "metaTitle": "Refund policy",
                    "metaDescription": "",
                    "metaKeywords": "refund, policy",
                    "locale": "en"
                  }
                }
              },
              {
                "node": {
                  "id": "/api/shop/pages/4",
                  "_id": 4,
                  "layout": null,
                  "createdAt": "2024-04-16T16:14:17+05:30",
                  "updatedAt": "2024-04-16T16:14:17+05:30",
                  "translation": {
                    "id": "/api/shop/page_translations/4",
                    "_id": 4,
                    "pageTitle": "Terms & Conditions",
                    "urlKey": "terms-conditions",
                    "htmlContent": "<div class=\"static-container\"><div class=\"mb-5\">These terms and conditions govern your use of our website...</div></div>",
                    "metaTitle": "Terms & Conditions",
                    "metaDescription": "",
                    "metaKeywords": "term, conditions",
                    "locale": "en"
                  }
                }
              },
              {
                "node": {
                  "id": "/api/shop/pages/5",
                  "_id": 5,
                  "layout": null,
                  "createdAt": "2024-04-16T16:14:17+05:30",
                  "updatedAt": "2024-04-16T16:14:17+05:30",
                  "translation": {
                    "id": "/api/shop/page_translations/5",
                    "_id": 5,
                    "pageTitle": "Terms of use",
                    "urlKey": "terms-of-use",
                    "htmlContent": "<div class=\"static-container\"><div class=\"mb-5\">By accessing this website, you agree to follow our terms and conditions...</div></div>",
                    "metaTitle": "Terms of use",
                    "metaDescription": "",
                    "metaKeywords": "term, use",
                    "locale": "en"
                  }
                }
              },
              {
                "node": {
                  "id": "/api/shop/pages/7",
                  "_id": 7,
                  "layout": null,
                  "createdAt": "2024-04-16T16:14:17+05:30",
                  "updatedAt": "2024-04-16T16:14:17+05:30",
                  "translation": {
                    "id": "/api/shop/page_translations/7",
                    "_id": 7,
                    "pageTitle": "Customer Service",
                    "urlKey": "cutomer-service",
                    "htmlContent": "<div class=\"static-container\"><div class=\"mb-5\">Our customer support team is available 24/7 to assist you...</div></div>",
                    "metaTitle": "Customer Service",
                    "metaDescription": "",
                    "metaKeywords": "customer, service",
                    "locale": "en"
                  }
                }
              },
              {
                "node": {
                  "id": "/api/shop/pages/9",
                  "_id": 9,
                  "layout": null,
                  "createdAt": "2024-04-16T16:14:17+05:30",
                  "updatedAt": "2024-04-16T16:14:17+05:30",
                  "translation": {
                    "id": "/api/shop/page_translations/9",
                    "_id": 9,
                    "pageTitle": "Payment Policy",
                    "urlKey": "payment-policy",
                    "htmlContent": "<div class=\"static-container\"><div class=\"mb-5\">We accept multiple payment methods including credit/debit cards, digital wallets, and net banking...</div></div>",
                    "metaTitle": "Payment Policy",
                    "metaDescription": "",
                    "metaKeywords": "payment, policy",
                    "locale": "en"
                  }
                }
              },
              {
                "node": {
                  "id": "/api/shop/pages/10",
                  "_id": 10,
                  "layout": null,
                  "createdAt": "2024-04-16T16:14:17+05:30",
                  "updatedAt": "2024-04-16T16:14:17+05:30",
                  "translation": {
                    "id": "/api/shop/page_translations/10",
                    "_id": 10,
                    "pageTitle": "Shipping Policy",
                    "urlKey": "shipping-policy",
                    "htmlContent": "<div class=\"static-container\"><div class=\"mb-5\">We offer fast and reliable shipping worldwide. Orders are processed within 1-2 business days...</div></div>",
                    "metaTitle": "Shipping Policy",
                    "metaDescription": "",
                    "metaKeywords": "shipping, policy",
                    "locale": "en"
                  }
                }
              }
            ]
          }
        }
      }
    commonErrors:
      - error: UNAUTHENTICATED
        cause: Request is missing a valid authentication token
        solution: Include a valid Bearer token in the Authorization header
      - error: INTERNAL_SERVER_ERROR
        cause: Unexpected server-side error
        solution: Check server logs; retry the request or contact support

---

# CMS Pages

## About

The `pages` query retrieves a collection of all CMS (Content Management System) pages from your Bagisto store. Use this query to:

- List all static content pages (e.g. About Us, Privacy Policy, FAQ)
- Render CMS page listings in the storefront footer or navigation
- Build a sitemap of all content pages
- Access locale-specific page titles, slugs, and HTML content
- Retrieve SEO metadata (meta title, description, keywords) for each page
- Support multi-language storefronts with locale-aware translation data

This query returns all pages with their active locale translation. Use the `page(id:)` query to fetch a single page by ID.

> **Note:** The `translation` field returns content for the locale specified in the request header. If a translation does not exist for the selected locale, the content will automatically fall back to the store's default language.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `first` | `Int` | ❌ No | Number of results to return (forward pagination). |
| `after` | `String` | ❌ No | Cursor for forward pagination. Use with `first`. |
| `last` | `Int` | ❌ No | Number of results for backward pagination. |
| `before` | `String` | ❌ No | Cursor for backward pagination. Use with `last`. |

## Possible Returns

### Page Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | IRI-style unique identifier (e.g. `/api/shop/pages/1`). |
| `_id` | `Int!` | Numeric database ID. |
| `layout` | `String` | Page layout template name (e.g. `default`). |
| `createdAt` | `DateTime!` | Timestamp when the page was created. |
| `updatedAt` | `DateTime!` | Timestamp when the page was last updated. |
| `translation` | `PageTranslation` | Active locale translation for this page. |

### PageTranslation Fields

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
| `locale` | `String!` | Locale code for this translation (e.g. `en`, `fr`). |

## Use Cases

### 1. Footer Navigation Links
Fetch all CMS pages and use `urlKey` and `pageTitle` to build footer navigation links dynamically.

### 2. CMS Page Sitemap
Retrieve all pages to generate a sitemap or page index for SEO crawlers.

### 3. Legal Pages Listing
Filter the result client-side to display legal pages such as Privacy Policy and Terms & Conditions.

### 4. Multi-language Storefront
Use the `locale` field in `translation` to display locale-aware page titles and content.

### 5. Admin Content Overview
List all CMS pages in an admin dashboard for quick access and management.

## Best Practices

1. **Use `urlKey` for routing** — Build page URLs using `urlKey` rather than the numeric `_id` for human-readable and SEO-friendly URLs
2. **Cache responses** — CMS pages change infrequently; cache the response at the CDN or application level to reduce API calls
3. **Sanitize `htmlContent`** — Always sanitize the `htmlContent` field before rendering to prevent XSS vulnerabilities
4. **Use translations** — Always read content from the `translation` object to ensure locale-aware display
5. **Paginate for large stores** — Even though CMS pages are typically few, use `first` to limit payload size

## Related Resources

- [Get Single CMS Page](/api/graphql-api/shop/queries/get-page) - Query a single page by ID
- [Sections](/api/graphql-api/shop/sections/list) - Query the storefront sections a channel draws
- [Pagination Guide](/api/graphql-api/pagination) - Cursor pagination documentation
- [Shop API Overview](/api/graphql-api/shop-api) - Overview of Shop API resources
