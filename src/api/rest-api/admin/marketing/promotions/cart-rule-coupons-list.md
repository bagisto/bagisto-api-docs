---
outline: false
apiType: rest
examples:
  - id: admin-marketing-cart-rule-coupons-list
    title: List Cart Rule Coupons
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/cart-rules/1/coupons" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 12, "cartRuleId": 1, "code": "WELCOME10", "usageLimit": 100, "usagePerCustomer": 1, "timesUsed": 0, "expiredAt": "2027-12-31" }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
---

# List Cart Rule Coupons

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/cart-rules/{cartRuleId}/coupons` | GET |

Lists coupons belonging to the parent cart rule. Cross-rule access → 404.

Permission: `marketing.promotions.cart_rules.view` (falls back to `.create`).
