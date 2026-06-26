---
outline: false
---

# Product

The Product menu is the storefront catalog — listing products, searching and filtering them, fetching one product's full detail, and (for booking products) reading available booking slots. It is the backbone of any product-listing page, search results page, or product-detail page.

## Listing, searching & filtering

The **products** query lists and filters the catalog (by category, type, price range, brand, attribute values, new / featured flags) with cursor pagination and sorting. The **search products** query runs a keyword search over the same surface. Both return the same product shape, so a listing page and a search results page can share rendering code. The **single product** query returns one product's full, type-aware detail.

## Wishlist & compare flags

When a customer Bearer token is sent, every product carries `isInWishlist` and `isInCompare` so the UI can highlight the wishlist / compare icon on each card without separately cross-referencing those lists. For guests both flags are always off.

## Booking slots

For booking-type products, the **booking slots** query returns the available time slots a shopper can pick from before adding the product to the cart.

## Operations in this menu

| Operation | GraphQL field |
|-----------|---------------|
| [Products](/api/graphql-api/shop/queries/get-products) | `products` query |
| [Search Products](/api/graphql-api/shop/queries/search-products) | `products` query (with search) |
| [Single Product](/api/graphql-api/shop/queries/get-product) | `product(id:)` query |
| [Booking Slots](/api/graphql-api/shop/queries/get-booking-slots) | `bookingSlots` query |

These are public read endpoints — they require the storefront key header. A customer Bearer token is optional; when sent, it adds the `isInWishlist` / `isInCompare` flags. See [Authentication](/api/graphql-api/authentication).
