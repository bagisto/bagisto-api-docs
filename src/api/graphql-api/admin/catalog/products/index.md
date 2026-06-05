---
outline: false
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

- **`status`** — `1` enabled / `0` disabled. A disabled product is fully hidden from the storefront.
- **`visibleIndividually`** — whether the product appears in category/search listings. Variant products and grouped-component products are usually set to `0` (reachable only through their parent), while still being `status = 1`.

Both must effectively be on for a product to be browsable on its own.

## Nested data is returned whole

On the single-product query, nested blocks (`translations`, `images`, `categories`, `inventories`, `customerGroupPrices`, and the type-specific blocks like `variants` / `bundleOptions` / `downloadableLinks`) are returned as **whole JSON** — query each as a bare field (`translations`, not `translations { … }`); the entire array comes back. They resolve over GraphQL on the detail query.

## Per-product sub-resources

The product edit screen's tabs map to their own operations, each scoped to one product:

- **Images** — upload (REST only — binary), reorder, and delete a product's images.
- **Inventories** — read and bulk-update the per-inventory-source stock quantities.
- **Customer-group prices** — tiered prices that apply to specific customer groups.

These are not returned in full on the listing (they're detail-only); the single-product query embeds them inline.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List products (datagrid)](/api/graphql-api/admin/catalog/products) | `adminCatalogProducts` query |
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

There is also a separate slim [product picker](/api/graphql-api/admin/catalog/products/list) (`adminProducts` query) used by the Create-Order "Add Product" modal — distinct from the datagrid above.

All Products operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication). Reads require `catalog.products.view`; writes require the matching `catalog.products.create` / `.edit` / `.delete` permission.
