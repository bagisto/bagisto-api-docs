---
outline: false
examples:
  - id: gql
    title: Marketing Event Detail
    query: |
      query AdminEvent($id: ID!) { adminMarketingEvent(id: $id) { id _id name description date } }
    variables: |
      { "id": "/api/admin/marketing/events/1" }
    response: |
      { "data": { "adminMarketingEvent": { "id": "/api/admin/marketing/events/1", "_id": 1, "name": "Holiday Sale Kickoff", "description": "Email blast to all subscribers.", "date": "2026-12-20" } } }
---

# Marketing Event Detail (GraphQL)

Query: `adminMarketingEvent(id:)`.
