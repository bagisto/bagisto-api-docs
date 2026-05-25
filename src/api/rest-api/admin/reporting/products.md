---
outline: false
apiType: rest
examples:
  - id: admin-reporting-products
    title: Reporting — Products
    query: |
      curl -X GET "https://your-domain.com/api/admin/reporting/products?type=top-selling-products-by-revenue" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      [{ "entity": "products", "type": "top-selling-products-by-revenue", "dateRange": "25 Apr - 25 May", "statistics": {} }]
---

# Reporting — Products

| Endpoint | Method |
|----------|--------|
| `/api/admin/reporting/products` | GET |

Mirrors `Reporting\ProductController::stats()`.

## Query Parameters

| Param | Type | Notes |
|-------|------|-------|
| `type` | enum | `total-sold-quantities` (default), `total-products-added-to-wishlist`, `top-selling-products-by-revenue`, `top-selling-products-by-quantity`, `products-with-most-reviews`, `products-with-most-visits`, `last-search-terms`, `top-search-terms`. |
| `start` | date | Start date. |
| `end` | date | End date. |
| `channel` | string | Channel code. |

::: warning Helper-method output
`statistics` shape depends on the chosen `type`.
:::
