---
outline: false
apiType: rest
examples:
  - id: list
    title: List Newsletter Subscribers
    description: Paginated list of every newsletter subscriber, returned in the { data, meta } envelope.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/subscribers?per_page=10&page=1" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 26,
            "email": "ddd@gmail.com",
            "customerId": null,
            "customerName": null,
            "isSubscribed": true,
            "createdAt": "2025-12-30T18:32:42+05:30",
            "updatedAt": "2026-06-17T12:14:15+05:30"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 3, "total": 26, "from": 1, "to": 10 }
      }
  - id: list-filtered
    title: Filter Newsletter Subscribers
    description: Filter by subscription state and channel, sorted by email. Filters compose with logical AND.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/subscribers?is_subscribed=1&channel_id=1&sort=email&order=asc" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 26,
            "email": "ddd@gmail.com",
            "customerId": null,
            "customerName": null,
            "isSubscribed": true,
            "createdAt": "2025-12-30T18:32:42+05:30",
            "updatedAt": "2026-06-17T12:14:15+05:30"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# List Newsletter Subscribers

Lists every newsletter subscriber in the store — the data behind the admin
**Marketing → Communications → Newsletter Subscribers** datagrid.

::: tip
New here? Read the [Newsletter Subscribers overview](/api/rest-api/admin/marketing/communications/subscribers/) for what a subscriber is and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/subscribers` | GET |

## Response envelope

Admin collections return a `{ data, meta }` body envelope:

- `data` — the subscriber rows for this page.
- `meta` — `currentPage`, `perPage`, `lastPage`, `total`, `from`, `to`.

Each row carries the subscriber field set shown in the example. `customerId`
and `customerName` are `null` unless the subscriber's email matches a registered
customer. The `channel` object is **detail-only** — it appears on the
[detail](/api/rest-api/admin/marketing/communications/subscribers-detail) and
toggle responses and is `null` on list rows.

## Query parameters

| Parameter | Description |
|-----------|-------------|
| `page`, `per_page` | Pagination (`per_page` default 10, max 50) |
| `email` | Email — partial match |
| `channel_id` | Channel id — exact match |
| `is_subscribed` | `0` (unsubscribed) / `1` (subscribed) |
| `sort`, `order` | Sort field (`id`, `email`) + `asc` / `desc` (default `id desc`) |

Filters compose with logical AND — more filters narrow the result.

Every `/api/admin/*` request requires an admin Bearer token.
