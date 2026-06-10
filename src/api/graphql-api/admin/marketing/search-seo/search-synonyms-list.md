---
outline: false
examples:
  - id: gql
    title: List Search Synonyms
    query: |
      query AdminSynonyms($first: Int) {
        adminMarketingSearchSynonyms(first: $first) {
          edges { node { id _id name terms } }
        }
      }
    variables: |
      { "first": 10 }
    response: |
      { "data": { "adminMarketingSearchSynonyms": { "edges": [{ "node": { "id": "/api/admin/marketing/search-synonyms/1", "_id": 1, "name": "shirt-group", "terms": "shirt,tshirt,tee" } }] } } }
---

# List Search Synonyms (GraphQL)

Query: `adminMarketingSearchSynonyms`. Extra args: `name`, `terms`, `sort`, `order`.
