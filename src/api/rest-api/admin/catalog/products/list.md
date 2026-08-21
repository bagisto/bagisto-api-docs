---
outline: false
apiType: rest
examples:
  - id: admin-products-list
    title: Add-Product Search (Create-Order)
    description: The slim product search behind the admin Create-Order "Add Product" modal. Not the product listing — for the full datagrid with every column and filter use List Products. Returns all statuses by default, so disabled and draft products appear.
    query: |
      curl -X GET "https://your-domain.com/api/admin/products?sku=SP-001&type=simple&per_page=30&page=1" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer <id>|<token>"
    variables: |
      sku=SP-001&type=simple&per_page=30&page=1
    response: |
      {
        "data": [
          {
            "id": 2512,
            "sku": "SP-001",
            "type": "simple",
            "name": "Arctic Cozy Knit Unisex Beanie",
            "status": 1,
            "price": 14,
            "formattedPrice": "$14.00",
            "baseImageUrl": "http://localhost:8000/cache/medium/product/2512/Muc0qeWks34MTZaxf38s6DBmfqMqrCxku81Uo8EB.webp",
            "isSaleable": true
          }
        ],
        "meta": {
          "currentPage": 1,
          "perPage": 30,
          "lastPage": 1,
          "total": 1,
          "from": 1,
          "to": 1
        }
      }
    commonErrors:
      - error: Unauthenticated (401)
        cause: Missing, malformed, expired, or revoked admin Bearer token
        solution: Send a valid admin Bearer token (Integration token) in the Authorization header. See the Authentication page.
  - id: admin-products-search
    title: Free-Text Search
    description: The `query` parameter matches SKU or product name partially, which is what the modal's search box sends as the admin types.
    query: |
      curl -X GET "https://your-domain.com/api/admin/products?query=beanie&per_page=10" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer <id>|<token>"
    variables: |
      query=beanie&per_page=10
    response: |
      {
        "data": [
          {
            "id": 2512,
            "sku": "SP-001",
            "type": "simple",
            "name": "Arctic Cozy Knit Unisex Beanie",
            "status": 1,
            "price": 14,
            "formattedPrice": "$14.00",
            "baseImageUrl": "http://localhost:8000/cache/medium/product/2512/Muc0qeWks34MTZaxf38s6DBmfqMqrCxku81Uo8EB.webp",
            "isSaleable": true
          }
        ],
        "meta": {
          "currentPage": 1,
          "perPage": 10,
          "lastPage": 1,
          "total": 1,
          "from": 1,
          "to": 1
        }
      }
---

# Add-Product Search (Create-Order)

The slim product **search** behind the admin **Create Order** screen's "Add Product" modal. It answers one question — which product is the admin picking? — and returns just enough to render a picker row.

This is not the product listing. For the full admin datagrid, with every column and the Channel / Name / SKU / Attribute Family / Price / ID / Status / Type filters, use [List Products](/api/rest-api/admin/catalog/products) (`GET /api/admin/catalog/products`). This page covers only the Create-Order picker.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/products` | GET |

Results come back in the `{ data, meta }` envelope used by every admin collection.

## Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Page number, default `1`. |
| `per_page` | integer | Items per page, default `30`, capped at `50`. |
| `query` | string | Free text — partial match against SKU **or** product name. |
| `sku` | string | Exact SKU. |
| `type` | string | `simple`, `configurable`, `bundle`, `downloadable`, `grouped`, `virtual`, or `booking`. |
| `status` | integer | `0` disabled, `1` enabled. Omit to get both. |
| `categoryId` | integer | Restrict to products in one category. |
| `channel` | string | Channel code used to resolve `name` and `price`. |
| `locale` | string | Locale code used to resolve `name`. |
| `sort` | string | `id`, `sku`, `created_at`, or `updated_at`. |
| `order` | string | `asc` or `desc`. Defaults to `desc`. |

Parameters combine with AND — each one you add narrows the result. `query` and `sku` are separate: `query` is the partial "as you type" match, `sku` is exact.

Note the page size here is `30`, not the `10` used by every other admin collection — the picker is built to show a long scroll list.

## Row Shape

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Numeric product id — the value to send when adding the item to a cart. |
| `sku` | string | Product SKU. |
| `type` | string | Product type. |
| `name` | string\|null | Resolved for the requested channel and locale. |
| `status` | integer\|null | `1` enabled, `0` disabled. |
| `price` | number\|null | Minimal price for the product. |
| `formattedPrice` | string\|null | The same price rendered in the channel currency. |
| `baseImageUrl` | string | Medium-size image URL, falling back to the theme placeholder when the product has no image. |
| `isSaleable` | boolean | Whether the product can currently be sold. |

The row is deliberately nine fields — no variants, bundle options, images array, or attribute values. Use [Product Detail](/api/rest-api/admin/catalog/products/products-detail) once a product is picked.

Two fields behave unlike their counterparts elsewhere:

- **`baseImageUrl` is never null.** A product without an image gets the theme's placeholder URL, so an "is there an image?" check on this field always says yes.
- **`name` and `status` can both be `null`** for a product created through the API but never completed in step two — the picker still lists it. Fall back to `sku` for the display label.

## How It Differs From `/api/shop/products`

| | Shop | Admin |
|---|---|---|
| Default status filter | Only `status = 1` and `visible_individually = 1` | None — every status returned |
| Booking products | Hidden by storefront visibility rules | Listed, but blocked when added to a draft cart |
| Row payload | Full storefront product | Nine fields |
| Pagination | Response headers (`X-Total-Count`, `X-Page`, …) | Body envelope (`{ data, meta }`) — no pagination headers |
| Authentication | Storefront key, plus an optional customer token | Admin Bearer token |

## Booking Products

Booking products are returned so the admin can find them, but adding one to a draft cart via `POST /api/admin/carts/{id}/items` fails with HTTP `400` and "Booking products cannot be added to an admin draft order." This mirrors the admin panel, whose Create-Order screen ships no booking form.

## Errors

Requires an admin Bearer token. There is no separate permission gate on the search itself.
