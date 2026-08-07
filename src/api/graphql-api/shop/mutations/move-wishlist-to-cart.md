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
          "wishlistItemId": 77,
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

The mutation returns the **updated cart**, not the wishlist — so a client can re-render the cart from the response without a follow-up read.

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

The payload is the cart the item landed in. These are the fields worth selecting; the full cart shape is documented on [Get Cart](/api/graphql-api/shop/queries/get-cart).

| Field | Type | Description |
|-------|------|-------------|
| `wishlistToCart.id` | `ID!` | IRI-style cart identifier. |
| `wishlistToCart._id` | `Int` | Numeric cart id. |
| `wishlistToCart.message` | `String` | Result message confirming the move. |
| `wishlistToCart.success` | `Boolean` | Whether the move succeeded. |
| `wishlistToCart.itemsCount` | `Int` | Line items in the cart after the move. |
| `wishlistToCart.items` | `CartItemCursorConnection` | The cart's items, including the one just moved. |
| `wishlistToCart.grandTotal` | `Float` | Recalculated grand total. |
| `wishlistToCart.formattedGrandTotal` | `String` | The same total, currency-formatted. |
| `wishlistToCart.cartToken` | `String` | Token identifying the cart. |
