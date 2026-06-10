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
      { "input": { "name": "10% off summer", "channels": [1], "customerGroups": [1, 2, 3], "couponType": 1, "actionType": "by_percent", "discountAmount": 10, "status": 1 } }
    response: |
      { "data": { "createAdminMarketingCartRule": { "adminMarketingCartRule": { "id": "/api/admin/marketing/cart-rules/1", "_id": 1, "name": "10% off summer", "actionType": "by_percent", "discountAmount": 10 } } } }
---

# Create Cart Rule (GraphQL)

Mutation: `createAdminMarketingCartRule`.
