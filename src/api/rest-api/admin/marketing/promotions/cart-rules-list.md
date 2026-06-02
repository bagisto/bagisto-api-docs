---
outline: false
apiType: rest
examples:
  - id: admin-marketing-cart-rules-list
    title: List Cart Rules
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/cart-rules?per_page=10" \
        -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 1, "name": "10% off summer", "status": 1, "couponType": 1, "actionType": "by_percent", "discountAmount": 10 }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
---

# List Cart Rules

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/cart-rules` | GET |

## Query Parameters

`page`, `per_page` (default 10, cap 50), `name` (partial), `status` (0/1), `coupon_type` (1/2), `sort` (`id`, `name`, `sort_order`), `order`.
