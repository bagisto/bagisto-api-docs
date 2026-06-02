---
outline: false
apiType: rest
examples:
  - id: admin-products-list
    title: List / Search Products (Admin)
    description: Paginated product search for the admin Create-Order "Add Product" modal and any other admin product-picker. Unlike the storefront product list, returns ALL statuses by default (admin must see disabled / draft products too). Booking products ARE listed here so admin can find them; they're blocked at admin cart add-to-cart time.
    query: |
      curl -X GET "https://your-domain.com/api/admin/products?query=watch&type=simple&per_page=30&page=1" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    variables: |
      query=watch&type=simple&per_page=30&page=1
    response: |
      {
        "data": [
          {
            "id": 142,
            "sku": "SP-001",
            "type": "simple",
            "name": "Classic Watch",
            "status": 1,
            "price": 99.99,
            "formattedPrice": "$99.99",
            "baseImageUrl": "http://localhost:8000/cache/medium/product/142/image.webp",
            "isSaleable": true
          }
        ],
        "meta": {
          "currentPage": 1,
          "perPage": 30,
          "lastPage": 8,
          "total": 231,
          "from": 1,
          "to": 30
        }
      }
    commonErrors:
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Send a valid admin Bearer token (Integration token) in the Authorization header. See the Authentication page.

---

# List / Search Products (Admin)

Slim product listing endpoint for admin pickers. Returns a row per product in
the `{ data, meta }` envelope used by every admin collection.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/products` | GET |

## How it differs from `/api/shop/products`

| | Shop | Admin |
|---|---|---|
| Default status filter | Only `status = 1` and `visible_individually = 1` | **No filter — all statuses returned** |
| Booking products | Hidden by shop visibility rules | **Listed** (blocked only when added to admin draft cart) |
| Row payload | Full storefront fields (variants, prices, special prices, etc.) | Slim picker shape (9 fields) |
| Pagination response | Header-based (`X-Total-Count`, `X-Page`, ...) | Body envelope (`{ data, meta }`) |
| Authentication | Storefront key + optional customer Sanctum | Admin Sanctum token |

## Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Page number (default `1`) |
| `per_page` | integer | Items per page (default `30`, cap `50`) |
| `query` | string | Free-text — matches SKU OR product name (partial) |
| `sku` | string | Exact SKU |
| `type` | string | `simple`, `configurable`, `bundle`, `downloadable`, `grouped`, `virtual`, `booking` |
| `status` | integer | `0` (disabled) or `1` (enabled) — omit to get both |
| `categoryId` | integer | Filter by category ID |
| `channel` | string | Channel code for value resolution |
| `locale` | string | Locale code for value resolution |
| `sort` | string | `id`, `sku`, `created_at`, `updated_at` |
| `order` | string | `asc` or `desc` (default `desc`) |

## Row Shape

| Field | Type | Notes |
|-------|------|-------|
| `id` | integer | Product ID |
| `sku` | string | SKU |
| `type` | string | Product type |
| `name` | string\|null | Resolved via locale/channel if provided |
| `status` | integer\|null | `1` enabled / `0` disabled |
| `price` | number\|null | Minimal price for the resolved customer group |
| `formattedPrice` | string\|null | Locale-formatted price |
| `baseImageUrl` | string\|null | Medium-cache image URL, falls back to original |
| `isSaleable` | boolean | Type-instance saleability check |

## Booking Products

Booking products **are returned** by this endpoint so admin can find and review
them. They are **blocked** at admin draft-cart add-to-cart time
(`POST /api/admin/carts/{id}/items`) with HTTP `400` and the message
"Booking products cannot be added to an admin draft order." This matches the
Bagisto monolith — the admin Create-Order UI does not ship a booking partial
either.
