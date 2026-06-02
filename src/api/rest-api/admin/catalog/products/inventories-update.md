---
outline: false
apiType: rest
examples:
  - id: admin-catalog-product-inventories-update
    title: Bulk-Update Per-Source Inventory
    description: Mirrors Bagisto monolith `ProductController::updateInventories`. Sources passed with qty=0 are kept but zeroed-out; sources NOT in the payload are left untouched.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/catalog/products/12/inventories" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "inventories": { "1": 25, "2": 0 }
        }'
    variables: |
      {
        "inventories": { "1": 25, "2": 0 }
      }
    response: |
      {
        "data": [
          { "id": 14, "sourceId": 1, "sourceCode": "default", "sourceName": "Default", "qty": 25 }
        ],
        "meta": {
          "currentPage": 1,
          "perPage": 1,
          "lastPage": 1,
          "total": 1,
          "from": 1,
          "to": 1,
          "totalQty": 25
        }
      }
    commonErrors:
      - error: Validation (422)
        cause: Missing `inventories`, unknown inventory_source_id, or negative quantity
        solution: Send a map of existing source IDs to non-negative integers
---

# Product Inventories — Bulk Update

Bulk-upsert inventory quantities for a product across one or more sources.
Fires `catalog.product.update.before` / `catalog.product.update.after`.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/products/{productId}/inventories` | PUT |

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `inventories` | object | yes | Map of `inventory_source_id` → quantity (integer ≥ 0). |

### Upsert semantics

- A source passed with `qty > 0` is upserted.
- A source passed with `qty = 0` is kept but zeroed-out (the row is NOT deleted unless the underlying repository decides to).
- Sources NOT included in the request are left untouched.

## Response

`200 OK` — same shape as the [list endpoint](/api/rest-api/admin/catalog/products/inventories-list), with totals refreshed.

## Errors

| HTTP | Cause |
|------|-------|
| `401 Unauthorized` | Missing or invalid admin Bearer token. |
| `403 Forbidden` | Admin role lacks `catalog.products.edit`. |
| `404 Not Found` | Product not found. |
| `422 Unprocessable Entity` | Missing `inventories`, unknown source id, or negative qty. |
