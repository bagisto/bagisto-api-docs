---
outline: false
examples:
  - id: gql
    title: Delete Cart Rule
    query: |
      mutation Delete($input: deleteAdminMarketingCartRuleInput!) {
        deleteAdminMarketingCartRule(input: $input) { adminMarketingCartRule { id _id } }
      }
    variables: |
      { "input": { "id": "/api/admin/marketing/cart-rules/1" } }
    response: |
      { "data": { "deleteAdminMarketingCartRule": { "adminMarketingCartRule": { "id": "/api/admin/marketing/cart-rules/1", "_id": 1 } } } }
---

# Delete Cart Rule (GraphQL)

Mutation: `deleteAdminMarketingCartRule`.
