---
outline: false
examples:
  - id: search-by-keyword
    title: Search by keyword
    description: Use `?query=` to match against product SKU and name.
    request: |
      curl -X GET "http://localhost/api/shop/products?query=hoodie&per_page=2" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK
      X-Total-Count: 3
      X-Page: 1
      X-Per-Page: 2
      X-Total-Pages: 2

      [
        {
          "id": 1,
          "sku": "COASTALBREEZEMENSHOODIE",
          "type": "simple",
          "name": "Coastal Breeze Men's Blue Zipper Hoodie",
          "price": 100,
          "...": "..."
        }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.

  - id: filter-by-type
    title: Filter by product type
    description: Restrict to a single product type (e.g. all configurable products).
    request: |
      curl -X GET "http://localhost/api/shop/products?type=configurable&per_page=10" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK
      X-Total-Count: 4
      X-Page: 1
      X-Per-Page: 10
      X-Total-Pages: 1

      [
        { "id": 23, "sku": "NGJGAJSDGJ123123GJGJ", "type": "configurable", "name": "Luggage bags", "price": 0, "...": "..." }
      ]

  - id: filter-by-category
    title: Filter by category
    description: Scope the listing to a single category. Pass either `category_id` (snake_case) or `categoryId` (camelCase).
    request: |
      curl -X GET "http://localhost/api/shop/products?category_id=23&per_page=2" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK
      X-Total-Count: 14
      X-Page: 1
      X-Per-Page: 2
      X-Total-Pages: 7

      [
        { "id": 279, "sku": "sofa2", "type": "simple", "name": "Imperial Velvet Comfort Sofa", "price": 4000, "...": "..." }
      ]

  - id: filter-by-price
    title: Filter by price range
    description: Use `?price=from,to` (compound) or `?price_from=` + `?price_to=` (separate). Both are equivalent.
    request: |
      curl -X GET "http://localhost/api/shop/products?price=10,200&per_page=2" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK
      X-Total-Count: 25
      X-Page: 1
      X-Per-Page: 2
      X-Total-Pages: 13

      [
        { "id": 1,  "sku": "COASTALBREEZEMENSHOODIE", "type": "simple", "name": "Coastal Breeze Men's Blue Zipper Hoodie", "price": 100, "...": "..." },
        { "id": 2,  "sku": "PUREWHTSNEAK2023",       "type": "simple", "name": "PureStride Men's Classic White Sneakers", "price": 189, "...": "..." }
      ]

  - id: filter-by-attribute
    title: Filter by attribute (color / size / brand / …)
    description: |
      Pass any **filterable attribute code** as a query parameter. The value is the option ID. For multi-select, comma-separate the IDs.

      Discover the available attribute codes and their option IDs via [`GET /api/shop/attributes`](/api/rest-api/shop/attributes/get-attributes).
    request: |
      curl -X GET "http://localhost/api/shop/products?color=3&per_page=2" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK
      X-Total-Count: 13
      X-Page: 1
      X-Per-Page: 2
      X-Total-Pages: 7

      [
        { "id": 12, "sku": "...", "type": "simple", "name": "...", "price": 250, "...": "..." }
      ]

  - id: sort-products
    title: Sort
    description: |
      Use `?sort=` with a compound token like `name-asc`, `price-desc`, `created_at-desc`. Or pass `?sort=name&order=desc` for the bare-key + direction form.
    request: |
      curl -X GET "http://localhost/api/shop/products?sort=name-asc&per_page=2" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      [
        { "id": 11, "name": "A Best Shooes", "price": 1, "...": "..." },
        { "id": 13, "name": "Acme Baby Cap", "price": 25, "...": "..." }
      ]

  - id: filter-new-featured
    title: Filter new / featured
    description: Restrict to "new" or "featured" flagged products. Combine with other filters.
    request: |
      curl -X GET "http://localhost/api/shop/products?new=1&featured=1&per_page=2" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      [
        { "id": 1,  "name": "Coastal Breeze…", "new": true, "featured": true, "price": 100, "...": "..." },
        { "id": 2,  "name": "PureStride…",     "new": true, "featured": true, "price": 189, "...": "..." }
      ]

  - id: combined-filters
    title: Combine filters
    description: Filters are AND-combined. The example below restricts to color = 3, in category 5, sorted by price descending.
    request: |
      curl -X GET "http://localhost/api/shop/products?category_id=5&color=3&sort=price-desc&per_page=20" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK
      X-Total-Count: 6
      X-Page: 1
      X-Per-Page: 20
      X-Total-Pages: 1

      [ … ]

---

# Search Products

The list endpoint at `GET /api/shop/products` doubles as the **search & filter** endpoint. Every storefront facet — keyword search, category, price range, attribute filters, sort, "new" / "featured" — is just a query parameter. This page is the complete reference for those parameters.

## Endpoint

```
GET /api/shop/products
```

Same URL as [Products](/api/rest-api/shop/products/get-products); the only difference is which query parameters you send.

## Reserved parameters

These names are interpreted by the search/sort/pagination layer — never as attribute filters:

| Parameter           | Type    | Default | Description                                                                                                  |
|---------------------|---------|---------|--------------------------------------------------------------------------------------------------------------|
| `query`             | string  | —       | Search term. Matches against product SKU and product name.                                                   |
| `sort`              | string  | —       | Sort token. Either compound (`name-asc`, `price-desc`) or a bare key paired with `order` (`sort=name&order=desc`). See [Sort tokens](#sort-tokens) below. |
| `order`             | string  | `asc`   | Direction when `sort` is a bare key. Ignored if `sort` already has a `-asc` / `-desc` suffix.                |
| `page`              | integer | `1`     | 1-based page number.                                                                                         |
| `per_page`          | integer | `30`    | Items per page. Max **50**.                                                                                  |
| `locale`            | string  | —       | Locale override (alternative to the `X-Locale` header).                                                      |
| `channel`           | string  | —       | Channel override (alternative to the `X-Channel` header).                                                    |
| `filter`            | string  | —       | JSON filter object — GraphQL parity. Example: `{"color":{"match":"3","match_type":"PARTIAL"}}`. Most clients prefer the simpler `?<attribute>=<id>` shorthand. |
| `type`              | string  | —       | Product type. One of `simple`, `configurable`, `bundle`, `grouped`, `virtual`, `downloadable`, `booking`.    |
| `category_id`       | integer | —       | Filter by category ID. `categoryId` (camelCase) is also accepted.                                            |
| `price`             | string  | —       | Compound price range `from,to` (e.g. `10,200`).                                                              |
| `price_from`        | number  | —       | Minimum price (inclusive). Equivalent to the lower bound of `price`.                                         |
| `price_to`          | number  | —       | Maximum price (inclusive). Equivalent to the upper bound of `price`.                                         |
| `new`               | boolean | —       | `1` to restrict to products with the "new" flag set.                                                         |
| `featured`          | boolean | —       | `1` to restrict to products with the "featured" flag set.                                                    |

## Attribute filters (anything else)

> **Any query parameter not listed above is treated as a filterable attribute.** No schema changes are required when admins add new filterable attributes — the URL just works.

| Pattern                    | Example                            | Effect                                                                                                       |
|----------------------------|------------------------------------|--------------------------------------------------------------------------------------------------------------|
| `?<code>=<option_id>`      | `?color=3`                         | Single option ID match                                                                                       |
| `?<code>=id1,id2,…`        | `?size=4,5,6`                      | Multi-option (OR) match                                                                                      |
| `?brand=N`, `?material=N`  | `?material=12`                     | Same shape — works for any filterable attribute                                                              |
| `?filter[color]=3&filter[size]=5` | (Swagger UI form)            | API Platform's bracket-syntax form. Same semantics as the bare-key form.                                     |

To list which attributes are filterable and what their option IDs are, fetch [`GET /api/shop/attributes`](/api/rest-api/shop/attributes/get-attributes) and look for `isFilterable: 1`. Each attribute's `options[]` array has the IDs.

## Sort tokens

The compound form (`<key>-<dir>`) is recommended:

| Token              | Sort by                        |
|--------------------|--------------------------------|
| `name-asc`         | Product name, A→Z              |
| `name-desc`        | Product name, Z→A              |
| `price-asc`        | Price, low→high                |
| `price-desc`       | Price, high→low                |
| `created_at-asc`   | Oldest first                   |
| `created_at-desc`  | Newest first                   |
| `updated_at-asc`   | Oldest update first            |
| `updated_at-desc`  | Most recently updated first    |
| `id-asc`           | Ascending ID (catalog order)   |
| `id-desc`          | Descending ID                  |

Alternative form: `?sort=name&order=desc`. Pick one; mixing them isn't useful.

## Combining filters

All filters are **AND-combined**. There is no OR across different filters — the only multi-value form is comma-separated values within a single attribute (`?size=4,5,6`).

```
GET /api/shop/products?
  category_id=5
  &color=3
  &size=4,5
  &price=10,200
  &new=1
  &sort=price-desc
  &per_page=24
```

## Response

`200 OK` — JSON array of card-level product objects (same shape as [Products](/api/rest-api/shop/products/get-products#card-level-fields)). Pagination headers always emitted.

> An empty filter result returns an empty array `[]` with `200 OK` and `X-Total-Count: 0`. It does **not** 404.

## Common pitfalls

- Sending `itemsPerPage` instead of `per_page` — the legacy API Platform name is **not accepted**.
- Filtering by an attribute that isn't flagged `isFilterable=1` — the parameter is silently ignored.
- Filtering by an attribute *code* but passing an option *label* (e.g. `?color=Red`) — values are matched against option **IDs**, not labels.
- Combining `price` + `price_from`/`price_to` — pick one. The compound form wins if both are present.

## Related Resources

- [Products](/api/rest-api/shop/products/get-products) — same endpoint with no filters
- [Single Product](/api/rest-api/shop/products/get-product) — fetch one product after the user picks a result
- [Categories](/api/rest-api/shop/categories/get-categories) — discover category IDs for `?category_id=N`
- [Attributes](/api/rest-api/shop/attributes/get-attributes) — discover filterable attribute codes
- [Pagination](/api/rest-api/introduction#pagination)
