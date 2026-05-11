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
          "baseImageUrl": "http://localhost/storage/product/1/zKcWZTLDjcawJmaNg8g1cpARqwVONgEKEflabstT.webp"
        }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.
      - error: 403 Forbidden
        cause: Storefront key inactive or rate-limited
        solution: Activate the key or wait for the rate limit window to reset.

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

> Heavy relations (`images`, `videos`, `categories`, `channels`, `variants`, `bookingProducts`, `bundleOptions`, `customizableOptions`, `relatedProducts`, etc.) are **omitted** from the list response. Fetch the [Single Product](/api/rest-api/shop/products/get-product) to get them inlined.

## Use Cases

- Render a category page / grid view / search results with paginated cards.
- Implement infinite scroll using `?page=N&per_page=20` and `X-Total-Pages`.
- Pre-load the next page based on `X-Page < X-Total-Pages`.

## Related Resources

- [Single Product](/api/rest-api/shop/products/get-product) — full PDP-ready document with every relation embedded
- [Search Products](/api/rest-api/shop/products/search-product) — full filter / sort / search reference
- [Booking Slots](/api/rest-api/shop/products/get-booking-slots) — runtime availability for `booking` products
- [Categories](/api/rest-api/shop/categories/get-categories) — `?category_id=N` to scope by category
- [Attributes](/api/rest-api/shop/attributes/get-attributes) — discover filterable attribute codes
