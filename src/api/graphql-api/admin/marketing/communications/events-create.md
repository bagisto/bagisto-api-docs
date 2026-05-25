---
outline: false
examples:
  - id: gql
    title: Create Marketing Event
    query: |
      mutation Create($input: createAdminMarketingEventInput!) {
        createAdminMarketingEvent(input: $input) {
          adminMarketingEvent { id _id name date }
        }
      }
    variables: |
      { "input": { "name": "Holiday Sale Kickoff", "description": "Email blast to all subscribers.", "date": "2026-12-20" } }
    response: |
      { "data": { "createAdminMarketingEvent": { "adminMarketingEvent": { "id": "/api/admin/marketing/events/1", "_id": 1, "name": "Holiday Sale Kickoff", "date": "2026-12-20" } } } }
---

# Create Marketing Event (GraphQL)

Mutation: `createAdminMarketingEvent`.
