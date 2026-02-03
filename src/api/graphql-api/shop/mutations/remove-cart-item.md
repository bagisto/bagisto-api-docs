---
outline: false
examples:
  - id: remove-cart-item-simple
    title: Remove Item from Cart
    description: Remove a specific item from the shopping cart.
    query: |
      mutation removeItem(
          $cartItemId: Int!
      ) {
        createRemoveCartItem(
          input: { cartItemId: $cartItemId}
        ) {
          removeCartItem {
            id
            _id
            cartToken
            items {
              totalCount
              edges {
                node {
                  id
                  cartId
                  productId
                  name
                  sku
                  quantity
                  price
                  basePrice
                  total
                  baseTotal
                  productUrlKey
                  canChangeQty
                }
              }
            }
          }
        }
      }
    variables: |
      {
          "cartItemId": 54
      }
    response: |
      {
        "data": {
          "removeCartItem": {
            "cart": {
              "id": "1",
              "items": []
            },
            "message": "Item removed from cart successfully"
          }
        }
      }
    commonErrors:
      - error: ITEM_NOT_FOUND
        cause: Cart item ID does not exist
        solution: Verify item ID in cart
      - error: CART_NOT_FOUND
        cause: Cart session is invalid
        solution: Create a new cart and try again
---

# Remove Cart Item

## About

The `removeCartItem` mutation deletes a product from a customer's shopping cart. Use this mutation to:

- Remove items from the cart page UI
- Delete products from mini cart displays
- Clear unwanted items from ongoing checkout
- Manage cart contents programmatically
- Restore inventory reservations
- Update cart totals and pricing

This mutation removes the line item completely, updates inventory, and recalculates cart totals, discounts, and taxes.

## Authentication

This mutation supports both authenticated customers and guest users:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).
- **Guest users**: Provide the `cartToken` obtained from the [Create Cart mutation](/api/graphql-api/shop/mutations/create-cart).

```
Authorization: Bearer <accessToken>
```
## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `cartItemId` | `String!` | Cart Item id. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `cart` | `Cart!` | Updated cart after item removal. |
| `message` | `String!` | Success or error message. |
| `success` | `Boolean!` | Indicates successful removal. |
| `removedItem` | `CartItem!` | The item that was removed. |
| `cart.items` | `[CartItem!]!` | Remaining cart items. |
| `cart.itemsCount` | `Int!` | Updated item count. |
| `cart.subTotal` | `Float!` | Recalculated subtotal. |
| `cart.total` | `Float!` | Recalculated grand total. |
| `errors` | `[ErrorMessage!]` | Errors if removal failed. |

