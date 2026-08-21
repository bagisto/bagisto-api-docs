---
outline: false
examples:
  - id: generate
    title: Generate Cart Rule Coupons
    description: Bulk-create several coupon codes from a format, prefix and suffix.
    query: |
      mutation CreateAdminMarketingCartRuleCouponGenerate(
        $input: createAdminMarketingCartRuleCouponGenerateInput!
      ) {
        createAdminMarketingCartRuleCouponGenerate(input: $input) {
          adminMarketingCartRuleCouponGenerate {
            generated
            coupons {
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
      }
    variables: |
      {
        "input": {
          "cartRuleId": 47,
          "length": 10,
          "format": "alphanumeric",
          "prefix": "SAVE-",
          "suffix": "-2026",
          "couponQty": 5
        }
      }
    response: |
      {
        "data": {
          "createAdminMarketingCartRuleCouponGenerate": {
            "adminMarketingCartRuleCouponGenerate": {
              "generated": 5,
              "coupons": [
                {
                  "id": "/api/admin/marketing/cart-rules/47/coupons/23",
                  "_id": 23,
                  "cartRuleId": 47,
                  "code": "SAVE-A1B2C3D4E5-2026",
                  "usageLimit": 0,
                  "usagePerCustomer": 0,
                  "timesUsed": 0,
                  "type": 1,
                  "isPrimary": false,
                  "expiredAt": "2026-12-31",
                  "createdAt": "2026-06-09T13:48:29+05:30",
                  "updatedAt": "2026-06-09T13:48:29+05:30"
                }
              ]
            }
          }
        }
      }
---

# Generate Cart Rule Coupons

Bulk-creates several coupon codes in one call — the **Generate Coupons** action on
the admin **Marketing → Promotions → Cart Rules → Coupons** screen.

New here? Read the [Cart Rule Coupons overview](/api/graphql-api/admin/marketing/promotions/cart-rule-coupons/) for what a coupon does and how its fields behave.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminMarketingCartRuleCouponGenerate` | Mutation | Generate multiple coupon codes |

## Details

- Requires an admin Bearer token and the `marketing.promotions.cart_rules.create`
  permission.
- Builds `couponQty` codes of the given `length`, each wrapped with the optional
  `prefix` and `suffix`. The response returns the count plus the full list of new
  coupons.
- Generated codes are all secondary codes (`isPrimary` is `false`, `type` is `1`).

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `cartRuleId` | Int | Yes | Parent cart-rule id |
| `length` | Int | Yes | Random part length, `4`–`30` |
| `format` | String | Yes | `alphabetic`, `alphanumeric`, or `numeric` |
| `prefix` | String | No | Prepended to every code |
| `suffix` | String | No | Appended to every code |
| `couponQty` | Int | Yes | Number of codes to generate, `1`–`100` |
