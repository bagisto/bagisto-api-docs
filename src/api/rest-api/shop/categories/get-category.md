---
outline: false
examples:
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
    commonErrors:
      - error: 404 Not Found
        cause: No category with the given `{id}` exists, or the category has `status=0`
        solution: List active categories via `GET /api/shop/categories` to discover valid IDs.
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.
      - error: 403 Forbidden
        cause: Storefront key inactive or rate-limited
        solution: Activate the key or wait for the rate limit window to reset.

---

# Get Single Category

Retrieve a single category by ID. The response embeds the request-locale translation, the list of filterable attributes assigned to this category, and direct children — but uses an **IRI** for the parent and for non-default locale translations.

> Disabled categories (`status=0`) return **404**, not a hidden record. Only active categories are reachable from the storefront.

## Endpoint

```
GET /api/shop/categories/{id}
```

## Request Headers

| Header             | Required | Description                              |
|--------------------|----------|------------------------------------------|
| `Accept`           | Yes      | `application/json`                       |
| `X-STOREFRONT-KEY` | Yes      | Storefront API key (`pk_storefront_…`)   |
| `X-Locale`         | No       | Override request locale                  |
| `X-Channel`        | No       | Override channel scope                   |

## Path Parameters

| Parameter | Type    | Required | Description                            |
|-----------|---------|----------|----------------------------------------|
| `id`      | integer | Yes      | Category primary key                   |

## Response

`200 OK` — single category object with the same shape as items in [Get Categories](/api/rest-api/shop/categories/get-categories#category-object-fields).

### Inline vs IRI fields

| Field                  | Form                  | Notes                                                                                  |
|------------------------|-----------------------|----------------------------------------------------------------------------------------|
| `translation`          | inline object         | Localized name, slug, urlPath, description, meta-tags for the request locale          |
| `translations`         | array of IRI strings  | Other locales — `GET /api/shop/category_translations/{id}` to dereference              |
| `parent`               | IRI string \| null    | `GET <iri>` to fetch the parent category. `null` for root categories                  |
| `children`             | inline array          | Direct child categories (one level deep). Empty `[]` for leaves                        |
| `filterableAttributes` | inline array          | Full attribute objects with their options — same shape as `/api/shop/attributes/{id}` |

See [IRIs & HATEOAS](/api/rest-api/introduction#iris-hateoas) for how to dereference IRI fields.

## Use Cases

- Render a category landing page: name, description, hero image (`logoUrl`), faceted filters (`filterableAttributes`).
- Build a sub-category strip from `children`.
- Walk up to the parent for breadcrumbs by following the `parent` IRI.
- Switch locales by following an entry in `translations[]` instead of re-issuing the request with a different `X-Locale` header.

## Related Resources

- [Get Categories](/api/rest-api/shop/categories/get-categories) — flat collection, optional `?parent_id=N` filter
- [Get Category Tree](/api/rest-api/shop/categories/get-category-tree) — hierarchical tree response
- [Get Products](/api/rest-api/shop/products/get-products) — `?category_id=N` to scope products
- [Introduction → IRIs & HATEOAS](/api/rest-api/introduction#iris-hateoas)
