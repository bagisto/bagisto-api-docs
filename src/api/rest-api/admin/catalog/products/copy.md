---
outline: false
apiType: rest
examples:
  - id: admin-catalog-product-copy
    title: Copy a Catalog Product
    description: Duplicates an existing product across all attribute_values, images, inventories, categories and customer_group_prices. Refuses configurable variants. Mirrors Bagisto monolith `ProductController::copy`.
    query: |
      curl -X POST "https://your-domain.com/api/admin/catalog/products/12/copy" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "id": 43,
        "sourceId": 12,
        "sku": "temporary-sku-c90a67",
        "type": "simple",
        "name": "Copy Of Classic Watch",
        "success": true,
        "message": "Product copied successfully."
      }
    commonErrors:
      - error: Not Found (404)
        cause: Source product not found
        solution: Verify the `{sourceId}` exists in `products`
      - error: Unprocessable Entity (422)
        cause: Source product is a configurable variant (parent_id is set)
        solution: Copy the parent configurable, not the variant
      - error: Forbidden (403)
        cause: Admin role lacks `catalog.products.create`
        solution: Grant the permission to the admin role
---

# Catalog Product — Copy

Duplicates an existing catalog product. Fires
`catalog.product.create.before` / `catalog.product.create.after` so listeners
(search index, cache flush) trigger on the copy.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/products/{sourceId}/copy` | POST |

## Path parameters

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `sourceId` | integer | yes | ID of the product to duplicate. |

## Request body

Empty. Send an empty JSON object `{}` if your client requires a body.

## Response

`200 OK`

| Field | Type | Notes |
|-------|------|-------|
| `id` | integer | ID of the newly created copy. |
| `sourceId` | integer | ID of the source product. |
| `sku` | string | Generated SKU, always `temporary-sku-<hex>` — it does not derive from the source SKU. |
| `type` | string | Product type, matching the source. |
| `name` | string\|null | Source name prefixed with `Copy Of `. |
| `success` | boolean | Always `true` on success. Failures come back as an error status, never as `success: false`. |
| `message` | string | Translated confirmation. |

The copy is created **disabled** (`status: 0`) with a `null` `urlKey`, so it is never live on the storefront by accident. Give it a real SKU, name, and URL key through [Update](/api/rest-api/admin/catalog/products/update) before enabling it.

The response is a small summary, not a product payload — read the copy back with [Product Detail](/api/rest-api/admin/catalog/products/products-detail) using the returned `id`.

## Errors

| HTTP | Cause |
|------|-------|
| `401 Unauthorized` | Missing or invalid admin Bearer token. |
| `403 Forbidden` | Admin role lacks `catalog.products.create`. |
| `404 Not Found` | Source product not found. |
| `422 Unprocessable Entity` | Source is a configurable variant (`parent_id != null`). |
| `500 Internal Server Error` | Underlying copy threw an exception. |

## What Gets Copied

Attribute values, images, categories, inventories, and customer-group prices all carry over, as do the type-specific structures — a configurable's variants, a bundle's options, a grouped product's links.

Two things do not: the SKU and URL key are regenerated, and the copy starts disabled.

## Variants Cannot Be Copied

Passing a configurable **variant** id returns `422` with `Variants of configurable products cannot be copied. Copy the parent configurable product instead.` Copying the parent brings its variants along, which is what you want in nearly every case.
