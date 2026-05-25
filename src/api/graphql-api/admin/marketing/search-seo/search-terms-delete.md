---
outline: false
examples:
  - id: gql
    title: Delete Search Term
    query: |
      mutation Delete($input: deleteAdminMarketingSearchTermInput!) {
        deleteAdminMarketingSearchTerm(input: $input) {
          adminMarketingSearchTerm { id _id }
        }
      }
    variables: |
      { "input": { "id": "/api/admin/marketing/search-terms/1" } }
    response: |
      { "data": { "deleteAdminMarketingSearchTerm": { "adminMarketingSearchTerm": { "id": "/api/admin/marketing/search-terms/1", "_id": 1 } } } }
---

# Delete Search Term (GraphQL)

Mutation: `deleteAdminMarketingSearchTerm`.
