---
outline: false
apiType: rest
examples:
  - id: admin-catalog-product-cgp-create
    title: Add a Customer-Group Price
    description: "Creates a new tier-price row. `customer_group_id: null` makes the price apply to every customer group. The combination `(qty, customer_group_id)` must be unique per product."
    query: |
      curl -X POST "https://your-domain.com/api/admin/catalog/products/1/customer-group-prices" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "qty": 10,
          "value_type": "discount",
          "value": 15.0,
          "customer_group_id": 2
        }'
    variables: |
      {
        "qty": 10,
        "value_type": "discount",
        "value": 15.0,
        "customer_group_id": 2
      }
    response: |
      {
        "id": 12,
        "qty": 10,
        "valueType": "discount",
        "value": 15.0,
        "customerGroupId": 2,
        "productId": 1
      }
    commonErrors:
      - error: Validation (422)
        cause: Duplicate qty/customer-group combo, unknown group, or qty < 1
        solution: Pick a unique `(qty, customer_group_id)` combo for the product
      - error: Not Found (404)
        cause: Product not found
        solution: Verify `{productId}` exists
---

# Product Customer-Group Prices — Create

Adds a new tier-price row to a product.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/products/{productId}/customer-group-prices` | POST |

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `qty` | integer | yes | Minimum qty at which the tier applies. ≥ 1. |
| `value_type` | string | yes | `fixed` (absolute price) or `discount` (percent off). |
| `value` | number | yes | Price (fixed) or percent (discount). |
| `customer_group_id` | integer\|null | no | `null` = applies to every group. |

The combination `(qty, customer_group_id)` must be unique per product.

## Response

`201 Created` — the new row.

## Errors

| HTTP | Cause |
|------|-------|
| `404 Not Found` | Product not found. |
| `422 Unprocessable Entity` | Duplicate `(qty, customer_group_id)`, unknown group, or `qty < 1`. |
