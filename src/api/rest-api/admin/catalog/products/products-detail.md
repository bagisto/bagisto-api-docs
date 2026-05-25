---
outline: false
apiType: rest
examples:
  - id: admin-catalog-product-detail
    title: Catalog Product Detail (type-aware, all fields inlined)
    description: Single catalog product record with all detail-level fields populated. Type-specific blocks (superAttributes/variants for configurable, bundleOptions for bundle, linkedProducts for grouped, downloadableLinks/downloadableSamples for downloadable) are populated only for the matching product type; all others are null. No IRI strings — every nested array is an inline JSON object.
    query: |
      curl -X GET "https://your-domain.com/api/admin/catalog/products/42" \
        -H "X-Admin-Key: <your-admin-api-key>" \
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
        "downloadableSamples": null
      }
    commonErrors:
      - error: Not Found (404)
        cause: The product ID does not exist in the database
        solution: 'Verify the ID with the listing endpoint `GET /api/admin/catalog/products`'

      - error: Unauthorized (401)
        cause: Missing, invalid, expired, or revoked admin Bearer token
        solution: 'Authenticate via `POST /api/admin/login` and pass the returned token as `Authorization: Bearer <token>`'

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

## Authentication

Every request requires:

```
Authorization: Bearer <token>
X-Admin-Key: <your-admin-api-key>
```

Obtain the Bearer token via [`POST /api/admin/login`](/api/rest-api/admin/authentication).

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

### Type-specific blocks

These four fields are **`null` unless the product type matches**:

| Field | Present for type | Description |
|-------|-----------------|-------------|
| `superAttributes` | `configurable` | Array of configurable attributes (id, code, label, options) |
| `variants` | `configurable` | Array of variant child products with their attribute values |
| `bundleOptions` | `bundle` | Array of bundle option groups with their selectable products |
| `linkedProducts` | `grouped` | Array of linked associated products |
| `downloadableLinks` | `downloadable` | Array of download link rows (title, type, url/file, price, downloads) |
| `downloadableSamples` | `downloadable` | Array of sample download rows |

::: tip Plain arrays — no follow-up calls needed
All nested fields (`translations`, `images`, `categories`, `inventories`,
`customerGroupPrices`, and all type-specific blocks) are serialized as **plain
inline JSON arrays** — there are no IRI strings or sub-resource links. The full
product structure is returned in a single response.
:::

::: info Listing vs detail
The `GET /api/admin/catalog/products` listing endpoint returns a slim `{ data, meta }`
envelope with ~18 fields per row (suitable for datagrid rendering). This detail
endpoint returns all fields, including the heavy blocks that are intentionally
omitted from the listing for performance.
:::

## Example Request

```bash
curl -X GET "https://your-domain.com/api/admin/catalog/products/42" \
  -H "X-Admin-Key: <your-admin-api-key>" \
  -H "Authorization: Bearer <token>" \
  -H "Accept: application/json"
```

## Example Response (simple product)

```json
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
  "downloadableSamples": null
}
```

## Errors

| HTTP Status | Cause |
|-------------|-------|
| `401 Unauthorized` | Missing, expired, or revoked admin Bearer token |
| `401 Unauthorized` | Invalid `X-Admin-Key` header |
| `404 Not Found` | The specified `{id}` does not exist in the database |

## Notes

- **Type-aware payload.** The six type-specific blocks (`superAttributes`, `variants`,
  `bundleOptions`, `linkedProducts`, `downloadableLinks`, `downloadableSamples`) are
  always present in the response, but are `null` for non-matching types. A simple,
  virtual, or booking product always has all six as `null`. Switch on `type` to know
  which block to read.
- **All nested objects are plain inline JSON.** There are no IRI strings or
  sub-resource links in the detail response — the full structure (including type-specific
  blocks) is embedded in a single HTTP call.
- **`null` fields are always included.** The endpoint sets
  `normalizationContext: ['skip_null_values' => false]`, so null-valued fields appear
  explicitly in the JSON rather than being silently dropped.
- **Route disambiguation via `\d+` requirement.** The `{id}` path segment is
  constrained to digits only. Non-numeric segments are rejected with `404` before
  reaching the provider — this prevents the segment from accidentally matching sibling
  routes such as `/catalog/products/list`.
- **Listing vs detail are the same resource.** Both `GET /api/admin/catalog/products`
  (datagrid listing) and `GET /api/admin/catalog/products/{id}` (detail) are served
  from `AdminCatalogProduct`. The listing provider returns slim rows; the detail
  provider returns the full payload including all type-specific blocks.
- **Booking products are accessible via this endpoint.** Even though booking products
  cannot be added to an admin draft cart (blocked at cart add-item time with HTTP 400),
  their detail record is fully readable here.
