---
outline: false
apiType: rest
examples:
  - id: admin-catalog-product-detail
    title: Catalog Product Detail (type-aware, all fields inlined)
    description: Single catalog product record with all detail-level fields populated. Type-specific blocks (superAttributes/variants for configurable, bundleOptions for bundle, linkedProducts for grouped, downloadableLinks/downloadableSamples for downloadable) are populated only for the matching product type; all others are null. No IRI strings — every nested array is an inline JSON object.
    query: |
      curl -X GET "https://your-domain.com/api/admin/catalog/products/42" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    variables: |
      id=42
    response: |
      {
        "id": 42,
        "sku": "SP-001",
        "name": "Classic Watch",
        "type": "simple",
        "status": 1,
        "price": "99.9900",
        "formattedPrice": "$99.99",
        "quantity": 42,
        "baseImageUrl": "http://localhost:8000/storage/product/42/image.webp",
        "imagesCount": 3,
        "categoryId": 5,
        "categoryName": "Accessories",
        "channel": "default",
        "locale": "en",
        "attributeFamilyId": 1,
        "attributeFamilyName": "Default",
        "urlKey": "classic-watch",
        "visibleIndividually": true,
        "shortDescription": "A premium timepiece.",
        "description": "Full HTML description.",
        "metaTitle": null,
        "metaDescription": null,
        "metaKeywords": null,
        "weight": 0.5,
        "taxCategoryId": null,
        "manageStock": true,
        "inStock": true,
        "featured": false,
        "new": true,
        "createdAt": "2026-01-12T08:15:00+00:00",
        "updatedAt": "2026-04-30T14:20:09+00:00",
        "translations": [
          {
            "locale": "en",
            "name": "Classic Watch",
            "description": "Full HTML description.",
            "shortDescription": "A premium timepiece.",
            "urlKey": "classic-watch",
            "metaTitle": null,
            "metaDescription": null,
            "metaKeywords": null
          }
        ],
        "images": [
          {
            "id": 1,
            "path": "product/42/img1.webp",
            "url": "http://localhost/storage/product/42/img1.webp",
            "sortOrder": 0
          }
        ],
        "categories": [
          {
            "id": 5,
            "name": "Accessories",
            "slug": "accessories"
          }
        ],
        "inventories": [
          {
            "sourceId": 1,
            "sourceCode": "default",
            "qty": 42
          }
        ],
        "customerGroupPrices": [],
        "superAttributes": null,
        "variants": null,
        "bundleOptions": null,
        "linkedProducts": null,
        "downloadableLinks": null,
        "downloadableSamples": null,
        "channels": [
          { "id": 1, "code": "default", "name": "Default Channel", "assigned": true },
          { "id": 2, "code": "mobile", "name": "Mobile Channel", "assigned": false }
        ],
        "attributes": [
          { "id": 1, "code": "sku", "adminName": "SKU", "type": "text", "isRequired": true, "valuePerChannel": false, "valuePerLocale": false, "groupCode": "general", "groupName": "General", "value": "SP-001", "options": null },
          { "id": 23, "code": "color", "adminName": "Color", "type": "select", "isRequired": false, "valuePerChannel": false, "valuePerLocale": false, "groupCode": "general", "groupName": "General", "value": null, "options": [ { "id": 1, "adminName": "Red", "swatchValue": "#ff0000", "sortOrder": 1 } ] },
          { "id": 25, "code": "meta_title", "adminName": "Meta Title", "type": "textarea", "isRequired": false, "valuePerChannel": true, "valuePerLocale": true, "groupCode": "meta_description", "groupName": "Meta Description", "value": null, "options": null }
        ]
      }
    commonErrors:
      - error: Not Found (404)
        cause: The product ID does not exist in the database
        solution: 'Verify the ID with the listing endpoint `GET /api/admin/catalog/products`'

      - error: Unauthorized (401)
        cause: Missing, invalid, expired, or revoked admin Bearer token
        solution: Send a valid admin Bearer token (Integration token) in the Authorization header. See the Authentication page.

---

# Catalog Product — Detail

Returns a single catalog product by ID with **all detail-level fields populated**,
including translations, images, categories, inventories, customer group prices, and
type-specific blocks. This is the read endpoint for the admin
**Catalog → Products** edit form.

## Endpoint

| Endpoint | Method | Authentication |
|----------|--------|----------------|
| `/api/admin/catalog/products/{id}` | GET | Admin Bearer token |

`{id}` must be a positive integer. The route carries a `requirements: ['id' => '\d+']`
constraint — non-numeric path segments are rejected with `404` before reaching the
provider. This prevents the `{id}` segment from accidentally matching sibling
routes under `/catalog/products/`.

## Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | The numeric product ID |

## Response Shape

The response is a **single JSON object** (not wrapped in a `{ data }` envelope)
with the following top-level fields:

### Core fields (always present)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Product ID |
| `sku` | string | Product SKU |
| `name` | string | Localised product name |
| `type` | string | Product type (`simple`, `configurable`, `bundle`, `grouped`, `downloadable`, `virtual`, `booking`) |
| `status` | integer | `1` = enabled, `0` = disabled |
| `price` | string | Raw decimal price string (e.g. `"99.9900"`) |
| `formattedPrice` | string | Currency-formatted price (e.g. `"$99.99"`) |
| `quantity` | integer | Total quantity across all inventory sources |
| `baseImageUrl` | string\|null | URL of the base/primary image |
| `imagesCount` | integer | Total number of product images |
| `categoryId` | integer\|null | Primary category ID |
| `categoryName` | string\|null | Primary category display name |
| `channel` | string | Channel code used for value resolution |
| `locale` | string | Locale code used for value resolution |
| `attributeFamilyId` | integer | Attribute family ID |
| `attributeFamilyName` | string | Attribute family display name |
| `urlKey` | string | URL slug (e.g. `classic-watch`) |
| `visibleIndividually` | boolean | Whether the product appears in listings |
| `shortDescription` | string\|null | Short description (may contain HTML) |
| `description` | string\|null | Full description (may contain HTML) |
| `metaTitle` | string\|null | SEO meta title |
| `metaDescription` | string\|null | SEO meta description |
| `metaKeywords` | string\|null | SEO meta keywords |
| `weight` | float\|null | Product weight |
| `taxCategoryId` | integer\|null | Tax category ID |
| `manageStock` | boolean\|null | Whether inventory is managed |
| `inStock` | boolean | Whether the product is currently in stock |
| `featured` | boolean | Whether the product is featured |
| `new` | boolean | Whether the product is marked as new |
| `createdAt` | string | ISO 8601 creation timestamp |
| `updatedAt` | string | ISO 8601 last-updated timestamp |

### `translations[]` array

Each element is one per-locale translation row:

| Field | Type | Description |
|-------|------|-------------|
| `locale` | string | Locale code (e.g. `en`, `fr`) |
| `name` | string\|null | Translated product name |
| `description` | string\|null | Translated full description |
| `shortDescription` | string\|null | Translated short description |
| `urlKey` | string\|null | Translated URL slug |
| `metaTitle` | string\|null | Translated SEO meta title |
| `metaDescription` | string\|null | Translated SEO meta description |
| `metaKeywords` | string\|null | Translated SEO meta keywords |

### `images[]` array

Each element is one product image:

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Image ID |
| `path` | string | Storage path relative to the disk root |
| `url` | string | Full public URL |
| `sortOrder` | integer | Display order position |

### `categories[]` array

Each element is a category the product belongs to:

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Category ID |
| `name` | string | Category display name |
| `slug` | string | Category URL slug |

### `inventories[]` array

Each element is one inventory source row:

| Field | Type | Description |
|-------|------|-------------|
| `sourceId` | integer | Inventory source ID |
| `sourceCode` | string | Inventory source code (e.g. `default`) |
| `qty` | integer | Quantity at this source |

### `customerGroupPrices[]` array

Each element is a customer-group price override. Empty array (`[]`) when none are
configured.

### Type-Specific Blocks

These seven fields are always present in the response but are `null` unless the product's `type` matches:

| Field | Present for type | Description |
|-------|-----------------|-------------|
| `superAttributes` | `configurable` | The configurable attributes, each with its full `options` list |
| `variants` | `configurable` | Variant child products with their chosen attribute values |
| `bundleOptions` | `bundle` | Bundle option groups with their selectable products |
| `linkedProducts` | `grouped` | The associated products |
| `downloadableLinks` | `downloadable` | Download link rows — title, type, url or file, price, download limit |
| `downloadableSamples` | `downloadable` | Sample download rows |
| `bookingProduct` | `booking` | Booking sub-type, location, availability window, and slots or tickets |

Switch on `type` to know which to read. A `simple` or `virtual` product has all seven as `null`.

### `channels[]` array

**Every** channel in the store, each flagged with whether this product is assigned to
it — mirrors the Channels checkbox box on the edit screen (all options shown, the
product's ones ticked). The singular `channel` field above is the channel code the
data was resolved for.

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Channel ID |
| `code` | string | Channel code |
| `name` | string | Channel display name |
| `assigned` | boolean | `true` if this product is assigned to the channel |

### `attributes[]` array

The product's **attribute-family field set** — the same fields the admin edit screen
renders, in the same order, driven by the product's attribute family. This includes
family-specific fields (e.g. `color`, `size`, `brand`, `product_number`) that aren't
top-level columns. Fields with no value are still present, with `value: null`.

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Attribute ID |
| `code` | string | Attribute code (e.g. `sku`, `color`, `meta_title`) |
| `adminName` | string | Field label as shown in the admin |
| `type` | string | Input type (`text`, `textarea`, `price`, `boolean`, `select`, `multiselect`, `checkbox`, `date`, `datetime`, `image`, `file`) |
| `isRequired` | boolean | Whether the field is required |
| `valuePerChannel` | boolean | Whether the value can differ per channel |
| `valuePerLocale` | boolean | Whether the value can differ per locale |
| `groupCode` | string | Code of the field group it belongs to |
| `groupName` | string | Display name of the field group |
| `value` | mixed\|null | The product's resolved value for the requested channel/locale (`null` when unset). For `select` it's the chosen option ID; for `multiselect`/`checkbox` a comma-separated list of option IDs |
| `options` | array\|null | For `select`/`multiselect`/`checkbox`: the selectable options (`id`, `adminName`, `swatchValue`, `sortOrder`). `null` for other types |

### Everything Arrives Inline

Every nested field — `translations`, `images`, `videos`, `categories`, `inventories`, `customerGroupPrices`, `channels`, `attributes`, and all the type-specific blocks — is a plain inline JSON array. There are no IRI strings and no sub-resource links, so one call returns the whole product.

`attributes` plus `channels` together reconstruct the admin edit form: `channels` renders the channel checkboxes with the assigned ones ticked, and `attributes` renders every General / Description / Meta / Settings / Price field for the product's family. The top-level convenience fields (`sku`, `status`, `urlKey`, …) also appear inside `attributes` — the same values surfaced twice, which is deliberate.

### Where This Differs From GraphQL

`adminCatalogProduct` returns the same product with nested blocks as Relay connections rather than arrays, and the two are not shape-compatible:

- **`variants[].attributeValues` is a map here** — `{"select_age_group": "5-7 Y"}` — but a connection of `{ code, adminName, value }` nodes over GraphQL.
- **`channels` lists every channel with an `assigned` flag here**, while GraphQL returns only the assigned ones.
- **`attributes`, `bookingProduct`, and `warnings` exist only on this endpoint.** They are declared in the GraphQL schema but always resolve `null` there.
- **Scalar types differ.** `status`, `quantity`, `weight`, `featured`, and `new` are real JSON numbers and booleans here; over GraphQL they are strings, with `""` standing in for false.

## Errors

| HTTP Status | Body |
|-------------|------|
| `401` | `{"message": "Unauthenticated.", "error": "unauthenticated"}` |
| `404` | `{"type": "/errors/404", "title": "Not Found", "status": 404, "detail": "Product not found."}` |

A non-numeric `{id}` also returns `404`. The route constrains the segment to digits, so `/catalog/products/abc` is rejected before the product is looked up — which is what keeps the segment from swallowing sibling routes such as `/catalog/products/mass-delete`.

## Working With This Endpoint

- **Null fields are returned, not omitted.** Every one of the 55 keys is present on every response, so a key-existence check tells you nothing — test the value.
- **The response is a bare object**, unlike the listing, which wraps rows in `{ data, meta }`.
- **Booking products are fully readable here** even though they cannot be added to an admin draft cart. The cart blocks them at add-item time with HTTP `400`; reading them is unrestricted.
