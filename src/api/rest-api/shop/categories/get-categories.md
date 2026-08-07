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
            {
              "id": 11,
              "code": "price",
              "adminName": "Price",
              "type": "price",
              "position": 13,
              "isFilterable": 1,
              "isConfigurable": 0,
              "options": [],
              "translation": { "id": 11, "attributeId": 11, "locale": "en", "name": "Price" },
              "translations": ["/api/shop/attribute_translations/11"]
            },
            {
              "id": 23,
              "code": "color",
              "adminName": "Color",
              "type": "select",
              "position": 26,
              "isFilterable": 1,
              "isConfigurable": 1,
              "options": [
                {
                  "id": 1,
                  "adminName": "Red",
                  "sortOrder": 1,
                  "translation": { "id": 1, "attributeOptionId": 1, "locale": "en", "label": "Red" },
                  "translations": [
                    { "id": 1, "attributeOptionId": 1, "locale": "en", "label": "Red" }
                  ]
                }
              ],
              "translation": { "id": 23, "attributeId": 23, "locale": "en", "name": "Color" },
              "translations": ["/api/shop/attribute_translations/23"]
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
          {
            "id": 11,
            "code": "price",
            "adminName": "Price",
            "type": "price",
            "position": 13,
            "isFilterable": 1,
            "isConfigurable": 0,
            "options": [],
            "translation": { "id": 11, "attributeId": 11, "locale": "en", "name": "Price" },
            "translations": ["/api/shop/attribute_translations/11"]
          },
          {
            "id": 23,
            "code": "color",
            "adminName": "Color",
            "type": "select",
            "position": 26,
            "isFilterable": 1,
            "isConfigurable": 1,
            "options": [
              {
                "id": 1,
                "adminName": "Red",
                "sortOrder": 1,
                "translation": { "id": 1, "attributeOptionId": 1, "locale": "en", "label": "Red" },
                "translations": [
                  { "id": 1, "attributeOptionId": 1, "locale": "en", "label": "Red" }
                ]
              }
            ],
            "translation": { "id": 23, "attributeId": 23, "locale": "en", "name": "Color" },
            "translations": ["/api/shop/attribute_translations/23"]
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

The endpoint always filters to `status = 1`, so a category a merchant has disabled is never returned and its ID responds `404`.
>
This is a flat list. For the nested menu structure use [Get Category Tree](/api/rest-api/shop/categories/get-category-tree).

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

Both endpoints return the same shape — the collection is an array of these objects, the single endpoint returns one.

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Category primary key. |
| `position` | integer | Display order. |
| `status` | boolean (0/1) | Always `1` here — the storefront endpoints never return disabled categories. |
| `displayMode` | string | `products_and_description`, `products`, or `description_only`. |
| `logoPath` | string | Storage path of the category image. **Absent** when no image is set, rather than `null`. |
| `logoUrl` | string | Fully-qualified image URL. Absent alongside `logoPath`. |
| `url` | string | Storefront URL of the category page. |
| `minPrice` / `maxPrice` | number | Cheapest and dearest product price in the category, for a price-range filter. Both are `0` when the category holds no priced products. |
| `_lft` / `_rgt` | integer | Nested-set tree pointers — internal bookkeeping, safe to ignore. |
| `createdAt` / `updatedAt` | string | ISO 8601 timestamps. |
| `translation` | object | Translation for the request locale, inline — see below. |
| `translations` | array | Path references to every stored translation, e.g. `/api/shop/category_translations/1`. |
| `parent` | string | Path of the parent category. **Absent** on a root category. |
| `children` | array | Path references to the direct children, e.g. `/api/shop/categories/5`. Empty for a leaf. |
| `filterableAttributes` | array | Attributes flagged filterable for this category, inline. Empty when none are configured. |

Two things differ from what a client might assume: `children` and `translations` are **path references, not inline objects**, so building a tree from this endpoint costs one request per level — use [Get Category Tree](/api/rest-api/shop/categories/get-category-tree) instead. And null-valued fields are **omitted entirely** rather than returned as `null`, so a client must test for key presence, not for a null value.

### Inline Translation Fields

| Field            | Type    | Description                                       |
|------------------|---------|---------------------------------------------------|
| `id`             | integer | Translation primary key                           |
| `categoryId`     | integer | Owning category ID                                |
| `locale`         | string  | Locale code (`en`, `fr`, `de`, …)                 |
| `name`           | string  | Localized category name                           |
| `slug`           | string  | URL slug (e.g. `electronics`)                     |
| `urlPath`        | string  | Full URL path including any parent slugs          |
| `description`    | string  | HTML description shown on the category page       |
| `metaTitle`      | string  | SEO `<title>` value                               |
| `metaDescription`| string  | SEO meta description                              |
| `metaKeywords`   | string  | SEO meta keywords                                 |

See [IRIs & HATEOAS](/api/rest-api/introduction#iris-hateoas) for how to dereference the IRI fields.

## Category Attribute Filters

Each category inlines the facets its product listing can be narrowed by, under `filterableAttributes`, plus `minPrice` and `maxPrice` for a price slider. There is no separate filters endpoint — reading the category is enough to build the whole facet sidebar.

Only attributes an admin flagged filterable appear here, so the array is already the correct facet set for that category. It is empty when none are configured.

### Filter Fields

Each entry is a full attribute record. The ones a facet UI actually needs:

| Field | Description |
|-------|-------------|
| `code` | The query-parameter name to send to the product listing, e.g. `color`. |
| `type` | `select`, `multiselect`, `price`, `boolean`, and so on — decides whether you render checkboxes, a slider, or a toggle. |
| `adminName` | Back-office label. Show `translation.name` to shoppers instead. |
| `translation` | The label for the request locale, as `{ name }`. `translations` lists the rest as path references. |
| `position` | The order the store configured; sort the sidebar by it. |
| `options` | Selectable values, empty for `price` and other non-option types. |
| `isConfigurable` | Whether variants are also built from this attribute — useful when a filter doubles as a variant selector. |

### Option Fields

| Field | Description |
|-------|-------------|
| `id` | **The value to send when filtering.** Filters match option ids, never labels. |
| `adminName` | Back-office label for the option. |
| `translation` | The shopper-facing label for the request locale, as `{ label }`. |
| `sortOrder` | Display order within the facet. |

### Applying the Filters

Take the attribute's `code` as the parameter name and the option's `id` as the value, then send them to the product listing:

```
GET /api/shop/products?category_id=2&color=1&size=4,5&price=24.99,299.99
```

- Comma-separate ids inside one attribute for an OR match — `?size=4,5` means size 4 **or** 5.
- Separate parameters are AND-combined — the example asks for red products that are size 4 or 5.
- `price` takes the `minPrice,maxPrice` pair from the category as its bounds; the comma separates the two numbers and is never a thousands mark.
- Sending an option **label** rather than its id matches nothing and returns an empty list, not an error.

Full parameter reference is on [Search Products](/api/rest-api/shop/products/search-product).

## Use Cases

- **Sidebar or footer category list** — the flat collection is one call, and each row already carries `url` and the localised `name` inside `translation`.
- **Subcategory widget** — `?parent_id=N` returns the direct children as full objects, which the `children` path references alone would not give you.
- **Category-page facets** — `filterableAttributes` is inline, so a faceted filter needs no second request; `minPrice` and `maxPrice` bound a price slider.
- **Breadcrumbs** — follow `parent` upwards; its absence marks the root.

## Best Practices

- **Test for key presence, not for `null`** — `logoPath`, `logoUrl`, and `parent` are dropped from the payload when empty.
- **Do not build a tree from `children`** — they are references; [Get Category Tree](/api/rest-api/shop/categories/get-category-tree) returns the nested structure in one call.
- **Read names from `translation`, not the top level** — the category object itself carries no `name`; it lives in the locale block.
- **Send `X-Locale` rather than dereferencing `translations`** — the inline `translation` already follows the request locale.

## Related Resources

- [Get Category Tree](/api/rest-api/shop/categories/get-category-tree) — hierarchical tree response
- [Get Products](/api/rest-api/shop/products/get-products) — pass `?category_id=N` to filter by category
- [Introduction → IRIs & HATEOAS](/api/rest-api/introduction#iris-hateoas) — how to dereference the path references in these payloads
