---
outline: false
examples:
  - id: gql
    title: Delete Subscription
    query: |
      mutation Delete($input: deleteAdminMarketingSubscriberInput!) {
        deleteAdminMarketingSubscriber(input: $input) {
          adminMarketingSubscriber { id _id }
        }
      }
    variables: |
      { "input": { "id": "/api/admin/marketing/subscribers/1" } }
    response: |
      { "data": { "deleteAdminMarketingSubscriber": { "adminMarketingSubscriber": { "id": "/api/admin/marketing/subscribers/1", "_id": 1 } } } }
---

# Delete Subscription (GraphQL)

Mutation: `deleteAdminMarketingSubscriber`.

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a subscriber that exists in your store — use the [`adminMarketingSubscribers`](./subscribers-list.md) query to discover valid ids.
:::
