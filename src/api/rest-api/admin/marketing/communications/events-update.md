---
outline: false
apiType: rest
examples:
  - id: update
    title: Update Event
    description: Update an event's date. Update is a partial merge — send only the fields you change.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/marketing/events/14" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "date": "2026-12-22"
        }'
    variables: |
      {}
    response: |
      {
        "id": 14,
        "name": "Holiday Sale Kickoff",
        "description": "Email blast to all subscribers.",
        "date": "2026-12-22",
        "createdAt": "2026-05-28T10:57:24+05:30",
        "updatedAt": "2026-06-23T12:32:58+05:30"
      }
---

# Update Event

Updates an existing marketing event — the **Edit Event** action on the admin
**Marketing → Communications → Events** screen.

New here? Read the [Events overview](/api/rest-api/admin/marketing/communications/events/) for what an event does and how its fields behave.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/events/{id}` | PUT |

## Details

- Requires an admin Bearer token and the `marketing.communications.events.edit`
  permission.
- The update is a **partial merge** — send only the fields you want to change;
  omitted fields keep their existing values.
- Returns the full updated event payload.

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | no | Event name |
| `description` | string | no | Free-text description |
| `date` | string | no | Event date (`YYYY-MM-DD`) |
