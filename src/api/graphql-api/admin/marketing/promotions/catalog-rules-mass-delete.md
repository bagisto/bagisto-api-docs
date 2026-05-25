---
outline: false
examples:
  - id: gql
    title: Mass Delete Catalog Rules
    query: |
      mutation MassDelete($input: createAdminMarketingCatalogRuleMassDeleteInput!) {
        createAdminMarketingCatalogRuleMassDelete(input: $input) {
          adminMarketingCatalogRuleMassDelete { deleted message }
        }
      }
    variables: |
      { "input": { "indices": [12, 18] } }
    response: |
      { "data": { "createAdminMarketingCatalogRuleMassDelete": { "adminMarketingCatalogRuleMassDelete": { "deleted": [12, 18], "message": "Catalog rules deleted." } } } }
---

# Mass Delete Catalog Rules (GraphQL)

Mutation: `createAdminMarketingCatalogRuleMassDelete`.
