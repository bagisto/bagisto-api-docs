---
outline: false
---

# Cart

The Cart menu is the shopping cart — creating a cart, adding and updating items, applying coupons, and reading the current cart with its totals. It is the first half of the buying flow; once the cart is ready you move on to [Checkout](/api/graphql-api/shop/checkout/).

## How the cart token works

Creating a cart returns a **cart token**. That token identifies the cart on every subsequent cart operation, so a guest can build up a cart without being signed in. A signed-in customer can also keep a cart; the **merge** mutation combines a guest cart into the customer's cart after they log in, so nothing is lost.

## Typical sequence

1. Create a cart (returns the cart token).
2. Add items (and update or remove them as the shopper changes their mind).
3. Optionally apply a coupon, and remove it again if needed.
4. Read the cart at any point to show the current items and totals.

## Operations in this menu

| Operation | GraphQL field |
|-----------|---------------|
| [Get Cart](/api/graphql-api/shop/queries/get-cart) | `createReadCart` mutation |
| [CreateCart](/api/graphql-api/shop/mutations/create-cart) | `createCart` mutation |
| [AddToCart](/api/graphql-api/shop/mutations/add-to-cart) | `addItemToCart` mutation |
| [UpdateCartItem](/api/graphql-api/shop/mutations/update-cart-item) | `updateItemToCart` mutation |
| [RemoveCartItem](/api/graphql-api/shop/mutations/remove-cart-item) | `removeCartItem` mutation |
| [Merge Cart](/api/graphql-api/shop/mutations/merge-cart) | `mergeCart` mutation |
| [ApplyCoupon](/api/graphql-api/shop/mutations/apply-coupon) | `applyCoupon` mutation |
| [RemoveCoupon](/api/graphql-api/shop/mutations/remove-coupon) | `removeCoupon` mutation |

Cart operations are keyed by the cart token; a guest needs only the storefront key, while a signed-in customer also sends their Bearer token. See [Authentication](/api/graphql-api/authentication).
