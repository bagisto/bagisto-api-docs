---
outline: false
examples:
  - id: search-products-with-filter
    title: Search Products with Search and Filter
    description: Search products by query term with sorting and filtering options.
    query: |
      query getProductsSearchFilter($query: String, $sortKey: String, $reverse: Boolean, $first: Int) {
        products(query: $query, sortKey: $sortKey, reverse: $reverse, first: $first) {
          edges {
            node {
              id
              name
              sku
              price
            }
          }
        }
      }
    variables: |
      {
        "query": "shirt",
        "sortKey": "TITLE",
        "reverse": false,
        "first": 10
      }
    response: |
      {
        "data": {
          "products": {
            "edges": [
              {
                "node": {
                  "id": "1",
                  "name": "Cotton Shirt",
                  "sku": "SHIRT-001",
                  "price": 29.99
                }
              }
            ]
          }
        }
      }
    commonErrors:
      - error: INVALID_QUERY
        cause: Search query is empty or malformed
        solution: Provide valid search term
      - error: NO_RESULTS
        cause: No products match search criteria
        solution: Try different keywords

  - id: search-products-by-category
    title: Search Products by Category ID with Pagination
    description: Retrieve products filtered by category ID using the filter argument with cursor-based pagination.
    query: |
      query getProducts {
        products(filter: "{\"category_id\": \"22\"}", first: 2, after: "Mg==") {
          edges {
            node {
              id
              sku
              price
              name
              urlKey
              baseImageUrl
              description
              shortDescription
              specialPrice
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
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              {
                "node": {
                  "id": "15",
                  "sku": "JACKET-015",
                  "price": 89.99,
                  "name": "Leather Jacket",
                  "urlKey": "leather-jacket",
                  "baseImageUrl": "https://your-domain.com/storage/product/15/image.jpg",
                  "description": "Premium quality leather jacket with a modern fit.",
                  "shortDescription": "Premium leather jacket",
                  "specialPrice": 74.99
                }
              },
              {
                "node": {
                  "id": "18",
                  "sku": "HOODIE-018",
                  "price": 49.99,
                  "name": "Classic Hoodie",
                  "urlKey": "classic-hoodie",
                  "baseImageUrl": "https://your-domain.com/storage/product/18/image.jpg",
                  "description": "Comfortable cotton hoodie for everyday wear.",
                  "shortDescription": "Cotton hoodie",
                  "specialPrice": null
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "hasPreviousPage": true,
              "startCursor": "Mg==",
              "endCursor": "NA=="
            },
            "totalCount": 12
          }
        }
      }
    commonErrors:
      - error: INVALID_FILTER
        cause: Filter JSON string is malformed or contains invalid keys
        solution: Ensure the filter is a valid JSON string with supported keys like category_id
      - error: INVALID_CATEGORY_ID
        cause: Category with specified ID does not exist
        solution: Verify the category ID exists in your store
      - error: INVALID_CURSOR
        cause: The cursor value is invalid or expired
        solution: Use a valid cursor from a previous response's pageInfo

  - id: filter-by-product-type
    title: Filter by Product Type
    description: Retrieve only configurable products using the type filter.
    query: |
      query getProducts {
        products(filter: "{\"type\": \"configurable\"}") {
          edges {
            node {
              id
              sku
            }
          }
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/products/5",
                  "sku": "CONFIG-TEE-005"
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/12",
                  "sku": "CONFIG-JACKET-012"
                }
              }
            ],
            "totalCount": 2
          }
        }
      }

  - id: filter-by-attribute
    title: Filter by Attribute (Color)
    description: Filter products by a specific attribute value such as color.
    query: |
      query getProducts {
        products(filter: "{\"color\": \"3\"}") {
          edges {
            node {
              id
              sku
            }
          }
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/products/7",
                  "sku": "SHIRT-RED-007"
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/14",
                  "sku": "DRESS-RED-014"
                }
              }
            ],
            "totalCount": 2
          }
        }
      }

  - id: filter-by-multiple-attributes
    title: Filter by Multiple Attributes
    description: Combine multiple attribute filters (color, size, brand) in a single query.
    query: |
      query getProducts {
        products(filter: "{\"color\": \"5\", \"size\": \"1\", \"brand\": \"5\"}", first: 10) {
          edges {
            node {
              id
              sku
              name
              price
            }
          }
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/products/22",
                  "sku": "POLO-BLU-S-022",
                  "name": "Blue Polo Shirt - Small",
                  "price": 34.99
                }
              }
            ],
            "totalCount": 1
          }
        }
      }

  - id: sort-title-asc
    title: Sort A–Z by Title
    description: Sort products alphabetically from A to Z.
    query: |
      query getProducts {
        products(sortKey: "TITLE", reverse: false, first: 5) {
          edges {
            node {
              id
              name
              sku
            }
          }
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              { "node": { "id": "/api/shop/products/3", "name": "Alpine Jacket", "sku": "ALP-003" } },
              { "node": { "id": "/api/shop/products/8", "name": "Basic Tee", "sku": "BAS-008" } },
              { "node": { "id": "/api/shop/products/1", "name": "Cotton Shirt", "sku": "COT-001" } }
            ],
            "totalCount": 50
          }
        }
      }

  - id: sort-title-desc
    title: Sort Z–A by Title
    description: Sort products alphabetically from Z to A.
    query: |
      query getProducts {
        products(sortKey: "TITLE", reverse: true, first: 5) {
          edges {
            node {
              id
              name
              sku
            }
          }
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              { "node": { "id": "/api/shop/products/20", "name": "Wool Sweater", "sku": "WOL-020" } },
              { "node": { "id": "/api/shop/products/15", "name": "Vintage Denim", "sku": "VIN-015" } },
              { "node": { "id": "/api/shop/products/10", "name": "Urban Sneakers", "sku": "URB-010" } }
            ],
            "totalCount": 50
          }
        }
      }

  - id: sort-newest-first
    title: Sort Newest First
    description: Sort products by creation date, newest first.
    query: |
      query getProducts {
        products(sortKey: "CREATED_AT", reverse: true, first: 10) {
          edges {
            node {
              id
              name
              sku
              price
            }
          }
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              { "node": { "id": "/api/shop/products/50", "name": "Summer Collection Dress", "sku": "SUM-050", "price": 79.99 } },
              { "node": { "id": "/api/shop/products/49", "name": "Linen Trousers", "sku": "LIN-049", "price": 59.99 } }
            ],
            "totalCount": 50
          }
        }
      }

  - id: sort-oldest-first
    title: Sort Oldest First
    description: Sort products by creation date, oldest first.
    query: |
      query getProducts {
        products(sortKey: "CREATED_AT", reverse: false, first: 10) {
          edges {
            node {
              id
              name
              sku
              price
            }
          }
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              { "node": { "id": "/api/shop/products/1", "name": "Cotton Shirt", "sku": "COT-001", "price": 29.99 } },
              { "node": { "id": "/api/shop/products/2", "name": "Classic Polo", "sku": "CLA-002", "price": 34.99 } }
            ],
            "totalCount": 50
          }
        }
      }

  - id: sort-cheapest-first
    title: Sort Cheapest First
    description: Sort products by price, lowest to highest.
    query: |
      query getProducts {
        products(sortKey: "PRICE", reverse: false, first: 10) {
          edges {
            node {
              id
              name
              sku
              price
            }
          }
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              { "node": { "id": "/api/shop/products/8", "name": "Basic Tee", "sku": "BAS-008", "price": 12.99 } },
              { "node": { "id": "/api/shop/products/3", "name": "Cotton Socks", "sku": "SOC-003", "price": 5.99 } }
            ],
            "totalCount": 50
          }
        }
      }

  - id: sort-expensive-first
    title: Sort Most Expensive First
    description: Sort products by price, highest to lowest.
    query: |
      query getProducts {
        products(sortKey: "PRICE", reverse: true, first: 10) {
          edges {
            node {
              id
              name
              sku
              price
            }
          }
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              { "node": { "id": "/api/shop/products/25", "name": "Premium Leather Jacket", "sku": "PLJ-025", "price": 499.99 } },
              { "node": { "id": "/api/shop/products/30", "name": "Designer Blazer", "sku": "DBL-030", "price": 349.99 } }
            ],
            "totalCount": 50
          }
        }
      }

  - id: new-products
    title: New Products
    description: Retrieve new products sorted by newest first — equivalent to the REST endpoint /api/products?new=1&sort=asc.
    query: |
      query getProducts {
        products(filter: "{\"new\": \"1\"}", sortKey: "CREATED_AT", reverse: false, first: 10) {
          edges {
            node {
              id
              name
              sku
              price
              urlKey
              baseImageUrl
            }
          }
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/products/48",
                  "name": "Spring Floral Dress",
                  "sku": "SPR-048",
                  "price": 65.99,
                  "urlKey": "spring-floral-dress",
                  "baseImageUrl": "https://example.com/storage/product/48/image.jpg"
                }
              }
            ],
            "totalCount": 8
          }
        }
      }

  - id: featured-products
    title: Featured Products
    description: Retrieve featured products sorted by newest first — equivalent to the REST endpoint /api/products?featured=1&sort=created_at-desc.
    query: |
      query getProducts {
        products(filter: "{\"featured\": \"1\"}", sortKey: "CREATED_AT", reverse: true, first: 12) {
          edges {
            node {
              id
              name
              sku
              price
              urlKey
              baseImageUrl
            }
          }
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/products/25",
                  "name": "Premium Leather Jacket",
                  "sku": "PLJ-025",
                  "price": 499.99,
                  "urlKey": "premium-leather-jacket",
                  "baseImageUrl": "https://example.com/storage/product/25/image.jpg"
                }
              }
            ],
            "totalCount": 5
          }
        }
      }

  - id: popular-products-by-brand
    title: Popular Products by Brand
    description: Retrieve popular products for a specific brand sorted by newest first — equivalent to the REST endpoint /api/products?sort=created_at-desc&brand=25.
    query: |
      query getProducts {
        products(filter: "{\"brand\": \"25\"}", sortKey: "CREATED_AT", reverse: true, first: 12) {
          edges {
            node {
              id
              name
              sku
              price
              urlKey
              baseImageUrl
            }
          }
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/products/40",
                  "name": "Brand Classic Sneakers",
                  "sku": "BCS-040",
                  "price": 129.99,
                  "urlKey": "brand-classic-sneakers",
                  "baseImageUrl": "https://example.com/storage/product/40/image.jpg"
                }
              }
            ],
            "totalCount": 12
          }
        }
      }
---

# Search Products

## About

The `searchProducts` query enables advanced product search with support for text queries, filtering, and sorting. Use this query to:

- Implement full-text product search functionality
- Build auto-complete and suggestion interfaces
- Filter products by multiple criteria (price range, categories, attributes)
- Sort search results by relevance, price, date, or custom fields
- Implement faceted search interfaces
- Create advanced query-based product discovery

The search supports Bagisto's advanced search syntax for building complex, multi-criteria queries. It efficiently ranks results by relevance while maintaining performance across large product catalogs.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `query` | `String` | Search term or advanced query string. Searches product name, description, SKU, and other fields. |
| `first` | `Int` | Maximum number of results per page (default: 20, max: 250). |
| `after` | `String` | Cursor for pagination. Returns results after this cursor. |
| `last` | `Int` | Maximum results for backward pagination (max: 250). |
| `before` | `String` | Cursor for backward pagination. |
| `sortKey` | `ProductSortKeys` | Sort results by: `RELEVANCE`, `TITLE`, `PRICE`, `CREATED_AT`, `POPULARITY`. Default: `RELEVANCE` |
| `reverse` | `Boolean` | Reverse sort order. Default: `false` |
| `filters` | `ProductFilterInput` | Advanced filters for price range, categories, tags, and custom attributes. |
| `filter` | `String` | JSON-encoded filter string. Supports keys like `category_id` to filter products by category (e.g. `"{\"category_id\": \"22\"}"`) |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[ProductEdge!]!` | Search result edges containing product nodes and pagination cursors. |
| `edges.node` | `Product!` | Product object with all searchable fields (name, description, SKU, tags). |
| `edges.node.score` | `Float` | Relevance score of the product match (0-1). Higher scores indicate better matches. |
| `edges.cursor` | `String!` | Pagination cursor for this result. |
| `nodes` | `[Product!]!` | Simplified array of products without edge wrapping. |
| `pageInfo` | `PageInfo!` | Pagination metadata. |
| `pageInfo.hasNextPage` | `Boolean!` | True if more results available after current page. |
| `pageInfo.endCursor` | `String` | Cursor of last result on page. |
| `facets` | `[SearchFacet!]` | Available facets for filtering (categories, price ranges, attributes). |
| `facets.name` | `String!` | Facet name (e.g., "category", "price_range"). |
| `facets.values` | `[FacetValue!]!` | Available values and counts for this facet. |
| `totalCount` | `Int!` | Total matching products across all pages. |

## Filter Reference

The `filter` argument accepts a JSON-encoded string. You can combine multiple filters in a single object.

### Available Filter Keys

| Filter Key | Type | Description | Example |
|------------|------|-------------|---------|
| `category_id` | String | Filter by category ID | `"{\"category_id\": \"22\"}"` |
| `type` | String | Filter by product type (`simple`, `configurable`, `virtual`, `downloadable`, `grouped`, `bundle`) | `"{\"type\": \"configurable\"}"` |
| `color` | String | Filter by color attribute option ID | `"{\"color\": \"3\"}"` |
| `size` | String | Filter by size attribute option ID | `"{\"size\": \"1\"}"` |
| `brand` | String | Filter by brand attribute option ID | `"{\"brand\": \"5\"}"` |
| `new` | String | Filter for new products only | `"{\"new\": \"1\"}"` |
| `featured` | String | Filter for featured products only | `"{\"featured\": \"1\"}"` |

### Combining Filters

Pass multiple keys in a single JSON object:

```graphql
products(filter: "{\"color\": \"5\", \"size\": \"1\", \"brand\": \"5\"}")
```

## Sorting Reference

Use `sortKey` and `reverse` to control result ordering:

| Sort | `sortKey` | `reverse` | Description |
|------|-----------|-----------|-------------|
| A → Z | `"TITLE"` | `false` | Alphabetical ascending |
| Z → A | `"TITLE"` | `true` | Alphabetical descending |
| Newest First | `"CREATED_AT"` | `true` | Most recently created |
| Oldest First | `"CREATED_AT"` | `false` | Earliest created |
| Cheapest First | `"PRICE"` | `false` | Lowest price first |
| Most Expensive First | `"PRICE"` | `true` | Highest price first |

## REST API Equivalents

| Use Case | REST Endpoint | GraphQL Equivalent |
|----------|---------------|--------------------|
| New Products | `/api/products?new=1&sort=asc&limit=10` | `products(filter: "{\"new\": \"1\"}", sortKey: "CREATED_AT", reverse: false, first: 10)` |
| Featured Products | `/api/products?sort=created_at-desc&limit=12` | `products(filter: "{\"featured\": \"1\"}", sortKey: "CREATED_AT", reverse: true, first: 12)` |
| Popular by Brand | `/api/products?sort=created_at-desc&brand=25&limit=12` | `products(filter: "{\"brand\": \"25\"}", sortKey: "CREATED_AT", reverse: true, first: 12)` |
| All (Price Desc) | `/api/products?sort=price-desc&limit=12` | `products(sortKey: "PRICE", reverse: true, first: 12)` |

