---
outline: false
examples:
  - id: gql
    title: List Cart Rule Coupons
    query: |
      query AdminCoupons($cartRuleId: Int!) {
        adminMarketingCartRuleCoupons(cartRuleId: $cartRuleId) {
          id
          _id
          code
          usageLimit
          usagePerCustomer
          timesUsed
        }
      }
    variables: |
      {
        "cartRuleId": 1
      }
    response: |
      { "data": { "adminMarketingCartRuleCoupons": [ { "id": "/api/admin/marketing/cart-rules/1/coupons/3", "_id": 3, "code": "WELCOME10", "usageLimit": 100, "usagePerCustomer": 1, "timesUsed": 0 } ] } }

---

# List Cart Rule Coupons (GraphQL)

Query: `adminMarketingCartRuleCoupons(cartRuleId:)`. Cursor pagination.
