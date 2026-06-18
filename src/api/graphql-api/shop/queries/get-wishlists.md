---
outline: false
examples:
  - id: get-wishlists-basic
    title: Get All Wishlist Items
    description: Retrieve paginated wishlist items for the authenticated customer using cursor-based pagination.
    query: |
      query GetAllWishlists($first: Int, $after: String) {
        wishlists(first: $first, after: $after) {
          edges {
            cursor
            node {
              id
              _id
              product {
                id
                name
                price
                sku
                type
                description
                baseImageUrl
              }
              customer {
                id
                email
              }
              channel {
                id
                code
                translation {
                  name
                }
              }
              createdAt
              updatedAt
            }
          }
          pageInfo {
            endCursor
            startCursor
            hasNextPage
            hasPreviousPage
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10,
        "after": null
      }
    response: |
      {
        "data": {
          "wishlists": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/shop/wishlists/78",
                  "_id": 78,
                  "product": {
                    "id": "/api/shop/products/2500",
                    "name": "Mint Axis Unisex Tailored Blazer",
                    "price": "0",
                    "sku": "MINT-BLAZER-001",
                    "type": "configurable",
                    "description": "The Mint Axis Unisex Tailored Blazer is built for those who lead with style, not trends. Featuring a structured yet comfortable silhouette, this blazer balances precision tailoring with a contemporary mint tone.",
                    "baseImageUrl": "https://api-demo.bagisto.com/storage/product/2500/T97yKJVNKlmi6GXoqKl8FNqfM8115Wxo6jw4WhPF.webp"
                  },
                  "customer": {
                    "id": "/api/shop/customers/122",
                    "email": "john.doe@example.com"
                  },
                  "channel": {
                    "id": "/api/shop/channels/1",
                    "code": "default",
                    "translation": {
                      "name": "bagisto store"
                    }
                  },
                  "createdAt": "2026-04-06T18:44:50+05:30",
                  "updatedAt": "2026-04-06T18:44:50+05:30"
                }
              },
              {
                "cursor": "MQ==",
                "node": {
                  "id": "/api/shop/wishlists/79",
                  "_id": 79,
                  "product": {
                    "id": "/api/shop/products/2495",
                    "name": "Ivory Frost Classic Overcoat",
                    "price": "0",
                    "sku": "IVORY-OVERCOAT-001",
                    "type": "configurable",
                    "description": "The Ivory Frost Classic Overcoat blends modern simplicity with timeless winter design. Crafted in a smooth, insulating fabric, it offers dependable warmth while maintaining a lightweight, structured feel.",
                    "baseImageUrl": "https://api-demo.bagisto.com/storage/product/2495/FFHxE9HE2Ezt9aqvr6s3fPPCc1nrjwMNna1o1wTQ.webp"
                  },
                  "customer": {
                    "id": "/api/shop/customers/122",
                    "email": "john.doe@example.com"
                  },
                  "channel": {
                    "id": "/api/shop/channels/1",
                    "code": "default",
                    "translation": {
                      "name": "bagisto store"
                    }
                  },
                  "createdAt": "2026-04-06T18:44:51+05:30",
                  "updatedAt": "2026-04-06T18:44:51+05:30"
                }
              },
              {
                "cursor": "Mg==",
                "node": {
                  "id": "/api/shop/wishlists/80",
                  "_id": 80,
                  "product": {
                    "id": "/api/shop/products/2359",
                    "name": "Horizon Arc 49\" OLED Curved Gaming Monitor",
                    "price": "4000",
                    "sku": "HORIZON-MONITOR-49",
                    "type": "simple",
                    "description": "Lightning-fast 240Hz refresh and 0.03ms GtG response eliminate motion blur, supported by NVIDIA G-Sync and AMD FreeSync Premium Pro for smooth gameplay without stuttering.",
                    "baseImageUrl": "https://api-demo.bagisto.com/storage/product/2359/jTCVFLzBdbUfmJzDnLa6puGF8kRqEk5NNDYPjN09.webp"
                  },
                  "customer": {
                    "id": "/api/shop/customers/122",
                    "email": "john.doe@example.com"
                  },
                  "channel": {
                    "id": "/api/shop/channels/1",
                    "code": "default",
                    "translation": {
                      "name": "bagisto store"
                    }
                  },
                  "createdAt": "2026-04-06T18:44:54+05:30",
                  "updatedAt": "2026-04-06T18:44:54+05:30"
                }
              },
              {
                "cursor": "Mw==",
                "node": {
                  "id": "/api/shop/wishlists/81",
                  "_id": 81,
                  "product": {
                    "id": "/api/shop/products/122",
                    "name": "Classic Cowboy Hat",
                    "price": "149.99",
                    "sku": "COWBOY-HAT-001",
                    "type": "simple",
                    "description": "A timeless cowboy hat crafted from premium materials, perfect for outdoor adventures and western-style fashion.",
                    "baseImageUrl": "https://api-demo.bagisto.com/storage/product/122/P9n1dbmgM4UOBT3zUAEGCn4wpKi0GjPGhgS1jZe7.webp"
                  },
                  "customer": {
                    "id": "/api/shop/customers/122",
                    "email": "john.doe@example.com"
                  },
                  "channel": {
                    "id": "/api/shop/channels/1",
                    "code": "default",
                    "translation": {
                      "name": "bagisto store"
                    }
                  },
                  "createdAt": "2026-04-06T18:44:55+05:30",
                  "updatedAt": "2026-04-06T18:44:55+05:30"
                }
              }
            ],
            "pageInfo": {
              "endCursor": "Mw==",
              "startCursor": "MA==",
              "hasNextPage": false,
              "hasPreviousPage": false
            },
            "totalCount": 4
          }
        }
      }
    commonErrors:
      - error: UNAUTHENTICATED
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token

  - id: get-wishlists-newest-first
    title: Get Wishlist Items - Newest First
    description: Sort the wishlist so the most recently added item appears first by passing sort and order.
    query: |
      query GetAllWishlists($first: Int, $sort: String, $order: String) {
        wishlists(first: $first, sort: $sort, order: $order) {
          edges {
            node {
              id
              _id
              product {
                id
                name
                sku
              }
              createdAt
            }
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10,
        "sort": "created_at",
        "order": "desc"
      }
    response: |
      {
        "data": {
          "wishlists": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/wishlists/81",
                  "_id": 81,
                  "product": {
                    "id": "/api/shop/products/122",
                    "name": "Classic Cowboy Hat",
                    "sku": "COWBOY-HAT-001"
                  },
                  "createdAt": "2026-04-06T18:44:55+05:30"
                }
              },
              {
                "node": {
                  "id": "/api/shop/wishlists/78",
                  "_id": 78,
                  "product": {
                    "id": "/api/shop/products/2500",
                    "name": "Mint Axis Unisex Tailored Blazer",
                    "sku": "MINT-BLAZER-001"
                  },
                  "createdAt": "2026-04-06T18:44:50+05:30"
                }
              }
            ],
            "totalCount": 4
          }
        }
      }
    commonErrors:
      - error: UNAUTHENTICATED
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token

  - id: get-wishlists-paginated
    title: Get Wishlist Items - Next Page
    description: Fetch the next page of wishlist items using the endCursor from the previous response.
    query: |
      query GetAllWishlists($first: Int, $after: String) {
        wishlists(first: $first, after: $after) {
          edges {
            cursor
            node {
              id
              _id
              product {
                id
                name
                baseImageUrl
              }
              createdAt
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10,
        "after": "MQ=="
      }
    response: |
      {
        "data": {
          "wishlists": {
            "edges": [],
            "pageInfo": {
              "endCursor": null,
              "hasNextPage": false
            },
            "totalCount": 1
          }
        }
      }
    commonErrors:
      - error: INVALID_CURSOR
        cause: The cursor value is invalid or expired
        solution: Use a valid cursor from a previous response's pageInfo
---

# Get Wishlists

## About

The `wishlists` query retrieves a paginated list of the authenticated customer's wishlist items. Use this query to:

- Display the customer's wishlist page
- Show wishlist item counts in navigation
- Build wishlist displays with product details
- Implement pagination for large wishlists
- Show channel-specific wishlist data

This query uses cursor-based pagination and returns wishlist items with their associated product, customer, and channel data.

## Authentication

This query requires customer authentication:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).

```
Authorization: Bearer <accessToken>
```

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `first` | `Int` | Number of items to return per page. |
| `after` | `String` | Cursor for pagination. Use `endCursor` from previous response. |
| `sort` | `String` | Column to sort by — `id` (default) or `created_at`. The compound form `created_at-desc` (`<column>-<direction>`) is also accepted. |
| `order` | `String` | Sort direction — `asc` (default) or `desc`. Use `desc` to return the most recently added items first. |

By default the wishlist is returned oldest-first (the order items were added). Pass `sort: "created_at", order: "desc"` to show the newest item at the top.

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[WishlistEdge!]` | Array of wishlist edges with cursor and node. |
| `edges.cursor` | `String!` | Cursor for this edge, used in pagination. |
| `edges.node` | `Wishlist!` | The wishlist item object. |
| `edges.node.id` | `ID!` | IRI identifier (e.g. `/api/shop/wishlists/69`). |
| `edges.node._id` | `Int!` | Numeric identifier. |
| `edges.node.product` | `Product!` | Associated product with id, name, sku, price, type, description, baseImageUrl. |
| `edges.node.customer` | `Customer!` | Associated customer with id, email. |
| `edges.node.channel` | `Channel!` | Associated channel with id, code, translation. |
| `edges.node.createdAt` | `String` | Timestamp when the item was added. |
| `edges.node.updatedAt` | `String` | Timestamp when the item was last updated. |
| `pageInfo` | `PageInfo!` | Pagination metadata. |
| `totalCount` | `Int!` | Total number of wishlist items. |
