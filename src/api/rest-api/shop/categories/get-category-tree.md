---
outline: false
examples:
  - id: get-category-tree
    title: Get Category Tree
    description: Retrieve the active category tree as a nested structure, scoped to a parent.
    request: |
      curl -X GET "http://localhost/api/shop/category-trees?parentId=1&depth=2" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      [
        {
          "id": 8,
          "position": 2,
          "status": 1,
          "displayMode": "products_and_description",
          "_lft": 14,
          "_rgt": 15,
          "createdAt": "2024-04-19T19:06:12+05:30",
          "updatedAt": "2026-01-03T00:53:45+05:30",
          "url": "http://localhost/electronics",
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
            "locale": "en"
          },
          "children": []
        },
        {
          "id": 23,
          "position": 3,
          "status": 1,
          "displayMode": "products_and_description",
          "_lft": 18,
          "_rgt": 25,
          "createdAt": "2025-09-03T18:13:50+05:30",
          "updatedAt": "2025-09-03T23:56:45+05:30",
          "url": "http://localhost/furniture",
          "translation": {
            "id": 195,
            "categoryId": 23,
            "name": "Furniture",
            "slug": "furniture",
            "urlPath": "",
            "description": "<p>Discover our wide range of furniture…</p>",
            "metaTitle": "",
            "metaDescription": "",
            "metaKeywords": "",
            "locale": "en"
          },
          "children": [
            {
              "id": 21,
              "position": 5,
              "status": 1,
              "displayMode": "products_and_description",
              "url": "http://localhost/leather-sofa",
              "translation": {
                "id": 177,
                "categoryId": 21,
                "name": "Leather Sofa",
                "slug": "leather-sofa",
                "urlPath": "furniture/leather-sofa",
                "locale": "en"
              },
              "children": []
            }
          ]
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

# Get Category Tree

Retrieve the **active** category tree as a nested structure. Children are inlined recursively up to the requested depth, so a single request renders the full menu/sidebar without follow-up calls.

> The endpoint URL is plural and hyphenated: `/category-trees`.
>
> Always filtered to active categories (`status=1`). Disabled categories never appear in the response.
>
> ⚠️ **You must pass `?parentId=N`** — without it the response is an empty array. Pass the root category ID for your channel (commonly `1`) to get the full menu.

## Endpoint

```
GET /api/shop/category-trees
```

## Request Headers

| Header             | Required | Description                                       |
|--------------------|----------|---------------------------------------------------|
| `Accept`           | Yes      | `application/json`                                |
| `X-STOREFRONT-KEY` | Yes      | Storefront API key (`pk_storefront_…`)            |
| `X-Locale`         | No       | Override request locale (default: channel locale) |
| `X-Channel`        | No       | Override channel scope                            |

## Query Parameters

| Parameter   | Type    | Default | Description                                                                 |
|-------------|---------|---------|-----------------------------------------------------------------------------|
| `parentId`  | integer | —       | **Required.** Return descendants of this category. Use the root category ID (e.g. `1`) for the full menu. |
| `depth`     | integer | 4       | Maximum nesting depth — how many child levels to inline                     |

> Pagination headers (`X-Total-Count`, `X-Page`, `X-Per-Page`, `X-Total-Pages`) are **not** emitted on this endpoint — the entire tree is returned in one response.

## Response

`200 OK` — JSON array of root nodes, each with a recursive `children[]` array.

### Tree Node Fields

Each node carries a slimmer shape than the flat-list category endpoint — `parent`, `translations[]`, `filterableAttributes`, and image URLs are **not** included. Use [Get Single Category](/api/rest-api/shop/categories/get-category) when you need those.

| Field          | Type              | Description                                                |
|----------------|-------------------|------------------------------------------------------------|
| `id`           | integer           | Category primary key                                       |
| `position`     | integer           | Display order                                              |
| `status`       | boolean (0/1)     | Always `1`                                                 |
| `displayMode`  | string            | `products_and_description`, `products`, or `description_only` |
| `url`          | string            | Storefront URL                                             |
| `_lft`, `_rgt` | integer           | Nested-set tree pointers (internal; safe to ignore)        |
| `createdAt`    | string (ISO-8601) | Creation timestamp                                         |
| `updatedAt`    | string (ISO-8601) | Last update timestamp                                      |
| `translation`  | object            | Inline translation for the request locale                  |
| `children`     | array             | Recursive child nodes — empty `[]` at the leaf or at `depth` cap |

The inline `translation` contains the same fields as the inline translation on [Get Categories](/api/rest-api/shop/categories/get-categories#inline-translation-fields).

## Use Cases

- Render a header / sidebar / mega-menu in one request.
- Build a sitemap of every navigable category for SEO crawling.
- Draw a recursive "browse-by-category" tree in admin tooling.

## Differences vs `/categories`

| Concern                  | `/categories` (flat)                           | `/category-trees` (nested)             |
|--------------------------|------------------------------------------------|----------------------------------------|
| Shape                    | Flat array, paginated                          | Nested tree, no pagination             |
| `parent_id` / `parentId` | Optional                                       | **Required** (else returns `[]`)       |
| Depth control            | n/a (one level at a time via `?parent_id`)     | `?depth=N`                             |
| Embeds                   | `parent`, `translations[]`, `filterableAttributes`, `logoUrl`, `children` (inline 1 level) | Recursive `children[]`, single `translation` |

## Related Resources

- [Get Categories](/api/rest-api/shop/categories/get-categories) — flat collection
- [Get Category](/api/rest-api/shop/categories/get-category) — full detail for a single category
- [Get Products](/api/rest-api/shop/products/get-products) — `?category_id=N` to scope products
