---
outline: false
apiType: rest
---

# Products

The Products menu is the catalog surface a shopper browses and searches. It returns product listings, full single-product detail, search results, booking slots for bookable products, and a set of sub-resources for the heavier data attached to a product (images, prices, attribute values, and type-specific structure).

## Listing, search and detail

- The **list** endpoint returns a paginated catalog with filtering, sorting and faceted attribute filters. **Search** is the same listing surface with a search term applied.
- The **single product** endpoint returns one product's full detail, with its categories, images, variants and type-specific blocks embedded — no follow-up calls needed for the common fields.
- **Booking slots** return the available time slots for a bookable product.

Pass `locale` and `channel` to receive catalog data for a specific language and store. Filters beyond the basics (price, category, type, new/featured) cover any filterable attribute the catalog exposes.

## Sub-resources

For data that is heavy or addressed on its own, products expose dedicated sub-resource endpoints (e.g. a variant's images, customer-group prices, attribute values, and the structure that varies by product type). The two sub-resource pages below describe what each one returns and when to call it instead of relying on the inlined detail.

## Filtering, Sorting and Paging

Every filter is a query parameter on the listing, and they are **AND-combined** — more filters narrow the result, never widen it.

| Parameter | Notes |
|-----------|-------|
| `query` | Search term, matched against SKU and name. |
| `type` | One of `simple`, `configurable`, `bundle`, `grouped`, `virtual`, `downloadable`, `booking`. |
| `category_id` | Products in that category. `categoryId` also accepted. |
| `price` | Compound range `min,max` — the comma is a separator, never a thousands mark. `price_from` / `price_to` do the same job. |
| `new`, `featured` | The merchandising flags. |
| `<attribute_code>` | Any filterable attribute, e.g. `?color=3&size=4,5`. Values are option **ids**, not labels. |
| `sort`, `order` | `name-asc`, `price-desc`, `created_at-desc`, and the rest; or a bare key plus `order`. |
| `page`, `per_page` | Default 30, capped at 50. |

An unrecognised `sort` token does not error — it silently falls back to the default catalog order, so a typo looks like broken sorting. A filter on an attribute that is not flagged filterable is likewise ignored.

## Card Fields Versus Full Detail

The listing returns a ~21-field card: identity, prices with their `formatted*` twins, the merchandising flags, one `baseImageUrl`, and the per-customer wishlist and compare flags. Everything heavy — the image gallery, categories, variants, bundle options, downloadable links, customizable options, related products — is detail-only.

Single-product detail inlines all of it, so a product page needs one call. Every relation key is present on every product regardless of type, as an empty array when it does not apply, so render on array length rather than on `type`.

Detail is addressed by **numeric id**; a slug answers `404`. A storefront routed on slugs resolves them through the GraphQL `product(urlKey:)` lookup, or by matching `urlKey` from the listing.

## Per-Customer Flags

`isInWishlist` and `isInCompare` come back on every card and on detail, so a grid can highlight both icons without touching those menus. Send the customer token — both are `0` for guests — and note REST returns them as the integers `1` / `0` where GraphQL returns the strings.

## Product Types

Seven types share one payload shape, each populating its own block: `variants` and `superAttributes` for configurable, `bundleOptions` for bundle, `groupedProducts` for grouped, `downloadableLinks` and `downloadableSamples` for downloadable, `bookingProducts` for booking. Booking products need a second call for their bookable times — see Booking Slots below.

Check `isSaleable` before enabling add-to-cart: a product can be published and still out of stock, and only that flag combines the checks.

## Currency and Locale

`X-Currency` converts prices and changes the symbol in the `formatted*` fields; `X-Locale` changes names, descriptions, and attribute values. Both fall back to the channel default when omitted or when the value is not enabled on the channel.

## Operations in this menu

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Products](/api/rest-api/shop/products/get-products) | `GET /api/shop/products` | Paginated, filterable, sortable product listing. |
| [Search Products](/api/rest-api/shop/products/search-product) | `GET /api/shop/products?query=` | The same listing endpoint with a search term and filters applied. |
| [Single Product](/api/rest-api/shop/products/get-product) | `GET /api/shop/products/{id}` | Full detail for one product. |
| [Booking Slots](/api/rest-api/shop/products/get-booking-slots) | `GET /api/shop/booking-slots?id=&date=` | Bookable slots for one booking product on a given date. |
| [Product Sub-Resources](/api/rest-api/shop/products/product-subresources) | `GET /api/shop/products/{id}/…` | Images, prices and attribute values per product. |
| [Product Type Sub-Resources](/api/rest-api/shop/products/product-type-subresources) | `GET /api/shop/products/{id}/variants`, `…/bundle-options`, `…/downloadable-links`, `…/booking-products` | Type-specific structure for configurable, bundle, grouped, downloadable and booking products. |

All Product endpoints are public reads that require only the storefront key — see [Authentication](/api/rest-api/authentication).
