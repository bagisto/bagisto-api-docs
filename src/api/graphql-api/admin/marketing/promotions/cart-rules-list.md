---
outline: false
examples:
  - id: gql
    title: List Cart Rules
    query: |
      query AdminMarketingCartRules($first: Int) {
        adminMarketingCartRules(first: $first) {
          edges { cursor node { id _id name status couponType actionType discountAmount } }
          pageInfo { hasNextPage endCursor } totalCount
        }
      }
    variables: |
      { "first": 10 }
    response: |
      { "data": { "adminMarketingCartRules": { "edges": [{ "cursor": "MA==", "node": { "id": "/api/admin/marketing/cart-rules/1", "_id": 1, "name": "10% off summer", "status": 1, "couponType": 1, "actionType": "by_percent", "discountAmount": 10 } }], "pageInfo": { "hasNextPage": false, "endCursor": "MA==" }, "totalCount": 1 } } }
---

# List Cart Rules (GraphQL)

Query: `adminMarketingCartRules` (cursor). Extra args: `name`, `status`, `coupon_type`, `sort`, `order`.
