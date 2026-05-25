---
outline: false
apiType: rest
examples:
  - id: admin-catalog-product-update
    title: Update a Catalog Product (any type)
    description: Free-shape pass-through payload that the core ProductRepository::update understands. Locale-keyed translations may be supplied either at the top level or under a `translations` key. Sub-resource fields (images, inventories, customer_group_prices, videos) are silently stripped — those have dedicated endpoints.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/catalog/products/42" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "sku": "sp-001",
          "status": 1,
          "price": "99.99",
          "categories": [3, 5],
          "channels": [1],
          "translations": {
            "en": {
              "name": "Classic Watch",
              "description": "A premium timepiece.",
              "short_description": "Timeless style.",
              "url_key": "classic-watch"
            }
          }
        }'
    variables: |
      {
        "sku": "sp-001",
        "price": "99.99",
        "status": 1
      }
    response: |
      {
        "id": 42,
        "sku": "sp-001",
        "name": "Classic Watch",
        "type": "simple",
        "status": 1,
        "price": "99.9900",
        "formattedPrice": "$99.99",
        "_warnings": ["Images must be managed via POST /api/admin/catalog/products/{id}/images."]
      }
    commonErrors:
      - error: Validation (422)
        cause: SKU/url_key duplicate, invalid boolean field, special_price ≥ price, invalid date range
        solution: Send unique SKU/url_key and valid field combinations
      - error: Not Found (404)
        cause: Product not found
        solution: Verify the `{id}` exists
---

# Catalog Product — Update

Updates a catalog product (any of the 7 types). Free-shape pass-through
payload — the core `ProductRepository::update` accepts everything Bagisto
admin sends.

::: warning Sub-resource fields are stripped
Sub-resource fields (`images`, `inventories`, `customer_group_prices`,
`videos`) are **silently stripped** from the update payload. Use the
dedicated endpoints instead:

- Images → [`POST /api/admin/catalog/products/{id}/images`](/api/rest-api/admin/catalog/products/images-upload)
- Inventories → [`PUT /api/admin/catalog/products/{productId}/inventories`](/api/rest-api/admin/catalog/products/inventories-update)
- Customer-group prices → [`POST/PUT/DELETE …/customer-group-prices`](/api/rest-api/admin/catalog/products/customer-group-prices-list)

The response includes a `_warnings` array listing every stripped field so the
client knows what was dropped.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/products/{id}` | PUT |

## Path parameters

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | integer | yes | Product ID. |

## Request body

Free-shape — send only the fields you want to change. Locale-keyed
translations may be supplied either at the top level (`{ "en": { ... } }`)
or under a `translations` key. Common fields:

| Field | Type | Notes |
|-------|------|-------|
| `sku` | string | Must remain unique. |
| `url_key` | string | Slug; must be unique across the catalog. |
| `status`, `visible_individually`, `guest_checkout`, `new`, `featured` | `0|1` | Boolean flags as integers. |
| `price`, `special_price` | string | Decimal as string. |
| `special_price_from`, `special_price_to` | string (YYYY-MM-DD) | Date range. |
| `weight` | string | Decimal as string. |
| `tax_category_id` | integer | Existing tax category. |
| `categories` | int[] | Replaces the category set for the product. |
| `channels` | int[] | Replaces the channel assignment. |
| `translations` | object | `{ <locale>: { name, description, short_description, ... } }`. |

## Response

`200 OK` returning the full `AdminCatalogProduct` payload — same shape as
[`GET /api/admin/catalog/products/{id}`](/api/rest-api/admin/catalog/products/products-detail).

If any sub-resource fields were stripped from the request, `_warnings` is a
non-empty array of human-readable strings naming each dropped field and the
endpoint it should be sent to instead.

## Errors

| HTTP | Cause |
|------|-------|
| `401 Unauthorized` | Missing or invalid admin Bearer token. |
| `403 Forbidden` | Admin role lacks `catalog.products.edit`. |
| `404 Not Found` | Product not found. |
| `422 Unprocessable Entity` | Validation failure (duplicate SKU / url_key, invalid boolean, special_price ≥ price, invalid date range). |
