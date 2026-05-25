---
outline: false
examples:
  - id: gql
    title: Delete Cart Rule Coupon
    query: |
      mutation Delete($input: deleteAdminMarketingCartRuleCouponInput!) {
        deleteAdminMarketingCartRuleCoupon(input: $input) {
          adminMarketingCartRuleCoupon { id _id }
        }
      }
    variables: |
      { "input": { "id": "/api/admin/marketing/cart-rule-coupons/12" } }
    response: |
      { "data": { "deleteAdminMarketingCartRuleCoupon": { "adminMarketingCartRuleCoupon": { "id": "/api/admin/marketing/cart-rule-coupons/12", "_id": 12 } } } }
---

# Delete Cart Rule Coupon (GraphQL)

Mutation: `deleteAdminMarketingCartRuleCoupon`.
