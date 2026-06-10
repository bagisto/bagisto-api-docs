---
outline: false
examples:
  - id: gql
    title: Newsletter Subscriber Detail
    query: |
      query AdminSubscriber($id: ID!) {
        adminMarketingSubscriber(id: $id) {
          id _id email channelId channelName customerId customerName isSubscribed
        }
      }
    variables: |
      { "id": "/api/admin/marketing/subscribers/1" }
    response: |
      { "data": { "adminMarketingSubscriber": { "id": "/api/admin/marketing/subscribers/1", "_id": 1, "email": "subscriber@example.com", "channelId": 1, "channelName": "Default", "customerId": 12, "customerName": "Jane Doe", "isSubscribed": true } } }
---

# Newsletter Subscriber Detail (GraphQL)

Query: `adminMarketingSubscriber(id:)`.
