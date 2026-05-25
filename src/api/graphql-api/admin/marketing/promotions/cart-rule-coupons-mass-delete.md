---
outline: false
examples:
  - id: gql
    title: Mass Delete Cart Rule Coupons
    query: |
      mutation MassDelete($input: createAdminMarketingCartRuleCouponMassDeleteInput!) {
        createAdminMarketingCartRuleCouponMassDelete(input: $input) {
          adminMarketingCartRuleCouponMassDelete { cartRuleId deleted skipped success message }
        }
      }
    variables: |
      { "input": { "cartRuleId": 1, "indices": [12, 13, 14] } }
    response: |
      { "data": { "createAdminMarketingCartRuleCouponMassDelete": { "adminMarketingCartRuleCouponMassDelete": { "cartRuleId": 1, "deleted": 3, "skipped": null, "success": true, "message": "Deleted 3 coupons." } } } }
---

# Mass Delete Cart Rule Coupons (GraphQL)

Mutation: `createAdminMarketingCartRuleCouponMassDelete`. IDs not belonging to `cartRuleId` are silently skipped.
