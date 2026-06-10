---
outline: false
examples:
  - id: admin-catalog-products-list
    title: List Products (Datagrid)
    description: The canonical admin product listing over GraphQL — a cursor-paginated query returning the full catalog product row, mirroring the admin Catalog → Products datagrid. Supports filtering by type, status, SKU, name, price range, attribute family, channel, and locale.
    query: |
      query AdminCatalogProducts(
        $first: Int
        $after: String
        $sku: String
        $type: String
        $status: Int
        $priceFrom: Float
        $priceTo: Float
      ) {
        adminCatalogProducts(
          first: $first
          after: $after
          sku: $sku
          type: $type
          status: $status
          price_from: $priceFrom
          price_to: $priceTo
        ) {
          edges {
            cursor
            node {
              id
              _id
              sku
              name
              type
              status
              price
              formattedPrice
              specialPrice
              formattedSpecialPrice
              specialPriceFrom
              specialPriceTo
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
              metaTitle
              metaDescription
              metaKeywords
              weight
              featured
              new
              createdAt
              updatedAt
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
            startCursor
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10,
        "sku": "SP-",
        "type": "simple",
        "status": 1
      }
    response: |
      {
        "data": {
          "adminCatalogProducts": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/catalog/products/22",
                  "_id": 22,
                  "sku": "bagistoNGRY3424234KJCKJK",
                  "name": "Acme Drawstring Bag",
                  "type": "simple",
                  "status": 1,
                  "price": "3000.0000",
                  "formattedPrice": "$3,000.00",
                  "specialPrice": "2700.0000",
                  "formattedSpecialPrice": "$2,700.00",
                  "specialPriceFrom": null,
                  "specialPriceTo": null,
                  "quantity": 98,
                  "baseImageUrl": "http://localhost:8000/storage/product/22/1qfyoglc5BP46kofrxYrkJ2MXRxu9lAVG3BDFlTZ.webp",
                  "imagesCount": 1,
                  "categoryId": null,
                  "categoryName": null,
                  "channel": "default",
                  "locale": "en",
                  "attributeFamilyId": 1,
                  "attributeFamilyName": "Default",
                  "urlKey": "acme-drawstring-bag",
                  "visibleIndividually": true,
                  "shortDescription": "Many desktop publishing packages and web page editors now use",
                  "metaTitle": "",
                  "metaDescription": "",
                  "metaKeywords": "",
                  "weight": 32,
                  "featured": true,
                  "new": true,
                  "createdAt": "2024-04-19 11:56:43",
                  "updatedAt": "2026-04-23 16:36:14"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "hasPreviousPage": false,
              "endCursor": "MA==",
              "startCursor": "MA=="
            },
            "totalCount": 265
          }
        }
      }
---

# List Products

The **canonical admin product listing** over GraphQL — a cursor-paginated query
that mirrors the Bagisto admin **Catalog → Products** datagrid. Returns the full
product row with filtering, sorting, and cursor pagination. This is the query you
want for product-management screens.

::: tip How this menu works
For the product types, the two-step create flow, status vs. visibleIndividually, and the per-product sub-resources, see the [Products overview](/api/graphql-api/admin/catalog/products/).
:::

::: tip Not the Create-Order search
`adminCatalogProducts` (this query) is the full product listing.

A separate slim search — [`adminProducts`](/api/graphql-api/admin/catalog/products/list) — powers the admin
Create-Order "Add Product" modal only. Use this query for the actual product
listing.
:::

## Operation

| Operation | Type | Pagination |
|-----------|------|------------|
| `adminCatalogProducts` | Query | Cursor (`first` / `after`) |

## Authentication

Every request must include an admin Bearer token:

```
Authorization: Bearer <token>
```

Obtain a token via the [`createAdminLogin`](/api/graphql-api/admin/authentication)
mutation.

## Arguments

| Argument | Type | Description | Example |
|----------|------|-------------|---------|
| `first` | `Int` | Number of items to return per page (default `10`, max `50`) | `10` |
| `after` | `String` | Cursor from a previous `pageInfo.endCursor` for keyset pagination | `"MA=="` |
| `product_id` | `String` | Filter by product ID — single integer or comma-separated list | `"142"` or `"1,2,3"` |
| `sku` | `String` | Partial SKU match (SQL `LIKE %value%`) | `"SP-001"` |
| `name` | `String` | Partial product name match (SQL `LIKE %value%`) | `"Classic Watch"` |
| `type` | `String` | Filter by product type | `"simple"` |
| `status` | `Int` | Filter by status: `0` = disabled, `1` = enabled | `1` |
| `attribute_family` | `String` | Filter by attribute family ID | `"1"` |
| `channel` | `String` | Channel code for value resolution (default: current channel) | `"default"` |
| `locale` | `String` | Locale code for name/category resolution (default: app locale) | `"en"` |
| `price_from` | `Float` | Minimum price filter (inclusive) | `10.0` |
| `price_to` | `Float` | Maximum price filter (inclusive) | `500.0` |
| `sort` | `String` | Column to sort by (see Sorting section below) | `"product_id"` |
| `order` | `String` | Sort direction: `"asc"` or `"desc"` (default `"desc"`) | `"desc"` |

### Valid `type` values

`"simple"`, `"configurable"`, `"bundle"`, `"grouped"`, `"downloadable"`,
`"virtual"`, `"booking"`

## Node Fields

Each `edges[].node` object contains the following fields:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID` | API Platform IRI (e.g. `/api/admin/catalog/products/142`) |
| `_id` | `Int` | Raw product ID |
| `sku` | `String` | Product SKU |
| `name` | `String` | Product name (resolved via `locale` and `channel`) |
| `type` | `String` | Product type |
| `status` | `Int` | `1` = enabled, `0` = disabled |
| `price` | `String` | Raw price as a decimal string (e.g. `"3000.0000"`) |
| `formattedPrice` | `String` | Locale-formatted price (e.g. `"$3,000.00"`) |
| `specialPrice` | `String` | Raw special (sale) price as a decimal string; `null` if none |
| `formattedSpecialPrice` | `String` | Locale-formatted special price; `null` if none |
| `specialPriceFrom` | `String` | Start of the special-price window; `null` unless a dated window is set |
| `specialPriceTo` | `String` | End of the special-price window; `null` unless a dated window is set |
| `quantity` | `Int` | Sum of inventory qty across all inventory sources |
| `baseImageUrl` | `String` | Storage URL of the first product image; `null` if no images |
| `imagesCount` | `Int` | Total number of images attached to the product |
| `categoryId` | `Int` | ID of the first category this product belongs to; `null` if uncategorized |
| `categoryName` | `String` | Translated name of that category; `null` if uncategorized |
| `channel` | `String` | Channel code used for resolution |
| `locale` | `String` | Locale code used for resolution |
| `attributeFamilyId` | `Int` | Attribute family ID |
| `attributeFamilyName` | `String` | Attribute family name |
| `urlKey` | `String` | URL slug (e.g. `"acme-drawstring-bag"`) |
| `visibleIndividually` | `Boolean` | Whether the product appears in category/search listings |
| `shortDescription` | `String` | Short description |
| `metaTitle` | `String` | SEO meta title (empty string when unset) |
| `metaDescription` | `String` | SEO meta description (empty string when unset) |
| `metaKeywords` | `String` | SEO meta keywords (empty string when unset) |
| `weight` | `Float` | Product weight |
| `featured` | `Boolean` | Whether the product is flagged as featured |
| `new` | `Boolean` | Whether the product is flagged as "new" |
| `createdAt` | `String` | Creation timestamp |
| `updatedAt` | `String` | Last-update timestamp |

Notes on the listing values:

- `price`, `specialPrice` are **decimal strings**, not numbers.
- `specialPriceFrom` / `specialPriceTo` are `null` unless a **dated**
  special-price window is configured.
- `quantity` is the **summed** inventory across all sources.

The following fields are **detail-only** and always come back `null` on the
listing — fetch them from the single-product query `adminCatalogProduct(id:)`:

- `taxCategoryId`, `manageStock`, `inStock`
- the relation blocks: `translations`, `images`, `categories`, `inventories`,
  `customerGroupPrices`, `superAttributes`, `variants`, `bundleOptions`,
  `linkedProducts`, `downloadableLinks`, `downloadableSamples`, `videos`,
  `channels`, `relatedProducts`, `upSells`, `crossSells`.

## Example Query

```graphql
query AdminCatalogProducts(
  $first: Int
  $after: String
  $sku: String
  $type: String
  $status: Int
  $priceFrom: Float
  $priceTo: Float
) {
  adminCatalogProducts(
    first: $first
    after: $after
    sku: $sku
    type: $type
    status: $status
    price_from: $priceFrom
    price_to: $priceTo
  ) {
    edges {
      cursor
      node {
        id
        _id
        sku
        name
        type
        status
        price
        formattedPrice
        specialPrice
        formattedSpecialPrice
        specialPriceFrom
        specialPriceTo
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
        metaTitle
        metaDescription
        metaKeywords
        weight
        featured
        new
        createdAt
        updatedAt
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
      startCursor
    }
    totalCount
  }
}
```

```json
{
  "first": 10,
  "sku": "SP-",
  "type": "simple",
  "status": 1
}
```

## Example Response

```json
{
  "data": {
    "adminCatalogProducts": {
      "edges": [
        {
          "cursor": "MA==",
          "node": {
            "id": "/api/admin/catalog/products/22",
            "_id": 22,
            "sku": "bagistoNGRY3424234KJCKJK",
            "name": "Acme Drawstring Bag",
            "type": "simple",
            "status": 1,
            "price": "3000.0000",
            "formattedPrice": "$3,000.00",
            "specialPrice": "2700.0000",
            "formattedSpecialPrice": "$2,700.00",
            "specialPriceFrom": null,
            "specialPriceTo": null,
            "quantity": 98,
            "baseImageUrl": "http://localhost:8000/storage/product/22/1qfyoglc5BP46kofrxYrkJ2MXRxu9lAVG3BDFlTZ.webp",
            "imagesCount": 1,
            "categoryId": null,
            "categoryName": null,
            "channel": "default",
            "locale": "en",
            "attributeFamilyId": 1,
            "attributeFamilyName": "Default",
            "urlKey": "acme-drawstring-bag",
            "visibleIndividually": true,
            "shortDescription": "Many desktop publishing packages and web page editors now use",
            "metaTitle": "",
            "metaDescription": "",
            "metaKeywords": "",
            "weight": 32,
            "featured": true,
            "new": true,
            "createdAt": "2024-04-19 11:56:43",
            "updatedAt": "2026-04-23 16:36:14"
          }
        }
      ],
      "pageInfo": {
        "hasNextPage": true,
        "hasPreviousPage": false,
        "endCursor": "MA==",
        "startCursor": "MA=="
      },
      "totalCount": 265
    }
  }
}
```

## Sorting

Pass `sort` with the column name and `order` for direction. A compound form
`sort=name-asc` is also accepted (splits on `-` to extract column and direction).

**Sortable columns:**

| `sort` value | Sorts by |
|---|---|
| `product_id` | Product ID (default) |
| `name` | Product name |
| `sku` | SKU |
| `price` | Price |
| `quantity` | Inventory quantity (SUM across sources) |
| `status` | Enabled/disabled status |
| `type` | Product type |
| `attribute_family` | Attribute family ID |
| `channel` | Channel code |

## Cursor Pagination

- `first` controls the page size (default `10`, max `50`).
- To fetch the next page, pass the `pageInfo.endCursor` value as `after` in the
  next request.
- `totalCount` reflects the full count of matching products across all pages.

## How It Differs from `adminProducts`

| | `adminCatalogProducts` | `adminProducts` |
|---|---|---|
| Purpose | The canonical product listing (catalog management) | Slim Create-Order "Add Product" search |
| Row shape | Full product row | Slim row (9 fields) |
| Filters | Full set (price range, attribute family, status, type, etc.) | A handful (query text, sku, type, status, categoryId, channel) |
| Default status filter | None — all statuses returned | None — all statuses returned |

Use **this** query for the product listing; use
[`adminProducts`](/api/graphql-api/admin/catalog/products/list) only for the
Create-Order product search.

## Notes

- **Elasticsearch is not yet supported.** Even when the Bagisto admin panel is
  configured to use Elasticsearch for catalog search, this query always uses the
  database path.
- **No automatic status filter** — unlike `GET /api/shop/products` (the
  storefront product list), this query returns all statuses by default. Pass
  `status: 1` to restrict to enabled products.
- **Multi-category products** — only the first associated category's `categoryId`
  and `categoryName` are included (matching the datagrid display).
