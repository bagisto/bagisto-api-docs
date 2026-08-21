---
outline: false
apiType: rest
examples:
  - id: delete
    title: Delete Event
    description: Delete a marketing event by id.
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/marketing/events/14" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "message": "Marketing event deleted."
      }
---

# Delete Event

Deletes a marketing event — the **Delete** row action on the admin **Marketing →
Communications → Events** screen.

New here? Read the [Events overview](/api/rest-api/admin/marketing/communications/events/) for what an event does and how its fields behave.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/events/{id}` | DELETE |

## Details

- Requires an admin Bearer token and the `marketing.communications.events.delete`
  permission.
- Returns a success message on completion.
- An unknown id returns a `404`.
