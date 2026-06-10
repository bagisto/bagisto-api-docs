---
outline: false
examples:
  - id: admin-products-list
    title: Add-Product Search (Create-Order)
    description: The slim product search behind the admin Create-Order "Add Product" modal. NOT the product listing — for the full product list with all columns and filters use the List Products datagrid. Returns ALL statuses by default (admin sees disabled / draft products too). Booking products ARE listed but blocked when added to an admin draft cart.
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
          pageInfo { hasNextPage endCursor }
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
            "pageInfo": { "hasNextPage": false, "hasPreviousPage": false, "endCursor": "MA==", "startCursor": "MA==" },
            "totalCount": 1
          }
        }
      }
---

# Add-Product Search (Create-Order)

The slim product **search** that powers the admin **Create Order** screen's
"Add Product" modal — the GraphQL counterpart of `GET /api/admin/products`.
Cursor pagination via `first` / `after`.

::: warning This is not the product listing
For the full admin product listing — every column plus all the
Channel / Name / SKU / Attribute Family / Price / ID / Status / Type filters —
use [List Products](/api/graphql-api/admin/catalog/products) (the
`adminCatalogProducts` query). This page documents only the Create-Order search
tool.
:::

## Operation

| Operation | Type |
|-----------|------|
| `adminProducts(first: Int, after: String, query: String, sku: String, type: String, status: Int, categoryId: Int, channel: String, locale: String)` | Query (cursor) |

## Arguments

| Arg | Type | Description |
|-----|------|-------------|
| `first` | `Int` | Page size (default `30`, max `50`) |
| `after` | `String` | Cursor from a previous `pageInfo.endCursor` |
| `query` | `String` | Free-text — matches SKU OR product name (partial) |
| `sku` | `String` | Exact SKU |
| `type` | `String` | `simple`, `configurable`, `bundle`, `downloadable`, `grouped`, `virtual`, `booking` |
| `status` | `Int` | `0` (disabled) or `1` (enabled) — omit to get both |
| `categoryId` | `Int` | Filter by category ID |
| `channel` | `String` | Channel code for value resolution |
| `locale` | `String` | Locale code for value resolution |

## How it differs from the storefront `products` query

- No automatic `status = 1` filter — admin sees all statuses.
- Booking products are listed (but cannot be added to an admin draft cart — see
  the [Add Item to Cart](/api/graphql-api/admin/sales/carts/add-item) errors
  list).
- Returns a slim row (9 fields) rather than the full storefront product schema.

## Booking Products

Booking products are returned by this query for admin visibility. Attempting to
add one to an admin draft cart via `addItemAdminCart` returns an error message
"Booking products cannot be added to an admin draft order." — this matches the
Bagisto monolith Create-Order UI which has no booking partial.
