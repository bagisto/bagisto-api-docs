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

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a catalog rule that exists in your store — use the [`adminMarketingCatalogRules`](./catalog-rules-list.md) query to discover valid ids.
:::
