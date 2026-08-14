---
outline: false
apiType: rest
examples:
  - id: admin-catalog-product-mass-update-status
    title: Mass Update Catalog Product Status
    description: Bulk-flips the `status` flag of a batch of products to either 0 (disabled) or 1 (enabled). Mirrors Bagisto monolith `ProductController::massUpdate` — best-effort, fires `catalog.product.update.before` / `.after` for each ID.
    query: |
      curl -X POST "https://your-domain.com/api/admin/catalog/products/mass-update-status" \
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
        "id": 1,
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
| `id` | integer | Always `1`. This is an action result, not a record — ignore it. |
| `updated` | int[] | The ids the call attempted to update. |
| `message` | string | Translated confirmation. |

## Behaviour

Each id fires the same events as a single-product update, so search reindexing and cache flushing still run per product. That makes a large batch meaningfully slower than the row count suggests.

The status flip is the only change — nothing else on the product is touched, and there is no partial-failure report beyond the returned `updated` list.

## Errors

| HTTP | Detail |
|------|--------|
| `400` | `The indices field is required and must be a non-empty array.` |
| `400` | `The value field is required and must be 0 or 1.` |
| `401` | `Unauthenticated.` |
| `403` | `You do not have permission to manage products.` — token lacks `catalog.products.edit` |

Note the validation failures here are `400`, not the `422` used by the single-product create and update endpoints.
