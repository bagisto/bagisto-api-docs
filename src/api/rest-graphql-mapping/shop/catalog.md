---
outline: false
---

# Catalog mapping — products, categories, attributes

The catalog is where REST and GraphQL differ most. REST puts filters in the query string; GraphQL packs them into one JSON `filter:` string and uses typed `sortKey`/`reverse` + cursor arguments.

## Products — filters

| Concept | REST | GraphQL |
|---|---|---|
| Full-text search | `GET /api/shop/products?query=shirt` | `products(query: "shirt")` |
| Scope to a category | `?category_id=N` (alias `?categoryId=N`) | `filter: "{\"category_id\":\"N\"}"` |
| Price range | `?price=10,200` — or `?price_from=10&price_to=200` | `filter: "{\"price\":\"10,200\"}"` |
| New products | `?new=1` | `filter: "{\"new\":1}"` |
| Featured products | `?featured=1` | `filter: "{\"featured\":1}"` |
| Product type | `?type=configurable` | `filter: "{\"type\":\"configurable\"}"` |
| Attribute facet (color/size/brand/…) | `?color=3&size=6` (or `?filter[color]=3`) | `filter: "{\"color\":\"3\",\"size\":\"6\"}"` |
| Multiple option ids for one facet | `?color=1,2,3` | `filter: "{\"color\":\"1,2,3\"}"` |

- The `price` value is `"{min},{max}"` — the comma splits min from max, **not** a thousands separator (`?price=10,200` = min 10, max 200).
- Any key that isn't reserved is a filterable attribute — new attributes (`material`, `pattern`, …) work with no schema change on either transport.
- Discover filterable attributes + option ids from [Get Attributes](/api/rest-api/shop/attributes/get-attributes) (`isFilterable: 1`).

## Products — sort & pagination

| Concept | REST | GraphQL |
|---|---|---|
| Sort | `?sort=price-asc` (or `?sort=price&order=asc`) | `sortKey: "PRICE", reverse: false` |
| Sort — newest | `?sort=created_at-desc` | `sortKey: "CREATED_AT", reverse: true` |
| Sort — name | `?sort=name-asc` | `sortKey: "TITLE", reverse: false` |
| Page size | `?per_page=30` (max 50) | `first: 30` |
| Next page | `?page=2` | `after: "<endCursor>"` |
| Total count | `X-Total-Count` response header | `pageInfo` / `totalCount` |

Full parameter and sort-token list: [Search Products (REST)](/api/rest-api/shop/products/search-product) · [Search Products (GraphQL)](/api/graphql-api/shop/queries/search-products).

## Products — read

| Capability | REST | GraphQL |
|---|---|---|
| List / search | `GET /api/shop/products` | `products` |
| Single product (by id) | `GET /api/shop/products/{id}` | `product(id: N)` |
| Single product (by url_key) | — | `product(urlKey: "slug")` — cross-locale lookup, GraphQL only |

## Categories

| Concept | REST | GraphQL |
|---|---|---|
| Flat list | `GET /api/shop/categories` | `categories` (cursor) |
| **Children of a category** | `?parent_id=N` (alias `?parentId=N`) | `treeCategories(parentId: N)` — **not** `categories`; the `categories` field has **no** `parentId` argument |
| Nested tree | `GET /api/shop/category-trees` | `treeCategories(parentId: N)` — omit `parentId` for roots |
| Single category | `GET /api/shop/categories/{id}` | `category(id: N)` |

::: warning The #1 catalog mismatch
`categories(parentId:)` does **not** exist. To get a category's children, use `treeCategories(parentId: N)` in GraphQL, or `?parent_id=N` in REST. Both list endpoints only return active (status = 1) categories.
:::

## Attributes

| Capability | REST | GraphQL |
|---|---|---|
| List attributes | `GET /api/shop/attributes` | `attributes` |
| Attribute options | `GET /api/shop/attribute-options` | `attributeOptions` |

Attributes are the source for the facet filter sidebar — read them to learn which filter keys and option ids the product filters above accept.
