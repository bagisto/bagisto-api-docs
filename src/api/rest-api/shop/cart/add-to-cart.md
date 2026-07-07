---
outline: false
examples:
  - id: add-simple
    title: Simple / Virtual
    description: Add a simple or virtual product. Only productId and quantity are needed.
    request: |
      POST /api/shop/add-product-in-cart
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxx
      Authorization: Bearer <cartToken>

      {
        "productId": 1,
        "quantity": 2
      }
    response: |
      {
        "id": 6698,
        "cartToken": "6698",
        "customerId": null,
        "channelId": 1,
        "itemsCount": 1,
        "items": [
          {
            "id": 7567,
            "cartId": 6698,
            "productId": 1,
            "name": "Coastal Breeze Men's Blue Zipper Hoodie",
            "sku": "COASTALBREEZEMENSHOODIE",
            "quantity": 2,
            "price": 100,
            "basePrice": 100,
            "total": 200,
            "baseTotal": 200,
            "type": "simple",
            "options": null,
            "formattedPrice": "$100.00",
            "formattedTotal": "$200.00",
            "canChangeQty": true
          }
        ],
        "subtotal": 200,
        "grandTotal": 200,
        "formattedSubtotal": "$200.00",
        "formattedGrandTotal": "$200.00",
        "couponCode": null,
        "success": true,
        "message": "Product added to cart successfully."
      }
  - id: add-configurable
    title: Configurable
    description: Add a configurable product. Pass the chosen variant's product ID in selectedConfigurableOption (this field is required).
    request: |
      POST /api/shop/add-product-in-cart
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxx
      Authorization: Bearer <cartToken>

      {
        "productId": 123,
        "quantity": 1,
        "selectedConfigurableOption": 124
      }
    response: |
      {
        "id": 6699,
        "itemsCount": 1,
        "items": [
          {
            "id": 7568,
            "productId": 123,
            "name": "Zoe Tank",
            "quantity": 1,
            "type": "configurable",
            "options": [
              { "attribute_name": "Size", "option_label": "S" },
              { "attribute_name": "Color", "option_label": "Red" }
            ],
            "formattedTotal": "$2,040.00"
          }
        ],
        "grandTotal": 2040,
        "formattedGrandTotal": "$2,040.00",
        "success": true,
        "message": "Product added to cart successfully."
      }
  - id: add-bundle
    title: Bundle
    description: Add a bundle product. bundleOptions maps each bundle option ID to the chosen bundle-option-product IDs; bundleOptionQty maps each option ID to its quantity.
    request: |
      POST /api/shop/add-product-in-cart
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxx
      Authorization: Bearer <cartToken>

      {
        "productId": 2517,
        "quantity": 1,
        "bundleOptions": {
          "1": [1],
          "2": [2],
          "3": [3],
          "4": [4]
        },
        "bundleOptionQty": {
          "1": 1,
          "2": 1,
          "3": 1,
          "4": 1
        }
      }
    response: |
      {
        "id": 6700,
        "itemsCount": 1,
        "items": [
          {
            "productId": 2517,
            "name": "Arctic Frost Winter Accessories",
            "quantity": 1,
            "type": "bundle",
            "formattedTotal": "$69.00"
          }
        ],
        "grandTotal": 69,
        "formattedGrandTotal": "$69.00",
        "success": true,
        "message": "Product added to cart successfully."
      }
  - id: add-grouped
    title: Grouped
    description: Add a grouped product. groupedQty maps each associated product ID to its quantity (include every associated product).
    request: |
      POST /api/shop/add-product-in-cart
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxx
      Authorization: Bearer <cartToken>

      {
        "productId": 2516,
        "quantity": 1,
        "groupedQty": {
          "2512": 1,
          "2514": 2,
          "2515": 1
        }
      }
    response: |
      {
        "id": 6701,
        "itemsCount": 3,
        "items": [
          { "productId": 2512, "type": "simple", "quantity": 1 },
          { "productId": 2514, "type": "simple", "quantity": 2 },
          { "productId": 2515, "type": "simple", "quantity": 1 }
        ],
        "success": true,
        "message": "Product added to cart successfully."
      }
  - id: add-downloadable
    title: Downloadable
    description: Add a downloadable product. links is the array of selected download-link IDs.
    request: |
      POST /api/shop/add-product-in-cart
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxx
      Authorization: Bearer <cartToken>

      {
        "productId": 2506,
        "quantity": 1,
        "links": [2]
      }
    response: |
      {
        "id": 6702,
        "itemsCount": 1,
        "items": [
          {
            "productId": 2506,
            "name": "Complete Personal Finance Guide",
            "quantity": 1,
            "type": "downloadable",
            "options": [
              {
                "option_id": 0,
                "option_label": "Full eBook PDF",
                "attribute_name": "Downloads"
              }
            ],
            "formattedTotal": "$18.00"
          }
        ],
        "grandTotal": 18,
        "formattedGrandTotal": "$18.00",
        "success": true,
        "message": "Product added to cart successfully."
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing cart/customer token
        solution: Create a guest cart with POST /api/shop/cart-tokens and send its cartToken as a Bearer token (or log a customer in and send their token).
      - error: 400 Bad Request
        cause: An inactive or out-of-stock item was requested (e.g. a grouped/bundle child)
        solution: Choose products that are active and in stock.
      - error: 422 Validation Error
        cause: Quantity below 1, or required options missing for the product type
        solution: Send a valid quantity and the option fields required by the product type (see below).
  - id: add-customizable
    title: Simple Product - Customizable Options
    description: Add a product with customizable options. Options 9 and 10 are selects (value ids). Option 11 is a file type — its value is a token from the upload endpoint (upload the file first, then pass the token). See the Customizable options section below.
    request: |
      POST /api/shop/add-product-in-cart
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxx
      Authorization: Bearer <token>

      {
        "productId": 2977,
        "quantity": 1,
        "customizableOptions": {
          "9": [9],
          "10": [12],
          "11": ["<token-from-upload-endpoint>"]
        }
      }
    response: |
      {
        "id": 6895,
        "cartToken": "6895",
        "customerId": 19,
        "channelId": 1,
        "itemsCount": 1,
        "items": [
          {
            "id": 7769,
            "cartId": 6895,
            "productId": 2977,
            "name": "Simple Customizable options",
            "sku": "testcustomizeoption",
            "quantity": 1,
            "price": 54,
            "total": 54,
            "type": "simple",
            "options": [
              {
                "option_label": "1kg",
                "attribute_name": "Weight Select",
                "attribute_type": "select"
              },
              {
                "option_label": "Pineapple",
                "attribute_name": "Flavour",
                "attribute_type": "select"
              }
            ],
            "formattedPrice": "$54.00",
            "formattedTotal": "$54.00",
            "canChangeQty": true
          }
        ],
        "subtotal": 54,
        "grandTotal": 54,
        "formattedSubtotal": "$54.00",
        "formattedGrandTotal": "$54.00",
        "couponCode": null,
        "success": true,
        "message": "Product added to cart successfully."
      }
    commonErrors:
      - error: 422 Validation Error
        cause: A required customizable option was omitted
        solution: Include every option whose isRequired is true (from the product's customizableOptions)

---

# Add to Cart

Add a product to the shopping cart. The request body depends on the **product type** — simple and virtual need only `productId` + `quantity`, while configurable, bundle, grouped, and downloadable products require their option selections.

## Endpoint

```
POST /api/shop/add-product-in-cart
```

## Authentication

This endpoint operates on a specific cart, so every request needs a **cart token** (Bearer), in addition to the storefront key:

| Header | Required | Description |
|--------|----------|-------------|
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | `Bearer <token>` — a guest **cart token** or a logged-in **customer token** |
| `Content-Type` | Yes | `application/json` |

Get a guest cart token first with [Create Cart](/api/rest-api/shop/cart/create-cart) (`POST /api/shop/cart-tokens`) — its `cartToken` is the Bearer value. For a logged-in customer, use the token from [Customer Login](/api/rest-api/shop/customers/customer-login).

## Request body by product type

All types take `productId` and `quantity`. Add the fields for the product's type:

| Field | Type | Applies to | Description |
|-------|------|-----------|-------------|
| `productId` | integer | all | The product ID being added |
| `quantity` | integer | all | Quantity (minimum 1) |
| `selectedConfigurableOption` | integer | configurable | **Required.** The chosen **variant** product ID. |
| `superAttribute` | object | configurable | `{ "<attributeId>": <optionId> }`. Accepted but **not used by add-to-cart** — the cart resolves the variant from `selectedConfigurableOption`, so always send that. |
| `bundleOptions` | object | bundle | `{ "<optionId>": [<bundleOptionProductId>, …] }` — the **bundle-option-product IDs** (from the product detail), not raw product IDs. |
| `bundleOptionQty` | object | bundle | `{ "<optionId>": <qty> }` — quantity per bundle option |
| `groupedQty` | object | grouped | `{ "<associatedProductId>": <qty> }` — include every associated product |
| `links` | array | downloadable | `[<linkId>, …]` — selected download-link IDs |
| `customizableOptions` | object | simple / virtual / downloadable | `{ "<optionId>": [<valueId>, …] }` — chosen customizable-option values. See below. |

The option IDs (variant product IDs, bundle-option-product IDs, associated product IDs, link IDs) come from the **product detail** response — fetch the product first to discover them. The product, variant, and bundle-option products must be **active and in stock**, or the item is rejected.

### Customizable options

Customizable options are extra inputs an admin attaches to a product (a weight dropdown, a flavour picker, an engraving text field). They are **not** limited to configurable products — a **simple or virtual** product can carry them. Read them from the product's `customizableOptions` ([Get Product](/api/rest-api/shop/products/get-product)): each option has an `id` and a `prices` array whose entries each have an `id` (the value id), and `isRequired` marks the mandatory ones.

Send the selections as `customizableOptions` — a map of option `id` → an **array** of chosen value `id`s:

```json
"customizableOptions": { "9": [9], "10": [12] }
```

Option `9` (Weight) → value `9` (1kg); option `10` (Flavour) → value `12` (Pineapple). The array form supports multi-select; for a text/textarea option the array holds the entered string. Include every option whose `isRequired` is `true`, or the request returns `422`. The chosen values come back on the cart item's `options` so you can show them on the cart page.

#### File-type customizable options

A `file`-type option needs a file upload, which cannot travel in a JSON body. Upload the file first at **[Upload Customizable File](/api/rest-api/shop/cart/upload-customizable-file)** (a separate REST call that returns a token), then send the token here as that option's value:

```json
"customizableOptions": { "9": [9], "10": [12], "11": ["<upload-token>"] }
```

The full flow, endpoint, and rules are on the [Upload Customizable File](/api/rest-api/shop/cart/upload-customizable-file) page.

> Use the example dropdown (top-right) to see the exact body for each product type.

## Response

On success the endpoint returns the **full updated cart** (HTTP 200), not just the added line. Key fields:

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Cart ID |
| `itemsCount` | integer | Number of line items |
| `items` | array | Cart line items (each with `productId`, `name`, `quantity`, `type`, `options`, `formattedTotal`, …) |
| `subtotal` / `grandTotal` | decimal | Cart totals (raw) |
| `formattedSubtotal` / `formattedGrandTotal` | string | Localised, currency-formatted totals |
| `couponCode` | string\|null | Applied coupon, if any |
| `success` | boolean | Whether the add succeeded |
| `message` | string | Human-readable result |

## Behavior

- If the same product (same options) is already in the cart, its quantity is increased.
- Stock and saleability are validated; an inactive/out-of-stock item is rejected.
- Booking products are added through the booking-specific flow, not this endpoint.

## Related Resources

- [Create Cart](/api/rest-api/shop/cart/create-cart) — get a guest cart token first
- [Get Cart](/api/rest-api/shop/cart/get-cart)
- [Update Cart Item](/api/rest-api/shop/cart/update-cart-item)
- [Remove Cart Item](/api/rest-api/shop/cart/remove-cart-item)
- [Upload Customizable File](/api/rest-api/shop/cart/upload-customizable-file) — stage a file-option file, then reference the token here
- [Get Product](/api/rest-api/shop/products/get-product) — read a product's customizable options and supported file extensions
