---
outline: false
examples:
  - id: gql
    title: List Catalog Rules
    query: |
      query AdminMarketingCatalogRules($first: Int) {
        adminMarketingCatalogRules(first: $first) {
          edges { cursor node { id _id name status actionType discountAmount } }
          pageInfo { hasNextPage endCursor } totalCount
        }
      }
    variables: |
      { "first": 10 }
    response: |
      { "data": { "adminMarketingCatalogRules": { "edges": [{ "cursor": "MA==", "node": { "id": "/api/admin/marketing/catalog-rules/1", "_id": 1, "name": "Summer 10% off", "status": 1, "actionType": "by_percent", "discountAmount": 10 } }], "pageInfo": { "hasNextPage": false, "endCursor": "MA==" }, "totalCount": 1 } } }
---

# List Catalog Rules (GraphQL)

Query: `adminMarketingCatalogRules`. Cursor pagination.

Args: `name`, `status`, `sort`, `order` (plus standard `first`, `after`).
