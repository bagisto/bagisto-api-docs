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
