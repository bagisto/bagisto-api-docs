---
outline: false
examples:
  - id: list-categories
    title: List Categories
    description: Retrieve a paginated, flat list of active categories with optional parent filtering.
    request: |
      curl -X GET "http://localhost/api/shop/categories?per_page=2&parent_id=1" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK
      X-Total-Count: 6
      X-Page: 1
      X-Per-Page: 2
      X-Total-Pages: 3

      [
        {
          "id": 8,
          "position": 2,
          "logoPath": "category/8/Vk59z6w128ExCrY3lwlSYWhVrYenucFhTuick0VD.webp",
          "status": 1,
          "displayMode": "products_and_description",
          "_lft": 14,
          "_rgt": 15,
          "createdAt": "2024-04-19T19:06:12+05:30",
          "updatedAt": "2026-01-03T00:53:45+05:30",
          "url": "http://localhost/electronics",
          "logoUrl": "http://localhost/storage/category/8/Vk59z6w128ExCrY3lwlSYWhVrYenucFhTuick0VD.webp",
          "filterableAttributes": [
            { "id": 11, "code": "price", "type": "price", "isFilterable": 1, "options": [] },
            { "id": 23, "code": "color", "type": "select", "isFilterable": 1, "options": [
                { "id": 1, "adminName": "Red", "sortOrder": 0 }
              ]
            }
          ],
          "translation": {
            "id": 60,
            "categoryId": 8,
            "name": "Electronics",
            "slug": "electronics",
            "urlPath": "electronics",
            "description": "<p>Discover a wide range of cutting-edge electronics…</p>",
            "metaTitle": "Electronics",
            "metaDescription": "",
            "metaKeywords": "electronics, electronics-keyboard",
            "localeId": 1,
            "locale": "en"
          },
          "translations": [
            "/api/shop/category_translations/60",
            "/api/shop/category_translations/209"
          ],
          "parent": "/api/shop/categories/1",
          "children": []
        }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.

  - id: get-category
    title: Get Single Category
    description: Retrieve a single category by ID with its inline translation, parent IRI, child categories, and filterable attributes.
    request: |
      curl -X GET "http://localhost/api/shop/categories/8" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      {
        "id": 8,
        "position": 2,
        "logoPath": "category/8/Vk59z6w128ExCrY3lwlSYWhVrYenucFhTuick0VD.webp",
        "status": 1,
        "displayMode": "products_and_description",
        "_lft": 14,
        "_rgt": 15,
        "createdAt": "2024-04-19T19:06:12+05:30",
        "updatedAt": "2026-01-03T00:53:45+05:30",
        "url": "http://localhost/electronics",
        "logoUrl": "http://localhost/storage/category/8/Vk59z6w128ExCrY3lwlSYWhVrYenucFhTuick0VD.webp",
        "filterableAttributes": [
          { "id": 11, "code": "price", "type": "price", "isFilterable": 1, "options": [] },
          { "id": 23, "code": "color", "type": "select", "isFilterable": 1, "options": [
              { "id": 1, "adminName": "Red", "sortOrder": 0 }
            ]
          }
        ],
        "translation": {
          "id": 60,
          "categoryId": 8,
          "name": "Electronics",
          "slug": "electronics",
          "urlPath": "electronics",
          "description": "<p>Discover a wide range of cutting-edge electronics…</p>",
          "metaTitle": "Electronics",
          "metaDescription": "",
          "metaKeywords": "electronics, electronics-keyboard",
          "localeId": 1,
          "locale": "en"
        },
        "translations": [
          "/api/shop/category_translations/60",
          "/api/shop/category_translations/209"
        ],
        "parent": "/api/shop/categories/1",
        "children": []
      }
    commonErrors:
      - error: 404 Not Found
        cause: No category with the given `{id}` exists, or the category has `status=0`
        solution: List active categories via `GET /api/shop/categories` to discover valid IDs.
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.

---

# Categories

> **Always filtered to `status=1`** — disabled categories are never returned. Disabled IDs respond `404`.
>
> If you need a hierarchical (nested) tree response, use [Get Category Tree](/api/rest-api/shop/categories/get-category-tree) instead.

## Endpoints

| Method | Path                            | Purpose                                                       |
|--------|---------------------------------|---------------------------------------------------------------|
| GET    | `/api/shop/categories`          | Flat, paginated list of active categories                     |
| GET    | `/api/shop/categories/{id}`     | Single category by ID                                         |

Use the example switcher above the curl block to flip between the two.

## Request Headers

| Header             | Required | Description                              |
|--------------------|----------|------------------------------------------|
| `Accept`           | Yes      | `application/json`                       |
| `X-STOREFRONT-KEY` | Yes      | Storefront API key (`pk_storefront_…`)   |
| `X-Locale`         | No       | Override request locale                  |
| `X-Channel`        | No       | Override channel scope                   |

## Query Parameters (collection only)

| Parameter   | Type    | Default | Description                                                                          |
|-------------|---------|---------|--------------------------------------------------------------------------------------|
| `page`      | integer | 1       | Page number (1-based)                                                                |
| `per_page`  | integer | 15      | Items per page. Max **100** for this endpoint.                                       |
| `parent_id` | integer | —       | Return **only direct children** of this category ID. Accepts `parentId` as alias.    |

Pagination headers (`X-Total-Count`, `X-Page`, `X-Per-Page`, `X-Total-Pages`) are emitted on the collection. See [Pagination](/api/rest-api/introduction#pagination).

## Category Object Fields

Both endpoints return the same shape — the collection wraps an array of these objects, the single endpoint returns one.

| Field                  | Type                  | Description                                                                |
|------------------------|-----------------------|----------------------------------------------------------------------------|
| `id`                   | integer               | Category primary key                                                        |
| `position`             | integer               | Display order                                                               |
| `status`               | boolean (0/1)         | Always `1` on this endpoint                                                 |
| `displayMode`          | string                | `products_and_description`, `products`, or `description_only`               |
| `logoPath`             | string \| null        | Storage path to the category image                                          |
| `logoUrl`              | string \| null        | Fully-qualified image URL                                                   |
| `url`                  | string                | Storefront URL for the category page                                        |
| `_lft`, `_rgt`         | integer               | Nested-set tree pointers (internal; safe to ignore on the client)           |
| `createdAt`, `updatedAt` | string (ISO-8601)   | Timestamps                                                                  |
| `translation`          | object                | Inline translation for the request locale (see below)                       |
| `translations`         | array of IRI strings  | All locale translations — `GET <iri>` to dereference                        |
| `parent`               | string (IRI) \| null  | IRI to parent category. `null` for root categories                          |
| `children`             | array                 | Inline child category objects (one level deep). Empty `[]` for leaves       |
| `filterableAttributes` | array                 | Inline list of attributes flagged as filterable for this category           |

### Inline `translation` fields

| Field            | Type    | Description                                       |
|------------------|---------|---------------------------------------------------|
| `id`             | integer | Translation primary key                           |
| `categoryId`     | integer | Owning category ID                                |
| `locale`         | string  | Locale code (`en`, `fr`, `de`, …)                 |
| `localeId`       | integer | Locale primary key                                |
| `name`           | string  | Localized category name                           |
| `slug`           | string  | URL slug (e.g. `electronics`)                     |
| `urlPath`        | string  | Full URL path including any parent slugs          |
| `description`    | string  | HTML description shown on the category page       |
| `metaTitle`      | string  | SEO `<title>` value                               |
| `metaDescription`| string  | SEO meta description                              |
| `metaKeywords`   | string  | SEO meta keywords                                 |

See [IRIs & HATEOAS](/api/rest-api/introduction#iris-hateoas) for how to dereference the IRI fields.

## Use Cases

- Render a flat category listing for a sidebar, footer, or admin search.
- Get all direct children of a parent (`?parent_id=N`) for a "subcategories" widget without traversing the whole tree.
- Read `filterableAttributes` to build a category-page faceted filter UI without an extra round trip.
- Walk up to the parent for breadcrumbs by following the `parent` IRI.
- Switch locales by following an entry in `translations[]` instead of re-issuing the request with a different `X-Locale` header.

## Related Resources

- [Get Category Tree](/api/rest-api/shop/categories/get-category-tree) — hierarchical tree response
- [Get Products](/api/rest-api/shop/products/get-products) — pass `?category_id=N` to filter by category
- [Introduction → IRIs & HATEOAS](/api/rest-api/introduction#iris-hateoas)
