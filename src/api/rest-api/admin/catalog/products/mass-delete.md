---
outline: false
apiType: rest
examples:
  - id: admin-catalog-product-mass-delete
    title: Mass Delete Catalog Products
    description: Deletes a batch of catalog products in one call. Non-existent IDs are silently skipped. Mirrors Bagisto monolith `ProductController::massDestroy`.
    query: |
      curl -X POST "https://your-domain.com/api/admin/catalog/products/mass-delete" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "indices": [12, 18]
        }'
    variables: |
      {
        "indices": [12, 18]
      }
    response: |
      {
        "deleted": [12, 18],
        "message": "Products deleted successfully."
      }
    commonErrors:
      - error: Bad Request (400)
        cause: Empty or malformed `indices` array
        solution: Send a non-empty array of integers
      - error: Forbidden (403)
        cause: Admin role lacks `catalog.products.delete`
        solution: Grant the permission to the admin role
      - error: Server Error (500)
        cause: Underlying delete threw an exception (mirrors monolith behaviour)
        solution: Investigate the failing ID — usually a FK constraint violation
---

# Catalog Products — Mass Delete

Deletes a batch of catalog products in a single call. Mirrors **Catalog →
Products → Mass Delete** in the Bagisto admin panel.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/products/mass-delete` | POST |

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | int[] | yes | Non-empty array of product IDs. Non-existent IDs are silently skipped. |

## Response

`200 OK`

| Field | Type | Notes |
|-------|------|-------|
| `deleted` | int[] | IDs that were processed (echoes the request — non-existent IDs are still listed) |
| `message` | string | Translated confirmation |

## Errors

| HTTP | Cause |
|------|-------|
| `400 Bad Request` | Empty / malformed `indices` |
| `401 Unauthorized` | Missing or invalid admin Bearer token |
| `403 Forbidden` | Admin role lacks `catalog.products.delete` |
| `500 Internal Server Error` | Underlying delete threw — matches monolith best-effort behaviour |

## Notes

- Mirrors the monolith **best-effort** semantics — the call does not short-circuit on a missing or invalid ID.
- For configurable products, variants cascade automatically through the core repository.
