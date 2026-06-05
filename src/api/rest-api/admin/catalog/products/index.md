---
outline: false
apiType: rest
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

Creation is deliberately minimal: a `POST` creates the shell from just `sku` + `attribute_family_id` + `type` (plus `super_attributes` for `configurable`). Everything else — name, description, price, images, categories, channels, inventory — is filled in afterwards via the **update** endpoint. This mirrors the admin's create-then-edit wizard.

## `status` vs `visibleIndividually`

Two independent flags control storefront presence:

- **`status`** — `1` enabled / `0` disabled. A disabled product is fully hidden from the storefront.
- **`visibleIndividually`** — whether the product appears in category/search listings. Variant products and grouped-component products are usually set to `0` (reachable only through their parent), while still being `status = 1`.

Both must effectively be on for a product to be browsable on its own. (`status` is stored on the flattened product table, resolved per channel + locale.)

## Per-product sub-resources

The product edit screen's tabs map to their own endpoint groups, each scoped to one product:

- **Images** — upload, reorder, and delete a product's images.
- **Inventories** — read and bulk-update the per-inventory-source stock quantities.
- **Customer-group prices** — tiered prices that apply to specific customer groups.

These are not returned in full on the listing (they're detail-only); the single-product endpoint embeds them inline.

## Endpoints in this menu

| Action | Endpoint |
|--------|----------|
| [List products (datagrid)](/api/rest-api/admin/catalog/products) | `GET /api/admin/catalog/products` |
| [Product detail](/api/rest-api/admin/catalog/products/products-detail) | `GET /api/admin/catalog/products/{id}` |
| [Create product](/api/rest-api/admin/catalog/products/create) | `POST /api/admin/catalog/products` |
| [Update product](/api/rest-api/admin/catalog/products/update) | `PUT /api/admin/catalog/products/{id}` |
| [Delete product](/api/rest-api/admin/catalog/products/delete) | `DELETE /api/admin/catalog/products/{id}` |
| [Copy product](/api/rest-api/admin/catalog/products/copy) | `POST /api/admin/catalog/products/{id}/copy` |
| [Mass delete](/api/rest-api/admin/catalog/products/mass-delete) | `POST /api/admin/catalog/products/mass-delete` |
| [Mass update status](/api/rest-api/admin/catalog/products/mass-update-status) | `POST /api/admin/catalog/products/mass-update-status` |
| [Upload images](/api/rest-api/admin/catalog/products/images-upload) | `POST /api/admin/catalog/products/{id}/images` |
| [Reorder images](/api/rest-api/admin/catalog/products/images-reorder) | `PUT /api/admin/catalog/products/{id}/images/reorder` |
| [Delete image](/api/rest-api/admin/catalog/products/images-delete) | `DELETE /api/admin/catalog/products/{id}/images/{imageId}` |
| [List inventories](/api/rest-api/admin/catalog/products/inventories-list) | `GET /api/admin/catalog/products/{id}/inventories` |
| [Update inventories](/api/rest-api/admin/catalog/products/inventories-update) | `PUT /api/admin/catalog/products/{id}/inventories` |
| [List customer-group prices](/api/rest-api/admin/catalog/products/customer-group-prices-list) | `GET /api/admin/catalog/products/{id}/customer-group-prices` |
| [Add customer-group price](/api/rest-api/admin/catalog/products/customer-group-prices-create) | `POST /api/admin/catalog/products/{id}/customer-group-prices` |
| [Update customer-group price](/api/rest-api/admin/catalog/products/customer-group-prices-update) | `PUT /api/admin/catalog/products/{id}/customer-group-prices/{priceId}` |
| [Delete customer-group price](/api/rest-api/admin/catalog/products/customer-group-prices-delete) | `DELETE /api/admin/catalog/products/{id}/customer-group-prices/{priceId}` |

There is also a separate slim [product picker](/api/rest-api/admin/catalog/products/list) (`GET /api/admin/products`) used by the Create-Order "Add Product" modal — distinct from the datagrid above.

All Products endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication). Reads require `catalog.products.view`; writes require the matching `catalog.products.create` / `.edit` / `.delete` permission.
