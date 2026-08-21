---
outline: false
apiType: rest
examples:
  - id: admin-catalog-product-mass-delete
    title: Mass Delete Catalog Products
    description: Deletes a batch of catalog products in one call. Ids that do not exist are skipped without an error, and `deleted` lists only the ones actually removed.
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
        "id": 1,
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
| `id` | integer | Always `1`. This is an action result, not a record — ignore it. |
| `deleted` | int[] | The ids that were actually removed. |
| `message` | string | Translated confirmation. |

**`deleted` is not an echo of `indices`.** Ids that do not exist are dropped silently, so sending `[1403, 999999]` returns `deleted: [1403]`. Compare the two lists to find out what was skipped — nothing else reports it.

## Behaviour

- **Best effort, no transaction.** The batch does not roll back if one id fails partway through; ids processed before the failure stay deleted.
- **Configurable variants cascade** with their parent, so a parent id can remove more rows than you listed.
- **Order history is unaffected** — order items keep their product snapshot.

## Errors

| HTTP | Detail |
|------|--------|
| `400` | `The indices field is required and must be a non-empty array.` |
| `401` | `Unauthenticated.` |
| `403` | `You do not have permission to manage products.` — token lacks `catalog.products.delete` |

Note the validation failures here are `400`, not the `422` used by the single-product create and update endpoints.
