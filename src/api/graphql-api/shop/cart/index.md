---
outline: false
---

# Cart

The Cart menu is the shopping cart — creating a cart, adding and updating items, applying coupons, and reading the current cart with its totals. It is the first half of the buying flow; once the cart is ready you move on to [Checkout](/api/graphql-api/shop/checkout/).

## How the cart token works

Creating a cart returns a **cart token**. That token identifies the cart on every subsequent cart operation, so a guest can build up a cart without being signed in. A signed-in customer can also keep a cart; the **merge** mutation combines a guest cart into the customer's cart after they log in, so nothing is lost.

## Typical sequence

1. Create a cart, which returns the cart token.
2. Add items, updating or removing them as the shopper changes their mind.
3. Apply a coupon if the shopper has one, and remove it again if needed.
4. Read the cart at any point to show the current items and totals.

A cart only exists once something has been added to it. Reading before the first item — or after the last one is removed — returns a `Cart not found` error rather than an empty cart.

## Operations

| Operation | GraphQL field | Description |
|-----------|---------------|-------------|
| Create a cart | [`createCartToken`](/api/graphql-api/shop/mutations/create-cart) | Start a guest cart and return the token that identifies it. |
| Read the cart | [`createReadCart`](/api/graphql-api/shop/queries/get-cart) | The current cart with its items and totals. A mutation despite being a read. |
| Add an item | [`createAddProductInCart`](/api/graphql-api/shop/mutations/add-to-cart) | Add a product, including configurable, bundle, grouped, downloadable, and booking types. |
| Update quantity | [`createUpdateCartItem`](/api/graphql-api/shop/mutations/update-cart-item) | Change the quantity of one cart item. |
| Remove an item | [`createRemoveCartItem`](/api/graphql-api/shop/mutations/remove-cart-item) | Drop one item from the cart. |
| Merge carts | [`createMergeCart`](/api/graphql-api/shop/mutations/merge-cart) | Fold a guest cart into the customer's cart after login. |
| Upload a customizable file | [`createAddProductInCart`](/api/graphql-api/shop/mutations/upload-customizable-file) | Attach a file to a product's customizable option while adding it. |
| Apply a coupon | [`createApplyCoupon`](/api/graphql-api/shop/mutations/apply-coupon) | Apply a coupon code to the cart. |
| Remove a coupon | [`createRemoveCoupon`](/api/graphql-api/shop/mutations/remove-coupon) | Remove the applied coupon. |

Reading the cart is `createReadCart`, a mutation rather than a query — GraphQL clients that route reads and writes differently need to treat it as a write.

Cart operations are keyed by the cart token; a guest needs only the storefront key, while a signed-in customer also sends their Bearer token. See [Authentication](/api/graphql-api/authentication).
