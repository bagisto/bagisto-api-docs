---
outline: false
examples:
  - id: gql
    title: Update Catalog Rule
    query: |
      mutation Update($input: updateAdminMarketingCatalogRuleInput!) {
        updateAdminMarketingCatalogRule(input: $input) {
          adminMarketingCatalogRule { id _id name discountAmount }
        }
      }
    variables: |
      { "input": { "id": "/api/admin/marketing/catalog-rules/1", "name": "Summer 15% off", "discountAmount": 15 } }
    response: |
      { "data": { "updateAdminMarketingCatalogRule": { "adminMarketingCatalogRule": { "id": "/api/admin/marketing/catalog-rules/1", "_id": 1, "name": "Summer 15% off", "discountAmount": 15 } } } }
---

# Update Catalog Rule (GraphQL)

Mutation: `updateAdminMarketingCatalogRule`.
