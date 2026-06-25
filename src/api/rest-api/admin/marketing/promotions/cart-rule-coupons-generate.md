---
outline: false
apiType: rest
examples:
  - id: generate
    title: Bulk-Generate Cart Rule Coupons
    description: Generate several random coupon codes for a cart rule from a format, length, and optional prefix/suffix.
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/cart-rules/47/coupons/generate" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "length": 10,
          "format": "alphanumeric",
          "prefix": "SAVE-",
          "suffix": "-2026",
          "coupon_qty": 5
        }'
    variables: |
      {}
    response: |
      {
        "generated": 5,
        "coupons": [
          {
            "id": 23,
            "cartRuleId": 47,
            "code": "SAVE-A1B2C3D4-2026",
            "usageLimit": 0,
            "usagePerCustomer": 0,
            "timesUsed": 0,
            "type": 1,
            "isPrimary": false,
            "expiredAt": "2026-12-31",
            "createdAt": "2026-06-09T13:50:11+05:30",
            "updatedAt": "2026-06-09T13:50:11+05:30"
          }
        ]
      }
---

# Bulk-Generate Cart Rule Coupons

Generates several random coupon codes for a cart rule in one call — the
**Generate Coupons** action on the **Coupons** tab of the admin **Marketing →
Promotions → Cart Rules** screen.

::: tip
New here? Read the [Cart Rule Coupons overview](/api/rest-api/admin/marketing/promotions/cart-rule-coupons/) for what these coupons do and how they relate to a cart rule.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/cart-rules/{cartRuleId}/coupons/generate` | POST |

## Details

- Requires an admin Bearer token and the `marketing.promotions.cart_rules.create`
  permission.
- Generates `coupon_qty` codes of the given `format` and `length`, optionally
  wrapped with `prefix` / `suffix`.
- Each generated coupon inherits `usage_limit` / `usage_per_customer` /
  `expired_at` from the parent cart rule and is created as a **secondary** code
  (`type` `1`, `isPrimary` `false`).
- Returns `generated` (the count created) and `coupons` (the full coupon rows).

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `length` | int | yes | Code length, `4`–`30` |
| `format` | string | yes | `alphabetic`, `alphanumeric`, or `numeric` |
| `prefix` | string | no | Prepended to every generated code |
| `suffix` | string | no | Appended to every generated code |
| `coupon_qty` | int | yes | Number of codes to generate, `1`–`100` |
