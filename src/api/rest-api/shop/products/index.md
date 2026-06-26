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

## Operations in this menu

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Products](/api/rest-api/shop/products/get-products) | `GET /api/shop/products` | Paginated, filterable, sortable product listing. |
| [Search Products](/api/rest-api/shop/products/search-product) | `GET /api/shop/products` | The listing with a search term applied. |
| [Single Product](/api/rest-api/shop/products/get-product) | `GET /api/shop/products/{id}` | Full detail for one product. |
| [Booking Slots](/api/rest-api/shop/products/get-booking-slots) | `GET /api/shop/booking-slots` | Available slots for a bookable product. |
| [Product Sub-Resources](/api/rest-api/shop/products/product-subresources) | `GET /api/shop/products/{id}/…` | Images, prices and attribute values per product. |
| [Product Type Sub-Resources](/api/rest-api/shop/products/product-type-subresources) | `GET /api/shop/products?type=…` | Type-specific structure (configurable, bundle, etc.). |

All Product endpoints are public reads that require only the storefront key — see [Authentication](/api/rest-api/authentication).
