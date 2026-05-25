---
outline: false
examples:
  - id: gql
    title: Create Search Synonym
    query: |
      mutation Create($input: createAdminMarketingSearchSynonymInput!) {
        createAdminMarketingSearchSynonym(input: $input) {
          adminMarketingSearchSynonym { id _id name terms }
        }
      }
    variables: |
      { "input": { "name": "shirt-group", "terms": "shirt,tshirt,tee" } }
    response: |
      { "data": { "createAdminMarketingSearchSynonym": { "adminMarketingSearchSynonym": { "id": "/api/admin/marketing/search-synonyms/1", "_id": 1, "name": "shirt-group", "terms": "shirt,tshirt,tee" } } } }
---

# Create Search Synonym (GraphQL)

Mutation: `createAdminMarketingSearchSynonym`.
