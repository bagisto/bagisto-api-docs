---
outline: false
apiType: rest
examples:
  - id: admin-marketing-cart-rule-coupon-mass-delete
    title: Mass Delete Cart Rule Coupons
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/cart-rules/1/coupons/mass-delete" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "indices": [12, 13, 14] }'
    response: |
      { "cartRuleId": 1, "deleted": 3, "skipped": [], "success": true, "message": "Deleted 3 coupons." }
---

# Mass Delete Cart Rule Coupons

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/cart-rules/{cartRuleId}/coupons/mass-delete` | POST |

IDs that don't belong to `{cartRuleId}` are silently skipped (cross-rule isolation).

Permission: `marketing.promotions.cart_rules.delete`.
