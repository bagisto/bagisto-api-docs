---
outline: false
examples:
  - id: gql
    title: Delete Marketing Event
    query: |
      mutation Delete($input: deleteAdminMarketingEventInput!) {
        deleteAdminMarketingEvent(input: $input) {
          adminMarketingEvent { id _id }
        }
      }
    variables: |
      { "input": { "id": "/api/admin/marketing/events/1" } }
    response: |
      { "data": { "deleteAdminMarketingEvent": { "adminMarketingEvent": { "id": "/api/admin/marketing/events/1", "_id": 1 } } } }
---

# Delete Marketing Event (GraphQL)

Mutation: `deleteAdminMarketingEvent`.
