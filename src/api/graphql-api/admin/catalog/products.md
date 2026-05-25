---
outline: false
examples:
  - id: admin-catalog-products-list
    title: List Catalog Products (Datagrid)
    description: Cursor-paginated query returning the full 18-field catalog product row — the GraphQL equivalent of the admin Catalog → Products datagrid. Supports filtering by type, status, SKU, name, price range, attribute family, channel, and locale.
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
                  "id": "/api/admin/admin_catalog_products/142",
                  "_id": 142,
                  "sku": "SP-001",
                  "name": "Classic Watch",
                  "type": "simple",
                  "status": 1,
                  "price": "99.9900",
                  "formattedPrice": "$99.99",
                  "quantity": 42,
                  "baseImageUrl": "http://localhost:8000/cache/medium/product/142/image.webp",
                  "imagesCount": 3,
                  "categoryId": 5,
                  "categoryName": "Accessories",
                  "channel": "Default",
                  "locale": "en",
                  "attributeFamilyId": 1,
                  "attributeFamilyName": "Default",
                  "urlKey": "classic-watch",
                  "visibleIndividually": true
                }
              },
              {
                "cursor": "MQ==",
                "node": {
                  "id": "/api/admin/admin_catalog_products/143",
                  "_id": 143,
                  "sku": "SP-002",
                  "name": "Sport Watch",
                  "type": "simple",
                  "status": 1,
                  "price": "149.9900",
                  "formattedPrice": "$149.99",
                  "quantity": 18,
                  "baseImageUrl": "http://localhost:8000/cache/medium/product/143/image.webp",
                  "imagesCount": 2,
                  "categoryId": 5,
                  "categoryName": "Accessories",
                  "channel": "Default",
                  "locale": "en",
                  "attributeFamilyId": 1,
                  "attributeFamilyName": "Default",
                  "urlKey": "sport-watch",
                  "visibleIndividually": true
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "hasPreviousPage": false,
              "endCursor": "MQ==",
              "startCursor": "MA=="
            },
            "totalCount": 616
          }
        }
      }
---

# Catalog Products — Datagrid Listing

Cursor-paginated GraphQL query that mirrors the Bagisto admin **Catalog →
Products** datagrid. Returns the full 18-field product row with filtering,
sorting, and cursor pagination.

::: tip Distinct from the Create-Order product picker
`adminCatalogProducts` (this query) is the full datagrid — 18 fields per row,
designed for catalog management screens.

`adminProducts` is the slim picker (9 fields) used by the admin Create-Order
"Add Product" modal. The two operations share no overlap in purpose.
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
| `id` | `ID` | API Platform IRI (e.g. `/api/admin/admin_catalog_products/142`) |
| `_id` | `Int` | Raw product ID |
| `sku` | `String` | Product SKU |
| `name` | `String` | Product name (resolved via `locale` and `channel`) |
| `type` | `String` | Product type |
| `status` | `Int` | `1` = enabled, `0` = disabled |
| `price` | `String` | Raw price as a decimal string (e.g. `"99.9900"`) |
| `formattedPrice` | `String` | Locale-formatted price (e.g. `"$99.99"`) |
| `quantity` | `Int` | Sum of inventory qty across all inventory sources |
| `baseImageUrl` | `String` | Storage URL of the first product image (medium cache) |
| `imagesCount` | `Int` | Total number of images attached to the product |
| `categoryId` | `Int` | ID of the first category this product belongs to |
| `categoryName` | `String` | Translated name of that category |
| `channel` | `String` | Channel code used for resolution |
| `locale` | `String` | Locale code used for resolution |
| `attributeFamilyId` | `Int` | Attribute family ID |
| `attributeFamilyName` | `String` | Attribute family name |
| `urlKey` | `String` | URL slug (e.g. `"classic-watch"`) |
| `visibleIndividually` | `Boolean` | Whether the product appears in category/search listings |

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
            "id": "/api/admin/admin_catalog_products/142",
            "_id": 142,
            "sku": "SP-001",
            "name": "Classic Watch",
            "type": "simple",
            "status": 1,
            "price": "99.9900",
            "formattedPrice": "$99.99",
            "quantity": 42,
            "baseImageUrl": "http://localhost:8000/cache/medium/product/142/image.webp",
            "imagesCount": 3,
            "categoryId": 5,
            "categoryName": "Accessories",
            "channel": "Default",
            "locale": "en",
            "attributeFamilyId": 1,
            "attributeFamilyName": "Default",
            "urlKey": "classic-watch",
            "visibleIndividually": true
          }
        }
      ],
      "pageInfo": {
        "hasNextPage": true,
        "hasPreviousPage": false,
        "endCursor": "MA==",
        "startCursor": "MA=="
      },
      "totalCount": 616
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
| Purpose | Full catalog management datagrid | Slim Create-Order product picker |
| Fields per row | 18 | 9 |
| Filters | 10+ (price range, attribute family, etc.) | 6 (query text, sku, type, status, categoryId, channel) |
| Default status filter | None — all statuses returned | None — all statuses returned |
| Datagrid parity | Yes — mirrors `ProductDataGrid` 1:1 | No |

## Notes

- **Elasticsearch is not yet supported.** Even when the Bagisto admin panel is
  configured to use Elasticsearch for catalog search, this query always uses the
  database path. Elasticsearch support is deferred to Phase 1.1.b of the Catalog
  API roadmap.
- **Custom filter args** — API Platform does not auto-expose filter arguments in
  the GraphQL schema for `QueryCollection` operations. This query uses `extraArgs`
  declared on the `QueryCollection` operation to surface all 12 filter/sort
  arguments as first-class GraphQL arguments.
- **Same provider as the REST endpoint** — `AdminCatalogProductCollectionProvider`
  serves both transports with identical filter and sort semantics.
- **No automatic status filter** — unlike `adminProducts` (the shop product
  query), this operation returns all statuses by default. Pass `status: 1` to
  restrict to enabled products.
- **Multi-category products** — only the first associated category's `categoryId`
  and `categoryName` are included (matching the datagrid display).
