---
outline: false
examples:
  - id: create
    title: Create Cart Rule Coupon
    description: Add a single coupon code to a cart rule.
    query: |
      mutation CreateAdminMarketingCartRuleCoupon(
        $input: createAdminMarketingCartRuleCouponInput!
      ) {
        createAdminMarketingCartRuleCoupon(input: $input) {
          adminMarketingCartRuleCoupon {
            id
            _id
            cartRuleId
            code
            usageLimit
            usagePerCustomer
            timesUsed
            type
            isPrimary
            expiredAt
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "cartRuleId": 47,
          "code": "QALIVE99",
          "usageLimit": 0,
          "usagePerCustomer": 0,
          "expiredAt": "2026-12-31"
        }
      }
    response: |
      {
        "data": {
          "createAdminMarketingCartRuleCoupon": {
            "adminMarketingCartRuleCoupon": {
              "id": "/api/admin/marketing/cart-rules/47/coupons/22",
              "_id": 22,
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
          }
        }
      }
---

# Create Cart Rule Coupon

Adds a single coupon code to a cart rule — the **Add Coupon** action on the admin
**Marketing → Promotions → Cart Rules → Coupons** screen.

New here? Read the [Cart Rule Coupons overview](/api/graphql-api/admin/marketing/promotions/cart-rule-coupons/) for what a coupon does and how its fields behave.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminMarketingCartRuleCoupon` | Mutation | Add one coupon code to a cart rule |

## Details

- Requires an admin Bearer token and the `marketing.promotions.cart_rules.create`
  permission.
- `code` must be unique across all cart-rule coupons.
- Omitted `usageLimit` / `usagePerCustomer` / `expiredAt` inherit the parent rule's
  values.
- The created coupon is always a **secondary** code: `isPrimary` is `false` and
  `type` is `1`. The rule's primary code is managed on the cart rule itself.
- To create many codes at once, use the
  [generate](/api/graphql-api/admin/marketing/promotions/cart-rule-coupons-generate)
  mutation instead.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `cartRuleId` | Int | Yes | Parent cart-rule id |
| `code` | String | Yes | Coupon code — must be unique |
| `usageLimit` | Int | No | Total redemptions allowed; inherits the rule when omitted |
| `usagePerCustomer` | Int | No | Redemptions per customer; inherits the rule when omitted |
| `expiredAt` | String | No | Expiry date (`YYYY-MM-DD`); inherits the rule when omitted |
