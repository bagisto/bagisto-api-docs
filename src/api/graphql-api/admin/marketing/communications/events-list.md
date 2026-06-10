---
outline: false
examples:
  - id: gql
    title: List Marketing Events
    query: |
      query AdminEvents($first: Int) {
        adminMarketingEvents(first: $first) {
          edges { node { id _id name date } }
        }
      }
    variables: |
      { "first": 10 }
    response: |
      { "data": { "adminMarketingEvents": { "edges": [{ "node": { "id": "/api/admin/marketing/events/1", "_id": 1, "name": "Holiday Sale Kickoff", "date": "2026-12-20" } }] } } }
---

# List Marketing Events (GraphQL)

Query: `adminMarketingEvents`. Extra args: `name`, `date_from`, `date_to`, `sort`, `order`.
