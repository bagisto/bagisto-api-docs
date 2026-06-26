---
outline: false
examples:
  - id: list
    title: List Newsletter Subscribers
    description: Cursor-paginated list of every newsletter subscriber.
    query: |
      query AdminMarketingSubscribers($first: Int) {
        adminMarketingSubscribers(first: $first) {
          totalCount
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            cursor
            node {
              id
              _id
              email
              customerId
              customerName
              isSubscribed
              createdAt
              updatedAt
            }
          }
        }
      }
    variables: |
      {
        "first": 10
      }
    response: |
      {
        "data": {
          "adminMarketingSubscribers": {
            "totalCount": 26,
            "pageInfo": {
              "hasNextPage": true,
              "hasPreviousPage": false,
              "startCursor": "MA==",
              "endCursor": "OQ=="
            },
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/marketing/subscribers/26",
                  "_id": 26,
                  "email": "ddd@gmail.com",
                  "customerId": null,
                  "customerName": null,
                  "isSubscribed": true,
                  "createdAt": "2025-12-30T18:32:42+05:30",
                  "updatedAt": "2026-06-17T12:14:15+05:30"
                }
              }
            ]
          }
        }
      }
  - id: list-filtered
    title: List Newsletter Subscribers (filtered)
    description: Filter by subscription state and channel, sorted by email.
    query: |
      query AdminMarketingSubscribers(
        $first: Int
        $is_subscribed: Int
        $channel_id: Int
        $sort: String
        $order: String
      ) {
        adminMarketingSubscribers(
          first: $first
          is_subscribed: $is_subscribed
          channel_id: $channel_id
          sort: $sort
          order: $order
        ) {
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              _id
              email
              customerId
              customerName
              isSubscribed
              createdAt
            }
          }
        }
      }
    variables: |
      {
        "first": 10,
        "is_subscribed": 1,
        "channel_id": 1,
        "sort": "email",
        "order": "asc"
      }
    response: |
      {
        "data": {
          "adminMarketingSubscribers": {
            "totalCount": 1,
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "MA=="
            },
            "edges": [
              {
                "node": {
                  "id": "/api/admin/marketing/subscribers/26",
                  "_id": 26,
                  "email": "ddd@gmail.com",
                  "customerId": null,
                  "customerName": null,
                  "isSubscribed": true,
                  "createdAt": "2025-12-30T18:32:42+05:30"
                }
              }
            ]
          }
        }
      }
---

# List Newsletter Subscribers

Lists every newsletter subscriber in the store — the data behind the admin
**Marketing → Communications → Newsletter Subscribers** datagrid.

::: tip
New here? Read the [Newsletter Subscribers overview](/api/graphql-api/admin/marketing/communications/subscribers/) for what a subscriber is and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminMarketingSubscribers` | Query | Cursor-paginated list of all newsletter subscribers |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- **Cursor pagination** — pass `first` for the page size and `after` (the
  `endCursor` from the previous page) to advance. `totalCount` is the grand total.
- `customerId` and `customerName` are `null` unless the subscriber's email belongs
  to a registered customer.
- The `channel` object is **detail-only** — it resolves on the
  [detail](/api/graphql-api/admin/marketing/communications/subscribers-detail)
  query and is `null` on list rows.

## Filtering

Pass any of these arguments alongside `first` / `after` (they mirror the admin
datagrid filters):

| Argument | Description |
|----------|-------------|
| `email` | Email — partial match |
| `channel_id` | Channel id — exact match |
| `is_subscribed` | `0` (unsubscribed) / `1` (subscribed) |
| `sort`, `order` | Sort field (`id`, `email`) + `asc` / `desc` (default `id desc`) |
