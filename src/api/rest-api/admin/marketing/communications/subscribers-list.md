---
outline: false
apiType: rest
examples:
  - id: admin-marketing-subscribers-list
    title: List Newsletter Subscribers
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/subscribers" \
        -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 1, "email": "subscriber@example.com", "channelId": 1, "channelName": "Default", "customerId": 12, "customerName": "Jane Doe", "isSubscribed": true }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
---

# List Newsletter Subscribers

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/subscribers` | GET |

## Query Parameters

`page`, `per_page` (default 10, cap 50), `email` (partial), `channel_id`, `is_subscribed` (0/1), `sort` (`id`, `email`), `order`.

::: warning Storefront-originated
Newsletter subscriptions are created via storefront; admin only moderates. There is no `POST` endpoint.
:::
