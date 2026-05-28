---
outline: false
examples:
  - id: admin-products-list
    title: List / Search Products (Admin)
    description: Paginated cursor-based product search for the admin Create-Order "Add Product" modal. Returns ALL statuses by default (admin sees disabled / draft products too). Booking products ARE listed but blocked when added to an admin draft cart.
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
        "type": "simple"
      }
    response: |
      {
        "data": {
          "adminProducts": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/products/142",
                  "_id": 142,
                  "sku": "SP-001",
                  "type": "simple",
                  "name": "Classic Watch",
                  "status": 1,
                  "price": 99.99,
                  "formattedPrice": "$99.99",
                  "baseImageUrl": "http://localhost:8000/cache/medium/product/142/image.webp",
                  "isSaleable": true
                }
              }
            ],
            "pageInfo": { "hasNextPage": true, "hasPreviousPage": false, "endCursor": "MA==", "startCursor": "MA==" },
            "totalCount": 231
          }
        }
      }
---

# List / Search Products (Admin)

GraphQL counterpart of `GET /api/admin/products`. Cursor pagination via
`first` / `after`.

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
