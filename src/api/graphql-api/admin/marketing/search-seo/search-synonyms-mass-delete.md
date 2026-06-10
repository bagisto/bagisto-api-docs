---
outline: false
examples:
  - id: gql
    title: Mass Delete Search Synonyms
    query: |
      mutation MassDelete($input: createAdminMarketingSearchSynonymMassDeleteInput!) {
        createAdminMarketingSearchSynonymMassDelete(input: $input) {
          adminMarketingSearchSynonymMassDelete { deleted message }
        }
      }
    variables: |
      { "input": { "indices": [12, 18] } }
    response: |
      { "data": { "createAdminMarketingSearchSynonymMassDelete": { "adminMarketingSearchSynonymMassDelete": { "deleted": [12, 18], "message": "Search synonyms deleted." } } } }
---

# Mass Delete Search Synonyms (GraphQL)

Mutation: `createAdminMarketingSearchSynonymMassDelete`.
