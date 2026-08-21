---
outline: false
apiType: rest
examples:
  - id: detail
    title: Newsletter Subscriber Detail
    description: Full payload for a single newsletter subscriber, including the resolved channel and linked customer.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/subscribers/26" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "id": 26,
        "email": "ddd@gmail.com",
        "channel": {
          "id": 1,
          "code": "default",
          "name": "Default"
        },
        "customerId": null,
        "customerName": null,
        "isSubscribed": true,
        "createdAt": "2025-12-30T18:32:42+05:30",
        "updatedAt": "2026-06-17T12:14:15+05:30"
      }
---

# Newsletter Subscriber Detail

Returns a single newsletter subscriber with its full field set — the data behind
the admin **Marketing → Communications → Newsletter Subscribers** view screen.

New here? Read the [Newsletter Subscribers overview](/api/rest-api/admin/marketing/communications/subscribers/) for what a subscriber is and how its fields behave.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/subscribers/{id}` | GET |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- `customerId` and `customerName` resolve when the subscriber's email matches a
  registered customer; otherwise they are `null`.
- An unknown id returns a `404`.

## Response fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | int | Numeric id |
| `email` | string | Subscriber email address |
| `channel` | object | The channel the subscription belongs to — `{ id, code, name }`. Detail-only (`null` on list rows) |
| `customerId` | int | Linked customer id, or `null` |
| `customerName` | string | Linked customer name, or `null` |
| `isSubscribed` | bool | `true` subscribed / `false` unsubscribed |
| `createdAt` | string | Creation timestamp |
| `updatedAt` | string | Last-update timestamp |
