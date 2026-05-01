---
outline: false
examples:
  - id: get-categories
    title: Get All Categories (flat)
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
            {
              "id": 11,
              "code": "price",
              "type": "price",
              "isFilterable": 1,
              "options": []
            },
            {
              "id": 23,
              "code": "color",
              "type": "select",
              "isFilterable": 1,
              "options": [
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
      - error: 403 Forbidden
        cause: Storefront key inactive or rate-limited
        solution: Activate the key or wait for the rate limit window to reset.

---

# Get Categories

Retrieve a paginated, flat list of categories.

> **Always filtered to `status=1`** — admin-disabled categories are never returned. There is no way to bypass this from the storefront API.

If you need a hierarchical (nested) tree response, use [Get Category Tree](/api/rest-api/shop/categories/get-category-tree) instead.

## Endpoint

```
GET /api/shop/categories
```

## Request Headers

| Header             | Required | Description                              |
|--------------------|----------|------------------------------------------|
| `Accept`           | Yes      | `application/json`                       |
| `X-STOREFRONT-KEY` | Yes      | Storefront API key (`pk_storefront_…`)   |

## Query Parameters

| Parameter   | Type    | Default | Description                                                                    |
|-------------|---------|---------|--------------------------------------------------------------------------------|
| `page`      | integer | 1       | Page number (1-based)                                                          |
| `per_page`  | integer | 15      | Items per page. Max **100** for this endpoint.                                 |
| `parent_id` | integer | —       | Return **only direct children** of this category ID. Accepts `parentId` as alias. |

> Without `parent_id`, the endpoint returns every active category in the channel as a flat list.

## Response

`200 OK` — JSON array of category objects (no envelope). Pagination metadata is delivered as headers (`X-Total-Count`, `X-Page`, `X-Per-Page`, `X-Total-Pages`); see [Pagination](/api/rest-api/introduction#pagination).

### Category Object Fields

| Field                  | Type                  | Description                                                                |
|------------------------|-----------------------|----------------------------------------------------------------------------|
| `id`                   | integer               | Category primary key                                                        |
| `position`             | integer               | Display order                                                               |
| `status`               | boolean (0/1)         | Always `1` on this endpoint                                                 |
| `displayMode`          | string                | `products_and_description`, `products`, or `description_only`               |
| `logoPath`             | string \| null        | Storage path to the category image                                          |
| `logoUrl`              | string \| null        | Fully-qualified image URL                                                   |
| `url`                  | string                | Storefront URL for the category page                                        |
| `_lft`, `_rgt`         | integer               | Nested-set tree pointers (internal use; safe to ignore on the client)       |
| `createdAt`            | string (ISO-8601)     | Creation timestamp                                                          |
| `updatedAt`            | string (ISO-8601)     | Last update timestamp                                                       |
| `translation`          | object                | Inline translation for the request locale (see below)                       |
| `translations`         | array of IRI strings  | All locale translations — see [IRIs & HATEOAS](/api/rest-api/introduction#iris-hateoas) |
| `parent`               | string (IRI) \| null  | IRI to parent category (e.g. `/api/shop/categories/1`)                      |
| `children`             | array                 | Inline child category objects (empty `[]` for leaf categories)              |
| `filterableAttributes` | array                 | Inline list of attributes flagged as filterable for this category — same shape as the [Attribute](/api/rest-api/shop/attributes/get-attribute) response |

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

## Use Cases

- Render a flat category listing for a sidebar, footer, or admin search.
- Get all direct children of a parent (`?parent_id=N`) for a "subcategories" widget without traversing the whole tree.
- Read `filterableAttributes` to build a category-page faceted filter UI without an extra round trip.

## Related Resources

- [Get Category Tree](/api/rest-api/shop/categories/get-category-tree) — hierarchical tree response
- [Get Category](/api/rest-api/shop/categories/get-category) — single category detail
- [Get Products](/api/rest-api/shop/products/get-products) — pass `?category_id=N` to filter by category
- [Introduction → IRIs & HATEOAS](/api/rest-api/introduction#iris-hateoas)
