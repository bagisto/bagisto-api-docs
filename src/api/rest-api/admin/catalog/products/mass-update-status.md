---
outline: false
apiType: rest
examples:
  - id: admin-catalog-product-mass-update-status
    title: Mass Update Catalog Product Status
    description: Bulk-flips the `status` flag of a batch of products to either 0 (disabled) or 1 (enabled). Mirrors Bagisto monolith `ProductController::massUpdate` — best-effort, fires `catalog.product.update.before` / `.after` for each ID.
    query: |
      curl -X POST "https://your-domain.com/api/admin/catalog/products/mass-update-status" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "indices": [12, 18],
          "value": 1
        }'
    variables: |
      {
        "indices": [12, 18],
        "value": 1
      }
    response: |
      {
        "updated": [12, 18],
        "message": "Products status updated successfully."
      }
    commonErrors:
      - error: Bad Request (400)
        cause: Empty `indices`, or `value` not 0/1
        solution: Send a non-empty integer array and an integer 0 or 1
      - error: Forbidden (403)
        cause: Admin role lacks `catalog.products.edit`
        solution: Grant the permission to the admin role
---

# Catalog Products — Mass Update Status

Bulk-flips status across a batch of catalog products. Each ID fires the same
core event hooks the single-product update does
(`catalog.product.update.before` / `.after`), so search reindex, cache flush
etc. still trigger.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/products/mass-update-status` | POST |

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | int[] | yes | Non-empty array of product IDs. |
| `value` | integer | yes | `0` (disabled) or `1` (enabled). |

## Response

`200 OK`

| Field | Type | Notes |
|-------|------|-------|
| `updated` | int[] | IDs the call attempted to update (best-effort). |
| `message` | string | Translated confirmation. |

## Errors

| HTTP | Cause |
|------|-------|
| `400 Bad Request` | Empty / malformed indices or `value` not in `[0,1]`. |
| `401 Unauthorized` | Missing or invalid admin Bearer token. |
| `403 Forbidden` | Admin role lacks `catalog.products.edit`. |
