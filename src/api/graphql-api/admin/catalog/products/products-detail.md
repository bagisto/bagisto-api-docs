---
outline: false
examples:
  - id: admin-catalog-product-detail
    title: Catalog Product Detail — type-aware (GraphQL)
    description: Fetch a single catalog product by IRI. Type-specific blocks (superAttributes/variants for configurable, bundleOptions for bundle, linkedProducts for grouped, downloadableLinks/downloadableSamples for downloadable) are null on non-matching types. channels lists every channel with an assigned flag; attributes mirrors the admin edit-screen field set for the product's family (empty fields included). All nested arrays are returned whole — query each as a bare field.
    query: |
      query AdminCatalogProduct($id: ID!) {
        adminCatalogProduct(id: $id) {
          id
          _id
          sku
          name
          type
          status
          price
          formattedPrice
          quantity
          baseImageUrl
          imagesCount
          categoryId
          categoryName
          channel
          locale
          attributeFamilyId
          attributeFamilyName
          urlKey
          visibleIndividually
          shortDescription
          description
          metaTitle
          metaDescription
          metaKeywords
          weight
          taxCategoryId
          manageStock
          inStock
          featured
          new
          createdAt
          updatedAt
          translations
          images
          categories
          inventories
          customerGroupPrices
          superAttributes
          variants
          bundleOptions
          linkedProducts
          downloadableLinks
          downloadableSamples
          channels
          attributes
        }
      }
    variables: |
      {
        "id": "/api/admin/catalog/products/42"
      }
    response: |
      {
        "data": {
          "adminCatalogProduct": {
            "id": "/api/admin/catalog/products/42",
            "_id": 42,
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
        }
      }
---

# Catalog Product — Detail (GraphQL)

GraphQL item query that returns a single catalog product by its IRI, with all
**detail-level fields populated**, including translations, images, categories,
inventories, customer group prices, and type-specific blocks.

## Operation

| Operation | Type |
|-----------|------|
| `adminCatalogProduct` | Query (item) |

## Authentication

Every request must include an admin Bearer token:

```
Authorization: Bearer <token>
```

Obtain a token via the [`createAdminLogin`](/api/graphql-api/admin/authentication)
mutation.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `ID!` | Yes | API Platform IRI of the product (e.g. `"/api/admin/catalog/products/42"`) |

::: tip Finding the IRI
The IRI can be taken from the `id` field in any `adminCatalogProducts` edge node,
or constructed as `/api/admin/catalog/products/{numericId}`. Both forms are
accepted by the resolver.
:::

## Fields

### Core scalar fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID` | API Platform IRI (e.g. `/api/admin/catalog/products/42`) |
| `_id` | `Int` | Raw numeric product ID |
| `sku` | `String` | Product SKU |
| `name` | `String` | Localised product name |
| `type` | `String` | Product type (`simple`, `configurable`, `bundle`, `grouped`, `downloadable`, `virtual`, `booking`) |
| `status` | `Int` | `1` = enabled, `0` = disabled |
| `price` | `String` | Raw decimal price string (e.g. `"99.9900"`) |
| `formattedPrice` | `String` | Currency-formatted price (e.g. `"$99.99"`) |
| `quantity` | `Int` | Total quantity across all inventory sources |
| `baseImageUrl` | `String` | URL of the base/primary image |
| `imagesCount` | `Int` | Total number of product images |
| `categoryId` | `Int` | Primary category ID |
| `categoryName` | `String` | Primary category display name |
| `channel` | `String` | Channel code used for value resolution |
| `locale` | `String` | Locale code used for value resolution |
| `attributeFamilyId` | `Int` | Attribute family ID |
| `attributeFamilyName` | `String` | Attribute family display name |
| `urlKey` | `String` | URL slug (e.g. `classic-watch`) |
| `visibleIndividually` | `Boolean` | Whether the product appears in storefront listings |
| `shortDescription` | `String` | Short description (may contain HTML) |
| `description` | `String` | Full description (may contain HTML) |
| `metaTitle` | `String` | SEO meta title |
| `metaDescription` | `String` | SEO meta description |
| `metaKeywords` | `String` | SEO meta keywords |
| `weight` | `Float` | Product weight |
| `taxCategoryId` | `Int` | Tax category ID |
| `manageStock` | `Boolean` | Whether inventory is managed |
| `inStock` | `Boolean` | Whether the product is currently in stock |
| `featured` | `Boolean` | Whether the product is featured |
| `new` | `Boolean` | Whether the product is marked as new |
| `createdAt` | `String` | ISO 8601 creation timestamp |
| `updatedAt` | `String` | ISO 8601 last-updated timestamp |

### Array/scalar fields (plain JSON)

| Field | Type | Description |
|-------|------|-------------|
| `translations` | scalar (JSON array\|null) | Per-locale translation rows — see shape below |
| `images` | scalar (JSON array\|null) | Product image rows — see shape below |
| `categories` | scalar (JSON array\|null) | Category references — see shape below |
| `inventories` | scalar (JSON array\|null) | Per-source inventory rows — see shape below |
| `customerGroupPrices` | scalar (JSON array\|null) | Customer-group price overrides (empty array when none) |
| `channels` | scalar (JSON array) | Every channel, each flagged `assigned` for this product — see shape below |
| `attributes` | scalar (JSON array) | The product's attribute-family field set (edit-screen parity) — see shape below |

### Type-specific blocks (null unless type matches)

| Field | Present for type | Description |
|-------|-----------------|-------------|
| `superAttributes` | `configurable` | Configurable attributes and their options |
| `variants` | `configurable` | Variant child products with attribute values |
| `bundleOptions` | `bundle` | Bundle option groups with selectable products |
| `linkedProducts` | `grouped` | Linked associated products |
| `downloadableLinks` | `downloadable` | Download link rows |
| `downloadableSamples` | `downloadable` | Sample download rows |

### `translations[]` element shape

| Key | Type | Description |
|-----|------|-------------|
| `locale` | string | Locale code (e.g. `en`, `fr`) |
| `name` | string\|null | Translated product name |
| `description` | string\|null | Translated full description |
| `shortDescription` | string\|null | Translated short description |
| `urlKey` | string\|null | Translated URL slug |
| `metaTitle` | string\|null | Translated SEO meta title |
| `metaDescription` | string\|null | Translated SEO meta description |
| `metaKeywords` | string\|null | Translated SEO meta keywords |

### `images[]` element shape

| Key | Type | Description |
|-----|------|-------------|
| `id` | integer | Image ID |
| `path` | string | Storage path relative to the disk root |
| `url` | string | Full public URL |
| `sortOrder` | integer | Display order position |

### `categories[]` element shape

| Key | Type | Description |
|-----|------|-------------|
| `id` | integer | Category ID |
| `name` | string | Category display name |
| `slug` | string | Category URL slug |

### `inventories[]` element shape

| Key | Type | Description |
|-----|------|-------------|
| `sourceId` | integer | Inventory source ID |
| `sourceCode` | string | Inventory source code (e.g. `default`) |
| `qty` | integer | Quantity at this source |

### `channels[]` element shape

Every channel in the store, with `assigned` indicating whether this product belongs
to it — mirrors the edit-screen Channels box (all options shown, the product's ticked).

| Key | Type | Description |
|-----|------|-------------|
| `id` | integer | Channel ID |
| `code` | string | Channel code |
| `name` | string | Channel display name |
| `assigned` | boolean | `true` if this product is assigned to the channel |

### `attributes[]` element shape

The product's attribute-family field set — the same fields the admin edit screen
renders (including family-specific ones like `color`, `size`, `brand`,
`product_number`). Empty fields are present with `value: null`.

| Key | Type | Description |
|-----|------|-------------|
| `id` | integer | Attribute ID |
| `code` | string | Attribute code (e.g. `sku`, `color`, `meta_title`) |
| `adminName` | string | Field label as shown in the admin |
| `type` | string | Input type (`text`, `textarea`, `price`, `boolean`, `select`, `multiselect`, `checkbox`, `date`, `datetime`, `image`, `file`) |
| `isRequired` | boolean | Whether the field is required |
| `valuePerChannel` | boolean | Whether the value can differ per channel |
| `valuePerLocale` | boolean | Whether the value can differ per locale |
| `groupCode` | string | Code of the field group |
| `groupName` | string | Display name of the field group |
| `value` | mixed\|null | Resolved value for the requested channel/locale (`null` when unset); for `select` the chosen option ID, for `multiselect`/`checkbox` a comma-separated option-ID list |
| `options` | array\|null | Selectable options (`id`, `adminName`, `swatchValue`, `sortOrder`) for `select`/`multiselect`/`checkbox`; `null` otherwise |

::: warning Nested data is returned whole
`translations`, `images`, `categories`, `inventories`, `customerGroupPrices`, `channels`, `attributes`, and the type-specific blocks (`variants` / `bundleOptions` / `linkedProducts` / `downloadableLinks` / `downloadableSamples` / `superAttributes`) are returned as **whole JSON** — query each as a bare field (`attributes`, not `attributes { … }`). The entire array comes back, and it resolves over GraphQL on the detail query.
:::

## Example Query

```graphql
query AdminCatalogProduct($id: ID!) {
  adminCatalogProduct(id: $id) {
    id
    _id
    sku
    name
    type
    status
    price
    formattedPrice
    quantity
    baseImageUrl
    imagesCount
    categoryId
    categoryName
    channel
    locale
    attributeFamilyId
    attributeFamilyName
    urlKey
    visibleIndividually
    shortDescription
    description
    metaTitle
    metaDescription
    metaKeywords
    weight
    taxCategoryId
    manageStock
    inStock
    featured
    new
    createdAt
    updatedAt
    translations
    images
    categories
    inventories
    customerGroupPrices
    superAttributes
    variants
    bundleOptions
    linkedProducts
    downloadableLinks
    downloadableSamples
    channels
    attributes
  }
}
```

```json
{
  "id": "/api/admin/catalog/products/42"
}
```

## Example Response (simple product)

```json
{
  "data": {
    "adminCatalogProduct": {
      "id": "/api/admin/catalog/products/42",
      "_id": 42,
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
        {
          "id": 1,
          "code": "sku",
          "adminName": "SKU",
          "type": "text",
          "isRequired": true,
          "valuePerChannel": false,
          "valuePerLocale": false,
          "groupCode": "general",
          "groupName": "General",
          "value": "SP-001",
          "options": null
        },
        {
          "id": 23,
          "code": "color",
          "adminName": "Color",
          "type": "select",
          "isRequired": false,
          "valuePerChannel": false,
          "valuePerLocale": false,
          "groupCode": "general",
          "groupName": "General",
          "value": null,
          "options": [
            { "id": 1, "adminName": "Red", "swatchValue": "#ff0000", "sortOrder": 1 }
          ]
        },
        {
          "id": 25,
          "code": "meta_title",
          "adminName": "Meta Title",
          "type": "textarea",
          "isRequired": false,
          "valuePerChannel": true,
          "valuePerLocale": true,
          "groupCode": "meta_description",
          "groupName": "Meta Description",
          "value": null,
          "options": null
        }
      ]
    }
  }
}
```

## Errors

| Scenario | GraphQL `errors[]` | HTTP Status |
|----------|-------------------|-------------|
| Unknown ID | `errors[]` populated or `data.adminCatalogProduct: null` | `200` (GraphQL convention) |
| Missing auth | `"Unauthenticated"` in `errors[]` | `200` |

## Notes

- **Type-aware payload.** The six type-specific blocks are always requested in the
  selection set but are `null` for non-matching product types. Switch on the `type`
  field to know which block to read.
- **`id` argument is the IRI, not the integer.** Construct it as
  `"/api/admin/catalog/products/{_id}"` using the `_id` field from a listing query,
  or pass the `id` field directly from a listing result.
- **Same data as the REST detail endpoint.** This query and `GET /api/admin/catalog/products/{id}`
  return identical data; the REST response uses camelCase JSON, this query returns the
  same fields with the nested arrays as whole JSON values.
- **Nested arrays are bare JSON, not sub-selections.** Query `attributes`, `channels`,
  `translations`, etc. as plain fields — they return the whole array. Plain scalar
  fields (`id`, `sku`, `name`, `type`, `price`, …) are always returned.
- **Booking products are accessible.** Even though booking products cannot be added
  to an admin draft cart, their detail record is fully readable via this query.
- **Route disambiguation.** The REST endpoint carries a `requirements: ['id' => '\d+']`
  constraint — the resolver uses the IRI path for lookup, so only numeric IDs
  (e.g. `/api/admin/catalog/products/42`) are accepted.
