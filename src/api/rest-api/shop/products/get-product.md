---
outline: false
examples:
  - id: get-simple-product
    title: Get a Simple Product
    description: PDP-ready document for a `simple` product. All relations are inlined — no follow-up requests required. `isInWishlist` / `isInCompare` reflect the signed-in customer (`1` = in the list, `0` = not; send the customer Bearer token); this guest request returns both as `0`.
    request: |
      curl -X GET "http://localhost/api/shop/products/2" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      {
        "id": 2,
        "sku": "PUREWHTSNEAK2023",
        "type": "simple",
        "name": "PureStride Men's Classic White Sneakers",
        "urlKey": "purestride-mens-classic-white-sneakers",
        "status": true,
        "description": "Introducing PureStride Men's Classic White Sneakers…",
        "shortDescription": "Step into timeless style…",
        "price": 189,
        "specialPrice": null,
        "new": true,
        "featured": true,
        "minimumPrice": 189,
        "maximumPrice": 189,
        "formattedPrice": "$189.00",
        "formattedSpecialPrice": null,
        "formattedMinimumPrice": "$189.00",
        "formattedMaximumPrice": "$189.00",
        "baseImageUrl": "http://localhost/storage/product/2/XmdfIafCjuYEhHiBkHvzmOuDT0mpGHDTi9QhnUoY.webp",
        "createdAt": "2024-04-16T23:04:43+05:30",
        "updatedAt": "2024-04-16T23:04:43+05:30",
        "isSaleable": true,
        "isInWishlist": 0,
        "isInCompare": 0,
        "color": null, "size": null, "brand": null,
        "categories": [],
        "channels": [
          { "id": 1, "code": "default", "hostname": "https://example.com", "currencyCode": "USD", "localeCode": "en" }
        ],
        "attributeFamily": { "id": 1, "code": "default", "name": "Default" },
        "images": [
          {
            "id": 969,
            "type": "images",
            "path": "product/2/XmdfIafCjuYEhHiBkHvzmOuDT0mpGHDTi9QhnUoY.webp",
            "productId": 2,
            "position": 1,
            "publicPath": "http://localhost/storage/product/2/XmdfIafCjuYEhHiBkHvzmOuDT0mpGHDTi9QhnUoY.webp"
          }
        ],
        "videos": [],
        "superAttributes": [],
        "variants": [],
        "bookingProducts": [],
        "bundleOptions": [],
        "groupedProducts": [],
        "downloadableLinks": [],
        "downloadableSamples": [],
        "customizableOptions": [],
        "relatedProducts": [],
        "upSells": [],
        "crossSells": []
      }
    commonErrors:
      - error: 404 Not Found
        cause: No product with the given `{id}` exists or the product has `status=false`
        solution: Discover valid IDs via `GET /api/shop/products`.
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.

  - id: get-configurable-product
    title: Get a Configurable Product
    description: For configurable products, `superAttributes[]` and `variants[]` are inlined alongside the parent fields.
    request: |
      curl -X GET "http://localhost/api/shop/products/23" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      {
        "id": 23,
        "sku": "NGJGAJSDGJ123123GJGJ",
        "type": "configurable",
        "name": "Luggage bags",
        "minimumPrice": 0,
        "maximumPrice": 0,
        "superAttributes": [
          {
            "id": 23, "code": "color", "type": "select", "adminName": "Color",
            "options": [
              { "id": 1, "adminName": "Red",   "translation": { "label": "Red" } },
              { "id": 2, "adminName": "Green", "translation": { "label": "Green" } }
            ]
          }
        ],
        "variants": [
          { "id": 24, "sku": "...", "type": "simple", "name": "Luggage bags-Red",   "price": 0, "...": "..." },
          { "id": 25, "sku": "...", "type": "simple", "name": "Luggage bags-Green", "price": 0, "...": "..." }
        ],
        "...": "..."
      }
    commonErrors:
      - error: 404 Not Found
        cause: No product with the given `{id}` exists
        solution: List products via `GET /api/shop/products`.

  - id: get-booking-product
    title: Get a Booking Product
    description: For `booking` products, `bookingProducts[]` carries the slot-config block. Use [Booking Slots](/api/rest-api/shop/products/get-booking-slots) for runtime availability on a specific date.
    request: |
      curl -X GET "http://localhost/api/shop/products/110" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      {
        "id": 110,
        "sku": "BOOK-DEFAULT-1",
        "type": "booking",
        "name": "Yoga Class",
        "...": "...",
        "bookingProducts": [
          {
            "id": 1,
            "type": "default",
            "qty": 10,
            "availableEveryWeek": 1,
            "slots": {
              "duration": "60",
              "break_time": "10",
              "same_slot_all_days": 1,
              "slots": [{ "from": "09:00 AM", "to": "06:00 PM" }]
            }
          }
        ]
      }
    commonErrors:
      - error: 404 Not Found
        cause: No product with the given `{id}` exists
        solution: List products via `GET /api/shop/products`.
  - id: get-product-with-customizable-options
    title: Get Simple Product with Customizable Options
    description: A product's `customizableOptions`. Each option carries an `id` and a `prices` array whose entries each carry an `id` (a selectable value id) — you send these back when adding to cart (see Add to Cart).
    request: |
      GET /api/shop/products/2977
      X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx
    response: |
      {
        "id": 2977,
        "name": "Simple Customizable options",
        "sku": "testcustomizeoption",
        "type": "simple",
        "price": 24,
        "customizableOptions": [
          {
            "id": 9,
            "type": "select",
            "isRequired": false,
            "sortOrder": 0,
            "label": "Weight Select",
            "prices": [
              { "id": 9,  "label": "1kg", "price": 10, "priceType": null, "sortOrder": 0 },
              { "id": 10, "label": "2kg", "price": 20, "priceType": null, "sortOrder": 1 }
            ]
          },
          {
            "id": 10,
            "type": "select",
            "isRequired": true,
            "sortOrder": 1,
            "label": "Flavour",
            "prices": [
              { "id": 11, "label": "Chocolate", "price": 10, "priceType": null, "sortOrder": 0 },
              { "id": 12, "label": "Pineapple", "price": 20, "priceType": null, "sortOrder": 1 }
            ]
          }
        ]
      }
    commonErrors:
      - error: 404 Not Found
        cause: No product with the given `{id}` exists
        solution: List products via `GET /api/shop/products`.

---

# Single Product

Returns the **full PDP-ready document** for a product — categories, channels, attribute family, images, videos, super-attributes (configurable parents), variants, bundle options, booking config, grouped members, downloadable links / samples, customizable options, related/up-sell/cross-sell products — all embedded inline. **No follow-up requests are needed** to render a complete product detail page.

## Endpoint

```
GET /api/shop/products/{id}
```

## Request Headers

| Header             | Required | Description                              |
|--------------------|----------|------------------------------------------|
| `Accept`           | Yes      | `application/json`                       |
| `X-STOREFRONT-KEY` | Yes      | Storefront API key (`pk_storefront_…`)   |
| `X-Locale`         | No       | Override request locale                  |
| `X-Channel`        | No       | Override channel scope                   |
| `X-Currency`       | No       | Override currency in `formattedPrice` etc. |

## Path Parameters

| Parameter | Type    | Required | Description                             |
|-----------|---------|----------|-----------------------------------------|
| `id`      | integer | Yes      | Product primary key                     |

## Response

`200 OK` — single product object. The card-level fields (id, sku, type, name, price, …) are present, plus the embedded relations below.

### Card-level fields

Same shape as items in [Products](/api/rest-api/shop/products/get-products#card-level-fields) — see that page for the field table. This includes the per-customer `isInWishlist` and `isInCompare` booleans.

> **Wishlist & compare flags:** `isInWishlist` (active channel) and `isInCompare` tell you whether the signed-in customer already has this product in their wishlist / compare list (`1` = yes, `0` = no), so you can highlight the wishlist / compare icon on the product page without a separate lookup. Include the customer Bearer token alongside the storefront key — for guests both are `0`. REST returns `1` / `0` integers (over GraphQL the same flags come back as the strings `"1"` / `"0"`).

### Always-present extras (over the list)

| Field             | Type            | Description                                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| `description`     | string          | Full HTML description                                                    |
| `createdAt`       | string (ISO)    | Creation timestamp                                                       |
| `updatedAt`       | string (ISO)    | Last update timestamp                                                    |
| `isSaleable`      | boolean         | Whether the product passes saleability checks (stock, status, …)         |
| `attributeFamily` | object          | `{ id, code, name }`                                                     |

### Filterable attribute summary

The default-family product output includes top-level shortcuts for the common filterable attributes:

| Field    | Type            | Description                              |
|----------|-----------------|------------------------------------------|
| `color`  | object \| null  | `{ id, code, label }` for the assigned color option |
| `size`   | object \| null  | Same shape, for `size`                   |
| `brand`  | object \| null  | Same shape, for `brand`                  |

> The exact set depends on the active attribute family — these three are present for the default family.

### Embedded relations (always present, may be empty `[]`)

| Field                   | Type   | Notes                                                                                                       |
|-------------------------|--------|-------------------------------------------------------------------------------------------------------------|
| `categories`            | array  | Categories the product belongs to                                                                           |
| `channels`              | array  | Channels exposing this product (`{ id, code, hostname, currencyCode, localeCode }`)                         |
| `images`                | array  | Image objects (`{ id, type, path, productId, position, publicPath }`)                                       |
| `videos`                | array  | Video objects                                                                                               |
| `superAttributes`       | array  | **Configurable type only** — list of attributes used to build variants, with their options inlined          |
| `variants`              | array  | **Configurable type only** — child variant products, each carrying card-level fields                        |
| `bookingProducts`       | array  | **Booking type only** — slot config with `type` (`default`/`appointment`/`rental`/`event`/`table`) and a type-specific `slots` block |
| `bundleOptions`         | array  | **Bundle type only** — option groups with their member products inlined                                     |
| `groupedProducts`       | array  | **Grouped type only** — associated products                                                                 |
| `downloadableLinks`     | array  | **Downloadable type only** — purchasable links                                                              |
| `downloadableSamples`   | array  | **Downloadable type only** — preview samples                                                                |
| `customizableOptions`   | array  | Per-product custom inputs (text fields, file uploads, dropdowns added by the merchant)                      |
| `relatedProducts`       | array  | "Customers also bought" cards                                                                               |
| `upSells`               | array  | "Upgrade to" cards                                                                                          |
| `crossSells`            | array  | "Pairs well with" cards (shown in the cart/checkout)                                                        |

> Empty `[]` for product types that don't apply — a `simple` product has no `variants`, a `booking` product has no `bundleOptions`, etc. Clients should treat these as "render only if non-empty".

## What this endpoint deliberately omits

- **`attributeValues`** — the raw EAV table is not returned. Use the typed fields (`name`, `description`, `price`, `color`, …) instead.
- **Reviews** — fetched separately via the [Product Reviews](/api/rest-api/shop/product-reviews/get-product-reviews) endpoint, paginated.

## Sub-resource endpoints

Each embedded relation is also available as its own URL — useful when you only need one slice without re-fetching the entire PDP. These are tagged **`Product`** or **`Product Types`** in Swagger UI:

| URL                                                  | Returns                                       |
|------------------------------------------------------|-----------------------------------------------|
| `GET /api/shop/products/{productId}/variants`        | Variants for a configurable product           |
| `GET /api/shop/products/{productId}/booking-products`| Booking config row(s) for a booking product   |
| `GET /api/shop/booking-products/{id}`                | Single booking config (with type-specific `slots`) |
| `GET /api/shop/booking-slots?id={bp}&date=YYYY-MM-DD`| Runtime slot availability — see [Booking Slots](/api/rest-api/shop/products/get-booking-slots) |

## Use Cases

- Render a full product detail page in **one** network round trip.
- Configurable variant picker: read `superAttributes[]` for the dimensions, `variants[]` for the inventory of combinations.
- Bundle builder: walk `bundleOptions[]` for the selectable groups; each group has its member products inlined.
- Determine product type at render time via `type` (`simple`, `configurable`, `bundle`, …) and `bookingType` (`default`, `appointment`, `rental`, `event`, `table` for booking products).

## Related Resources

- [Products](/api/rest-api/shop/products/get-products) — paginated card-level list
- [Search Products](/api/rest-api/shop/products/search-product) — full filter / sort / search reference
- [Booking Slots](/api/rest-api/shop/products/get-booking-slots) — runtime availability for booking products
- [Categories](/api/rest-api/shop/categories/get-categories)
- [Attributes](/api/rest-api/shop/attributes/get-attributes)
