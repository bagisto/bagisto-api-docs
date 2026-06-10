---
outline: false
examples:
  - id: gql
    title: Search Term Detail
    query: |
      query AdminTerm($id: ID!) {
        adminMarketingSearchTerm(id: $id) { id _id term uses results redirectUrl channelName locale }
      }
    variables: |
      { "id": "/api/admin/marketing/search-terms/1" }
    response: |
      { "data": { "adminMarketingSearchTerm": { "id": "/api/admin/marketing/search-terms/1", "_id": 1, "term": "red shirt", "uses": 142, "results": 23, "redirectUrl": null, "channelName": "Default", "locale": "en" } } }
---

# Search Term Detail (GraphQL)

Query: `adminMarketingSearchTerm(id:)`.
