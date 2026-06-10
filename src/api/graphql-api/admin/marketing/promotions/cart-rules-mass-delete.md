---
outline: false
examples:
  - id: gql
    title: Mass Delete Cart Rules
    query: |
      mutation MassDelete($input: createAdminMarketingCartRuleMassDeleteInput!) {
        createAdminMarketingCartRuleMassDelete(input: $input) {
          adminMarketingCartRuleMassDelete { deleted skipped message }
        }
      }
    variables: |
      { "input": { "indices": [3, 5] } }
    response: |
      { "data": { "createAdminMarketingCartRuleMassDelete": { "adminMarketingCartRuleMassDelete": { "deleted": [3, 5], "skipped": null, "message": "Cart rules deleted." } } } }
---

# Mass Delete Cart Rules (GraphQL)

Mutation: `createAdminMarketingCartRuleMassDelete`.
