---
outline: false
apiType: rest
examples:
  - id: admin-catalog-product-cgp-update
    title: Update a Customer-Group Price
    description: Partially updates the given tier-price row. The new `(qty, customer_group_id)` combination must remain unique for the product.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/catalog/products/1/customer-group-prices/12" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "qty": 5,
          "value_type": "fixed",
          "value": 17.5,
          "customer_group_id": null
        }'
    variables: |
      {
        "qty": 5,
        "value_type": "fixed",
        "value": 17.5,
        "customer_group_id": null
      }
    response: |
      {
        "id": 12,
        "qty": 5,
        "valueType": "fixed",
        "value": 17.5,
        "customerGroupId": null,
        "productId": 1
      }
---

# Product Customer-Group Prices — Update

Updates a tier-price row. Partial: only send the fields you want to change.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/products/{productId}/customer-group-prices/{id}` | PUT |

## Request body

Same field set as Create — `qty`, `value_type`, `value`, `customer_group_id`.

## Errors

| HTTP | Cause |
|------|-------|
| `404 Not Found` | Product or row not found, or row does not belong to product. |
| `422 Unprocessable Entity` | Validation failed (uniqueness, unknown group, etc.). |
