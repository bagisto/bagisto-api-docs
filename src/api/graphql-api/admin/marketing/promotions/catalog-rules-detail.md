---
outline: false
examples:
  - id: gql
    title: Catalog Rule Detail
    query: |
      query AdminMarketingCatalogRule($id: ID!) {
        adminMarketingCatalogRule(id: $id) {
          id _id name description status actionType discountAmount channels customerGroups conditions
        }
      }
    variables: |
      { "id": "/api/admin/marketing/catalog-rules/1" }
    response: |
      { "data": { "adminMarketingCatalogRule": { "id": "/api/admin/marketing/catalog-rules/1", "_id": 1, "name": "Summer 10% off", "actionType": "by_percent", "discountAmount": 10, "channels": [1], "customerGroups": [1, 2] } } }
---

# Catalog Rule Detail (GraphQL)

Query: `adminMarketingCatalogRule(id:)`.
