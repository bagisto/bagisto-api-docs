---
outline: false
apiType: rest
---

# Wishlist

The Wishlist menu lets a logged-in customer save products to come back to later. A customer can list their wishlist, add or toggle a product, remove a single item, clear the whole list, or move a saved item straight into the cart.

## When a client uses this

The wishlist is per-customer and scoped to the current channel. Use **toggle** as a one-tap "heart" button — it adds the product if it isn't saved and removes it if it is. **Move to cart** transfers a saved item into the active cart so the customer can check out.

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
