---
outline: false
examples:
  - id: gql
    title: Delete Search Synonym
    query: |
      mutation Delete($input: deleteAdminMarketingSearchSynonymInput!) {
        deleteAdminMarketingSearchSynonym(input: $input) {
          adminMarketingSearchSynonym { id _id }
        }
      }
    variables: |
      { "input": { "id": "/api/admin/marketing/search-synonyms/1" } }
    response: |
      { "data": { "deleteAdminMarketingSearchSynonym": { "adminMarketingSearchSynonym": { "id": "/api/admin/marketing/search-synonyms/1", "_id": 1 } } } }
---

# Delete Search Synonym (GraphQL)

Mutation: `deleteAdminMarketingSearchSynonym`.
