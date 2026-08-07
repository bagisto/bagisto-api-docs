---
outline: false
---

# Wishlist

The Wishlist menu lets a signed-in customer save products for later. A client uses it to power the "save to wishlist" heart icon, the wishlist page, and the "move to cart" action.

## When you use it

The wishlist is per-customer and scoped to the current channel. A customer can add a product (or toggle it on and off), list everything saved, view one item, move an item into the cart, remove an item, or clear the whole wishlist at once. The wishlist is a customer feature — it is not available to guests.

## Operations

| Operation | GraphQL field | Description |
|-----------|---------------|-------------|
| List the wishlist | [`wishlists`](/api/graphql-api/shop/queries/get-wishlists) | The customer's saved products, paginated. |
| View one item | [`wishlist`](/api/graphql-api/shop/queries/get-wishlist) | A single wishlist entry. |
| Add a product | [`createWishlist`](/api/graphql-api/shop/mutations/create-wishlist) | Save a product to the wishlist. |
| Toggle a product | [`toggleWishlist`](/api/graphql-api/shop/mutations/toggle-wishlist) | Add the product if absent, remove it if present. |
| Remove an item | [`deleteWishlist`](/api/graphql-api/shop/mutations/delete-wishlist) | Drop one saved product. |
| Move to cart | [`moveWishlistToCart`](/api/graphql-api/shop/mutations/move-wishlist-to-cart) | Move a saved product into the cart. Returns the updated **cart**. |
| Clear the wishlist | [`createDeleteAllWishlists`](/api/graphql-api/shop/mutations/delete-all-wishlists) | Remove every saved product in one call. |

Toggling reports a removal through `errors[]` rather than a success payload — see [Toggle Wishlist](/api/graphql-api/shop/mutations/toggle-wishlist) before wiring a heart icon to it.

Every product returned by the catalog also carries an `isInWishlist` flag, so a listing page can show the saved state without reading the wishlist separately.

All Wishlist operations require a customer Bearer token — see [Authentication](/api/graphql-api/authentication).
