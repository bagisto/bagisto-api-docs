---
outline: false
examples:
  - id: gql
    title: Toggle Subscription
    query: |
      mutation Toggle($input: updateAdminMarketingSubscriberInput!) {
        updateAdminMarketingSubscriber(input: $input) {
          adminMarketingSubscriber { id _id isSubscribed }
        }
      }
    variables: |
      { "input": { "id": "/api/admin/marketing/subscribers/1", "is_subscribed": false } }
    response: |
      { "data": { "updateAdminMarketingSubscriber": { "adminMarketingSubscriber": { "id": "/api/admin/marketing/subscribers/1", "_id": 1, "isSubscribed": false } } } }
---

# Toggle Subscription (GraphQL)

Mutation: `updateAdminMarketingSubscriber`. Mirrors `is_subscribed` onto the linked customer (if any).
