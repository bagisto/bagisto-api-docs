---
outline: false
apiType: rest
examples:
  - id: detail
    title: Event Detail
    description: Full payload for a single marketing event.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/events/14" \
        -H "Authorization: Bearer <token>"
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

# Event Detail

Returns a single marketing event with its full field set — the data behind the
admin **Marketing → Communications → Events** view screen.

New here? Read the [Events overview](/api/rest-api/admin/marketing/communications/events/) for what an event does and how its fields behave.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/events/{id}` | GET |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- An unknown id returns a `404`.

## Response fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | int | Numeric id |
| `name` | string | Event name |
| `description` | string | Free-text description |
| `date` | string | Event date (`YYYY-MM-DD`) |
| `createdAt` | string | Creation timestamp |
| `updatedAt` | string | Last-update timestamp |
