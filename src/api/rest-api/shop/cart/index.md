---
outline: false
apiType: rest
---

# Cart

The Cart menu is the shopping basket: create a cart, add and update items, remove items, and apply or remove a coupon. Every response returns the up-to-date cart with its items and recalculated totals, so a client never needs a separate refresh call after a change.

## The cart token

A cart is identified by a **cart token**. Create a cart to obtain it, then send it as `Authorization: Bearer <cartToken>` on every subsequent cart request (and into checkout). The cart token works for both guests and logged-in customers — guests can build a cart without an account, and the same token carries the cart through checkout.

## Coupons

Apply a coupon code to discount the cart, or remove it to revert. The cart totals in the response reflect the coupon immediately.

## Merging a guest cart

When a shopper builds a cart as a guest and then logs in, merge the guest cart into their customer cart so nothing is lost. Call [Merge Cart](/api/rest-api/shop/cart/merge-cart) with the **customer** Bearer token and the guest cart's `cart_id`: items with the same product and type have their quantities added, other items are copied over, the guest cart is deactivated, and the response is the up-to-date customer cart. Merge requires an authenticated customer (`401` for a guest) and a valid guest cart id (`404` otherwise).

## Operations in this menu

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Get Cart](/api/rest-api/shop/cart/get-cart) | `GET /api/shop/cart` | Read the current cart with items and totals. |
| [Create Cart](/api/rest-api/shop/cart/create-cart) | `POST /api/shop/cart` | Create a cart and obtain its token. |
| [Add to Cart](/api/rest-api/shop/cart/add-to-cart) | `POST /api/shop/add-product-in-cart` | Add a product to the cart. |
| [Update Cart Item](/api/rest-api/shop/cart/update-cart-item) | `PUT /api/shop/update-cart-item` | Change an item's quantity. |
| [Remove Cart Item](/api/rest-api/shop/cart/remove-cart-item) | `DELETE /api/shop/remove-cart-item` | Remove an item from the cart. |
| [Apply Coupon](/api/rest-api/shop/cart/apply-coupon) | `POST /api/shop/apply-coupon` | Apply a coupon code. |
| [Remove Coupon](/api/rest-api/shop/cart/remove-coupon) | `DELETE /api/shop/remove-coupon` | Remove the applied coupon. |
| [Merge Cart](/api/rest-api/shop/cart/merge-cart) | `POST /api/shop/merge-carts` | Merge a guest cart into the customer cart after login. |

All Cart endpoints require the storefront key and a cart token (issued by Create Cart) — see [Authentication](/api/rest-api/authentication).
