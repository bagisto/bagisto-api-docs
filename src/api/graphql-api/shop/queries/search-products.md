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
                  "id": "/api/shop/products/144",
                  "name": "Augusta Pullover Top Shirt",
                  "sku": "AUGUSTA-PULLOVER-001",
                  "price": "0"
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/2439",
                  "name": "Azure Breeze Sleeveless Linen Shirt",
                  "sku": "AZURE-LINEN-SHIRT-001",
                  "price": "0"
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/124",
                  "name": "Clean Pink Shirt",
                  "sku": "CLEAN-PINKSHIRT-001",
                  "price": "2040"
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/2432",
                  "name": "Coral Drift Linen V-Neck Shirt",
                  "sku": "CORAL-VNECK-001",
                  "price": "0"
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/2468",
                  "name": "Minimalist Cotton Shirt",
                  "sku": "MINIMAL-COTTON-001",
                  "price": "0"
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
                  "id": "/api/shop/products/229",
                  "sku": "VUPULSE-JEANS-001",
                  "price": "600",
                  "name": "VuPulse High-Waist Wide-Leg Denim Jeans",
                  "urlKey": "vupulse-high-waist-wide-leg-denim-jeans",
                  "baseImageUrl": "https://api-demo.bagisto.com/storage/product/229/XaW3Oqh8DEq6qm4JwNJ7x9EnhjW9CllTuiJthBpX.webp",
                  "description": "Step into timeless style and comfort with our Classic Blue Denim Jeans. Crafted from high-quality, durable cotton denim with a flattering straight-leg fit.",
                  "shortDescription": "Versatile mid-blue distressed denim jeans with high-rise waist and wide straight legs.",
                  "specialPrice": null
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/232",
                  "sku": "CHIC-SKIRT-TOP-001",
                  "price": "0",
                  "name": "Chic Skirt Top for Women",
                  "urlKey": "chic-skirt-top-for-women",
                  "baseImageUrl": "https://api-demo.bagisto.com/storage/product/232/2HCv4W2RyB7zFHKanwiZiv1WpMO0sP96oklzJ3RK.webp",
                  "description": "Stylish and comfortable, this skirt top is designed to pair perfectly with any skirt. With a flattering fit and elegant details, it's ideal for both casual and dressy looks.",
                  "shortDescription": "Complete your look with this stylish skirt top, specially designed to complement all types of skirts.",
                  "specialPrice": null
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "hasPreviousPage": true,
              "startCursor": "Mw==",
              "endCursor": "NA=="
            },
            "totalCount": 19
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
                  "id": "/api/shop/products/23",
                  "sku": "LUGGAGE-BAGS-001"
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/93",
                  "sku": "PUMA-WHITE-001"
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/123",
                  "sku": "ZOE-TANK-001"
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/2495",
                  "sku": "IVORY-OVERCOAT-001"
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/2500",
                  "sku": "MINT-BLAZER-001"
                }
              }
            ],
            "totalCount": 27
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
                  "id": "/api/shop/products/114",
                  "sku": "Nike-Shoes"
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/123",
                  "sku": "ZOE-TANK-001"
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/280",
                  "sku": "OAKCRAFT-SOFA-001"
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/2419",
                  "sku": "SAGE-TSHIRT-001"
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/2468",
                  "sku": "MINIMAL-COTTON-001"
                }
              }
            ],
            "totalCount": 13
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
              { "node": { "id": "/api/shop/products/90", "name": "A Best Shoes", "sku": "main-shoes-123" } },
              { "node": { "id": "/api/shop/products/120", "name": "Acme Baby Cap", "sku": "ACME-BABYCAP-001" } },
              { "node": { "id": "/api/shop/products/22", "name": "Acme Drawstring Bag", "sku": "ACME-DRAWBAG-001" } },
              { "node": { "id": "/api/shop/products/2414", "name": "AeroLoom High-Rise Baggy Jeans", "sku": "AEROLOOM-JEANS-001" } },
              { "node": { "id": "/api/shop/products/2513", "name": "Arctic Bliss Stylish Winter Scarf", "sku": "SP-002" } }
            ],
            "totalCount": 84
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
              { "node": { "id": "/api/shop/products/123", "name": "Zoe Tank", "sku": "ZOE-TANK-001" } },
              { "node": { "id": "/api/shop/products/1093", "name": "Wooden Sofa Model 751", "sku": "SOFA-WOODENSOFA-0751" } },
              { "node": { "id": "/api/shop/products/2510", "name": "Wooden Folding Chair Rental", "sku": "WOODEN-FOLDING-CHAIR-RENTAL" } },
              { "node": { "id": "/api/shop/products/115", "name": "Women Shoulder Bags", "sku": "WOMEN-SHOULDER-001" } },
              { "node": { "id": "/api/shop/products/186", "name": "Women Shirt", "sku": "WOMEN-SHIRT-001" } }
            ],
            "totalCount": 84
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
              { "node": { "id": "/api/shop/products/2517", "name": "Arctic Frost Winter Accessories Bundle", "sku": "BP-001", "price": "0" } },
              { "node": { "id": "/api/shop/products/2516", "name": "Arctic Frost Winter Accessories", "sku": "GP-001", "price": "0" } },
              { "node": { "id": "/api/shop/products/2515", "name": "Arctic Warmth Wool Blend Socks", "sku": "SP-004", "price": "21" } },
              { "node": { "id": "/api/shop/products/2514", "name": "Arctic Touchscreen Winter Gloves", "sku": "SP-003", "price": "21" } },
              { "node": { "id": "/api/shop/products/2513", "name": "Arctic Bliss Stylish Winter Scarf", "sku": "SP-002", "price": "17" } },
              { "node": { "id": "/api/shop/products/2512", "name": "Arctic Cozy Knit Unisex Beanie", "sku": "SP-001", "price": "14" } },
              { "node": { "id": "/api/shop/products/2511", "name": "Fine Dining Table Reservation", "sku": "FINE-DINING-TABLE-RESERVATION", "price": "200" } },
              { "node": { "id": "/api/shop/products/2510", "name": "Wooden Folding Chair Rental", "sku": "WOODEN-FOLDING-CHAIR-RENTAL", "price": "109" } },
              { "node": { "id": "/api/shop/products/2509", "name": "Men's Haircut Appointment", "sku": "SALON-HAIRCUT-APPOINTMENT", "price": "60" } },
              { "node": { "id": "/api/shop/products/2508", "name": "Live Music Concert Ticket", "sku": "LIVE-MUSIC-CONCERT-TICKET", "price": "120" } }
            ],
            "totalCount": 84
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
              { "node": { "id": "/api/shop/products/1", "name": "Coastal Breeze Men's Blue Zipper Hoodie", "sku": "COASTALBREEZEMENSHOODIE", "price": "100" } },
              { "node": { "id": "/api/shop/products/2", "name": "PureStride Men's Classic White Sneakers", "sku": "PUREWHTSNEAK2023", "price": "189" } },
              { "node": { "id": "/api/shop/products/3", "name": "Midnight Blossom Women's Black Floral Print Sandals", "sku": "MIDNIGHTBLOSSOMHEELS2023", "price": "204" } },
              { "node": { "id": "/api/shop/products/22", "name": "Acme Drawstring Bag", "sku": "ACME-DRAWBAG-001", "price": "3000" } },
              { "node": { "id": "/api/shop/products/91", "name": "Bagisto Keyboard", "sku": "Bagisto-keyboard", "price": "20" } },
              { "node": { "id": "/api/shop/products/92", "name": "Bagisto Sticker", "sku": "bagisto-sticker", "price": "10" } },
              { "node": { "id": "/api/shop/products/114", "name": "Nike Shoes", "sku": "Nike-Shoes", "price": "200" } }
            ],
            "totalCount": 84
          }
        }
      }

  - id: sort-cheapest-first
    title: Sort Cheapest First
    description: Sort products by price, lowest to highest. Sorting is based on the minimumPrice column, which is the price displayed to the customer. This accounts for all price variants — including special price and configurable variant prices — making minimumPrice the primary reference for what the customer actually sees.
    query: |
      query getProductsSorted {
        products(reverse: false, sortKey: "PRICE", first: 10) {
          edges {
            node {
              id
              name
              sku
              minimumPrice
              price
              specialPrice
            }
          }
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              { "node": { "id": "/api/shop/products/3", "name": "Cotton Socks", "sku": "SOC-003", "minimumPrice": 5.99, "price": 5.99, "specialPrice": null } },
              { "node": { "id": "/api/shop/products/8", "name": "Basic Tee", "sku": "BAS-008", "minimumPrice": 10.99, "price": 12.99, "specialPrice": 10.99 } }
            ]
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
    title: Search Products - New Products
    description: Retrieve products that are flagged as "new" in the catalog, sorted by creation date descending (newest first). Equivalent to the REST endpoint /api/shop/products?new=1&sort=created_at-desc.
    query: |
      query getProducts {
        products(filter: "{\"new\": \"1\"}", sortKey: "CREATED_AT", reverse: true, first: 10) {
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
                  "baseImageUrl": "https://api-demo.bagisto.com/storage/product/48/image.jpg"
                }
              }
            ],
            "totalCount": 8
          }
        }
      }

  - id: featured-products
    title: Search Products - Featured Products
    description: Retrieve featured products sorted by newest first — equivalent to the REST endpoint /api/shop/products?featured=1&sort=created_at-desc.
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
              { "node": { "id": "/api/shop/products/2517", "name": "Arctic Frost Winter Accessories Bundle", "sku": "BP-001", "price": "0", "urlKey": "arctic-frost-winter-accessories-bundle", "baseImageUrl": "https://api-demo.bagisto.com/storage/product/2517/lW2A3FH3oKBJnnukyUyKUArdrr8dwTJxxDKthSgq.webp" } },
              { "node": { "id": "/api/shop/products/2516", "name": "Arctic Frost Winter Accessories", "sku": "GP-001", "price": "0", "urlKey": "arctic-frost-winter-accessories", "baseImageUrl": "https://api-demo.bagisto.com/storage/product/2516/5Kgto6KVm6FLMaaDEY6pwCcVoTIhX03D3OGDzwbf.webp" } },
              { "node": { "id": "/api/shop/products/2514", "name": "Arctic Touchscreen Winter Gloves", "sku": "SP-003", "price": "21", "urlKey": "arctic-touchscreen-winter-gloves", "baseImageUrl": "https://api-demo.bagisto.com/storage/product/2514/g8lR0Ity8HcpE20A4yAkX5wvLY5RlTC67NJKyyg6.webp" } },
              { "node": { "id": "/api/shop/products/2513", "name": "Arctic Bliss Stylish Winter Scarf", "sku": "SP-002", "price": "17", "urlKey": "arctic-bliss-stylish-winter-scarf", "baseImageUrl": "https://api-demo.bagisto.com/storage/product/2513/odMU05kvHJqzuDUdHGy9dlD3qAq1FEUbkQbkg3Wk.webp" } },
              { "node": { "id": "/api/shop/products/2512", "name": "Arctic Cozy Knit Unisex Beanie", "sku": "SP-001", "price": "14", "urlKey": "arctic-cozy-knit-unisex-beanie", "baseImageUrl": "https://api-demo.bagisto.com/storage/product/2512/Muc0qeWks34MTZaxf38s6DBmfqMqrCxku81Uo8EB.webp" } },
              { "node": { "id": "/api/shop/products/2511", "name": "Fine Dining Table Reservation", "sku": "FINE-DINING-TABLE-RESERVATION", "price": "200", "urlKey": "fine-dining-table-reservation", "baseImageUrl": "https://api-demo.bagisto.com/storage/product/2511/lw253CbVba9nRZVUGy9atW9t85ADE2UwldssE8t6.webp" } },
              { "node": { "id": "/api/shop/products/2507", "name": "Professional Photography Session", "sku": "PROFESSIONAL-PHOTOGRAPHY-SESSION", "price": "100", "urlKey": "professional-photography-session", "baseImageUrl": "https://api-demo.bagisto.com/storage/product/2507/1jO3Pb5UA89ZaVsp1cnlICSFgZKlwy6lPlDJynGu.webp" } },
              { "node": { "id": "/api/shop/products/2506", "name": "Complete Personal Finance Guide (eBook PDF)", "sku": "COMPLETE-PERSONAL-FINANCE-GUIDE-EBOOK", "price": "70", "urlKey": "complete-personal-finance-guide-ebook-pdf", "baseImageUrl": "https://api-demo.bagisto.com/storage/product/2506/XY0sCaNbWfeXDntNFbYnlL6N5uOJ9tfyR7AtntSf.webp" } },
              { "node": { "id": "/api/shop/products/2505", "name": "HD Streaming Subscription - 1 Month Access", "sku": "HD-STREAMING-SUBSCRIPTION-1-MONTH", "price": "64", "urlKey": "hd-streaming-subscription-1-month-access", "baseImageUrl": "https://api-demo.bagisto.com/storage/product/2505/sCwS1QRNlJHLPjw5UzxYSR21oqYbMvo4UNRYklME.webp" } }
            ],
            "totalCount": 56
          }
        }
      }

  - id: popular-products-by-brand
    title: Popular Products by Brand
    description: Retrieve popular products for a specific brand sorted by newest first — equivalent to the REST endpoint /api/shop/products?sort=created_at-desc&brand=25.
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
                  "id": "/api/shop/products/2500",
                  "name": "Mint Axis Unisex Tailored Blazer",
                  "sku": "MINT-BLAZER-001",
                  "price": "0",
                  "urlKey": "mint-axis-unisex-tailored-blazer",
                  "baseImageUrl": "https://api-demo.bagisto.com/storage/product/2500/T97yKJVNKlmi6GXoqKl8FNqfM8115Wxo6jw4WhPF.webp"
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/2495",
                  "name": "Ivory Frost Classic Overcoat",
                  "sku": "IVORY-OVERCOAT-001",
                  "price": "0",
                  "urlKey": "ivory-frost-classic-overcoat",
                  "baseImageUrl": "https://api-demo.bagisto.com/storage/product/2495/FFHxE9HE2Ezt9aqvr6s3fPPCc1nrjwMNna1o1wTQ.webp"
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/2493",
                  "name": "Aurora Cream Winter Blazer Coat",
                  "sku": "AURORA-BLAZER-001",
                  "price": "5000",
                  "urlKey": "aurora-cream-winter-blazer-coat",
                  "baseImageUrl": "https://api-demo.bagisto.com/storage/product/2493/wnbCVz0T8R3sxMMlcYsTICoNEj8WK4M3mIL62YgE.webp"
                }
              }
            ],
            "totalCount": 3
          }
        }
      }
---

# Search Products

## About

Search the catalog by keyword. Pass a `query` argument to the `products` field:

```graphql
products(query: "shirt", first: 10)
```

A product matches when the keyword appears anywhere in its **name** or its **SKU**. Partial words count — searching `cott` returns every product whose name contains *Cotton*.

This is the same field that powers [List Products](/api/graphql-api/shop/queries/get-products). Results come back in the same shape as a listing, so both screens render with the same code, and filtering, sorting, and pagination work identically. Use it to:

- Implement product search over the catalog
- Build auto-complete and suggestion interfaces
- Narrow a search further by category, type, price range, or attribute
- Order search results by title, price, or date

The sections below cover what matters on a search screen. [List Products](/api/graphql-api/shop/queries/get-products) carries the full argument reference.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `query` | `String` | Search term. Matched as a partial string against the product name and SKU. Descriptions and attribute values are not searched. |
| `first` | `Int` | Number of results per page. Default: `30` |
| `after` | `String` | Cursor for pagination. Returns results after this cursor. |
| `last` | `Int` | Number of results for backward pagination. Default: `30` |
| `before` | `String` | Cursor for backward pagination. |
| `sortKey` | `String` | Sort results by: `ID`, `TITLE` (alias `NAME`), `PRICE`, `CREATED_AT`, `UPDATED_AT`. Case-insensitive. Default: `ID` |
| `reverse` | `Boolean` | Reverse sort order. Default: `false` |
| `filter` | `String` | JSON-encoded filter string. Accepts `type`, `sku`, `category_id`, `price_from`, `price_to`, `new`, `featured`, and any filterable attribute code (e.g. `"{\"category_id\": \"22\"}"`). |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[ProductEdge]` | Search result edges containing product nodes and pagination cursors. |
| `edges.node` | `Product` | The matched product, carrying the same fields as any catalog listing row. |
| `edges.cursor` | `String` | Pagination cursor for this result. |
| `pageInfo` | `ProductPageInfo!` | Pagination metadata. |
| `pageInfo.hasNextPage` | `Boolean` | Whether more results follow the current page. |
| `pageInfo.hasPreviousPage` | `Boolean` | Whether results precede the current page. |
| `pageInfo.startCursor` | `String` | Cursor of the first result on the page. |
| `pageInfo.endCursor` | `String` | Cursor of the last result on the page. |
| `totalCount` | `Int!` | Total matching products across all pages. |

## Narrowing a Search

A search accepts the same `filter` argument as the listing, so a keyword and a category or attribute selection combine into one request:

```graphql
query searchInCategory($query: String, $filter: String) {
  products(query: $query, filter: $filter, first: 10) {
    totalCount
    edges {
      node {
        _id
        sku
        name
        formattedPrice
      }
    }
  }
}
```

```json
{
  "query": "shirt",
  "filter": "{\"type\": \"configurable\", \"color\": \"3\"}"
}
```

The keyword and every filter key intersect — each one narrows the result further. The complete key list, the escaping rules, and the price-range caveats are on [List Products](/api/graphql-api/shop/queries/get-products#filter-keys).

## Ordering Search Results

Search results are **not ranked by relevance**. Every match is returned in the order given by `sortKey`, and omitting it falls back to product ID — effectively arbitrary for a shopper. A search screen should therefore always set an explicit order, most often `TITLE` ascending or `PRICE` ascending.

The available sort keys, their `reverse` combinations, and the reason `PRICE` orders on `minimumPrice` rather than `price` are documented on [List Products](/api/graphql-api/shop/queries/get-products#sorting).

## REST API Equivalents

| Use Case | REST Endpoint | GraphQL Equivalent |
|----------|---------------|--------------------|
| Keyword search | `/api/shop/products?query=shirt&per_page=10` | `products(query: "shirt", first: 10)` |
| New Products | `/api/shop/products?new=1&sort=created_at-desc&per_page=10` | `products(filter: "{\"new\": \"1\"}", sortKey: "CREATED_AT", reverse: true, first: 10)` |
| Featured Products | `/api/shop/products?featured=1&sort=created_at-desc&per_page=12` | `products(filter: "{\"featured\": \"1\"}", sortKey: "CREATED_AT", reverse: true, first: 12)` |
| Popular by Brand | `/api/shop/products?brand=25&sort=created_at-desc&per_page=12` | `products(filter: "{\"brand\": \"25\"}", sortKey: "CREATED_AT", reverse: true, first: 12)` |
| All (Price Desc) | `/api/shop/products?sort=price-desc&per_page=12` | `products(sortKey: "PRICE", reverse: true, first: 12)` |

