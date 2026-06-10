---
outline: false
apiType: rest
examples:
  - id: admin-marketing-cart-rule-coupon-generate
    title: Bulk-Generate Coupons
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/cart-rules/1/coupons/generate" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "length": 10, "format": "alphanumeric", "prefix": "SAVE-", "suffix": "-2026", "coupon_qty": 5 }'
    response: |
      { "id": 1, "cartRuleId": 1, "generated": 5, "coupons": [{ "id": 21, "code": "SAVE-A1B2C3-2026" }], "success": true, "message": "Generated 5 coupons." }
---

# Bulk-Generate Cart Rule Coupons

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/cart-rules/{cartRuleId}/coupons/generate` | POST |

Generates `coupon_qty` random codes of the given format and length, optionally with prefix/suffix. Inherits `usage_limit` / `usage_per_customer` / `expired_at` from the parent cart rule.

## Request Body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `length` | int 4-30 | yes | Also accepted as `code_length`. |
| `format` | enum | yes | `alphabetic`, `alphanumeric`, `numeric` (core's spelling `alphabetical` also accepted). Also accepted as `code_format`. |
| `prefix` | string | no | Also `code_prefix`. |
| `suffix` | string | no | Also `code_suffix`. |
| `coupon_qty` | int 1-100 | yes | |

::: tip Bulk-generate accepts both shapes
The endpoint accepts both the spec's friendlier keys (`length`, `format`, `prefix`, `suffix`) and the core's keys (`code_length`, `code_format`, `code_prefix`, `code_suffix`).
:::

Permission: `marketing.promotions.cart_rules.create`.
