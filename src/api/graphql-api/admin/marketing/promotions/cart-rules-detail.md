---
outline: false
examples:
  - id: gql
    title: Cart Rule Detail
    query: |
      query AdminMarketingCartRule($id: ID!) {
        adminMarketingCartRule(id: $id) {
          id _id name status couponType actionType discountAmount channels customerGroups
        }
      }
    variables: |
      { "id": "/api/admin/marketing/cart-rules/1" }
    response: |
      { "data": { "adminMarketingCartRule": { "id": "/api/admin/marketing/cart-rules/1", "_id": 1, "name": "10% off summer", "status": 1, "couponType": 1, "actionType": "by_percent", "discountAmount": 10 } } }
---

# Cart Rule Detail (GraphQL)

Query: `adminMarketingCartRule(id:)`.
