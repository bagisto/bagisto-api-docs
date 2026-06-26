---
outline: false
examples:
  - id: toggle
    title: Toggle Subscription
    description: Set a subscriber's subscription state. The flag is mirrored onto the linked customer when present.
    query: |
      mutation UpdateAdminMarketingSubscriber(
        $input: updateAdminMarketingSubscriberInput!
      ) {
        updateAdminMarketingSubscriber(input: $input) {
          adminMarketingSubscriber {
            id
            _id
            email
            channel {
              id
              _id
              code
              name
            }
            customerId
            customerName
            isSubscribed
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/marketing/subscribers/26",
          "isSubscribed": false
        }
      }
    response: |
      {
        "data": {
          "updateAdminMarketingSubscriber": {
            "adminMarketingSubscriber": {
              "id": "/api/admin/marketing/subscribers/26",
              "_id": 26,
              "email": "ddd@gmail.com",
              "channel": {
                "id": "/api/admin_marketing_channel_refs/1",
                "_id": 1,
                "code": "default",
                "name": "Default"
              },
              "customerId": null,
              "customerName": null,
              "isSubscribed": false,
              "createdAt": "2025-12-30T18:32:42+05:30",
              "updatedAt": "2026-06-17T12:18:02+05:30"
            }
          }
        }
      }
---

# Toggle Subscription

Sets a subscriber's subscription state — the **Subscribe / Unsubscribe** toggle on
the admin **Marketing → Communications → Newsletter Subscribers** screen.

::: tip
New here? Read the [Newsletter Subscribers overview](/api/graphql-api/admin/marketing/communications/subscribers/) for what a subscriber is and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `updateAdminMarketingSubscriber` | Mutation | Toggle a subscriber's subscription state |

## Details

- Requires an admin Bearer token and the `marketing.communications.subscribers.edit`
  permission.
- Pass the subscriber's IRI as `id` and the new `isSubscribed` value.
- When the subscriber is linked to a registered customer, the same flag is
  mirrored onto that customer's newsletter preference.
- Omitting `isSubscribed` fails validation (`422`).
- The mutation returns the full updated subscriber payload.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | The subscriber's IRI |
| `isSubscribed` | Boolean | Yes | `true` to subscribe / `false` to unsubscribe |
