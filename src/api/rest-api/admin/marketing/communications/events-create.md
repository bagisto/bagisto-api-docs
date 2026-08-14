---
outline: false
apiType: rest
examples:
  - id: create
    title: Create Event
    description: Create a dated marketing event.
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/events" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "name": "Holiday Sale Kickoff",
          "description": "Email blast to all subscribers.",
          "date": "2026-12-20"
        }'
    variables: |
      {}
    response: |
      {
        "id": 14,
        "name": "Holiday Sale Kickoff",
        "description": "Email blast to all subscribers.",
        "date": "2026-12-20",
        "createdAt": "2026-05-28T10:57:24+05:30",
        "updatedAt": "2026-05-28T10:57:24+05:30"
      }
---

# Create Event

Creates a marketing event — the **Create Event** action on the admin **Marketing →
Communications → Events** screen.

New here? Read the [Events overview](/api/rest-api/admin/marketing/communications/events/) for what an event does and how its fields behave.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/events` | POST |

## Details

- Requires an admin Bearer token and the `marketing.communications.events.create`
  permission.
- Returns the full event payload.

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | yes | Event name |
| `description` | string | yes | Free-text description |
| `date` | string | yes | Event date (`YYYY-MM-DD`) |
