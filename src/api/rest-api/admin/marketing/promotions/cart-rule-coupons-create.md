---
outline: false
apiType: rest
examples:
  - id: admin-marketing-cart-rule-coupon-create
    title: Create Cart Rule Coupon
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/cart-rules/1/coupons" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "code": "WELCOME10", "usage_limit": 100, "usage_per_customer": 1, "expired_at": "2027-12-31" }'
    response: |
      { "id": 12, "cartRuleId": 1, "code": "WELCOME10", "usageLimit": 100, "usagePerCustomer": 1, "expiredAt": "2027-12-31" }
---

# Create Cart Rule Coupon

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/cart-rules/{cartRuleId}/coupons` | POST |

## Request Body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `code` | string | yes | Unique. |
| `usage_limit` | int | no | Nullable. |
| `usage_per_customer` | int | no | Nullable. |
| `expired_at` | date | no | Nullable. |

Permission: `marketing.promotions.cart_rules.create`.
