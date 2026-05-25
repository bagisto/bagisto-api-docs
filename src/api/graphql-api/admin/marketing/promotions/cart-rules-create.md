---
outline: false
examples:
  - id: gql
    title: Create Cart Rule
    query: |
      mutation Create($input: createAdminMarketingCartRuleInput!) {
        createAdminMarketingCartRule(input: $input) {
          adminMarketingCartRule { id _id name actionType discountAmount }
        }
      }
    variables: |
      { "input": { "name": "10% off summer", "channels": [1], "customer_groups": [1, 2, 3], "coupon_type": 1, "action_type": "by_percent", "discount_amount": 10, "status": 1 } }
    response: |
      { "data": { "createAdminMarketingCartRule": { "adminMarketingCartRule": { "id": "/api/admin/marketing/cart-rules/1", "_id": 1, "name": "10% off summer", "actionType": "by_percent", "discountAmount": 10 } } } }
---

# Create Cart Rule (GraphQL)

Mutation: `createAdminMarketingCartRule`.
