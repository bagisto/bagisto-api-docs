---
outline: false
examples:
  - id: gql
    title: Mass Delete Search Terms
    query: |
      mutation MassDelete($input: createAdminMarketingSearchTermMassDeleteInput!) {
        createAdminMarketingSearchTermMassDelete(input: $input) {
          adminMarketingSearchTermMassDelete { deleted message }
        }
      }
    variables: |
      { "input": { "indices": [12, 18] } }
    response: |
      { "data": { "createAdminMarketingSearchTermMassDelete": { "adminMarketingSearchTermMassDelete": { "deleted": [12, 18], "message": "Search terms deleted." } } } }
---

# Mass Delete Search Terms (GraphQL)

Mutation: `createAdminMarketingSearchTermMassDelete`.
