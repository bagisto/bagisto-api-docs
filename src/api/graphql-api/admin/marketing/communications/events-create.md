---
outline: false
examples:
  - id: create
    title: Create Event
    description: Create a dated marketing event.
    query: |
      mutation CreateAdminMarketingEvent(
        $input: createAdminMarketingEventInput!
      ) {
        createAdminMarketingEvent(input: $input) {
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
          "name": "Holiday Sale Kickoff",
          "description": "Email blast to all subscribers.",
          "date": "2026-12-20"
        }
      }
    response: |
      {
        "data": {
          "createAdminMarketingEvent": {
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
      }
---

# Create Event

Creates a marketing event — the **Create Event** action on the admin
**Marketing → Communications → Events** screen.

::: tip
New here? Read the [Events overview](/api/graphql-api/admin/marketing/communications/events/) for what an event does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminMarketingEvent` | Mutation | Create a marketing event |

## Details

- Requires an admin Bearer token and the `marketing.communications.events.create`
  permission.
- The mutation returns the full event payload.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | String | Yes | Event name |
| `description` | String | Yes | Free-text description |
| `date` | String | Yes | Event date (`YYYY-MM-DD`) |
