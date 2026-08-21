---
outline: false
examples:
  - id: update
    title: Update Event
    description: Update an event's date. Update is a partial merge — send only the fields you change.
    query: |
      mutation UpdateAdminMarketingEvent(
        $input: updateAdminMarketingEventInput!
      ) {
        updateAdminMarketingEvent(input: $input) {
          adminMarketingEvent {
            id
            _id
            name
            description
            date
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/marketing/events/14",
          "date": "2026-12-22"
        }
      }
    response: |
      {
        "data": {
          "updateAdminMarketingEvent": {
            "adminMarketingEvent": {
              "id": "/api/admin/marketing/events/14",
              "_id": 14,
              "name": "Holiday Sale Kickoff",
              "description": "Email blast to all subscribers.",
              "date": "2026-12-22",
              "createdAt": "2026-05-28T10:57:24+05:30",
              "updatedAt": "2026-05-28T11:04:18+05:30"
            }
          }
        }
      }
---

# Update Event

Updates an existing marketing event — the **Edit Event** action on the admin
**Marketing → Communications → Events** screen.

New here? Read the [Events overview](/api/graphql-api/admin/marketing/communications/events/) for what an event does and how its fields behave.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `updateAdminMarketingEvent` | Mutation | Update a marketing event |

## Details

- Requires an admin Bearer token and the `marketing.communications.events.edit`
  permission.
- Pass the event's IRI as `id`. The update is a **partial merge** — send only the
  fields you want to change; omitted fields keep their existing values.
- The mutation returns the full updated event payload.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | The event's IRI |
| `name` | String | No | Event name |
| `description` | String | No | Free-text description |
| `date` | String | No | Event date (`YYYY-MM-DD`) |
