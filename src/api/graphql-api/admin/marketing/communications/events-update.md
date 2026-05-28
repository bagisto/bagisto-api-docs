---
outline: false
examples:
  - id: gql
    title: Update Marketing Event
    query: |
      mutation Update($input: updateAdminMarketingEventInput!) {
        updateAdminMarketingEvent(input: $input) {
          adminMarketingEvent { id _id date }
        }
      }
    variables: |
      { "input": { "id": "/api/admin/marketing/events/1", "date": "2026-12-22" } }
    response: |
      { "data": { "updateAdminMarketingEvent": { "adminMarketingEvent": { "id": "/api/admin/marketing/events/1", "_id": 1, "date": "2026-12-22" } } } }
---

# Update Marketing Event (GraphQL)

Mutation: `updateAdminMarketingEvent`.

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a event that exists in your store — use the [`adminMarketingEvents`](./events-list.md) query to discover valid ids.
:::
