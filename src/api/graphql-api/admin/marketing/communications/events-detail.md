---
outline: false
examples:
  - id: detail
    title: Event Detail
    description: Full payload for a single marketing event.
    query: |
      query AdminMarketingEvent($id: ID!) {
        adminMarketingEvent(id: $id) {
          id
          _id
          name
          description
          date
          createdAt
          updatedAt
        }
      }
    variables: |
      {
        "id": "/api/admin/marketing/events/14"
      }
    response: |
      {
        "data": {
          "adminMarketingEvent": {
            "id": "/api/admin/marketing/events/14",
            "_id": 14,
            "name": "Holiday Sale Kickoff",
            "description": "Email blast to all subscribers.",
            "date": "2026-12-20",
            "createdAt": "2026-05-28T10:57:24+05:30",
            "updatedAt": "2026-05-28T10:57:24+05:30"
          }
        }
      }
---

# Event Detail

Returns a single marketing event with its full field set — the data behind the
admin **Marketing → Communications → Events** view screen.

::: tip
New here? Read the [Events overview](/api/graphql-api/admin/marketing/communications/events/) for what an event does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminMarketingEvent` | Query | Fetch one marketing event by id |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- Pass the event's IRI (e.g. `/api/admin/marketing/events/14`) as the `id`
  argument; `_id` in the response is the numeric id.

## Fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | ID | The event's IRI |
| `_id` | Int | Numeric id |
| `name` | String | Event name |
| `description` | String | Free-text description |
| `date` | String | Event date (`YYYY-MM-DD`) |
| `createdAt` | String | Creation timestamp |
| `updatedAt` | String | Last-update timestamp |
