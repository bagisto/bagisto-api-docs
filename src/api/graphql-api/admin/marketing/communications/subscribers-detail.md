---
outline: false
examples:
  - id: detail
    title: Newsletter Subscriber Detail
    description: Full payload for a single newsletter subscriber.
    query: |
      query AdminMarketingSubscriber($id: ID!) {
        adminMarketingSubscriber(id: $id) {
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
    variables: |
      {
        "id": "/api/admin/marketing/subscribers/26"
      }
    response: |
      {
        "data": {
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
            "isSubscribed": true,
            "createdAt": "2025-12-30T18:32:42+05:30",
            "updatedAt": "2026-06-17T12:14:15+05:30"
          }
        }
      }
---

# Newsletter Subscriber Detail

Returns a single newsletter subscriber with its full field set — the data behind
the admin **Marketing → Communications → Newsletter Subscribers** view screen.

::: tip
New here? Read the [Newsletter Subscribers overview](/api/graphql-api/admin/marketing/communications/subscribers/) for what a subscriber is and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminMarketingSubscriber` | Query | Fetch one newsletter subscriber by id |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- Pass the subscriber's IRI (e.g. `/api/admin/marketing/subscribers/26`) as the
  `id` argument; `_id` in the response is the numeric id.

## Fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | ID | The subscriber's IRI |
| `_id` | Int | Numeric id |
| `email` | String | Subscriber email address |
| `channel` | Object | The channel the subscriber opted in on — sub-select `id`, `_id`, `code`, `name`. Detail-only (`null` on list rows) |
| `customerId` | Int | Linked customer id, or `null` for a guest subscriber |
| `customerName` | String | Linked customer name, or `null` |
| `isSubscribed` | Boolean | `true` subscribed / `false` unsubscribed |
| `createdAt` | String | Creation timestamp |
| `updatedAt` | String | Last-update timestamp |
