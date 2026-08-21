---
outline: false
examples:
  - id: admin-catalog-products-list
    title: List Products (Datagrid)
    description: The canonical admin product listing — a cursor-paginated query mirroring the Catalog → Products datagrid, with every scalar column the listing can resolve.
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
              parentId
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
              description
              metaTitle
              metaDescription
              metaKeywords
              weight
              featured
              new
              additional
              createdAt
              updatedAt
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
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
                  "sku": "SP-001",
                  "name": "Acme Drawstring Bag",
                  "type": "simple",
                  "parentId": null,
                  "status": "1",
                  "price": "3000.0000",
                  "formattedPrice": "$3,000.00",
                  "specialPrice": "2700.0000",
                  "formattedSpecialPrice": "$2,700.00",
                  "specialPriceFrom": null,
                  "specialPriceTo": null,
                  "quantity": "98",
                  "baseImageUrl": "http://localhost:8000/storage/product/22/1qfyoglc5BP46kofrxYrkJ2MXRxu9lAVG3BDFlTZ.webp",
                  "imagesCount": "1",
                  "categoryId": null,
                  "categoryName": null,
                  "channel": "default",
                  "locale": "en",
                  "attributeFamilyId": 1,
                  "attributeFamilyName": "Default",
                  "urlKey": "acme-drawstring-bag",
                  "visibleIndividually": "1",
                  "shortDescription": "Many desktop publishing packages and web page editors now use",
                  "description": "A roomy drawstring bag in durable cotton canvas.",
                  "metaTitle": "Acme Drawstring Bag",
                  "metaDescription": "",
                  "metaKeywords": "",
                  "weight": "32",
                  "featured": "1",
                  "new": "",
                  "additional": null,
                  "createdAt": "2026-04-19T11:56:43+05:30",
                  "updatedAt": "2026-04-23T16:36:14+05:30"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "hasPreviousPage": false,
              "startCursor": "MA==",
              "endCursor": "MA=="
            },
            "totalCount": 265
          }
        }
      }
  - id: admin-catalog-products-sorted
    title: Sorted and Price-Filtered
    description: Sorting takes either a column plus a direction, or a single compound token. Both forms below are equivalent.
    query: |
      query AdminCatalogProducts($first: Int, $sort: String, $order: String, $priceFrom: Float, $priceTo: Float) {
        adminCatalogProducts(
          first: $first
          sort: $sort
          order: $order
          price_from: $priceFrom
          price_to: $priceTo
        ) {
          edges {
            node {
              _id
              sku
              name
              price
              formattedPrice
            }
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 5,
        "sort": "price",
        "order": "asc",
        "priceFrom": 10,
        "priceTo": 500
      }
    response: |
      {
        "data": {
          "adminCatalogProducts": {
            "edges": [
              {
                "node": {
                  "_id": 85,
                  "sku": "SP-014",
                  "name": "PureStride Classic White Sneakers",
                  "price": "60.9900",
                  "formattedPrice": "$60.99"
                }
              }
            ],
            "totalCount": 41
          }
        }
      }
---

# List Products

The canonical admin product listing, mirroring the Bagisto admin **Catalog → Products** datagrid. Cursor-paginated, filterable, and sortable — this is the query behind a product-management screen.

For the product types, the two-step create flow, `status` versus `visibleIndividually`, and the per-product sub-resources, see the [Products overview](/api/graphql-api/admin/catalog/products/).

A separate slim search, [`adminProducts`](/api/graphql-api/admin/catalog/products/list), powers the Create-Order "Add Product" modal only. It is not the listing.

## Operation

| Operation | Type | Pagination |
|-----------|------|------------|
| `adminCatalogProducts` | Query | Cursor (`first` / `after`) |

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `first` | Int | Page size, default `10`, capped at `50`. |
| `after` | String | Cursor from a previous `pageInfo.endCursor`. |
| `last` | Int | Page size when paging backwards. |
| `before` | String | Cursor from a previous `pageInfo.startCursor`. |
| `product_id` | String | One id (`"142"`) or a comma-separated list (`"1,2,3"`). |
| `sku` | String | Partial SKU match. |
| `name` | String | Partial name match. |
| `type` | String | `simple`, `configurable`, `bundle`, `grouped`, `downloadable`, `virtual`, or `booking`. |
| `status` | Int | `0` disabled, `1` enabled. |
| `attribute_family` | String | Attribute family id. |
| `channel` | String | Channel code used to resolve values. Defaults to the current channel. |
| `locale` | String | Locale code used to resolve name and category. Defaults to the app locale. |
| `price_from` | Float | Minimum price, inclusive. |
| `price_to` | Float | Maximum price, inclusive. |
| `sort` | String | Column to sort by — see [Sorting](#sorting). |
| `order` | String | `asc` or `desc`. Defaults to `desc`. |

Filters combine with AND, so each one you add narrows the result. Four of the argument names are snake_case (`product_id`, `attribute_family`, `price_from`, `price_to`) while the rest are single words — that is the literal schema, not a typo.

## Node Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | ID! | Resource identifier in IRI form, `/api/admin/catalog/products/<id>`. |
| `_id` | Int! | Numeric product id. |
| `sku` | String! | Product SKU. |
| `type` | String! | Product type. |
| `parentId` | String | Parent product id for a configurable variant, `null` for a standalone product. |
| `name` | String | Resolved for the requested channel and locale. |
| `status` | String | `"1"` enabled, `""` disabled. |
| `price` | String | Decimal string, four places (`"3000.0000"`). |
| `formattedPrice` | String | The same price in the channel currency. |
| `specialPrice` | String | Sale price as a decimal string, `null` when none. |
| `formattedSpecialPrice` | String | Formatted sale price, `null` when none. |
| `specialPriceFrom` | String | Start of the sale window, `null` unless a dated window is set. |
| `specialPriceTo` | String | End of the sale window, `null` unless a dated window is set. |
| `quantity` | String | Inventory summed across every source. |
| `baseImageUrl` | String | URL of the first product image. |
| `imagesCount` | String | Number of images attached. |
| `categoryId` | String | Id of the **first** category only, `null` when uncategorized. |
| `categoryName` | String | Translated name of that first category. |
| `channel` | String | Channel code used for resolution. |
| `locale` | String | Locale code used for resolution. |
| `attributeFamilyId` | Int | Attribute family id. |
| `attributeFamilyName` | String | Attribute family name. |
| `urlKey` | String | URL slug. |
| `visibleIndividually` | String | `"1"` when the product appears in listings, `""` when it does not. |
| `shortDescription` | String | Short description, HTML. |
| `description` | String | Full description, HTML. |
| `metaTitle` | String | SEO meta title. |
| `metaDescription` | String | SEO meta description. |
| `metaKeywords` | String | SEO meta keywords. |
| `weight` | String | Product weight. |
| `featured` | String | `"1"` when flagged featured, `""` when not. |
| `new` | String | `"1"` when flagged new, `""` when not. |
| `additional` | String | Type-specific extra data, `null` for most products. |
| `createdAt` | String | ISO 8601 with offset, `2026-04-19T11:56:43+05:30`. |
| `updatedAt` | String | ISO 8601 with offset. |

Four traps in these values:

- **Booleans arrive as `"1"` or the empty string `""`, never `true`/`false`.** `status`, `visibleIndividually`, `featured`, and `new` are all typed String. `""` is falsy in JavaScript so a plain `if (node.featured)` happens to work, but `node.featured === false` and `node.status === "0"` never match anything. Compare against `"1"`, or coerce.
- **Numbers arrive as strings too.** `price`, `quantity`, `imagesCount`, `weight`, and `categoryId` are String; only `_id` and `attributeFamilyId` are Int. Sorting a page client-side on `price` without casting compares `"100.0000"` below `"60.9900"`.
- **`categoryId` and `categoryName` describe the first category only.** A product in three categories reports one, matching what the datagrid shows. Read the full set from the `categories` connection on [Product Detail](/api/graphql-api/admin/catalog/products/products-detail).
- **`quantity` is a sum across inventory sources**, not a per-source figure. For the breakdown use [List Inventories](/api/graphql-api/admin/catalog/products/inventories-list).

### Fields That Stay Null on the Listing

`taxCategoryId`, `manageStock`, and `inStock` are resolved per product and are always `null` here. So is every relation connection — `translations`, `images`, `videos`, `categories`, `inventories`, `customerGroupPrices`, `superAttributes`, `variants`, `bundleOptions`, `linkedProducts`, `downloadableLinks`, `downloadableSamples`, `customizableOptions`, `attributeValues`, `channels`, `relatedProducts`, `upSells`, and `crossSells`. They resolve only on `adminCatalogProduct(id:)`.

Selecting them on the listing is not an error — you simply get nulls and empty edges, at no query cost.

## Sorting

Pass `sort` with a column and `order` with a direction. The compound form `sort: "name-asc"` is also accepted and splits on the hyphen.

| `sort` value | Sorts by |
|---|---|
| `product_id` | Product id (default) |
| `name` | Product name |
| `sku` | SKU |
| `price` | Price |
| `quantity` | Inventory quantity, summed across sources |
| `status` | Enabled / disabled |
| `type` | Product type |
| `attribute_family` | Attribute family id |
| `channel` | Channel code |

Products with no resolved `name` in the requested locale sort first on an ascending `name` — they are not filtered out.

## Cursor Pagination

`first` sets the page size. Pass the previous response's `pageInfo.endCursor` as `after` to advance. `totalCount` is the full match count across all pages, not the size of the current page.

## How It Differs From `adminProducts`

| | `adminCatalogProducts` | `adminProducts` |
|---|---|---|
| Purpose | The product listing, for catalog management | Create-Order "Add Product" search |
| Row shape | Every scalar column | Nine fields |
| Filters | Full set including price range and attribute family | Free text, sku, type, status, categoryId |
| Scalar types | Strings, including the numbers and booleans | Real `Int`, `Float`, and `Boolean` |
| Default status filter | None — all statuses returned | None — all statuses returned |

The scalar-type difference is the one that bites: the two queries describe the same products with different JSON types, so a shared parsing helper will break on one of them.

## Search Engine

The listing always queries the database. Configuring the admin panel to use Elasticsearch for catalog search does not change this query's behaviour.
