---
outline: false
examples:
  - id: gql
    title: List Newsletter Subscribers
    query: |
      query AdminSubscribers($first: Int) {
        adminMarketingSubscribers(first: $first) {
          edges { node { id _id email channelName customerName isSubscribed } }
        }
      }
    variables: |
      { "first": 10 }
    response: |
      { "data": { "adminMarketingSubscribers": { "edges": [{ "node": { "id": "/api/admin/marketing/subscribers/1", "_id": 1, "email": "subscriber@example.com", "channelName": "Default", "customerName": "Jane Doe", "isSubscribed": true } }] } } }
---

# List Newsletter Subscribers (GraphQL)

Query: `adminMarketingSubscribers`. Extra args: `email`, `channel_id`, `is_subscribed`, `sort`, `order`.

::: warning Storefront-originated
Subscriptions are created via the storefront; admin only moderates.
:::
