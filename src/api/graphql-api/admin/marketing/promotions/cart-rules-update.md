---
outline: false
examples:
  - id: gql
    title: Update Cart Rule
    query: |
      mutation Update($input: updateAdminMarketingCartRuleInput!) {
        updateAdminMarketingCartRule(input: $input) {
          adminMarketingCartRule { id _id name discountAmount }
        }
      }
    variables: |
      { "input": { "id": "/api/admin/marketing/cart-rules/1", "name": "15% off summer", "discount_amount": 15 } }
    response: |
      { "data": { "updateAdminMarketingCartRule": { "adminMarketingCartRule": { "id": "/api/admin/marketing/cart-rules/1", "_id": 1, "name": "15% off summer", "discountAmount": 15 } } } }
---

# Update Cart Rule (GraphQL)

Mutation: `updateAdminMarketingCartRule`.
