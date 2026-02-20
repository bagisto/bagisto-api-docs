---
outline: false
examples:
  - id: move-wishlist-to-cart-basic
    title: Move Wishlist Item to Cart
    description: Move a wishlist item to the shopping cart and remove it from the wishlist.
    query: |
      mutation MoveWishlistToCart($input: moveWishlistToCartInput!) {
        moveWishlistToCart(input: $input) {
          wishlistToCart {
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "wishlistItemId": 68,
          "quantity": 2
        }
      }
    response: |
      {
        "data": {
          "moveWishlistToCart": {
            "wishlistToCart": {
              "message": "Item moved to cart successfully"
            }
          }
        }
      }
    commonErrors:
      - error: UNAUTHENTICATED
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: ITEM_NOT_FOUND
        cause: Wishlist item does not exist or belongs to another customer
        solution: Use a valid wishlist item numeric _id
      - error: INVALID_QUANTITY
        cause: Quantity is less than 1 or invalid
        solution: Provide a positive integer quantity
      - error: OPTIONS_REQUIRED
        cause: Configurable product requires options to be selected
        solution: Provide the required product options when moving configurable products

  - id: move-wishlist-to-cart-default-qty
    title: Move Wishlist Item to Cart - Default Quantity
    description: Move a wishlist item to the cart with the default quantity of 1 by omitting the quantity field.
    query: |
      mutation MoveWishlistToCart($input: moveWishlistToCartInput!) {
        moveWishlistToCart(input: $input) {
          wishlistToCart {
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "wishlistItemId": 68
        }
      }
    response: |
      {
        "data": {
          "moveWishlistToCart": {
            "wishlistToCart": {
              "message": "Item moved to cart successfully"
            }
          }
        }
      }
    commonErrors:
      - error: ITEM_NOT_FOUND
        cause: Wishlist item does not exist
        solution: Use a valid wishlist item numeric _id
---

# Move Wishlist Item to Cart

## About

The `moveWishlistToCart` mutation moves a product from the customer's wishlist directly into their shopping cart. Use this mutation to:

- Implement "Move to Cart" buttons on the wishlist page
- Convert saved-for-later items into active cart items
- Streamline the purchase flow from wishlist to checkout

The item is removed from the wishlist after it is successfully added to the cart.

> **Note:** `wishlistItemId` is the numeric `_id` of the wishlist item (not the IRI). The `quantity` field defaults to `1` if omitted.

## Authentication

This mutation requires customer authentication:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).

```
Authorization: Bearer <accessToken>
```

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `wishlistItemId` | `Int!` | The numeric `_id` of the wishlist item to move (not the IRI). |
| `quantity` | `Int` | Number of units to add to cart. Defaults to `1` if omitted. |
| `clientMutationId` | `String` | Optional client-side mutation identifier for tracking. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `wishlistToCart.message` | `String!` | Success message confirming the item was moved. |
