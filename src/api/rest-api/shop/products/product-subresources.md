---
outline: false
examples:
  - id: list-product-images
    title: Images — List for a product
    description: |
      All images attached to a single product. The same data is also inlined under `images[]` in the [Single Product](/api/rest-api/shop/products/get-product) response — call this only when you need just the gallery.
    request: |
      curl -X GET "http://localhost/api/shop/products/2/images" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      [
        {
          "id": 969,
          "type": "images",
          "path": "product/2/XmdfIafCjuYEhHiBkHvzmOuDT0mpGHDTi9QhnUoY.webp",
          "productId": 2,
          "position": 1,
          "publicPath": "http://localhost/storage/product/2/XmdfIafCjuYEhHiBkHvzmOuDT0mpGHDTi9QhnUoY.webp"
        }
      ]
    commonErrors:
      - error: 404 Not Found
        cause: Parent product `{productId}` doesn't exist
        solution: Discover product IDs via `GET /api/shop/products`.

  - id: list-product-images-root
    title: Images — Root collection
    description: Paginated list of every product image across all products. Useful for an admin gallery audit.
    request: |
      curl -X GET "http://localhost/api/shop/product-images?per_page=2" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK
      X-Total-Count: 1234
      X-Page: 1
      X-Per-Page: 2
      X-Total-Pages: 617

      [
        {
          "id": 4,
          "type": "images",
          "path": "product/4/nRO8G2ljoUejAr6agYhx5eZTUwBIeft61dNRwNw6.webp",
          "productId": 4,
          "position": 1,
          "publicPath": "http://localhost/storage/product/4/nRO8G2ljoUejAr6agYhx5eZTUwBIeft61dNRwNw6.webp"
        }
      ]

  - id: get-product-image
    title: Images — Single by ID
    description: Resolve a single image by its global ID (e.g. an ID stored on a wishlist or order line).
    request: |
      curl -X GET "http://localhost/api/shop/product-images/969" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      {
        "id": 969,
        "type": "images",
        "path": "product/2/XmdfIafCjuYEhHiBkHvzmOuDT0mpGHDTi9QhnUoY.webp",
        "productId": 2,
        "position": 1,
        "publicPath": "http://localhost/storage/product/2/XmdfIafCjuYEhHiBkHvzmOuDT0mpGHDTi9QhnUoY.webp"
      }

  - id: list-product-videos
    title: Videos — List for a product
    description: Same shape as images, just video assets. Inlined under `videos[]` on the Single Product response.
    request: |
      curl -X GET "http://localhost/api/shop/products/2/videos" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      [
        {
          "id": 12,
          "type": "videos",
          "path": "product/2/promo.mp4",
          "productId": 2,
          "position": 1,
          "publicPath": "http://localhost/storage/product/2/promo.mp4"
        }
      ]

  - id: list-customer-group-prices
    title: Customer Group Prices — List for a product
    description: |
      Tier (customer-group) prices configured on a product. Returns an empty array when no tier rules apply. **Customer group prices are not inlined** in the Single Product response — fetch them here when needed.
    request: |
      curl -X GET "http://localhost/api/shop/products/2/customer-group-prices" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      [
        {
          "id": 4,
          "qty": 5,
          "valueType": "fixed",
          "value": 80,
          "customerGroupId": 2,
          "uniqueId": "2|2|5",
          "productId": 2
        }
      ]

  - id: get-customer-group-price
    title: Customer Group Prices — Single (nested or flat)
    description: |
      Resolve a single tier-price row. Available under both `/products/{productId}/customer-group-prices/{id}` and `/customer-group-prices/{id}` — same response.
    request: |
      curl -X GET "http://localhost/api/shop/customer-group-prices/4" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      {
        "id": 4,
        "qty": 5,
        "valueType": "fixed",
        "value": 80,
        "customerGroupId": 2,
        "uniqueId": "2|2|5",
        "productId": 2
      }

  - id: list-customizable-options
    title: Customizable Options — List for a product
    description: |
      Per-product custom inputs (text fields, file uploads, dropdowns added by the merchant). Inlined under `customizableOptions[]` on the Single Product response — fetch here only when you need the slice.
    request: |
      curl -X GET "http://localhost/api/shop/products/14/customizable-options" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      [
        {
          "id": 1,
          "type": "field",
          "isRequired": 1,
          "sortOrder": 0,
          "product": "/api/shop/products/14",
          "prices": ["/api/shop/product_customizable_option_prices/1"],
          "translation": "/api/shop/product_customizable_option_translations/1",
          "translations": [
            "/api/shop/product_customizable_option_translations/1",
            "/api/shop/product_customizable_option_translations/4"
          ]
        }
      ]

  - id: get-customizable-option
    title: Customizable Options — Single (snake_case URL)
    description: |
      Resolve a single customizable option by ID. **Note the underscored URL** — `product_customizable_options`, not `product-customizable-options`.
    request: |
      curl -X GET "http://localhost/api/shop/product_customizable_options/1" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      {
        "id": 1,
        "type": "field",
        "isRequired": 1,
        "sortOrder": 0,
        "product": "/api/shop/products/14",
        "prices": ["/api/shop/product_customizable_option_prices/1"],
        "translation": "/api/shop/product_customizable_option_translations/1",
        "translations": [
          "/api/shop/product_customizable_option_translations/1",
          "/api/shop/product_customizable_option_translations/4"
        ]
      }

  - id: list-customizable-option-prices
    title: Customizable Option Prices
    description: |
      Sub-resource of customizable options — pricing rows referenced by the option's `prices[]` IRI array.
    request: |
      curl -X GET "http://localhost/api/shop/product_customizable_option_prices?per_page=2" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK
      X-Total-Count: 7
      X-Page: 1
      X-Per-Page: 2
      X-Total-Pages: 4

      [
        {
          "id": 1,
          "price": 5,
          "priceType": "fixed",
          "customizableOption": "/api/shop/product_customizable_options/1"
        }
      ]

  - id: list-customizable-option-translations
    title: Customizable Option Translations
    description: |
      Locale-specific labels for a customizable option. Reached by following the `translation` / `translations[]` IRIs on the parent option.
    request: |
      curl -X GET "http://localhost/api/shop/product_customizable_option_translations?per_page=2" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      [
        {
          "id": 1,
          "locale": "en",
          "label": "Engraving",
          "customizableOption": "/api/shop/product_customizable_options/1"
        }
      ]

  - id: list-attribute-values
    title: Attribute Values — List for a product
    description: |
      The raw EAV value rows for a product (one per attribute × locale × channel). The Single Product response surfaces typed fields (`name`, `description`, `price`, `color`, `size`, `brand`, …) instead — only call this endpoint when you need the underlying EAV record.
    request: |
      curl -X GET "http://localhost/api/shop/products/2/attribute-values" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      [
        {
          "id": 25,
          "locale": "en",
          "channel": "default",
          "textValue": "Step into timeless style…",
          "value": "Step into timeless style…",
          "uniqueId": "default|en|2|9",
          "attribute": "/api/shop/attributes/9",
          "product": "/api/shop/products/2"
        }
      ]

---

# Product Sub-Resources (`Product` tag)

Sub-resources of a product — gallery assets, tier prices, customizable options and their pricing/translations, raw EAV values. Most of these are already inlined on the [Single Product](/api/rest-api/shop/products/get-product) response; the dedicated endpoints listed here exist when you need just one slice without re-fetching the whole PDP.

> ⚠️ **Naming pattern alert**:
> - `*-images`, `*-videos`, `*-bundle-option-products`, `*-downloadable-links`, `*-downloadable-samples` use **dashed** root URLs.
> - `product_customizable_options`, `product_customizable_option_prices`, `product_customizable_option_translations`, `product_bundle_options`, `product_grouped_products` use **underscored** root URLs (API Platform's default snake-case route).
>
> Always copy the URL from a parent resource's IRI when in doubt — the IRIs are authoritative.

## Endpoints in this group

### Images (`type = images`)

| Method | Path                                       | Purpose                                        |
|--------|--------------------------------------------|------------------------------------------------|
| GET    | `/api/shop/products/{productId}/images`    | All images for a product (nested)              |
| GET    | `/api/shop/product-images`                 | Paginated, every image across the catalog (root) |
| GET    | `/api/shop/product-images/{id}`            | Single image by global ID                      |

### Videos (`type = videos`)

| Method | Path                                       | Purpose                                        |
|--------|--------------------------------------------|------------------------------------------------|
| GET    | `/api/shop/products/{productId}/videos`    | All videos for a product (nested)              |
| GET    | `/api/shop/product-videos`                 | Paginated root collection                      |
| GET    | `/api/shop/product-videos/{id}`            | Single video by global ID                      |

Same response shape as Images, with `type: "videos"`.

### Customer Group Prices (tier prices)

| Method | Path                                                            | Purpose                                |
|--------|-----------------------------------------------------------------|----------------------------------------|
| GET    | `/api/shop/products/{productId}/customer-group-prices`          | Tier prices for a product (nested)     |
| GET    | `/api/shop/products/{productId}/customer-group-prices/{id}`     | Single tier-price row (nested)         |
| GET    | `/api/shop/customer-group-prices/{id}`                          | Single tier-price row by global ID     |

> The root collection at `/api/shop/customer-group-prices` is **not exposed** — it's an admin-only concept. Always scope by product or fetch by ID.

### Customizable Options + Prices + Translations

| Method | Path                                                            | Purpose                                |
|--------|-----------------------------------------------------------------|----------------------------------------|
| GET    | `/api/shop/products/{productId}/customizable-options`           | All custom inputs for a product (nested) |
| GET    | `/api/shop/product_customizable_options/{id}`                   | Single option by ID                    |
| GET    | `/api/shop/product_customizable_option_prices`                  | Paginated pricing rows                 |
| GET    | `/api/shop/product_customizable_option_prices/{id}`             | Single pricing row                     |
| GET    | `/api/shop/product_customizable_option_translations`            | Paginated locale labels                |
| GET    | `/api/shop/product_customizable_option_translations/{id}`       | Single label                           |

### Attribute Values (raw EAV — sub-resource only)

| Method | Path                                                    | Purpose                                |
|--------|---------------------------------------------------------|----------------------------------------|
| GET    | `/api/shop/products/{productId}/attribute-values`       | Every attribute value row for a product |

> No root collection. The single-row endpoint isn't exposed either — fetch the parent product instead.

## Response field reference

### Image / Video

| Field         | Type    | Description                                                |
|---------------|---------|------------------------------------------------------------|
| `id`          | integer | Asset primary key                                          |
| `type`        | string  | `images` or `videos`                                       |
| `path`        | string  | Storage path (relative)                                    |
| `productId`   | integer | Owning product                                             |
| `position`    | integer | Display order                                              |
| `publicPath`  | string  | Fully-qualified URL                                        |

### Customer Group Price

| Field             | Type    | Description                                                              |
|-------------------|---------|--------------------------------------------------------------------------|
| `id`              | integer | Tier-price row ID                                                        |
| `qty`             | number  | Threshold quantity for this tier                                         |
| `valueType`       | string  | `fixed` (replaces price) or `discount` (percentage off)                   |
| `value`           | number  | Tier value — interpreted by `valueType`                                  |
| `customerGroupId` | integer | Customer group this tier applies to                                      |
| `uniqueId`        | string  | Internal lookup key (`<group>\|<product>\|<qty>`)                         |
| `productId`       | integer | Owning product                                                           |

### Customizable Option

| Field           | Type            | Description                                                              |
|-----------------|-----------------|--------------------------------------------------------------------------|
| `id`            | integer         | Option primary key                                                       |
| `type`          | string          | `field`, `area`, `drop_down`, `radio`, `checkbox`, `multiple`, `date`, `date_time`, `time`, `file` |
| `isRequired`    | boolean (0/1)   | Whether the customer must fill the option                                |
| `sortOrder`     | integer         | Display order on the PDP                                                 |
| `product`       | string (IRI)    | Parent product                                                           |
| `prices`        | array (IRI)     | One IRI per pricing row — dereference for the actual prices              |
| `translation`   | string (IRI)    | Translation for the request locale                                       |
| `translations`  | array (IRI)     | All locale translations                                                  |

### Customizable Option Price

| Field                | Type            | Description                                                |
|----------------------|-----------------|------------------------------------------------------------|
| `id`                 | integer         | Pricing row primary key                                    |
| `price`              | number          | Price increment for this option                            |
| `priceType`          | string          | `fixed` or `percent`                                       |
| `customizableOption` | string (IRI)    | Parent customizable option                                 |

### Customizable Option Translation

| Field                | Type            | Description                                                |
|----------------------|-----------------|------------------------------------------------------------|
| `id`                 | integer         | Translation row primary key                                |
| `locale`             | string          | Locale code                                                |
| `label`              | string          | Localized option label shown to the customer               |
| `customizableOption` | string (IRI)    | Parent customizable option                                 |

### Attribute Value

| Field        | Type            | Description                                                                  |
|--------------|-----------------|------------------------------------------------------------------------------|
| `id`         | integer         | EAV row primary key                                                          |
| `locale`     | string          | Locale this value applies to                                                 |
| `channel`    | string          | Channel code                                                                 |
| `textValue` / `integerValue` / `decimalValue` / `booleanValue` / `datetimeValue` / `dateValue` / `jsonValue` | mixed | The typed storage column — only one is populated per row, depending on the attribute's `columnName` |
| `value`      | mixed           | Convenience accessor — same as the populated typed column                    |
| `uniqueId`   | string          | `<channel>\|<locale>\|<product>\|<attribute>` — internal index               |
| `attribute`  | string (IRI)    | Parent attribute                                                             |
| `product`    | string (IRI)    | Parent product                                                               |

## Use Cases

- **Refresh the gallery** without re-fetching the entire PDP after the customer changes a configurable variant — `GET /api/shop/products/{variantId}/images`.
- **Audit assets** across the catalog from an admin tool — `GET /api/shop/product-images?per_page=50` and walk the pagination.
- **Display tier-price tables** on a B2B PDP — `GET /api/shop/products/{id}/customer-group-prices`.
- **Render a customizable-option editor** — list the option from the PDP, then dereference each `prices[]` IRI for the per-option upcharge.
- **Inspect the raw EAV record** during a data-quality audit — `GET /api/shop/products/{id}/attribute-values` shows exactly what's stored on `product_attribute_values`.

## Related Resources

- [Single Product](/api/rest-api/shop/products/get-product) — embeds `images`, `videos`, `customizableOptions`, … inline
- [Product Type Sub-Resources](/api/rest-api/shop/products/product-type-subresources)
- [Introduction → IRIs & HATEOAS](/api/rest-api/introduction#iris-hateoas)
