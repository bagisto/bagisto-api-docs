---
outline: false
examples:
  - id: gql
    title: Update Search Synonym
    query: |
      mutation Update($input: updateAdminMarketingSearchSynonymInput!) {
        updateAdminMarketingSearchSynonym(input: $input) {
          adminMarketingSearchSynonym { id _id terms }
        }
      }
    variables: |
      { "input": { "id": "/api/admin/marketing/search-synonyms/1", "terms": "shirt,tshirt,tee,polo" } }
    response: |
      { "data": { "updateAdminMarketingSearchSynonym": { "adminMarketingSearchSynonym": { "id": "/api/admin/marketing/search-synonyms/1", "_id": 1, "terms": "shirt,tshirt,tee,polo" } } } }
---

# Update Search Synonym (GraphQL)

Mutation: `updateAdminMarketingSearchSynonym`.
