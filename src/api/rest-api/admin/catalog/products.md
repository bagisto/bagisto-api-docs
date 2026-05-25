---
outline: false
apiType: rest
examples:
  - id: admin-catalog-products-list
    title: List Catalog Products (Datagrid)
    description: Paginated, filterable, sortable product list mirroring the Bagisto admin Catalog → Products datagrid. Returns the full 18-field row shape in the standard `{ data, meta }` envelope.
    query: |
      curl -X GET "https://your-domain.com/api/admin/catalog/products?per_page=10&page=1&type=simple&status=1" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    variables: |
      per_page=10&page=1&type=simple&status=1
    response: |
      {
        "data": [
          {
            "id": 142,
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
        ],
        "meta": {
          "currentPage": 1,
          "perPage": 10,
          "lastPage": 62,
          "total": 616,
          "from": 1,
          "to": 10
        }
      }
    commonErrors:
      - error: Unauthorized (401)
        cause: Missing, invalid, expired, or revoked admin Bearer token
        solution: 'Authenticate via `POST /api/admin/login` and pass the returned token as `Authorization: Bearer <token>`'

---

# Catalog Products — Datagrid Listing

Paginated, filterable, and sortable product list that mirrors the Bagisto admin
**Catalog → Products** datagrid 1:1. This is the authoritative product-management
listing for the admin API — same columns, same filters, and the same sort options
used by the datagrid.

::: tip Distinct from the Create-Order picker
`GET /api/admin/catalog/products` (this endpoint) is the full datagrid — 18
fields per row, designed for catalog management screens.

`GET /api/admin/products` is the slim picker (9 fields) used by the admin
Create-Order "Add Product" modal. The two endpoints coexist and serve different
surfaces.
:::

## Endpoint

| Endpoint | Method | Authentication |
|----------|--------|----------------|
| `/api/admin/catalog/products` | GET | Admin Bearer token |

## Authentication

Every request requires:

```
Authorization: Bearer <token>
X-Admin-Key: <your-admin-api-key>
```

Obtain the Bearer token via [`POST /api/admin/login`](/api/rest-api/admin/authentication).

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
| `price` | string\|null | Raw price value (decimal string, e.g. `"99.9900"`) |
| `formattedPrice` | string\|null | Locale-formatted price (e.g. `"$99.99"`) |
| `quantity` | integer | Sum of inventory qty across all inventory sources |
| `baseImageUrl` | string\|null | Storage URL of the product's first image (medium cache); `null` if no images |
| `imagesCount` | integer | Total number of images attached to the product |
| `categoryId` | integer\|null | ID of the first category this product belongs to |
| `categoryName` | string\|null | Translated name of that category (resolved via `locale`) |
| `channel` | string\|null | Channel code used for resolution |
| `locale` | string\|null | Locale code used for resolution |
| `attributeFamilyId` | integer\|null | Attribute family ID |
| `attributeFamilyName` | string\|null | Attribute family name |
| `urlKey` | string\|null | URL slug (e.g. `classic-watch`) |
| `visibleIndividually` | boolean\|null | Whether the product appears in category/search listings |

## Example Request

```bash
curl -X GET "https://your-domain.com/api/admin/catalog/products?per_page=10&page=1&type=simple&status=1" \
  -H "X-Admin-Key: <your-admin-api-key>" \
  -H "Authorization: Bearer <token>" \
  -H "Accept: application/json"
```

## Example Response

```json
{
  "data": [
    {
      "id": 142,
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
  ],
  "meta": {
    "currentPage": 1,
    "perPage": 10,
    "lastPage": 62,
    "total": 616,
    "from": 1,
    "to": 10
  }
}
```

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
| `401 Unauthorized` | Missing, expired, or revoked admin Bearer token |
| `401 Unauthorized` | Invalid `X-Admin-Key` header |

**Unknown filter parameters** (e.g. a misspelled `?tpye=simple`) are silently
ignored — no error is returned. Invalid `status` or `type` values outside their
documented ranges are also silently dropped (the filter is not applied).

## Notes

- **Elasticsearch is not yet supported.** Even when the Bagisto admin panel is
  configured to use Elasticsearch for catalog search
  (`catalog.products.search.engine = elastic`), this endpoint always falls back
  to the database query path. Elasticsearch support is planned for Phase 1.1.b
  of the Catalog API roadmap.
- **No automatic status filter.** Unlike `GET /api/shop/products` which only
  returns `status = 1` products, this endpoint returns all statuses by default.
  Admin operators need to see disabled and draft products. Pass `?status=1` to
  restrict to enabled products.
- **Multi-category products** — only the first associated category's `categoryId`
  and `categoryName` are included in the row (matching the datagrid display).
- **Products with no inventory** return `quantity: 0`.
- **Products with no images** return `baseImageUrl: null` and `imagesCount: 0`.
