---
outline: false
examples:
  - id: list-products
    title: List Products
    description: Default paginated list — no filters, default sort, page 1, 30 items.
    request: |
      curl -X GET "http://localhost/api/shop/products" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK
      X-Total-Count: 84
      X-Page: 1
      X-Per-Page: 30
      X-Total-Pages: 3

      [
        {
          "id": 1,
          "sku": "COASTALBREEZEMENSHOODIE",
          "type": "simple",
          "bookingType": null,
          "name": "Coastal Breeze Men's Blue Zipper Hoodie",
          "urlKey": "coastal-breeze-mens-blue-zipper-hoodie",
          "status": true,
          "shortDescription": "Stay warm and stylish…",
          "price": 100,
          "specialPrice": null,
          "new": true,
          "featured": true,
          "minimumPrice": 100,
          "maximumPrice": 100,
          "formattedPrice": "$100.00",
          "formattedSpecialPrice": null,
          "formattedMinimumPrice": "$100.00",
          "formattedMaximumPrice": "$100.00",
          "baseImageUrl": "http://localhost/storage/product/1/zKcWZTLDjcawJmaNg8g1cpARqwVONgEKEflabstT.webp",
          "isInWishlist": 0,
          "isInCompare": 0
        }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.
      - error: 403 Forbidden
        cause: Storefront key inactive or rate-limited
        solution: Activate the key or wait for the rate limit window to reset.

  - id: list-products-wishlist-compare-flags
    title: List Products with Wishlist & Compare Flags
    description: Every card carries `isInWishlist` and `isInCompare` so you can highlight the wishlist / compare icon directly from the listing — no need to separately fetch and cross-reference the wishlist or compare lists. These are per-customer flags (`1` = in the list, `0` = not), so include the customer Bearer token; without it (guest) both are always `0`.
    request: |
      curl -X GET "http://localhost/api/shop/products?per_page=3" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
        -H "Authorization: Bearer 1|customer_token_xxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK
      X-Total-Count: 84
      X-Page: 1
      X-Per-Page: 3
      X-Total-Pages: 28

      [
        {
          "id": 1,
          "sku": "COASTALBREEZEMENSHOODIE",
          "type": "simple",
          "name": "Coastal Breeze Men's Blue Zipper Hoodie",
          "price": 100,
          "baseImageUrl": "http://localhost/storage/product/1/zKcWZTLDjcawJmaNg8g1cpARqwVONgEKEflabstT.webp",
          "isInWishlist": 1,
          "isInCompare": 0
        },
        {
          "id": 22,
          "sku": "ACME-DRAWBAG-001",
          "type": "simple",
          "name": "Acme Drawstring Bag",
          "price": 3000,
          "baseImageUrl": "http://localhost/storage/product/22/acme-drawbag.webp",
          "isInWishlist": 0,
          "isInCompare": 1
        },
        {
          "id": 92,
          "sku": "bagisto-sticker",
          "type": "simple",
          "name": "Bagisto Sticker",
          "price": 10,
          "baseImageUrl": "http://localhost/storage/product/92/sticker.webp",
          "isInWishlist": 0,
          "isInCompare": 0
        }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.

  - id: paginated-products
    title: Paginated List
    description: Use `page` and `per_page` to walk the full catalog. Pagination metadata is always emitted as headers.
    request: |
      curl -X GET "http://localhost/api/shop/products?page=2&per_page=20" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK
      X-Total-Count: 84
      X-Page: 2
      X-Per-Page: 20
      X-Total-Pages: 5

      [
        { "id": 21, "sku": "...", "type": "simple", "name": "...", "price": 49, "...": "..." },
        { "id": 22, "sku": "...", "type": "simple", "name": "...", "price": 89, "...": "..." }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.

---

# Products

Paginated list of catalog products. The response is a **slim card-level payload** — fields needed to render listing/grid/search results. For the full PDP shape (categories, variants, bundle options, booking config, customizable options, related products, …) use [Single Product](/api/rest-api/shop/products/get-product).

## Endpoint

```
GET /api/shop/products
```

This same endpoint also powers all filtering, sorting and search — see [Search Products](/api/rest-api/shop/products/search-product) for the full set of query parameters.

## Request Headers

| Header             | Required | Description                              |
|--------------------|----------|------------------------------------------|
| `Accept`           | Yes      | `application/json`                       |
| `X-STOREFRONT-KEY` | Yes      | Storefront API key (`pk_storefront_…`)   |
| `X-Locale`         | No       | Override request locale                  |
| `X-Channel`        | No       | Override channel scope                   |
| `X-Currency`       | No       | Override currency in `formattedPrice` etc. |

## Query Parameters

| Parameter   | Type    | Default | Description                                                         |
|-------------|---------|---------|---------------------------------------------------------------------|
| `page`      | integer | 1       | Page number (1-based)                                               |
| `per_page`  | integer | 30      | Items per page. Capped at 50.                                       |

For all filter / search / sort parameters (`query`, `sort`, `type`, `category_id`, `price`, attribute filters …) see [Search Products](/api/rest-api/shop/products/search-product).

Pagination headers (`X-Total-Count`, `X-Page`, `X-Per-Page`, `X-Total-Pages`) are always emitted — see [Pagination](/api/rest-api/introduction#pagination).

## Card-level fields

These ~20 fields are returned for every product in the list. The PDP endpoint returns these **plus** every related resource inlined.

| Field                    | Type            | Description                                                          |
|--------------------------|-----------------|----------------------------------------------------------------------|
| `id`                     | integer         | Product primary key                                                  |
| `sku`                    | string          | Stock-keeping unit                                                   |
| `type`                   | string          | `simple`, `configurable`, `bundle`, `grouped`, `virtual`, `downloadable`, `booking` |
| `bookingType`            | string \| null  | When `type = booking`: `default`, `appointment`, `rental`, `event`, `table` — otherwise `null` |
| `name`                   | string          | Localized name                                                       |
| `urlKey`                 | string          | URL slug                                                             |
| `status`                 | boolean         | Whether the product is published                                     |
| `shortDescription`       | string          | Short marketing description                                          |
| `price`                  | number          | Default price                                                        |
| `specialPrice`           | number \| null  | Sale price when in promotion window                                  |
| `new`                    | boolean         | "New" flag set in admin                                              |
| `featured`               | boolean         | "Featured" flag set in admin                                         |
| `minimumPrice`           | number          | Lowest price across variants (configurable / bundle)                 |
| `maximumPrice`           | number          | Highest price across variants                                        |
| `formattedPrice`         | string          | Currency-formatted `price`                                           |
| `formattedSpecialPrice`  | string \| null  | Currency-formatted `specialPrice`                                    |
| `formattedMinimumPrice`  | string          | Currency-formatted `minimumPrice`                                    |
| `formattedMaximumPrice`  | string          | Currency-formatted `maximumPrice`                                    |
| `baseImageUrl`           | string \| null  | Primary thumbnail URL                                                |
| `isInWishlist`           | integer (0/1)   | `1` if this product is in the signed-in customer's wishlist (active channel), else `0`. `0` for guests. |
| `isInCompare`            | integer (0/1)   | `1` if this product is in the signed-in customer's compare list, else `0`. `0` for guests. |

Heavy relations are omitted from the list response — `images`, `videos`, `categories`, `channels`, `variants`, `bookingProducts`, `bundleOptions`, `customizableOptions`, `relatedProducts` and the rest. Read [Single Product](/api/rest-api/shop/products/get-product) to get them inlined.

## Wishlist & compare flags

Every product card carries two per-customer booleans, `isInWishlist` and `isInCompare`, so you can render the wishlist and compare icon states straight from the listing response.

Why they exist: the wishlist and compare lists are their own endpoints and paginate independently of the catalog — a product on catalog page 1 may have its wishlist entry on a different wishlist page, so matching the two lists on the client is unreliable. These flags answer the question per product, in the same response, so the wishlist/compare icon can be highlighted without any extra requests.

- **Authentication is required.** Include the customer Bearer token alongside the storefront key. For guests (no customer token) both flags are always `0`.
- **`isInWishlist`** is scoped to the active channel; **`isInCompare`** applies across the store.
- A product is flagged (`1`) when its own product ID is in the customer's wishlist / compare list — so a configurable parent is flagged when the parent itself was added.
- The REST API returns these as `1` / `0` integers. (Over GraphQL the same flags are returned as the strings `"1"` / `"0"`.)

## Use Cases

- Render a category page / grid view / search results with paginated cards.
- Implement infinite scroll using `?page=N&per_page=20` and `X-Total-Pages`.
- Pre-load the next page based on `X-Page < X-Total-Pages`.

## Best Practices

- **Ask for the page size you need** — the default is 30 and the cap is 50; a larger `per_page` is silently clamped rather than rejected.
- **Read `X-Total-Count` for the result count** — the body is one page, and the endpoint returns no totals in the payload.
- **Send the customer token when one exists** — `isInWishlist` and `isInCompare` are `0` for guests, so a signed-in shopper would otherwise see empty heart and compare icons.
- **Do not expect images or variants here** — the card carries `baseImageUrl` only; the gallery, variants, and options come from [Single Product](/api/rest-api/shop/products/get-product).
- **Check a sort token against the supported list** — an unrecognised value falls back to the default order with a `200`, so a typo fails silently.

## Related Resources

- [Single Product](/api/rest-api/shop/products/get-product) — full PDP-ready document with every relation embedded
- [Search Products](/api/rest-api/shop/products/search-product) — full filter / sort / search reference
- [Booking Slots](/api/rest-api/shop/products/get-booking-slots) — runtime availability for `booking` products
- [Categories](/api/rest-api/shop/categories/get-categories) — `?category_id=N` to scope by category
- [Attributes](/api/rest-api/shop/attributes/get-attributes) — discover filterable attribute codes
