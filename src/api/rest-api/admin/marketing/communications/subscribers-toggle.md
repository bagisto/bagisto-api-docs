---
outline: false
apiType: rest
examples:
  - id: toggle
    title: Toggle Newsletter Subscription
    description: Set the subscription state for a subscriber. Mirrors the flag onto the linked customer when one exists.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/marketing/subscribers/26" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "is_subscribed": false
        }'
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
        "isSubscribed": false,
        "createdAt": "2025-12-30T18:32:42+05:30",
        "updatedAt": "2026-06-17T12:20:41+05:30"
      }
---

# Toggle Newsletter Subscription

Sets the subscription state for a subscriber — the **subscribe / unsubscribe**
toggle on the admin **Marketing → Communications → Newsletter Subscribers** screen.

::: tip
New here? Read the [Newsletter Subscribers overview](/api/rest-api/admin/marketing/communications/subscribers/) for what a subscriber is and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/subscribers/{id}` | PUT |

## Details

- Requires an admin Bearer token and the
  `marketing.communications.subscribers.edit` permission.
- Sets `is_subscribed` for the subscriber row and mirrors the flag onto the linked
  customer's newsletter preference when a customer is linked.
- A missing `is_subscribed` field returns a `422`.
- Returns the full updated subscriber payload.

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `is_subscribed` | bool | yes | `true` subscribed / `false` unsubscribed |
