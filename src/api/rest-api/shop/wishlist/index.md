---
outline: false
apiType: rest
---

# Wishlist

The Wishlist menu lets a logged-in customer save products to come back to later. A customer can list their wishlist, add or toggle a product, remove a single item, clear the whole list, or move a saved item straight into the cart.

## When a client uses this

The wishlist is per customer and **scoped to the current channel** — the same shopper sees a different list on each channel, and guests have no wishlist at all.

Three of the operations write to it in different ways: **Create** only adds and rejects an already-saved product, **Toggle** adds or removes depending on the current state (the right call for a heart icon), and **Move to Cart** adds the product to the cart and removes the wishlist row in one step.

Read responses identify the saved product by **path reference** (`/api/shop/products/126`), not as a nested object, so a wishlist page fetches those products separately. The GraphQL wishlist query returns them nested in a single request.

## Which Write Call to Use

| Situation | Call | Why |
|-----------|------|-----|
| Heart icon that must both save and un-save | **Toggle** | One call handles either direction; the response's `message` says which way it went. |
| "Add to wishlist" that only ever adds | **Create** | Rejects an already-saved product with `400`, which a toggle-style control would have to special-case. |
| Removing a row you already listed | **Delete** | Addresses the wishlist row id, so no product lookup is needed. |
| Saving a cart line for later | **Move to Cart**, in reverse | There is no single "move to wishlist" call; add to the wishlist, then remove the cart line. |

Toggle and Create both answer `201`, and Toggle answers `201` even when it removed something — read `message`, not the status code.

## Reading a Wishlist Page

A wishlist row carries `id`, timestamps, and path references to the product, customer, and channel. It carries no name, price, or image, so rendering a wishlist means taking the numeric id from the end of each `product` path and fetching those products. Pagination lives in the `X-Total-Count`, `X-Page`, `X-Per-Page`, and `X-Total-Pages` headers, not in the body — the default page size here is 30.

Sorting is limited to `?sort=id|created_at` with `&order=asc|desc`; the default is oldest first, so a "recently saved" view needs `?sort=created_at&order=desc`.

## Moving to the Cart

Move to Cart adds the product and deletes the wishlist row in one call, returning the recalculated cart. It only works for products the cart can accept without option choices — a configurable or bundled product fails with `Product has missing required options`, because a wishlist row stores no option selections. Send those shoppers to the product page instead.

## Flags on the Catalog

Product listing and detail responses carry an `isInWishlist` flag per product, so a catalog grid can highlight saved items without cross-referencing this menu. It is `0` for guests, and it is channel-scoped exactly as the wishlist is.

## Operations in this menu

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Get Wishlist Items](/api/rest-api/shop/wishlist/list) | `GET /api/shop/wishlists` | List the customer's wishlist items. |
| [Create Wishlist Item](/api/rest-api/shop/wishlist/create) | `POST /api/shop/wishlists` | Add a product to the wishlist. |
| [Toggle Wishlist Item](/api/rest-api/shop/wishlist/toggle) | `POST /api/shop/wishlists/toggle` | Add the product if absent, remove it if present. |
| [Delete Wishlist Item](/api/rest-api/shop/wishlist/delete) | `DELETE /api/shop/wishlists/{id}` | Remove one item. |
| [Delete All Wishlist Items](/api/rest-api/shop/wishlist/delete-all) | `POST /api/shop/delete-all-wishlists` | Clear the whole wishlist. |
| [Move Wishlist Item to Cart](/api/rest-api/shop/wishlist/move-to-cart) | `POST /api/shop/move-wishlist-to-carts` | Move a saved item into the cart. |

All Wishlist endpoints require the storefront key and a customer Bearer token — see [Authentication](/api/rest-api/authentication).
