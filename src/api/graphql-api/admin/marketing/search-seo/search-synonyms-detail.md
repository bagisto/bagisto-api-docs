---
outline: false
examples:
  - id: gql
    title: Search Synonym Detail
    query: |
      query AdminSynonym($id: ID!) { adminMarketingSearchSynonym(id: $id) { id _id name terms } }
    variables: |
      { "id": "/api/admin/marketing/search-synonyms/1" }
    response: |
      { "data": { "adminMarketingSearchSynonym": { "id": "/api/admin/marketing/search-synonyms/1", "_id": 1, "name": "shirt-group", "terms": "shirt,tshirt,tee" } } }
---

# Search Synonym Detail (GraphQL)

Query: `adminMarketingSearchSynonym(id:)`.
