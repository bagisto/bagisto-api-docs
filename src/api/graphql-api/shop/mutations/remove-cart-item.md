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
          "createRemoveCartItem": {
            "removeCartItem": {
              "id": "/api/shop/carts/1",
              "_id": 1,
              "cartToken": "d5f1c0b1e4a94f4f8f0d2c7b6a3e9f21",
              "itemsCount": 1,
              "success": true,
              "message": "Item removed from cart successfully",
              "items": {
                "totalCount": 1,
                "edges": [
                  {
                    "node": {
                      "id": "/api/shop/cart-items/55",
                      "_id": 55,
                      "cartId": 1,
                      "productId": 24,
                      "name": "EverFresh Men's Wrinkle-Free Half Sleeve 100% Cotton Tee",
                      "sku": "ms-everfresh-tee",
                      "quantity": 1,
                      "price": 42.99,
                      "total": 42.99,
                      "productUrlKey": "everfresh-mens-wrinkle-free-half-sleeve-100-cotton-tee",
                      "canChangeQty": true
                    }
                  }
                ]
              }
            }
          }
        }
      }
    commonErrors:
      - error: Authentication token is required
        cause: Neither a customer Bearer token nor a guest cart token was sent
        solution: Send the customer's Bearer token, or the guest cart token from Create Cart
      - error: ITEM_NOT_FOUND
        cause: The cart item id does not belong to the current cart
        solution: Read the cart and use an id from items.edges[].node._id
      - error: CART_NOT_FOUND
        cause: No cart exists for the supplied token
        solution: Create a cart and add an item before removing one

  - id: remove-cart-items-bulk
    title: Remove Several Items at Once
    description: Remove more than one item in a single call with createRemoveCartItems, passing the cart item ids as itemIds. The payload is the updated cart, exactly as the single-item mutation returns.
    query: |
      mutation removeItems(
          $itemIds: Iterable
      ) {
        createRemoveCartItems(
          input: { itemIds: $itemIds }
        ) {
          removeCartItems {
            id
            _id
            cartToken
            itemsCount
            success
            message
            grandTotal
            formattedGrandTotal
            items {
              totalCount
              edges {
                node {
                  id
                  _id
                  name
                  sku
                  quantity
                  total
                }
              }
            }
          }
        }
      }
    variables: |
      {
          "itemIds": [54, 55]
      }
    response: |
      {
        "data": {
          "createRemoveCartItems": {
            "removeCartItems": {
              "id": "/api/shop/carts/1",
              "_id": 1,
              "cartToken": "d5f1c0b1e4a94f4f8f0d2c7b6a3e9f21",
              "itemsCount": 0,
              "success": true,
              "message": "Items removed from cart successfully",
              "grandTotal": 0,
              "formattedGrandTotal": "$0.00",
              "items": {
                "totalCount": 0,
                "edges": []
              }
            }
          }
        }
      }
    commonErrors:
      - error: Authentication token is required
        cause: Neither a customer Bearer token nor a guest cart token was sent
        solution: Send the customer's Bearer token, or the guest cart token from Create Cart
      - error: ITEM_NOT_FOUND
        cause: One of the supplied ids does not belong to the current cart
        solution: Read the cart first and send only ids from items.edges[].node._id
---

# Remove Cart Item

## About

Two mutations remove items from the cart:

- **`createRemoveCartItem`** takes one `cartItemId` and drops that line.
- **`createRemoveCartItems`** takes an `itemIds` list and drops several in a single call.

Both recalculate the cart's totals, discounts, and taxes, and both return the **updated cart** rather than the item that went — so a client can re-render the cart straight from the response with no follow-up read. Use the bulk form for a "remove selected" control; calling the single form in a loop re-runs the totals for every item.

Removing the last item leaves the cart empty but still readable. The cart itself only disappears once the session ends.

## Authentication

Both mutations work for a signed-in customer and for a guest:

- **Authenticated customers** — send the customer token in the `Authorization` header, obtained from [Customer Login](/api/graphql-api/shop/mutations/customer-login).
- **Guests** — send the cart token from [Create Cart](/api/graphql-api/shop/mutations/create-cart).

```
Authorization: Bearer <accessToken>
```

Sending neither fails with *"Authentication token is required"* before the cart is touched.

## Arguments

### Single item — `createRemoveCartItem`

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `cartItemId` | `Int` | ✅ Yes | Numeric id of the cart item to remove. Take it from `items.edges[].node._id` on any cart response. |
| `clientMutationId` | `String` | ❌ No | Arbitrary string echoed back in the payload. |

### Several items — `createRemoveCartItems`

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `itemIds` | `Iterable` | ✅ Yes | List of numeric cart item ids, e.g. `[54, 55]`. |
| `clientMutationId` | `String` | ❌ No | Arbitrary string echoed back in the payload. |

The input type these mutations share is the cart-wide input used across every cart operation, so the schema also lists fields such as `productId` and `couponCode`. Only the ones above apply here; anything else is ignored.

## Possible Returns

The payload wraps the updated cart — `removeCartItem` on the single mutation, `removeCartItems` on the bulk one. Both carry the same fields.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | IRI-style cart identifier. |
| `_id` | `Int` | Numeric cart id. |
| `cartToken` | `String` | Token identifying this cart, for guest sessions. |
| `itemsCount` | `Int` | Number of line items left in the cart. |
| `itemsQty` | `Int` | Total units across those lines. |
| `success` | `Boolean` | Whether the removal succeeded. |
| `message` | `String` | Result message. |
| `items` | `CartItemCursorConnection` | The remaining items — see below. |
| `subtotal` / `formattedSubtotal` | `Float` / `String` | Recalculated subtotal, raw and currency-formatted. |
| `discountAmount` / `formattedDiscountAmount` | `Float` / `String` | Recalculated discount. |
| `taxAmount` / `formattedTaxAmount` | `Float` / `String` | Recalculated tax. |
| `shippingAmount` / `formattedShippingAmount` | `Float` / `String` | Recalculated shipping. |
| `grandTotal` / `formattedGrandTotal` | `Float` / `String` | Recalculated grand total. |
| `couponCode` | `String` | Coupon still applied, or `null`. |
| `isGuest` | `Boolean!` | Whether the cart belongs to a guest. |

### Remaining item fields

Each node in the `items` connection:

| Field | Type | Description |
|-------|------|-------------|
| `id` / `_id` | `ID!` / `Int` | Cart item identifiers. **`_id` is what the remove mutations expect.** |
| `productId` | `Int` | Id of the product on this line. |
| `name` / `sku` | `String` | Product name and SKU. |
| `quantity` | `Int` | Units on this line. |
| `price` / `total` | `Float` | Unit price and line total. |
| `formattedPrice` / `formattedTotal` | `String` | The same values, currency-formatted. |
| `productUrlKey` | `String` | Storefront slug for linking back to the product. |
| `canChangeQty` | `Boolean` | `false` for event and appointment bookings, whose quantity is fixed. |

## Best Practices

1. **Send `_id`, not `id`** — the mutations take the numeric cart item id; the IRI form is rejected
2. **Use the bulk mutation for multi-select** — one call recalculates totals once, where a loop over the single mutation recalculates them per item and returns a cart that is already stale by the next iteration
3. **Re-render from the payload** — the response is the updated cart, so a follow-up [Get Cart](/api/graphql-api/shop/queries/get-cart) is wasted work
4. **Expect an empty cart, not an error** — removing the final item returns a cart with `itemsCount: 0`, which is a valid state to render
5. **Re-check the coupon** — `couponCode` survives the removal, but the discount is recalculated against the smaller cart, so read the totals back rather than reusing the previous ones

## Error Scenarios

| Scenario | Cause |
|----------|-------|
| Authentication token is required | Neither a customer Bearer token nor a guest cart token was sent. |
| Item not found | The id does not belong to the current cart, or was already removed. |
| Cart not found | No cart exists for the supplied token. |

## Related Resources

- [Get Cart](/api/graphql-api/shop/queries/get-cart) - Read the cart and its item ids
- [Add to Cart](/api/graphql-api/shop/mutations/add-to-cart) - Add a product to the cart
- [Update Cart Item](/api/graphql-api/shop/mutations/update-cart-item) - Change an item's quantity
- [Create Cart](/api/graphql-api/shop/mutations/create-cart) - Start a guest cart
- [Shop API Overview](/api/graphql-api/shop-api) - Overview of Shop API resources
