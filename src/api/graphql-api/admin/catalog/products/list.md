---
outline: false
examples:
  - id: admin-products-list
    title: Add-Product Search (Create-Order)
    description: The slim product search behind the admin Create-Order "Add Product" modal. Not the product listing — for the full datagrid with every column and filter use List Products. Returns all statuses by default, so disabled and draft products appear.
    query: |
      query AdminProducts($first: Int, $after: String, $type: String, $sku: String) {
        adminProducts(first: $first, after: $after, type: $type, sku: $sku) {
          edges {
            cursor
            node {
              id
              _id
              sku
              type
              name
              status
              price
              formattedPrice
              baseImageUrl
              isSaleable
            }
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
    variables: |
      {
        "first": 30,
        "type": "simple",
        "sku": "SP-001"
      }
    response: |
      {
        "data": {
          "adminProducts": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/admin_products/2512",
                  "_id": 2512,
                  "sku": "SP-001",
                  "type": "simple",
                  "name": "Arctic Cozy Knit Unisex Beanie",
                  "status": 1,
                  "price": 14,
                  "formattedPrice": "$14.00",
                  "baseImageUrl": "http://localhost:8000/cache/medium/product/2512/Muc0qeWks34MTZaxf38s6DBmfqMqrCxku81Uo8EB.webp",
                  "isSaleable": true
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "hasPreviousPage": false,
              "startCursor": "MA==",
              "endCursor": "MA=="
            },
            "totalCount": 1
          }
        }
      }
  - id: admin-products-search
    title: Free-Text Search
    description: The `query` argument matches SKU or product name partially, which is what the modal's search box sends as the admin types.
    query: |
      query AdminProducts($first: Int, $query: String) {
        adminProducts(first: $first, query: $query) {
          edges {
            node {
              _id
              sku
              name
              type
              isSaleable
            }
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10,
        "query": "beanie"
      }
    response: |
      {
        "data": {
          "adminProducts": {
            "edges": [
              {
                "node": {
                  "_id": 2512,
                  "sku": "SP-001",
                  "name": "Arctic Cozy Knit Unisex Beanie",
                  "type": "simple",
                  "isSaleable": true
                }
              }
            ],
            "totalCount": 1
          }
        }
      }
---

# Add-Product Search (Create-Order)

The slim product **search** behind the admin **Create Order** screen's "Add Product" modal. It answers one question — which product is the admin picking? — and returns just enough to render a picker row.

This is not the product listing. For the full admin datagrid, with every column and the Channel / Name / SKU / Attribute Family / Price / ID / Status / Type filters, use [List Products](/api/graphql-api/admin/catalog/products) (`adminCatalogProducts`). This page covers only the Create-Order picker.

## Operation

| Operation | Type |
|-----------|------|
| `adminProducts` | Query (cursor connection) |

## Arguments

| Arg | Type | Description |
|-----|------|-------------|
| `first` | Int | Page size, default `30`, capped at `50`. |
| `after` | String | Cursor from a previous `pageInfo.endCursor`. |
| `last` | Int | Page size when paging backwards. |
| `before` | String | Cursor from a previous `pageInfo.startCursor`. |
| `query` | String | Free text — partial match against SKU **or** product name. |
| `sku` | String | Exact SKU. |
| `type` | String | `simple`, `configurable`, `bundle`, `downloadable`, `grouped`, `virtual`, or `booking`. |
| `status` | Int | `0` disabled, `1` enabled. Omit to get both. |
| `categoryId` | Int | Restrict to products in one category. |
| `channel` | String | Channel code used to resolve `name` and `price`. |
| `locale` | String | Locale code used to resolve `name`. |

Arguments combine with AND — more arguments narrow the result. `query` and `sku` are separate: `query` is the partial "as you type" match, `sku` is exact.

## Node Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | ID! | Resource identifier in IRI form, `/api/admin/admin_products/<id>`. |
| `_id` | Int | Numeric product id — the value to send when adding the item to a cart. |
| `sku` | String | Product SKU. |
| `type` | String | Product type. |
| `name` | String | Resolved for the requested channel and locale. |
| `status` | Int | `1` enabled, `0` disabled. |
| `price` | Float | Minimal price for the product. |
| `formattedPrice` | String | The same price rendered in the channel currency. |
| `baseImageUrl` | String | Medium-size image URL, falling back to the theme placeholder when the product has no image. |
| `isSaleable` | Boolean | Whether the product can currently be sold. |

The row is deliberately nine fields — no variants, bundle options, images array, or attribute values. Use [Product Detail](/api/graphql-api/admin/catalog/products/products-detail) once a product is picked.

Two fields behave unlike their storefront counterparts:

- **`status` and `price` are typed numbers here**, not strings. Elsewhere in the admin catalog schema the same concepts arrive as strings — do not share a parsing helper between this query and `adminCatalogProducts`.
- **`baseImageUrl` is never null.** A product without an image gets the theme's placeholder URL, so an "is there an image?" check on this field always says yes.

## How It Differs From the Storefront Query

- **No implicit `status = 1` filter.** The storefront `products` query hides disabled products; this one returns every status so an admin can find a draft or disabled product. Pass `status: 1` explicitly if you want only enabled ones.
- **Booking products are returned.** They are listed so the admin can find them, but adding one to a draft cart fails — see [Add Item to Cart](/api/graphql-api/admin/sales/carts/add-item). This mirrors the admin panel, whose Create-Order screen ships no booking form.
- **Nine fields, not the full product schema.**

## Errors

Requires an admin Bearer token. There is no separate permission gate on the search itself.
