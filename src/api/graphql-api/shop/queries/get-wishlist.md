---
outline: false
examples:
  - id: get-wishlist-by-id
    title: Get Single Wishlist Item
    description: Retrieve a specific wishlist item by its IRI.
    query: |
      query GetWishlist($id: ID!) {
        wishlist(id: $id) {
          id
          _id
          product {
            id
            name
            price
            baseImageUrl
          }
          customer {
            id
            email
          }
          channel {
            id
            code
          }
          createdAt
          updatedAt
        }
      }
    variables: |
      {
        "id": "/api/shop/wishlists/69"
      }
    response: |
      {
        "data": {
          "wishlist": {
            "id": "/api/shop/wishlists/69",
            "_id": 69,
            "product": {
              "id": "/api/shop/products/1",
              "name": "Sample Product",
              "price": "99.99",
              "baseImageUrl": "https://example.com/storage/product/1/sample-product.jpg"
            },
            "customer": {
              "id": "/api/shop/customers/1",
              "email": "customer@example.com"
            },
            "channel": {
              "id": "/api/shop/channels/1",
              "code": "default"
            },
            "createdAt": "2026-02-17T10:00:00+00:00",
            "updatedAt": "2026-02-17T10:00:00+00:00"
          }
        }
      }
    commonErrors:
      - error: ITEM_NOT_FOUND
        cause: Wishlist item ID does not exist or does not belong to the customer
        solution: Use a valid wishlist item IRI from the wishlists collection query
      - error: UNAUTHENTICATED
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
---

# Get Wishlist Item

## About

The `wishlist` query retrieves a single wishlist item by its IRI identifier. Use this query to:

- Fetch detailed information about a specific wishlist item
- Display wishlist item details on a detail page
- Verify a product exists in the customer's wishlist

## Authentication

This query requires customer authentication:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).

```
Authorization: Bearer <accessToken>
```

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `id` | `ID!` | The IRI of the wishlist item (e.g. `/api/shop/wishlists/69`). |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | IRI identifier (e.g. `/api/shop/wishlists/69`). |
| `_id` | `Int!` | Numeric identifier. |
| `product` | `Product!` | Associated product with id, name, price, etc. |
| `customer` | `Customer!` | Associated customer with id, email. |
| `channel` | `Channel!` | Associated channel with id, code. |
| `createdAt` | `String` | Timestamp when the item was added. |
| `updatedAt` | `String` | Timestamp when the item was last updated. |
