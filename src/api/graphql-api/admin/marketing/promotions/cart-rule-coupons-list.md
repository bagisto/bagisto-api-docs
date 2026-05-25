---
outline: false
examples:
  - id: gql
    title: List Cart Rule Coupons
    query: |
      query AdminCoupons($cartRuleId: Int!, $first: Int) {
        adminMarketingCartRuleCoupons(cartRuleId: $cartRuleId, first: $first) {
          edges { node { id _id code usageLimit usagePerCustomer timesUsed } }
        }
      }
    variables: |
      { "cartRuleId": 1, "first": 10 }
    response: |
      { "data": { "adminMarketingCartRuleCoupons": { "edges": [{ "node": { "id": "/api/admin/marketing/cart-rule-coupons/12", "_id": 12, "code": "WELCOME10", "usageLimit": 100, "usagePerCustomer": 1, "timesUsed": 0 } }] } } }
---

# List Cart Rule Coupons (GraphQL)

Query: `adminMarketingCartRuleCoupons(cartRuleId:)`. Cursor pagination.
