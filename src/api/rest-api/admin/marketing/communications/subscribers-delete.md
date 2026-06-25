---
outline: false
apiType: rest
examples:
  - id: delete
    title: Delete Newsletter Subscriber
    description: Delete a newsletter subscriber by id.
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/marketing/subscribers/26" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "message": "Subscriber deleted."
      }
---

# Delete Newsletter Subscriber

Deletes a newsletter subscriber — the **Delete** row action on the admin
**Marketing → Communications → Newsletter Subscribers** screen. When the subscriber
is linked to a registered customer, that customer's newsletter preference is set to
unsubscribed before the row is removed.

::: tip
New here? Read the [Newsletter Subscribers overview](/api/rest-api/admin/marketing/communications/subscribers/) for what a subscriber is and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/subscribers/{id}` | DELETE |

## Details

- Requires an admin Bearer token and the
  `marketing.communications.subscribers.delete` permission.
- Returns a success message on completion.
- An unknown id returns a `404`.
