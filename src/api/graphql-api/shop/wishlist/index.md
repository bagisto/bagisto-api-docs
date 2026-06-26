---
outline: false
---

# Wishlist

The Wishlist menu lets a signed-in customer save products for later. A client uses it to power the "save to wishlist" heart icon, the wishlist page, and the "move to cart" action.

## When you use it

The wishlist is per-customer and scoped to the current channel. A customer can add a product (or toggle it on and off), list everything saved, view one item, move an item into the cart, remove an item, or clear the whole wishlist at once. The wishlist is a customer feature — it is not available to guests.

## Operations in this menu

| Operation | GraphQL field |
|-----------|---------------|
| [Get Wishlists](/api/graphql-api/shop/queries/get-wishlists) | `wishlists` query |
| [Get Wishlist Item](/api/graphql-api/shop/queries/get-wishlist) | `wishlist(id:)` query |
| [Create Wishlist](/api/graphql-api/shop/mutations/create-wishlist) | `createWishlist` mutation |
| [Toggle Wishlist](/api/graphql-api/shop/mutations/toggle-wishlist) | `toggleWishlist` mutation |
| [Delete Wishlist](/api/graphql-api/shop/mutations/delete-wishlist) | `deleteWishlist` mutation |
| [Move to Cart](/api/graphql-api/shop/mutations/move-wishlist-to-cart) | `moveWishlistToCart` mutation |
| [Delete All Wishlists](/api/graphql-api/shop/mutations/delete-all-wishlists) | `deleteAllWishlist` mutation |

All Wishlist operations require a customer Bearer token — see [Authentication](/api/graphql-api/authentication).
