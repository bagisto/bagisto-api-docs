---
outline: false
examples:
  - id: get-theme-customizations-basic
    title: Get Theme Customizations - Basic
    description: Retrieve theme customizations with basic fields and pagination.
    query: |
      query themeCustomizations($first: Int, $after: String) {
        themeCustomizations(first: $first, after: $after) {
          edges {
            node {
              id
              _id
              type
              name
              status
              themeCode
              sortOrder
              translation {
                locale
                options
              }
            }
            cursor
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
        "first": 5,
        "after": null
      }
    response: |
      {
        "data": {
          "themeCustomizations": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/theme-customizations/1",
                  "_id": 1,
                  "type": "image_carousel",
                  "name": "Image Carousel",
                  "status": "1",
                  "themeCode": "default",
                  "sortOrder": 1,
                  "translation": {
                    "locale": "en",
                    "options": "{\"images\": [{\"link\": \"fashion\", \"image\": \"storage/theme/1/ATTrUoI1AN2s8mR7KdlxfmGPG1eeFV0uwdIPn9fb.webp\", \"title\": \"Fashion\"}, {\"link\": \"furniture\", \"image\": \"storage/theme/1/CoizBehgRZ4vqmV1gw88HiJWnx16BVorCpRxaBSb.webp\", \"title\": \"Furniture\"}, {\"link\": \"electronics\", \"image\": \"storage/theme/1/HRIEAfZ4vTc0hrW5G5L1tK3vzmwBXgZR781tjEwU.webp\", \"title\": \"Electronics\"}]}"
                  }
                },
                "cursor": "MA=="
              },
              {
                "node": {
                  "id": "/api/shop/theme-customizations/3",
                  "_id": 3,
                  "type": "category_carousel",
                  "name": "Categories Collections",
                  "status": "1",
                  "themeCode": "default",
                  "sortOrder": 3,
                  "translation": {
                    "locale": "en",
                    "options": "{\"filters\": {\"sort\": \"asc\", \"limit\": \"10\", \"parent_id\": \"1\"}}"
                  }
                },
                "cursor": "MQ=="
              },
              {
                "node": {
                  "id": "/api/shop/theme-customizations/4",
                  "_id": 4,
                  "type": "product_carousel",
                  "name": "New Products",
                  "status": "1",
                  "themeCode": "default",
                  "sortOrder": 4,
                  "translation": {
                    "locale": "en",
                    "options": "{\"title\": \"New Products\", \"filters\": {\"new\": 1, \"sort\": \"asc\", \"limit\": 10}}"
                  }
                },
                "cursor": "Mg=="
              },
              {
                "node": {
                  "id": "/api/shop/theme-customizations/5",
                  "_id": 5,
                  "type": "static_content",
                  "name": "Top Collections",
                  "status": "1",
                  "themeCode": "default",
                  "sortOrder": 5,
                  "translation": {
                    "locale": "en",
                    "options": "{\"css\": \"...\", \"html\": \"<div class=\\\"top-collection-container\\\">...</div>\"}"
                  }
                },
                "cursor": "Mw=="
              },
              {
                "node": {
                  "id": "/api/shop/theme-customizations/6",
                  "_id": 6,
                  "type": "static_content",
                  "name": "Bold Collections",
                  "status": "1",
                  "themeCode": "default",
                  "sortOrder": 6,
                  "translation": {
                    "locale": "en",
                    "options": "{\"css\": \"...\", \"html\": \"<div class=\\\"container section-gap\\\">...</div>\"}"
                  }
                },
                "cursor": "NA=="
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "endCursor": "NA=="
            },
            "totalCount": 12
          }
        }
      }
    commonErrors:
      - error: invalid-pagination
        cause: Invalid pagination arguments
        solution: Use valid first/after or last/before combinations with max value 100

  - id: get-theme-customizations-with-type-filter
    title: Get Theme Customizations - Filtered by Type
    description: Retrieve theme customizations filtered by a specific type with translations.
    query: |
      query themeCustomizations($type: String) {
        themeCustomizations(type: $type) {
          edges {
            node {
              id
              _id
              type
              name
              status
              themeCode
              sortOrder
              translation {
                id
                _id
                themeCustomizationId
                locale
                options
              }
              translations {
                edges {
                  node {
                    id
                    _id
                    themeCustomizationId
                    locale
                    options
                  }
                  cursor
                }
                pageInfo {
                  endCursor
                  startCursor
                  hasNextPage
                  hasPreviousPage
                }
                totalCount
              }
            }
            cursor
          }
          pageInfo {
            endCursor
            startCursor
            hasNextPage
            hasPreviousPage
          }
          totalCount
        }
      }
    variables: |
      {
        "type": "footer_links"
      }
    response: |
      {
        "data": {
          "themeCustomizations": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/theme-customizations/11",
                  "_id": 11,
                  "type": "footer_links",
                  "name": "Footer Links",
                  "status": "1",
                  "themeCode": "default",
                  "sortOrder": 11,
                  "translation": {
                    "id": "/api/shop/theme_customization_translations/11",
                    "_id": 11,
                    "themeCustomizationId": "11",
                    "locale": "en",
                    "options": "{\"column_1\": [{\"url\": \"https://api-demo.bagisto.com/page/privacy-policy\", \"title\": \"Privacy policy\", \"sort_order\": \"3\"}, {\"url\": \"https://api-demo.bagisto.com/page/whats-new\", \"title\": \"What's New\", \"sort_order\": \"3\"}, {\"url\": \"https://api-demo.bagisto.com/page/shipping-policy\", \"title\": \"Shipping\", \"sort_order\": \"4\"}], \"column_2\": [{\"url\": \"https://api-demo.bagisto.com/page/about\", \"title\": \"About Us\", \"sort_order\": \"1\"}, {\"url\": \"https://api-demo.bagisto.com/page/cutomer-service\", \"title\": \"Customer Service\", \"sort_order\": \"5\"}]}"
                  },
                  "translations": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/theme_customization_translations/11",
                          "_id": 11,
                          "themeCustomizationId": "11",
                          "locale": "en",
                          "options": "{\"column_1\": [{\"url\": \"https://api-demo.bagisto.com/page/privacy-policy\", \"title\": \"Privacy policy\", \"sort_order\": \"3\"}, {\"url\": \"https://api-demo.bagisto.com/page/whats-new\", \"title\": \"What's New\", \"sort_order\": \"3\"}, {\"url\": \"https://api-demo.bagisto.com/page/shipping-policy\", \"title\": \"Shipping\", \"sort_order\": \"4\"}], \"column_2\": [{\"url\": \"https://api-demo.bagisto.com/page/about\", \"title\": \"About Us\", \"sort_order\": \"1\"}, {\"url\": \"https://api-demo.bagisto.com/page/cutomer-service\", \"title\": \"Customer Service\", \"sort_order\": \"5\"}]}"
                        },
                        "cursor": "MA=="
                      },
                      {
                        "node": {
                          "id": "/api/shop/theme_customization_translations/21",
                          "_id": 21,
                          "themeCustomizationId": "11",
                          "locale": "AR",
                          "options": "{\"column_1\": [{\"url\": \"https://api-demo.bagisto.com/page/privacy-policy\", \"title\": \"سياسة الخصوصية\", \"sort_order\": \"3\"}, {\"url\": \"https://api-demo.bagisto.com/page/whats-new\", \"title\": \"ما الجديد\", \"sort_order\": \"3\"}, {\"url\": \"https://api-demo.bagisto.com/page/shipping-policy\", \"title\": \"سياسة الشحن\", \"sort_order\": \"4\"}], \"column_2\": [{\"url\": \"https://api-demo.bagisto.com/page/about\", \"title\": \"من نحن\", \"sort_order\": \"1\"}, {\"url\": \"https://api-demo.bagisto.com/page/cutomer-service\", \"title\": \"خدمة العملاء\", \"sort_order\": \"5\"}]}"
                        },
                        "cursor": "MQ=="
                      }
                    ],
                    "pageInfo": {
                      "endCursor": "MQ==",
                      "startCursor": "MA==",
                      "hasNextPage": false,
                      "hasPreviousPage": false
                    },
                    "totalCount": 2
                  }
                },
                "cursor": "MA=="
              }
            ],
            "pageInfo": {
              "endCursor": "MA==",
              "startCursor": "MA==",
              "hasNextPage": false,
              "hasPreviousPage": false
            },
            "totalCount": 1
          }
        }
      }
    commonErrors:
      - error: invalid-pagination
        cause: Invalid pagination arguments
        solution: Use valid first/after or last/before combinations with max value 100
      - error: invalid-type-filter
        cause: Invalid type filter value
        solution: Use valid type values like footer_links, image_carousel, product_carousel, etc.

  - id: get-theme-customizations-complete
    title: Get Theme Customizations - Complete Details
    description: Retrieve all theme customizations with complete fields including timestamps and all translations.
    query: |
      query themeCustomizations($first: Int, $after: String, $last: Int, $before: String, $type: String) {
        themeCustomizations(first: $first, after: $after, last: $last, before: $before, type: $type) {
          edges {
            node {
              id
              _id
              themeCode
              type
              name
              sortOrder
              status
              channelId
              createdAt
              updatedAt
              translation {
                id
                _id
                themeCustomizationId
                locale
                options
              }
              translations {
                edges {
                  cursor
                  node {
                    id
                    _id
                    themeCustomizationId
                    locale
                    options
                  }
                }
                pageInfo {
                  endCursor
                  startCursor
                  hasNextPage
                  hasPreviousPage
                }
                totalCount
              }
            }
            cursor
          }
          pageInfo {
            endCursor
            startCursor
            hasNextPage
            hasPreviousPage
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 2,
        "after": null,
        "type": "static_content"
      }
    response: |
      {
        "data": {
          "themeCustomizations": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/theme-customizations/5",
                  "_id": 5,
                  "themeCode": "default",
                  "type": "static_content",
                  "name": "Top Collections",
                  "sortOrder": 5,
                  "status": "1",
                  "channelId": "1",
                  "createdAt": "2024-04-16T16:14:15+05:30",
                  "updatedAt": "2026-04-07T12:02:47+05:30",
                  "translation": {
                    "id": "/api/shop/theme_customization_translations/5",
                    "_id": 5,
                    "themeCustomizationId": "5",
                    "locale": "en",
                    "options": "{\"css\": \".top-collection-header {...}\", \"html\": \"<div class=\\\"top-collection-container\\\"><div class=\\\"top-collection-header\\\"><h2>The game with our new additions!</h2></div>...</div>\"}"
                  },
                  "translations": {
                    "edges": [
                      {
                        "cursor": "MA==",
                        "node": {
                          "id": "/api/shop/theme_customization_translations/5",
                          "_id": 5,
                          "themeCustomizationId": "5",
                          "locale": "en",
                          "options": "{\"css\": \".top-collection-header {...}\", \"html\": \"<div class=\\\"top-collection-container\\\">...</div>\"}"
                        }
                      },
                      {
                        "cursor": "MQ==",
                        "node": {
                          "id": "/api/shop/theme_customization_translations/22",
                          "_id": 22,
                          "themeCustomizationId": "5",
                          "locale": "AR",
                          "options": "{\"css\": \".top-collection-header {...}\", \"html\": \"<div class=\\\"top-collection-container\\\"><div class=\\\"top-collection-header\\\"><h2>اللعبة مع إضافاتنا الجديدة!</h2></div>...</div>\"}"
                        }
                      }
                    ],
                    "pageInfo": {
                      "endCursor": "MQ==",
                      "startCursor": "MA==",
                      "hasNextPage": false,
                      "hasPreviousPage": false
                    },
                    "totalCount": 2
                  }
                },
                "cursor": "MA=="
              },
              {
                "node": {
                  "id": "/api/shop/theme-customizations/6",
                  "_id": 6,
                  "themeCode": "default",
                  "type": "static_content",
                  "name": "Bold Collections",
                  "sortOrder": 6,
                  "status": "1",
                  "channelId": "1",
                  "createdAt": "2024-04-16T16:14:15+05:30",
                  "updatedAt": "2026-04-07T12:08:41+05:30",
                  "translation": {
                    "id": "/api/shop/theme_customization_translations/6",
                    "_id": 6,
                    "themeCustomizationId": "6",
                    "locale": "en",
                    "options": "{\"css\": \".section-gap{margin-top:80px} ...\", \"html\": \"<div class=\\\"container section-gap\\\"><div class=\\\"inline-col-wrapper\\\">...<h2 class=\\\"inline-col-title\\\">Get Ready for our new Bold Collections!</h2>...</div></div>\"}"
                  },
                  "translations": {
                    "edges": [
                      {
                        "cursor": "MA==",
                        "node": {
                          "id": "/api/shop/theme_customization_translations/6",
                          "_id": 6,
                          "themeCustomizationId": "6",
                          "locale": "en",
                          "options": "{\"css\": \".section-gap{margin-top:80px} ...\", \"html\": \"<div class=\\\"container section-gap\\\">...<h2>Get Ready for our new Bold Collections!</h2>...</div>\"}"
                        }
                      },
                      {
                        "cursor": "MQ==",
                        "node": {
                          "id": "/api/shop/theme_customization_translations/23",
                          "_id": 23,
                          "themeCustomizationId": "6",
                          "locale": "AR",
                          "options": "{\"css\": \".section-gap{margin-top:80px} ...\", \"html\": \"<div class=\\\"container section-gap\\\">...<h2>استعدوا لمجموعاتنا الجديدة الجريئة!</h2>...</div>\"}"
                        }
                      }
                    ],
                    "pageInfo": {
                      "endCursor": "MQ==",
                      "startCursor": "MA==",
                      "hasNextPage": false,
                      "hasPreviousPage": false
                    },
                    "totalCount": 2
                  }
                },
                "cursor": "MQ=="
              }
            ],
            "pageInfo": {
              "endCursor": "MQ==",
              "startCursor": "MA==",
              "hasNextPage": true,
              "hasPreviousPage": false
            },
            "totalCount": 4
          }
        }
      }
    commonErrors:
      - error: invalid-pagination
        cause: Invalid pagination arguments or exceeding maximum limit
        solution: Use valid first/after or last/before combinations with max value 100
      - error: invalid-type-filter
        cause: Invalid type filter value
        solution: Use valid type values like footer_links, image_carousel, product_carousel, category_carousel, static_content, etc.

---

# Theme Customizations

## About

The `themeCustomizations` query retrieves configurable theme data for the storefront. Use this query to:

- Fetch home page sliders and carousels
- Display footer links and static content sections
- Retrieve category and product carousel configurations
- Get theme-specific customization options
- Access multi-language translations for theme content
- Implement dynamic theme content based on type filters
- Display theme customizations with complete metadata

This query supports pagination with cursor-based navigation and type-based filtering for retrieving specific customization categories.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `first` | `Int` | ❌ No | Number of results to return (forward pagination). Max: 100. |
| `after` | `String` | ❌ No | Pagination cursor for forward navigation. Use with `first`. |
| `last` | `Int` | ❌ No | Number of results for backward pagination. Max: 100. |
| `before` | `String` | ❌ No | Pagination cursor for backward navigation. Use with `last`. |
| `type` | `String` | ❌ No | Filter by customization type (e.g., `footer_links`, `image_carousel`, `product_carousel`, `category_carousel`, `static_content`). |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique theme customization API identifier. |
| `_id` | `Int!` | Numeric customization ID. |
| `themeCode` | `String!` | Theme code/identifier (e.g., 'default'). |
| `type` | `String!` | Customization type (e.g., 'footer_links', 'image_carousel', 'product_carousel', 'category_carousel', 'static_content'). |
| `name` | `String!` | Human-readable name of the customization. |
| `sortOrder` | `Int` | Sort order for display. |
| `status` | `String` | Status flag (0 = inactive, 1 = active). |
| `channelId` | `String` | Associated channel ID. |
| `createdAt` | `DateTime!` | Customization creation timestamp. |
| `updatedAt` | `DateTime!` | Last update timestamp. |
| `translation` | `ThemeCustomizationTranslation!` | Default locale translation. |
| `translation.id` | `ID!` | Translation identifier. |
| `translation._id` | `Int!` | Numeric translation ID. |
| `translation.themeCustomizationId` | `String!` | Associated customization ID. |
| `translation.locale` | `String!` | Language locale code (e.g., 'en', 'ar', 'fr'). |
| `translation.options` | `String!` | JSON-formatted options/configuration for this translation. |
| `translations` | `ThemeCustomizationTranslationCollection!` | All available translations. |
| `translations.edges` | `[Edge!]!` | Translation edges with cursors. |
| `translations.pageInfo` | `PageInfo!` | Pagination info for translations. |
| `translations.totalCount` | `Int!` | Total translations for this customization. |
| `pageInfo` | `PageInfo!` | Pagination information. |
| `pageInfo.hasNextPage` | `Boolean!` | Whether more pages exist forward. |
| `pageInfo.hasPreviousPage` | `Boolean!` | Whether more pages exist backward. |
| `pageInfo.startCursor` | `String` | Cursor for first item in page. |
| `pageInfo.endCursor` | `String` | Cursor for last item in page. |
| `totalCount` | `Int!` | Total customizations matching filters. |

## Common Customization Types

| Type | Description | Usage |
|------|-------------|-------|
| `image_carousel` | Image slider/carousel on home page | Homepage promotions and banners |
| `product_carousel` | Product carousel display | Featured, new, or special products |
| `category_carousel` | Category carousel display | Category promotions |
| `static_content` | HTML/CSS static sections | Custom HTML blocks |
| `footer_links` | Footer navigation links | Footer menu items |
| `services_content` | Services information | Additional service blocks |

## Locale

Block content is locale-specific. `translation` returns the content for the **requested locale**, selected by the `X-Locale` request header (e.g. `X-Locale: ar`); omit it and you get the store default locale. The `translations` connection always carries every locale, so you can also read them all and pick client-side.

## Options Schema (per type)

`translation.options` is a **JSON-encoded string** — `JSON.parse` it client-side. The parsed shape depends on `type`:

| Type | Parsed `options` shape |
|------|------------------------|
| `image_carousel` | `{ "images": [{ "image": "storage/theme/…/*.webp", "link": "...", "title": "..." }, …] }` |
| `product_carousel` | `{ "title": "...", "filters": { "new": 1, "featured": 1, "limit": 10, "sort": "asc" } }` — `filters` forwards to the [products](/api/graphql-api/shop/queries/get-products) listing |
| `category_carousel` | `{ "title": "...", "filters": { "parent_id": "1", "limit": "10", "sort": "asc" } }` — `parent_id` is the same value passed to [`treeCategories(parentId:)`](/api/graphql-api/shop/queries/tree-categories) |
| `static_content` | `{ "html": "<div>…</div>", "css": ".foo{…}" }` |
| `footer_links` | `{ "column_1": [{ "url": "...", "title": "...", "sort_order": "3" }, …], "column_2": […] }` |
| `services_content` | `{ "services": [{ "service_icon": "storage/…", "title": "...", "description": "..." }, …] }` |

::: warning `static_content` images use `data-src`
The stored `html` is authored for the storefront web theme, where `<img>` tags carry the real source in **`data-src`** (lazy-loading) with a placeholder in `src`. Rendering this HTML in your own frontend requires reading `data-src`, not `src`.
:::

## Use Cases

### 1. Home Page Sliders
Use the "Filtered by Type" example with `type: "image_carousel"` to fetch home page sliders.

### 2. Footer Links
Use the "Filtered by Type" example with `type: "footer_links"` to display footer links.

### 3. Product Carousels
Use the "Filtered by Type" example with `type: "product_carousel"` to display featured products.

### 4. Multi-Language Support
Use the "Complete Details" example to get all translations for any customization type.

### 5. Paginated List
Use the "Basic" example with pagination arguments to load customizations progressively.

## Best Practices

1. **Use Type Filters** - Always filter by type when you only need specific customizations
2. **Paginate Results** - Use pagination for better performance with large datasets
3. **Request Only Needed Fields** - Minimize data transfer by selecting only required fields
4. **Cache Translations** - Theme customizations change infrequently, cache the full response
5. **Parse JSON Options** - The `options` field contains JSON; parse it in your application
6. **Check Status** - Verify status is active before displaying in frontend

## Related Resources

- [Get Category](/api/graphql-api/shop/queries/get-category) - Query individual category details
- [Get Categories](/api/graphql-api/shop/queries/categories) - Query paginated categories
- [Get Products](/api/graphql-api/shop/queries/get-products) - Query products for carousels
- [Pagination Guide](/api/graphql-api/pagination) - Cursor pagination documentation
- [Shop API Overview](/api/graphql-api/shop-api) - Overview of Shop API resources
