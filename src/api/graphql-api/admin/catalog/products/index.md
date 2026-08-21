---
outline: false
examples:
  - id: admin-catalog-products-list
    title: List Products (datagrid)
    description: The full Catalog → Products datagrid. Cursor pagination via first / after. All scalar fields (including special-price) resolve over GraphQL; relation blocks are detail-only (query them on the single-product query).
    query: |
      query AdminCatalogProducts($first: Int, $after: String, $status: Int, $sort: String, $order: String) {
        adminCatalogProducts(first: $first, after: $after, status: $status, sort: $sort, order: $order) {
          edges {
            cursor
            node {
              id _id sku name type status
              price formattedPrice
              specialPrice formattedSpecialPrice specialPriceFrom specialPriceTo
              quantity baseImageUrl categoryName
              channel locale attributeFamilyId attributeFamilyName
              urlKey visibleIndividually featured new createdAt updatedAt
            }
          }
          pageInfo { hasNextPage endCursor }
          totalCount
        }
      }
    variables: |
      {
        "first": 1,
        "status": 1,
        "sort": "id",
        "order": "asc"
      }
    response: |
      {
        "data": {
          "adminCatalogProducts": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/catalog/products/1",
                  "_id": 1,
                  "sku": "COASTALBREEZEMENSHOODIE",
                  "name": "Coastal Breeze Men's Blue Zipper Hoodie",
                  "type": "simple",
                  "status": 1,
                  "price": "100.0000",
                  "formattedPrice": "$100.00",
                  "specialPrice": null,
                  "formattedSpecialPrice": null,
                  "specialPriceFrom": null,
                  "specialPriceTo": null,
                  "quantity": 10000,
                  "baseImageUrl": "http://localhost:8000/storage/product/1/zKcWZTLDjcawJmaNg8g1cpARqwVONgEKEflabstT.webp",
                  "categoryName": "Fashion",
                  "channel": "default",
                  "locale": "en",
                  "attributeFamilyId": 1,
                  "attributeFamilyName": "Default",
                  "urlKey": "coastal-breeze-mens-blue-zipper-hoodie",
                  "visibleIndividually": true,
                  "featured": true,
                  "new": true,
                  "createdAt": "2024-04-16 17:32:38",
                  "updatedAt": "2026-04-07 15:20:30"
                }
              }
            ],
            "pageInfo": { "hasNextPage": true, "endCursor": "MA==" },
            "totalCount": 302
          }
        }
      }
  - id: admin-catalog-products-list-filtered
    title: List Products (AND-combined filters)
    description: Filters are AND-combined — more arguments narrow the result. Here only active simple products of attribute family 1 within a price band are returned. GraphQL can also pull the relation blocks in the same single round trip on the detail query.
    query: |
      query AdminCatalogProducts($first: Int, $status: Int, $type: String, $attribute_family: Int, $price_from: Float, $price_to: Float, $sort: String, $order: String) {
        adminCatalogProducts(first: $first, status: $status, type: $type, attribute_family: $attribute_family, price_from: $price_from, price_to: $price_to, sort: $sort, order: $order) {
          edges { node { id _id sku name type status price formattedPrice specialPrice attributeFamilyName } }
          pageInfo { hasNextPage endCursor }
          totalCount
        }
      }
    variables: |
      {
        "first": 10,
        "status": 1,
        "type": "simple",
        "attribute_family": 1,
        "price_from": 50,
        "price_to": 200,
        "sort": "price",
        "order": "asc"
      }
    response: |
      {
        "data": {
          "adminCatalogProducts": {
            "edges": [
              {
                "node": {
                  "id": "/api/admin/catalog/products/1",
                  "_id": 1,
                  "sku": "COASTALBREEZEMENSHOODIE",
                  "name": "Coastal Breeze Men's Blue Zipper Hoodie",
                  "type": "simple",
                  "status": 1,
                  "price": "100.0000",
                  "formattedPrice": "$100.00",
                  "specialPrice": null,
                  "attributeFamilyName": "Default"
                }
              }
            ],
            "pageInfo": { "hasNextPage": false, "endCursor": "MA==" },
            "totalCount": 1
          }
        }
      }
---

# Products

The Products menu is the catalog's product-management surface — list, search, create, edit, copy, and delete products, plus manage each product's images, per-source inventory, and customer-group prices. It mirrors the admin **Catalog → Products** screen.

## Product types

Every product has a `type`, fixed at creation. There are seven:

| Type | Notes |
|------|-------|
| `simple` | A standalone product with its own price and stock. |
| `virtual` | Like simple but non-shippable (no weight/dimensions) — services, memberships. |
| `downloadable` | Sells downloadable **links** (paid files) and **samples** (free previews); non-stockable. |
| `grouped` | A storefront grouping of other simple products (**linked products**); has no own price. |
| `bundle` | A configurable kit built from **bundle options**; its price is calculated from the chosen items. |
| `configurable` | A parent with **variants** generated from variant-defining attributes (`super_attributes`, e.g. colour × size). Each variant is its own SKU with its own price/stock. |
| `booking` | A bookable product (default / appointment / event / rental / table sub-types) with time slots; non-stockable. |

**Composite types own no price or stock of their own.** For `configurable`, `bundle`, `grouped`, and `booking`, the price and inventory live on the children — the variants, bundle items, linked products, or slots. Their top-level `price` / `quantity` are derived or empty.

## Creating a product is two steps

Creation is deliberately minimal: `createAdminCatalogProduct` creates the shell from just `sku` + `attributeFamilyId` + `type` (plus `superAttributes` for `configurable`). Everything else — name, description, price, images, categories, channels, inventory — is filled in afterwards via `updateAdminCatalogProduct`. This mirrors the admin's create-then-edit wizard.

## `status` vs `visibleIndividually`

Two independent flags control storefront presence:

- **`status`** — enabled or disabled. A disabled product is fully hidden from the storefront.
- **`visibleIndividually`** — whether the product appears in category and search listings. Variants and grouped components are usually off, reachable only through their parent, while still being enabled.

Both must be on for a product to be browsable on its own.

Over GraphQL both arrive as **strings**, `"1"` for on and the empty string `""` for off — never `true`/`false` and never `"0"`. Compare against `"1"`.

## Nested Data Is Field-Selectable

On the single-product query every nested block — `translations`, `images`, `videos`, `categories`, `inventories`, `customerGroupPrices`, `channels`, `attributeValues`, and the type-specific blocks such as `variants`, `bundleOptions`, and `downloadableLinks` — is a **Relay connection**. Sub-select it with `edges { node { … } }` and take only the fields you need:

```graphql
images {
  edges {
    node {
      _id
      url
      position
    }
  }
}
```

Selecting a connection as a bare field is a schema error. Three fields go the other way and are plain JSON scalars queried bare: `attributes`, `bookingProduct`, and `warnings` — and all three resolve `null` over GraphQL, so read them from the REST detail instead.

## Per-product sub-resources

The product edit screen's tabs map to their own operations, each scoped to one product:

- **Images** — upload (REST only — binary), reorder, and delete a product's images.
- **Inventories** — read and bulk-update the per-inventory-source stock quantities.
- **Customer-group prices** — tiered prices that apply to specific customer groups.

These are not returned in full on the listing (they're detail-only); the single-product query embeds them inline.

## The product listing

`adminCatalogProducts` is the datagrid query — cursor pagination via `first` / `after`. Every scalar field (including the special-price columns) **resolves over GraphQL**.

### Listing arguments (filters are AND-combined)

All filter arguments are **combined with AND** — every one you add **narrows** the result set:

| Arg | Type | Description |
|-----|------|-------------|
| `first` / `after` | cursor pagination | Page size (default `10`, max `50`) + cursor from a previous `pageInfo.endCursor`. |
| `channel` | `String` | Channel code used to resolve per-channel values. |
| `name` | `String` | Partial product-name match. |
| `sku` | `String` | Partial SKU match. |
| `attribute_family` | `Int` | Attribute-family ID. |
| `price_from` / `price_to` | `Float` | Price band (inclusive). |
| `product_id` | `String` | A single ID, or a comma-separated list (e.g. `"1,22,2705"`). |
| `status` | `Int` | `0` (disabled) or `1` (active). |
| `type` | `String` | One of the seven product types. |
| `locale` | `String` | Locale code used to resolve translated values. |
| `sort` | `String` | `product_id` (default), `sku`, `name`, `type`, `status`, `price`, `quantity`, `attribute_family`, `channel`. |
| `order` | `String` | `asc` or `desc` (default `desc`). |

### Listing node fields

Each `node` carries these scalar columns. **Heavy fields are `null` on the listing** (query them on the [detail query](/api/graphql-api/admin/catalog/products/products-detail)):

| Field | Type | Notes |
|-------|------|-------|
| `id` | `ID` | IRI (`/api/admin/catalog/products/{id}`). |
| `_id` | `Int` | Numeric product ID. |
| `sku` | `String` | SKU. |
| `name` | `String` | Resolved for the active locale/channel. `null` for draft products. |
| `type` | `String` | Product type. |
| `status` | `Int` | `1` active / `0` disabled. |
| `price` / `formattedPrice` | `String` | Base price (composite types carry no own price → `null`). |
| `specialPrice` / `formattedSpecialPrice` | `String` | Discounted price, when set. |
| `specialPriceFrom` / `specialPriceTo` | `String` | Special-price window (`null` = always on / no end). |
| `quantity` | `Int` | Total stock across inventory sources. |
| `baseImageUrl` | `String` | Medium-cache base image URL. |
| `imagesCount` | `Int` | Number of images. |
| `categoryId` / `categoryName` | `Int` / `String` | Primary category. |
| `channel` / `locale` | `String` | Resolved channel / locale. |
| `attributeFamilyId` / `attributeFamilyName` | `Int` / `String` | Attribute family. |
| `urlKey` | `String` | Storefront URL slug. |
| `visibleIndividually` / `featured` / `new` | `Boolean` | Storefront flags. |
| `shortDescription` / `description` / `metaTitle` / `metaDescription` / `metaKeywords` | `String` | Resolved content / SEO. |
| `weight` | `Float` | Product weight. |
| `createdAt` / `updatedAt` | `String` | Timestamps. |
| `taxCategoryId` / `manageStock` / `inStock` | — | **Detail-only** — `null` on the listing. |
| `translations`, `images`, `categories`, `inventories`, `customerGroupPrices`, `superAttributes`, `variants`, `bundleOptions`, `linkedProducts`, `downloadableLinks`, `downloadableSamples` | — | Relation blocks — **all `null` on the listing**; populated only on the [detail query](/api/graphql-api/admin/catalog/products/products-detail). |

## Actions

| Action | What it does |
|--------|--------------|
| [Copy](/api/graphql-api/admin/catalog/products/copy) | Duplicates an existing product into a new **draft** product (a fresh SKU is generated). |
| [Mass delete](/api/graphql-api/admin/catalog/products/mass-delete) | Deletes several products at once — `indices: [1, 22]`. Missing IDs are skipped. |
| [Mass update status](/api/graphql-api/admin/catalog/products/mass-update-status) | Bulk enable/disable — `indices: [1, 22], value: 0` (`0` = disable, `1` = active). |
| Export (CSV) | The datagrid "Export" button is **REST only** (binary file streams aren't expressible over GraphQL) — see [Export Products](/api/rest-api/admin/catalog/products/export). |

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List products](/api/graphql-api/admin/catalog/products) | `adminCatalogProducts` query |
| [Product detail](/api/graphql-api/admin/catalog/products/products-detail) | `adminCatalogProduct(id:)` query |
| [Create product](/api/graphql-api/admin/catalog/products/create) | `createAdminCatalogProduct` mutation |
| [Update product](/api/graphql-api/admin/catalog/products/update) | `updateAdminCatalogProduct` mutation |
| [Delete product](/api/graphql-api/admin/catalog/products/delete) | `deleteAdminCatalogProduct` mutation |
| [Copy product](/api/graphql-api/admin/catalog/products/copy) | `createAdminCatalogProductCopy` mutation |
| [Mass delete](/api/graphql-api/admin/catalog/products/mass-delete) | `createAdminCatalogProductMassDelete` mutation |
| [Mass update status](/api/graphql-api/admin/catalog/products/mass-update-status) | `createAdminCatalogProductMassUpdateStatus` mutation |
| [Upload images](/api/graphql-api/admin/catalog/products/images-upload) | REST only (binary) |
| [Reorder images](/api/graphql-api/admin/catalog/products/images-reorder) | `reorderAdminCatalogProductImage` mutation |
| [Delete image](/api/graphql-api/admin/catalog/products/images-delete) | `deleteAdminCatalogProductImage` mutation |
| [List inventories](/api/graphql-api/admin/catalog/products/inventories-list) | `adminCatalogProductInventories` query |
| [Update inventories](/api/graphql-api/admin/catalog/products/inventories-update) | `updateAdminCatalogProductInventory` mutation |
| [List customer-group prices](/api/graphql-api/admin/catalog/products/customer-group-prices-list) | `adminCatalogProductCustomerGroupPrices` query |
| [Add customer-group price](/api/graphql-api/admin/catalog/products/customer-group-prices-create) | `createAdminCatalogProductCustomerGroupPrice` mutation |
| [Update customer-group price](/api/graphql-api/admin/catalog/products/customer-group-prices-update) | `updateAdminCatalogProductCustomerGroupPrice` mutation |
| [Delete customer-group price](/api/graphql-api/admin/catalog/products/customer-group-prices-delete) | `deleteAdminCatalogProductCustomerGroupPrice` mutation |

The canonical product listing is [List products](/api/graphql-api/admin/catalog/products) (`adminCatalogProducts` query) above. There is also a separate slim [Add-Product Search](/api/graphql-api/admin/catalog/products/list) (`adminProducts` query) used only by the Create-Order "Add Product" modal — not the product listing.

Reads require `catalog.products.view`; writes require the matching `catalog.products.create` / `.edit` / `.delete` permission.
