---
outline: false
examples:
  - id: delete
    title: Delete Event
    description: Delete a marketing event by id. A successful delete returns no errors; the event is removed.
    query: |
      mutation DeleteAdminMarketingEvent(
        $input: deleteAdminMarketingEventInput!
      ) {
        deleteAdminMarketingEvent(input: $input) {
          adminMarketingEvent {
            _id
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/marketing/events/14"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminMarketingEvent": {
            "adminMarketingEvent": null
          }
        }
      }
---

# Delete Event

Deletes a marketing event — the **Delete** row action on the admin
**Marketing → Communications → Events** screen.

New here? Read the [Events overview](/api/graphql-api/admin/marketing/communications/events/) for what an event does and how its fields behave.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminMarketingEvent` | Mutation | Delete a marketing event |

## Details

- Requires an admin Bearer token and the `marketing.communications.events.delete`
  permission.
- Pass the event's IRI as `id`. Use the
  [list](/api/graphql-api/admin/marketing/communications/events-list) query to
  discover valid ids.

### Confirm success via the absence of `errors`

The delete mutation returns a success acknowledgement, not the deleted event's
data — `adminMarketingEvent` resolves to `null` on the payload. **Treat a
response with no `errors[]` as a successful delete.** If you need a confirmation
message in the body, use the REST endpoint
(`DELETE /api/admin/marketing/events/{id}`), which returns
`{ "message": "Event deleted." }`.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | The event's IRI |
