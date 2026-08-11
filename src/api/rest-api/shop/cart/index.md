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

## Body Field Names Differ Per Call

The cart endpoints do not share one naming convention, and sending the wrong key is read as a missing value rather than an error about the key:

| Call | Field | Not |
|------|-------|-----|
| Add to cart | `productId`, `quantity` | — |
| Update item | `cartItemId` **and** `quantity`, both required | quantity `0` is rejected; use Remove instead |
| Remove one item | `cartItemId` | `itemIds` |
| Remove several items | `itemIds` (array) | `cartItemId` |
| Apply coupon | `couponCode` | `code` |

The item id in all of these is the **cart line** id from `items[].id`, never the product id. An unknown line id on Update answers `201` with `success: true` and changes nothing, so confirm the change by reading `items` back rather than trusting the flag.

## What Comes Back

Every call returns the whole recalculated cart: `items` with per-line prices and totals, the `subtotal` / `taxAmount` / `shippingAmount` / `grandTotal` family with `formatted*` twins, the applied `couponCode`, and the checkout fields (`billingAddress`, `shippingAddress`, `paymentMethod`, `selectedShippingRate`) that fill in during checkout. Writes add `success` and `message` on top.

Because the payload is the full cart, re-render from the response — a follow-up read is never needed after a write.

## Empty Carts and Failed Writes

Removing the last line leaves an **empty cart**, not a deleted one: the same `cartToken` keeps working and the shopper can carry on adding. A failed coupon is the one case where `success` matters — a wrong or non-qualifying code still answers `201` with the cart untouched, so branch on `success`, not on the status code.

## Operations

Every cart write is a **POST**. There is no `GET`, `PUT`, or `DELETE` on this surface — reading the cart is a POST too, because the cart is identified by the token in the `Authorization` header rather than by a path parameter.

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Create Cart](/api/rest-api/shop/cart/create-cart) | `POST /api/shop/cart-tokens` | Start a cart and receive its token. |
| [Get Cart](/api/rest-api/shop/cart/get-cart) | `POST /api/shop/cart` | Read the cart with its items and totals. |
| [Add to Cart](/api/rest-api/shop/cart/add-to-cart) | `POST /api/shop/add-product-in-cart` | Add a product of any type. |
| [Update Cart Item](/api/rest-api/shop/cart/update-cart-item) | `POST /api/shop/update-cart-item` | Change an item's quantity. |
| [Remove Cart Item](/api/rest-api/shop/cart/remove-cart-item) | `POST /api/shop/remove-cart-item` | Remove one item. |
| [Upload Customizable File](/api/rest-api/shop/cart/upload-customizable-file) | `POST /api/shop/customizable-option-files` | Attach a file to a customizable option. |
| [Apply Coupon](/api/rest-api/shop/cart/apply-coupon) | `POST /api/shop/apply-coupon` | Apply a coupon code. |
| [Remove Coupon](/api/rest-api/shop/cart/remove-coupon) | `POST /api/shop/remove-coupon` | Remove the applied coupon. |
| [Merge Cart](/api/rest-api/shop/cart/merge-cart) | `POST /api/shop/merge-carts` | Merge a guest cart into the customer's cart after login. |

There is also `POST /api/shop/remove-cart-items`, which takes an `itemIds` list and removes several lines in one call.

Every one of these returns the **updated cart** as a bare object, so a client can re-render from the response without a follow-up read.

All Cart endpoints require the storefront key and a cart token (issued by Create Cart) — see [Authentication](/api/rest-api/authentication).
