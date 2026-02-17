---
outline: false
examples:
  - id: toggle-wishlist-add
    title: Toggle Wishlist - Add Item
    description: Toggle a product in the wishlist. If the product is not in the wishlist, it gets added.
    query: |
      mutation ToggleWishlist($input: toggleWishlistInput!) {
        toggleWishlist(input: $input) {
          wishlist {
            id
            _id
            product {
              id
              name
              price
            }
            createdAt
          }
        }
      }
    variables: |
      {
        "input": {
          "productId": 1
        }
      }
    response: |
      {
        "data": {
          "toggleWishlist": {
            "wishlist": {
              "id": "/api/shop/wishlists/71",
              "_id": 71,
              "product": {
                "id": "/api/shop/products/1",
                "name": "Sample Product",
                "price": "99.99"
              },
              "createdAt": "2026-02-17T10:00:00+00:00"
            }
          }
        }
      }
    commonErrors:
      - error: UNAUTHENTICATED
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: PRODUCT_NOT_FOUND
        cause: The product ID does not exist
        solution: Use a valid product ID that exists in the catalog

  - id: toggle-wishlist-remove
    title: Toggle Wishlist - Remove Item
    description: Toggle a product that already exists in the wishlist. The item is removed and an error-style message is returned.
    query: |
      mutation ToggleWishlist($input: toggleWishlistInput!) {
        toggleWishlist(input: $input) {
          wishlist {
            id
            _id
            product {
              id
              name
              price
            }
            createdAt
          }
        }
      }
    variables: |
      {
        "input": {
          "productId": 1
        }
      }
    response: |
      {
        "errors": [
          {
            "message": "Item Successfully Removed From Wishlist"
          }
        ]
      }
    commonErrors:
      - error: UNAUTHENTICATED
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
---

# Toggle Wishlist Item

## About

The `toggleWishlist` mutation adds or removes a product from the authenticated customer's wishlist based on its current state. Use this mutation to:

- Implement toggle-style wishlist buttons (heart icons)
- Add a product if it's not in the wishlist
- Remove a product if it's already in the wishlist
- Simplify wishlist UI logic with a single mutation

> **Note:** When a product is **removed** from the wishlist, the API returns an error-style response with the message `"Item Successfully Removed From Wishlist"`. When a product is **added**, a standard success response with the wishlist object is returned.

## Authentication

This mutation requires customer authentication:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).

```
Authorization: Bearer <accessToken>
```

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `productId` | `Int` | The ID of the product to toggle in the wishlist. |
| `clientMutationId` | `String` | Optional client-side mutation identifier for tracking. |

## Possible Returns

**When item is added:**

| Field | Type | Description |
|-------|------|-------------|
| `wishlist` | `Wishlist!` | The newly created wishlist item. |
| `wishlist.id` | `ID!` | IRI identifier (e.g. `/api/shop/wishlists/71`). |
| `wishlist._id` | `Int!` | Numeric identifier. |
| `wishlist.product` | `Product!` | The associated product. |
| `wishlist.createdAt` | `String` | Timestamp when the item was added. |

**When item is removed:**

| Field | Type | Description |
|-------|------|-------------|
| `errors[].message` | `String!` | `"Item Successfully Removed From Wishlist"` |
