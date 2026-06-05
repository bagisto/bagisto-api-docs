---
outline: false
examples:
  - id: admin-catalog-product-detail
    title: Catalog Product Detail — type-aware (GraphQL)
    description: Fetch a single catalog product by IRI. Type-specific blocks (superAttributes/variants for configurable, bundleOptions for bundle, linkedProducts for grouped, downloadableLinks/downloadableSamples for downloadable) are null on non-matching types. Note — these blocks are typed as ?array on the resource; they may return null over GraphQL even when data exists (see the warning below). Use the REST detail endpoint as the canonical path when you need guaranteed type-specific block data.
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
            "downloadableSamples": null
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

::: warning Nested data is returned whole
`translations`, `images`, `categories`, `inventories`, `customerGroupPrices`, and the type-specific blocks (`variants` / `bundleOptions` / `linkedProducts` / `downloadableLinks` / `downloadableSamples` / `superAttributes`) are returned as **whole JSON** — query each as a bare field (`translations`, not `translations { … }`). The entire array comes back, and it resolves over GraphQL on the detail query.
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
      "downloadableSamples": null
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
- **Same provider as the REST detail endpoint.** `AdminCatalogProductDetailProvider`
  serves both transports with identical data-loading semantics. REST is canonical
  for guaranteed non-null array fields — see the warning above.
- **`?array` scalar nullability quirk.** This is a pre-existing project-wide
  limitation that also affects `AdminAttributeFamily.attributeGroups`,
  `AdminCart` array fields, and `AdminOrderDetail` nested arrays. It does not affect
  plain scalar fields (`id`, `sku`, `name`, `type`, `price`, etc.), which are always
  reliably returned.
- **Booking products are accessible.** Even though booking products cannot be added
  to an admin draft cart, their detail record is fully readable via this query.
- **Route disambiguation.** The REST endpoint carries a `requirements: ['id' => '\d+']`
  constraint — the resolver uses the IRI path for lookup, so only numeric IDs
  (e.g. `/api/admin/catalog/products/42`) are accepted.
