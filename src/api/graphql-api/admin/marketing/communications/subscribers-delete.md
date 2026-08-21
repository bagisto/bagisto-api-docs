---
outline: false
examples:
  - id: delete
    title: Delete Subscriber
    description: Delete a newsletter subscriber by id. A successful delete returns no errors; the subscriber is removed.
    query: |
      mutation DeleteAdminMarketingSubscriber(
        $input: deleteAdminMarketingSubscriberInput!
      ) {
        deleteAdminMarketingSubscriber(input: $input) {
          adminMarketingSubscriber {
            _id
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/marketing/subscribers/26"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminMarketingSubscriber": {
            "adminMarketingSubscriber": null
          }
        }
      }
---

# Delete Subscriber

Deletes a newsletter subscriber — the **Delete** row action on the admin
**Marketing → Communications → Newsletter Subscribers** screen. When the
subscriber is linked to a registered customer, that customer is unsubscribed
before the row is removed.

New here? Read the [Newsletter Subscribers overview](/api/graphql-api/admin/marketing/communications/subscribers/) for what a subscriber is and how its fields behave.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminMarketingSubscriber` | Mutation | Delete a newsletter subscriber |

## Details

- Requires an admin Bearer token and the `marketing.communications.subscribers.delete`
  permission.
- Pass the subscriber's IRI as `id`. Use the
  [list](/api/graphql-api/admin/marketing/communications/subscribers-list) query to
  discover valid ids.

### Confirm success via the absence of `errors`

The delete mutation returns a success acknowledgement, not the deleted
subscriber's data — `adminMarketingSubscriber` resolves to `null` on the payload.
**Treat a response with no `errors[]` as a successful delete.** If you need a
confirmation message in the body, use the REST endpoint
(`DELETE /api/admin/marketing/subscribers/{id}`), which returns
`{ "message": "Subscriber deleted." }`.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | The subscriber's IRI |
