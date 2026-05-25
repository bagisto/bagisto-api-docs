---
outline: false
apiType: rest
examples:
  - id: admin-catalog-product-inventories-list
    title: List Per-Source Inventory Rows
    description: Returns one row per inventory_source that has a product_inventories entry for the product. The envelope `meta.totalQty` is the sum across all sources.
    query: |
      curl "https://your-domain.com/api/admin/catalog/products/12/inventories" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 14,
            "sourceId": 1,
            "sourceCode": "default",
            "sourceName": "Default",
            "qty": 25
          }
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
---

# Product Inventories — List

Returns the per-source inventory breakdown for a product. The standard admin
`{ data, meta }` envelope is used, with one extra `meta.totalQty` field —
the sum across all sources.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/products/{productId}/inventories` | GET |

## Response

`200 OK`

| Field | Type | Notes |
|-------|------|-------|
| `data[].id` | integer | `product_inventories` row id. |
| `data[].sourceId` | integer | `inventory_source_id`. |
| `data[].sourceCode` | string | e.g. `default`. |
| `data[].sourceName` | string | Display name. |
| `data[].qty` | integer | Quantity on hand at this source. |
| `meta.totalQty` | integer | Sum across all sources. |

## Errors

| HTTP | Cause |
|------|-------|
| `401 Unauthorized` | Missing or invalid admin Bearer token. |
| `404 Not Found` | Product not found. |
