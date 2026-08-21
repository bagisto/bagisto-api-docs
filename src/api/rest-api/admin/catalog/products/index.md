---
outline: false
apiType: rest
examples:
  - id: admin-catalog-products-list
    title: List Products (datagrid)
    description: The full Catalog → Products datagrid. Paginated { data, meta } envelope. Heavy relation blocks and a few EAV-derived fields are null on the listing (detail-only).
    query: |
      curl -X GET "https://your-domain.com/api/admin/catalog/products?per_page=2&sort=id&order=asc" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    response: |
      {
        "data": [
          {
            "id": 1,
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
            "imagesCount": 1,
            "categoryId": 22,
            "categoryName": "Fashion",
            "channel": "default",
            "locale": "en",
            "attributeFamilyId": 1,
            "attributeFamilyName": "Default",
            "urlKey": "coastal-breeze-mens-blue-zipper-hoodie",
            "visibleIndividually": true,
            "shortDescription": "Stay warm and stylish with the Coastal Breeze Men's Blue Zipper Hoodie...",
            "description": "The Coastal Breeze Men's Blue Zipper Hoodie is your reliable companion...",
            "metaTitle": "Coastal Breeze Men's Blue Zipper Hoodie",
            "metaDescription": "Stay warm and stylish with the Coastal Breeze Men's Blue Zipper Hoodie...",
            "metaKeywords": "",
            "weight": 1,
            "featured": true,
            "new": true,
            "createdAt": "2024-04-16 17:32:38",
            "updatedAt": "2026-04-07 15:20:30",
            "taxCategoryId": null,
            "manageStock": null,
            "inStock": null,
            "translations": null,
            "images": null,
            "categories": null,
            "inventories": null,
            "customerGroupPrices": null,
            "superAttributes": null,
            "variants": null,
            "bundleOptions": null,
            "linkedProducts": null,
            "downloadableLinks": null,
            "downloadableSamples": null
          },
          {
            "id": 22,
            "sku": "bagistoNGRY3424234KJCKJK",
            "name": "Acme Drawstring Bag",
            "type": "bundle",
            "status": 1,
            "price": "3000.0000",
            "formattedPrice": "$3,000.00",
            "specialPrice": "2700.0000",
            "formattedSpecialPrice": "$2,700.00",
            "specialPriceFrom": null,
            "specialPriceTo": null,
            "quantity": 0,
            "baseImageUrl": null,
            "imagesCount": 0,
            "categoryId": null,
            "categoryName": null,
            "channel": "default",
            "locale": "en",
            "attributeFamilyId": 1,
            "attributeFamilyName": "Default",
            "urlKey": "acme-drawstring-bag",
            "visibleIndividually": true,
            "featured": false,
            "new": false,
            "createdAt": "2024-04-16 17:32:38",
            "updatedAt": "2026-04-07 15:20:30"
          }
        ],
        "meta": {
          "currentPage": 1,
          "perPage": 2,
          "lastPage": 151,
          "total": 302,
          "from": 1,
          "to": 2
        }
      }
  - id: admin-catalog-products-list-filtered
    title: List Products (AND-combined filters)
    description: Filters are AND-combined — more filters narrow the result. Here only active simple products of attribute family 1 within a price band are returned.
    query: |
      curl -X GET "https://your-domain.com/api/admin/catalog/products?status=1&type=simple&attribute_family=1&price_from=50&price_to=200&sort=price&order=asc&per_page=10" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    response: |
      {
        "data": [
          {
            "id": 1,
            "sku": "COASTALBREEZEMENSHOODIE",
            "name": "Coastal Breeze Men's Blue Zipper Hoodie",
            "type": "simple",
            "status": 1,
            "price": "100.0000",
            "formattedPrice": "$100.00",
            "specialPrice": null,
            "formattedSpecialPrice": null,
            "quantity": 10000,
            "attributeFamilyId": 1,
            "attributeFamilyName": "Default"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
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

Creation is deliberately minimal: a `POST` creates the shell from just `sku` + `attribute_family_id` + `type` (plus `super_attributes` for `configurable`). Everything else — name, description, price, images, categories, channels, inventory — is filled in afterwards via the **update** endpoint. This mirrors the admin's create-then-edit wizard.

## `status` vs `visibleIndividually`

Two independent flags control storefront presence:

- **`status`** — `1` enabled, `0` disabled. A disabled product is fully hidden from the storefront.
- **`visibleIndividually`** — whether the product appears in category and search listings. Variants and grouped components are usually `false`, reachable only through their parent, while still being enabled.

Both must be on for a product to be browsable on its own. Over REST `status` is a number and `visibleIndividually` a boolean; the GraphQL API returns both as strings, so the two transports are not interchangeable here.

## Per-product sub-resources

The product edit screen's tabs map to their own endpoint groups, each scoped to one product:

- **Images** — upload, reorder, and delete a product's images.
- **Inventories** — read and bulk-update the per-inventory-source stock quantities.
- **Customer-group prices** — tiered prices that apply to specific customer groups.

These are not returned in full on the listing (they're detail-only); the single-product endpoint embeds them inline.

## The product listing

`GET /api/admin/catalog/products` is the datagrid — a paginated `{ data, meta }` envelope.

### Listing filters (AND-combined)

All filters are **combined with AND** — every filter you add **narrows** the result set further. Pass them as query parameters:

| Filter | Type | Description |
|--------|------|-------------|
| `channel` | string | Channel code used to resolve per-channel values. |
| `name` | string | Partial product-name match. |
| `sku` | string | Partial SKU match. |
| `attribute_family` | integer | Attribute-family ID. |
| `price_from` / `price_to` | number | Price band (inclusive). `price=50,200` is shorthand for `price_from=50&price_to=200`. |
| `product_id` | string | A single ID, or a comma-separated list (e.g. `1,22,2705`). |
| `status` | integer | `0` (disabled) or `1` (active). |
| `type` | string | One of the seven product types. |
| `locale` | string | Locale code used to resolve translated values. |

Plus pagination and sort:

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | 1-based page number (default `1`). |
| `per_page` | integer | Page size (default `10`, max `50`). |
| `sort` | string | `product_id` (default), `sku`, `name`, `type`, `status`, `price`, `quantity`, `attribute_family`, `channel`. |
| `order` | string | `asc` or `desc` (default `desc`). |

### Listing columns

Every row carries these scalar columns. **Heavy fields are `null` on the listing** (fetch them from the [detail endpoint](/api/rest-api/admin/catalog/products/products-detail)):

| Field | Type | Notes |
|-------|------|-------|
| `id` | integer | Product ID. |
| `sku` | string | SKU. |
| `name` | string\|null | Resolved for the active locale/channel. `null` for draft products with no name yet. |
| `type` | string | Product type. |
| `status` | integer | `1` active / `0` disabled. |
| `price` | string\|null | Base price (composite types carry no own price → `null`). |
| `formattedPrice` | string\|null | Locale-formatted base price. |
| `specialPrice` | string\|null | Discounted price, when a special price is set. |
| `formattedSpecialPrice` | string\|null | Locale-formatted special price. |
| `specialPriceFrom` | string\|null | Start date of the special-price window (`null` = always on). |
| `specialPriceTo` | string\|null | End date of the special-price window (`null` = no end). |
| `quantity` | integer | Total stock across inventory sources. |
| `baseImageUrl` | string\|null | Medium-cache base image URL. |
| `imagesCount` | integer | Number of images. |
| `categoryId` | integer\|null | Primary category ID. |
| `categoryName` | string\|null | Primary category name. |
| `channel` | string | Resolved channel code. |
| `locale` | string | Resolved locale code. |
| `attributeFamilyId` | integer | Attribute-family ID. |
| `attributeFamilyName` | string | Attribute-family name. |
| `urlKey` | string\|null | Storefront URL slug. |
| `visibleIndividually` | boolean | Appears in category/search listings. |
| `shortDescription` / `description` | string\|null | Resolved content. |
| `metaTitle` / `metaDescription` / `metaKeywords` | string\|null | SEO fields. |
| `weight` | number\|null | Product weight. |
| `featured` | boolean | Featured flag. |
| `new` | boolean | "New" flag. |
| `createdAt` / `updatedAt` | string | Timestamps. |
| `taxCategoryId` | integer\|null | **Detail-only** — `null` on the listing. |
| `manageStock` | boolean\|null | **Detail-only** — `null` on the listing. |
| `inStock` | boolean\|null | **Detail-only** — `null` on the listing. |
| `translations`, `images`, `categories`, `inventories`, `customerGroupPrices`, `superAttributes`, `variants`, `bundleOptions`, `linkedProducts`, `downloadableLinks`, `downloadableSamples` | array\|null | Relation blocks — **all `null` on the listing**; populated only on the [detail endpoint](/api/rest-api/admin/catalog/products/products-detail). |

## Actions

| Action | What it does |
|--------|--------------|
| [Copy](/api/rest-api/admin/catalog/products/copy) | Duplicates an existing product into a new **draft** product (a fresh SKU is generated). |
| [Mass delete](/api/rest-api/admin/catalog/products/mass-delete) | Deletes several products at once — body `{ "indices": [1, 22] }`. Missing IDs are skipped. |
| [Mass update status](/api/rest-api/admin/catalog/products/mass-update-status) | Bulk enable/disable — body `{ "indices": [1, 22], "value": 0 }` (`0` = disable, `1` = active). |
| [Export (CSV)](/api/rest-api/admin/catalog/products/export) | Downloads the listing as a CSV file, honouring the current filters; exports **every matching row**, not just the page. REST only. |

## Endpoints in this menu

| Action | Endpoint |
|--------|----------|
| [List products](/api/rest-api/admin/catalog/products) | `GET /api/admin/catalog/products` |
| [Product detail](/api/rest-api/admin/catalog/products/products-detail) | `GET /api/admin/catalog/products/{id}` |
| [Create product](/api/rest-api/admin/catalog/products/create) | `POST /api/admin/catalog/products` |
| [Update product](/api/rest-api/admin/catalog/products/update) | `PUT /api/admin/catalog/products/{id}` |
| [Delete product](/api/rest-api/admin/catalog/products/delete) | `DELETE /api/admin/catalog/products/{id}` |
| [Copy product](/api/rest-api/admin/catalog/products/copy) | `POST /api/admin/catalog/products/{id}/copy` |
| [Mass delete](/api/rest-api/admin/catalog/products/mass-delete) | `POST /api/admin/catalog/products/mass-delete` |
| [Mass update status](/api/rest-api/admin/catalog/products/mass-update-status) | `POST /api/admin/catalog/products/mass-update-status` |
| [Export products (CSV)](/api/rest-api/admin/catalog/products/export) | `GET /api/admin/catalog/products/export` |
| [Upload images](/api/rest-api/admin/catalog/products/images-upload) | `POST /api/admin/catalog/products/{id}/images` |
| [Reorder images](/api/rest-api/admin/catalog/products/images-reorder) | `PUT /api/admin/catalog/products/{id}/images/reorder` |
| [Delete image](/api/rest-api/admin/catalog/products/images-delete) | `DELETE /api/admin/catalog/products/{id}/images/{imageId}` |
| [List inventories](/api/rest-api/admin/catalog/products/inventories-list) | `GET /api/admin/catalog/products/{id}/inventories` |
| [Update inventories](/api/rest-api/admin/catalog/products/inventories-update) | `PUT /api/admin/catalog/products/{id}/inventories` |
| [List customer-group prices](/api/rest-api/admin/catalog/products/customer-group-prices-list) | `GET /api/admin/catalog/products/{id}/customer-group-prices` |
| [Add customer-group price](/api/rest-api/admin/catalog/products/customer-group-prices-create) | `POST /api/admin/catalog/products/{id}/customer-group-prices` |
| [Update customer-group price](/api/rest-api/admin/catalog/products/customer-group-prices-update) | `PUT /api/admin/catalog/products/{id}/customer-group-prices/{priceId}` |
| [Delete customer-group price](/api/rest-api/admin/catalog/products/customer-group-prices-delete) | `DELETE /api/admin/catalog/products/{id}/customer-group-prices/{priceId}` |

The canonical product listing is [List products](/api/rest-api/admin/catalog/products) (`GET /api/admin/catalog/products`) above. There is also a separate slim [Add-Product Search](/api/rest-api/admin/catalog/products/list) (`GET /api/admin/products`) used only by the Create-Order "Add Product" modal — not the product listing.

Reads require `catalog.products.view`; writes require the matching `catalog.products.create` / `.edit` / `.delete` permission.
