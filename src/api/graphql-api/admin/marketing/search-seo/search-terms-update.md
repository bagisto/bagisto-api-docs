---
outline: false
examples:
  - id: gql
    title: Update Search Term
    query: |
      mutation Update($input: updateAdminMarketingSearchTermInput!) {
        updateAdminMarketingSearchTerm(input: $input) {
          adminMarketingSearchTerm { id _id term redirectUrl }
        }
      }
    variables: |
      { "input": { "id": "/api/admin/marketing/search-terms/1", "term": "red shirt", "redirectUrl": "https://example.com/shirts" } }
    response: |
      { "data": { "updateAdminMarketingSearchTerm": { "adminMarketingSearchTerm": { "id": "/api/admin/marketing/search-terms/1", "_id": 1, "term": "red shirt", "redirectUrl": "https://example.com/shirts" } } } }
---

# Update Search Term (GraphQL)

Mutation: `updateAdminMarketingSearchTerm`. Only `term` + `redirect_url` are editable.
