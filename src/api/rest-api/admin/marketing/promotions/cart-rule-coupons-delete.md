---
outline: false
apiType: rest
examples:
  - id: admin-marketing-cart-rule-coupon-delete
    title: Delete Cart Rule Coupon
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/marketing/cart-rules/1/coupons/12" \
        -H "Authorization: Bearer <token>"
    response: |
      { "message": "Coupon deleted." }
---

# Delete Cart Rule Coupon

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/cart-rules/{cartRuleId}/coupons/{id}` | DELETE |

Coupons not belonging to `{cartRuleId}` → 404.

Permission: `marketing.promotions.cart_rules.delete`.
