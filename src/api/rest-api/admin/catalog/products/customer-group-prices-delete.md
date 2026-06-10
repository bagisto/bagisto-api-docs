---
outline: false
apiType: rest
examples:
  - id: admin-catalog-product-cgp-delete
    title: Delete a Customer-Group Price
    description: Deletes a single customer-group price row.
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/catalog/products/1/customer-group-prices/12" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "message": "Customer-group price deleted successfully."
      }
---

# Product Customer-Group Prices — Delete

Deletes a tier-price row.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/products/{productId}/customer-group-prices/{id}` | DELETE |

## Response

`200 OK`

| Field | Type | Notes |
|-------|------|-------|
| `message` | string | Confirmation. |

## Errors

| HTTP | Cause |
|------|-------|
| `404 Not Found` | Row not found or does not belong to product. |
