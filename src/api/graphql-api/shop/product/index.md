---
outline: false
---

# Product

The Product menu is the storefront catalog. It powers three screens: a product-listing page, a search results page, and a product-detail page. Everything here is public read access — no customer login is needed to browse.

## Listing and searching

One field, `products`, backs both the listing page and the search page:

- **Listing** — call `products` with pagination and sorting. It returns the catalog page by page.
- **Searching** — add the `query` argument. The same field now matches that keyword against the catalog and returns the hits.

Because a single field serves both, the two screens receive an identical product shape and can share the same rendering code. Results are cursor-paginated, so a listing walks forward with `first` + `after` rather than page numbers.

See [List Products](/api/graphql-api/shop/queries/get-products) and [Search Products](/api/graphql-api/shop/queries/search-products).

## Viewing one product

The `product` field returns one product's full detail and accepts three different lookups:

- `id` — the product's identifier, IRI or numeric.
- `sku` — the stock-keeping unit.
- `urlKey` — the storefront slug, e.g. `blossom-breeze-cotton-printed-short-skirt`.

A storefront route built on a slug can therefore call `product(urlKey: …)` directly, with no separate step to turn the slug into an ID first.

See [Single Product](/api/graphql-api/shop/queries/get-product).

## Filtering and sorting

Filters are passed to `products` as a JSON string in the `filter` argument. The accepted keys are:

| Key | Filters by |
|-----|-----------|
| `type` | Product type — one of the seven listed below. |
| `sku` | An exact SKU. |
| `category_id` | Membership of one category. |
| `price_from` / `price_to` | A price range, inclusive on both ends. |
| `new` / `featured` | The "new" and "featured" merchandising flags. |
| `<attribute_code>` | Any filterable attribute, e.g. `color`, `size`, `brand`. The value is the option ID; comma-separate several. |

Supplying more than one key narrows the result — the keys combine, they do not widen the set. Sorting is separate from filtering: `sortKey` accepts `ID` (the default), `TITLE`, `PRICE`, `CREATED_AT`, and `UPDATED_AT`, and `reverse: true` flips the direction.

Full syntax, argument list, and worked examples are on [List Products](/api/graphql-api/shop/queries/get-products).

## Product types

The catalog carries seven product types. A single-product response is type-aware: the blocks that apply to that type are populated and the rest are absent.

| Type | What it is | Type-specific fields |
|------|-----------|---------------------|
| Simple | One sellable item with its own price and stock. | `price`, `specialPrice`, `images`, `attributeValues` |
| Configurable | A parent whose variants are chosen by attribute, e.g. size and colour. | `variants`, `combinations`, `superAttributeOptions` |
| Grouped | A set of associated products presented and bought from one page. | `groupedProducts` → `associatedProduct` |
| Bundle | A kit the shopper assembles by picking from each bundle option. | `bundleOptions` → `bundleOptionProducts` → `product` |
| Virtual | A non-shippable item such as a service or membership. | `price`, `specialPrice`, `attributeValues` |
| Downloadable | A digital product delivered as files, with optional free samples. | `downloadableLinks`, `downloadableSamples` |
| Booking | An item reserved against a date and time slot. | `bookingProducts` |

Filter the listing to one type with `filter: "{\"type\": \"configurable\"}"`. Each type's fields are documented with examples on [List Products](/api/graphql-api/shop/queries/get-products).

## Booking slots

Booking products are the one type that needs a second call before add-to-cart. The `bookingSlots` field takes a product ID and a date and returns the slots a shopper can actually reserve on that date, which is what the date-picker on a booking product page renders.

See [Booking Slots](/api/graphql-api/shop/queries/get-booking-slots).

## Currency and locale

Two optional request headers change what the catalog returns:

- `X-Currency` — prices are converted to that currency, and the `formatted*` price fields carry its symbol.
- `X-Locale` — names, descriptions, and attribute values are returned in that language.

Both fall back to the current channel's defaults when omitted or when the value is not enabled on the channel.

## Operations

| Operation | GraphQL field | Description |
|-----------|---------------|-------------|
| List & filter products | [`products`](/api/graphql-api/shop/queries/get-products) | Paginated catalog with sorting and category / type / price / attribute filters. |
| Search products | [`products`](/api/graphql-api/shop/queries/search-products) | The same field driven by its `query` argument — a keyword search across the catalog. |
| View one product | [`product`](/api/graphql-api/shop/queries/get-product) | Full type-aware detail for a single product, looked up by `id`, `sku`, or `urlKey`. |
| List booking slots | [`bookingSlots`](/api/graphql-api/shop/queries/get-booking-slots) | Bookable slots for one booking-type product on a given date. |

These are public read endpoints — they require the storefront key header. A customer Bearer token is optional.
