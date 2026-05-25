---
outline: false
examples:
  - id: gql
    title: Delete Catalog Rule
    query: |
      mutation Delete($input: deleteAdminMarketingCatalogRuleInput!) {
        deleteAdminMarketingCatalogRule(input: $input) {
          adminMarketingCatalogRule { id _id }
        }
      }
    variables: |
      { "input": { "id": "/api/admin/marketing/catalog-rules/1" } }
    response: |
      { "data": { "deleteAdminMarketingCatalogRule": { "adminMarketingCatalogRule": { "id": "/api/admin/marketing/catalog-rules/1", "_id": 1 } } } }
---

# Delete Catalog Rule (GraphQL)

Mutation: `deleteAdminMarketingCatalogRule`.
