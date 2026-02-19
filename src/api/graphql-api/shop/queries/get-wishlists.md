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
                "cursor": "MQ==",
                "node": {
                  "id": "/api/shop/wishlists/69",
                  "_id": 69,
                  "product": {
                    "id": "/api/shop/products/1",
                    "name": "Sample Product",
                    "price": "99.99",
                    "sku": "PROD-001",
                    "type": "simple",
                    "description": "A sample product description",
                    "baseImageUrl": "https://example.com/storage/product/1/sample-product.jpg"
                  },
                  "customer": {
                    "id": "/api/shop/customers/1",
                    "email": "customer@example.com"
                  },
                  "channel": {
                    "id": "/api/shop/channels/1",
                    "code": "default",
                    "translation": {
                      "name": "Default"
                    }
                  },
                  "createdAt": "2026-02-17T10:00:00+00:00",
                  "updatedAt": "2026-02-17T10:00:00+00:00"
                }
              }
            ],
            "pageInfo": {
              "endCursor": "MQ==",
              "startCursor": "MQ==",
              "hasNextPage": false,
              "hasPreviousPage": false
            },
            "totalCount": 1
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
