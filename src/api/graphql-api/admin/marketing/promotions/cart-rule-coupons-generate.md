---
outline: false
examples:
  - id: gql
    title: Bulk-Generate Coupons
    query: |
      mutation Generate($input: createAdminMarketingCartRuleCouponGenerateInput!) {
        createAdminMarketingCartRuleCouponGenerate(input: $input) {
          adminMarketingCartRuleCouponGenerate { cartRuleId generated success message }
        }
      }
    variables: |
      { "input": { "cartRuleId": 1, "length": 10, "format": "alphanumeric", "prefix": "SAVE-", "suffix": "-2026", "couponQty": 5 } }
    response: |
      { "data": { "createAdminMarketingCartRuleCouponGenerate": { "adminMarketingCartRuleCouponGenerate": { "cartRuleId": 1, "generated": 5, "success": true, "message": "Generated 5 coupons." } } } }
---

# Bulk-Generate Cart Rule Coupons (GraphQL)

Mutation: `createAdminMarketingCartRuleCouponGenerate`.

Accepts both `length`/`format`/`prefix`/`suffix` and the core's `code_length`/`code_format`/`code_prefix`/`code_suffix` keys.
