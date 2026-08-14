---
outline: false
apiType: rest
examples:
  - id: admin-catalog-product-cgp-list
    title: List Customer-Group (Tier) Prices
    description: Lists every customer-group price row attached to the product, in the standard admin `{ data, meta }` envelope.
    query: |
      curl "https://your-domain.com/api/admin/catalog/products/1/customer-group-prices" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 12,
            "qty": 1,
            "valueType": "fixed",
            "value": 19.99,
            "customerGroupId": 2,
            "customerGroupName": "Wholesale",
            "productId": 1
          }
        ],
        "meta": { "currentPage": 1, "perPage": 1, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# Product Customer-Group Prices — List

Lists every tier-price row attached to a product.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/products/{productId}/customer-group-prices` | GET |

## Response

`200 OK` — `{ data, meta }` envelope, one row per `product_customer_group_prices`.

| Field | Type | Notes |
|-------|------|-------|
| `data[].id` | integer | Row ID. |
| `data[].qty` | integer | Minimum quantity at which the tier applies. |
| `data[].valueType` | string | `fixed` or `discount`. |
| `data[].value` | float | Fixed price or percent discount. |
| `data[].customerGroupId` | integer\|null | `null` = applies to every group. |
| `data[].customerGroupName` | string | Group label. |
| `data[].productId` | integer | Parent product. |
