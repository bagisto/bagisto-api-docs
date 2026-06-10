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
      { "data": [{ "id": 1, "name": "10% off summer", "status": 1, "couponType": 1, "couponCode": "SUMMER10", "actionType": "by_percent", "discountAmount": 10 }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
---

# List Cart Rules

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/cart-rules` | GET |

## Query Parameters

| Parameter | Notes |
|-----------|-------|
| `page` | Page number. |
| `per_page` | Page size (default 10, cap 50). |
| `id` | Single id or comma-separated list (e.g. `1,4,9`). |
| `name` | Partial match. |
| `status` | `0`/`1`. |
| `coupon_type` | `1`/`2`. |
| `coupon_code` | Partial match on the rule's primary coupon code. |
| `sort_order` | Priority, exact match. |
| `starts_from_from` | Start-date range lower bound (ISO 8601). |
| `starts_from_to` | Start-date range upper bound (ISO 8601). |
| `ends_till_from` | End-date range lower bound (ISO 8601). |
| `ends_till_to` | End-date range upper bound (ISO 8601). |
| `sort` | `id`, `name`, `sort_order`. |
| `order` | `asc`/`desc`. |

Each row carries `couponCode` — the rule's primary coupon code (`null` when the rule has no coupon).
