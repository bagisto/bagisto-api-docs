---
outline: false
examples:
  - id: gql
    title: Create Cart Rule Coupon
    query: |
      mutation Create($input: createAdminMarketingCartRuleCouponInput!) {
        createAdminMarketingCartRuleCoupon(input: $input) {
          adminMarketingCartRuleCoupon { id _id cartRuleId code usageLimit }
        }
      }
    variables: |
      { "input": { "cartRuleId": 1, "code": "WELCOME10", "usage_limit": 100, "usage_per_customer": 1, "expired_at": "2027-12-31" } }
    response: |
      { "data": { "createAdminMarketingCartRuleCoupon": { "adminMarketingCartRuleCoupon": { "id": "/api/admin/marketing/cart-rule-coupons/12", "_id": 12, "cartRuleId": 1, "code": "WELCOME10", "usageLimit": 100 } } } }
---

# Create Cart Rule Coupon (GraphQL)

Mutation: `createAdminMarketingCartRuleCoupon`.
