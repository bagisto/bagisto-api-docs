---
outline: false
apiType: rest
examples:
  - id: admin-catalog-products-list
    title: List Products (Datagrid)
    description: The canonical admin product listing — paginated, filterable, and sortable, mirroring the Bagisto admin Catalog → Products datagrid. Returns the full product row in the standard `{ data, meta }` envelope.
    query: |
      curl -X GET "https://your-domain.com/api/admin/catalog/products?per_page=10&page=1&type=simple&status=1" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    variables: |
      per_page=10&page=1&type=simple&status=1
    response: |
      {
        "data": [
          {
            "id": 22,
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
            "description": "A roomy drawstring bag in durable cotton canvas.",
            "metaTitle": "",
            "metaDescription": "",
            "metaKeywords": "",
            "weight": 32,
            "featured": true,
            "new": true,
            "createdAt": "2024-04-19 11:56:43",
            "updatedAt": "2026-04-23 16:36:14"
          }
        ],
        "meta": {
          "currentPage": 1,
          "perPage": 10,
          "lastPage": 27,
          "total": 265,
          "from": 1,
          "to": 10
        }
      }
    commonErrors:
      - error: Unauthorized (401)
        cause: Missing, invalid, expired, or revoked admin Bearer token
        solution: Send a valid admin Bearer token (Integration token) in the Authorization header. See the Authentication page.

---

# List Products

The **canonical admin product listing** — a paginated, filterable, and sortable
product list that mirrors the Bagisto admin **Catalog → Products** datagrid 1:1.
Same columns, same filters, and the same sort options used by the admin screen.
This is the listing you want for product-management screens.

For the product types, the two-step create flow, `status` versus `visibleIndividually`, and the per-product sub-resources, see the [Products overview](/api/rest-api/admin/catalog/products/).

A separate slim search, [`GET /api/admin/products`](/api/rest-api/admin/catalog/products/list), powers the Create-Order "Add Product" modal only. It is not the listing.

## Endpoint

| Endpoint | Method | Authentication |
|----------|--------|----------------|
| `/api/admin/catalog/products` | GET | Admin Bearer token |

## Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `page` | integer | Page number (1-based, default `1`) | `1` |
| `per_page` | integer | Items per page (default `10`, max `50`) | `10` |
| `product_id` | string | Filter by product ID — single integer or comma-separated list | `142` or `1,2,3` |
| `sku` | string | Partial SKU match (SQL `LIKE %value%`) | `SP-001` |
| `name` | string | Partial product name match (SQL `LIKE %value%`) | `Classic Watch` |
| `type` | string | Filter by product type | `simple` |
| `status` | integer | Filter by status: `0` = disabled, `1` = enabled | `1` |
| `attribute_family` | integer | Filter by attribute family ID | `1` |
| `channel` | string | Channel code for locale/price resolution (default: current channel) | `default` |
| `locale` | string | Locale code for name/category resolution (default: app locale) | `en` |
| `price_from` | number | Minimum price filter (inclusive) | `10.00` |
| `price_to` | number | Maximum price filter (inclusive) | `500.00` |
| `price` | string | Price range shorthand — `"min,max"`. Overridden by `price_from`/`price_to` when both are present | `10,500` |
| `sort` | string | Column to sort by (see Sorting section below) | `product_id` |
| `order` | string | Sort direction: `asc` or `desc` (default `desc`) | `desc` |

### Valid `type` values

`simple`, `configurable`, `bundle`, `grouped`, `downloadable`, `virtual`, `booking`

## Response Shape

Responses use the standard admin `{ data, meta }` envelope.

### `meta` object

| Field | Type | Description |
|-------|------|-------------|
| `currentPage` | integer | Current page number (1-based) |
| `perPage` | integer | Number of items on this page |
| `lastPage` | integer | Total number of pages |
| `total` | integer | Total matching products |
| `from` | integer | 1-based index of the first item on this page |
| `to` | integer | 1-based index of the last item on this page |

### Row fields (`data[]`)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Product ID |
| `sku` | string\|null | Product SKU |
| `name` | string\|null | Product name (resolved via `locale` and `channel`) |
| `type` | string\|null | Product type (e.g. `simple`, `configurable`) |
| `status` | integer\|null | `1` = enabled, `0` = disabled |
| `price` | string\|null | Raw price value (decimal string, e.g. `"3000.0000"`) |
| `formattedPrice` | string\|null | Locale-formatted price (e.g. `"$3,000.00"`) |
| `specialPrice` | string\|null | Raw special (sale) price as a decimal string; `null` if none |
| `formattedSpecialPrice` | string\|null | Locale-formatted special price; `null` if none |
| `specialPriceFrom` | string\|null | Start of the special-price window; `null` unless a dated window is set |
| `specialPriceTo` | string\|null | End of the special-price window; `null` unless a dated window is set |
| `quantity` | integer | Sum of inventory qty across all inventory sources |
| `baseImageUrl` | string\|null | Storage URL of the product's first image; `null` if no images |
| `imagesCount` | integer | Total number of images attached to the product |
| `categoryId` | integer\|null | ID of the first category this product belongs to; `null` if uncategorized |
| `categoryName` | string\|null | Translated name of that category (resolved via `locale`); `null` if uncategorized |
| `channel` | string\|null | Channel code used for resolution |
| `locale` | string\|null | Locale code used for resolution |
| `attributeFamilyId` | integer\|null | Attribute family ID |
| `attributeFamilyName` | string\|null | Attribute family name |
| `urlKey` | string\|null | URL slug (e.g. `acme-drawstring-bag`) |
| `visibleIndividually` | boolean\|null | Whether the product appears in category/search listings |
| `shortDescription` | string\|null | Short description, HTML |
| `description` | string\|null | Full description, HTML |
| `metaTitle` | string\|null | SEO meta title (empty string when unset) |
| `metaDescription` | string\|null | SEO meta description (empty string when unset) |
| `metaKeywords` | string\|null | SEO meta keywords (empty string when unset) |
| `weight` | number\|null | Product weight |
| `featured` | boolean | Whether the product is flagged as featured |
| `new` | boolean | Whether the product is flagged as "new" |
| `createdAt` | string | Creation timestamp |
| `updatedAt` | string | Last-update timestamp |

Four traps in these values:

- **`price` and `specialPrice` are decimal strings**, not numbers — `"3000.0000"`. Everything else numeric on the row (`quantity`, `imagesCount`, `weight`, `attributeFamilyId`) is a real number, so cast the two price fields before arithmetic or comparison.
- **`specialPriceFrom` and `specialPriceTo` stay `null` unless a dated window is set.** A product can carry a `specialPrice` with both dates `null` — that means the sale price applies indefinitely, not that there is no sale.
- **`categoryId` and `categoryName` describe the first category only.** A product in three categories reports one, matching what the datagrid shows. Read the full set from the `categories` block on [Product Detail](/api/rest-api/admin/catalog/products/products-detail).
- **`quantity` is a sum across inventory sources**, not a per-source figure. For the breakdown use [List Inventories](/api/rest-api/admin/catalog/products/inventories-list).

The same product over GraphQL comes back with **different JSON types** — `status`, `quantity`, `weight`, `featured`, and `new` are all strings there, and timestamps are ISO 8601 rather than the `2026-04-19 11:56:43` form used here. A parsing helper written against this endpoint will not survive being pointed at `adminCatalogProducts`.

### Fields That Stay Null on the Listing

Every row carries all 55 keys, but the following resolve only on the single-product endpoint `GET /api/admin/catalog/products/{id}`:

- `taxCategoryId`, `manageStock`, `inStock`, `attributes`, `bookingProduct`, `warnings`
- the relation blocks: `translations`, `images`, `videos`, `categories`, `inventories`, `customerGroupPrices`, `superAttributes`, `variants`, `bundleOptions`, `linkedProducts`, `downloadableLinks`, `downloadableSamples`, `customizableOptions`, `channels`, `relatedProducts`, `upSells`, `crossSells`

They are present as `null` rather than omitted, so a key-existence check is not a substitute for a null check.

## Sorting

Two forms are accepted — choose whichever suits your client:

| Form | Example |
|------|---------|
| Compound `sort` param | `?sort=name-asc` |
| Separate `sort` + `order` params | `?sort=name&order=asc` |

When both `order` and a compound `sort` value are present, the explicit `order`
param takes precedence.

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

## Pagination

- Default page size: **10** items
- Maximum page size: **50** items
- Use `?page=N` for page navigation and `?per_page=N` to control page size

## Errors

| HTTP Status | Cause |
|-------------|-------|
| `401` | Missing, malformed, expired, or revoked admin Bearer token |

The listing never rejects a bad filter, but the three ways it can go wrong are not the same:

- **An unknown parameter is ignored.** A misspelled `?tpye=simple` returns `200` and the unfiltered list — no error, no hint.
- **An out-of-range `status` is dropped.** `?status=7` returns the full unfiltered count, not zero.
- **An unrecognised `type` is applied and matches nothing.** `?type=notatype` returns `total: 0`. It does not behave like `status`, so an empty result may mean a typo rather than an empty catalog.

`?per_page=999` is clamped to `50` rather than rejected.

## Search Engine

The listing always queries the database. Configuring the admin panel to use Elasticsearch for catalog search does not change this endpoint's behaviour.

## How It Differs From the Storefront Listing

- **No implicit `status = 1` filter.** `GET /api/shop/products` hides disabled products; this endpoint returns every status so an admin can find a draft or disabled product. Pass `?status=1` for enabled only.
- **Products with no inventory** return `quantity: 0`, and products with no images return `baseImageUrl: null` with `imagesCount: 0` — neither is excluded from the listing.
