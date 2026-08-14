---
outline: false
apiType: rest
examples:
  - id: create
    title: Create Cart Rule Coupon
    description: Add a single coupon code to a cart rule.
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/cart-rules/47/coupons" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "code": "QALIVE99",
          "usage_limit": 0,
          "usage_per_customer": 0,
          "expired_at": "2026-12-31"
        }'
    variables: |
      {}
    response: |
      {
        "id": 22,
        "cartRuleId": 47,
        "code": "QALIVE99",
        "usageLimit": 0,
        "usagePerCustomer": 0,
        "timesUsed": 0,
        "type": 1,
        "isPrimary": false,
        "expiredAt": "2026-12-31",
        "createdAt": "2026-06-09T13:48:29+05:30",
        "updatedAt": "2026-06-09T13:48:29+05:30"
      }
---

# Create Cart Rule Coupon

Adds a single coupon code to a cart rule — the **Add Coupon** action on the
**Coupons** tab of the admin **Marketing → Promotions → Cart Rules** screen.

New here? Read the [Cart Rule Coupons overview](/api/rest-api/admin/marketing/promotions/cart-rule-coupons/) for what these coupons do and how they relate to a cart rule.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/cart-rules/{cartRuleId}/coupons` | POST |

## Details

- Requires an admin Bearer token and the `marketing.promotions.cart_rules.create`
  permission.
- The created coupon is a **secondary** code (`type` `1`, `isPrimary` `false`).
  The rule's own primary code is managed on the cart rule itself.
- Omitted `usage_limit` / `usage_per_customer` / `expired_at` inherit the parent
  rule's settings.
- Returns the full coupon payload.

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `code` | string | yes | Coupon code; must be unique |
| `usage_limit` | int | no | Total redemptions allowed (`0` = unlimited); inherits the rule when omitted |
| `usage_per_customer` | int | no | Redemptions per customer (`0` = unlimited); inherits the rule when omitted |
| `expired_at` | string | no | Expiry date (`YYYY-MM-DD`); inherits the rule when omitted |
