---
outline: false
examples:
  - id: gql
    title: Delete Channel
    description: Delete a channel by id. The deleted record is returned as a snapshot so you can confirm what was removed.
    query: |
      mutation DeleteAdminSettingsChannel($input: deleteAdminSettingsChannelInput!) {
        deleteAdminSettingsChannel(input: $input) {
          adminSettingsChannel {
            _id
            code
            name
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/settings/channels/29"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminSettingsChannel": {
            "adminSettingsChannel": {
              "_id": 29,
              "code": "thrawaychan29391",
              "name": "Throwaway 29391",
              "message": "Channel deleted successfully."
            }
          }
        }
      }
---

# Delete Channel

Deletes a channel by id. On success the deleted record is returned as a snapshot — `_id`, `code`, and `name` reflect the channel that was removed.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminSettingsChannel(input:)` | Mutation | Delete a channel |

## Delete guards

The store refuses the delete (returns an `errors[]` entry, no record removed) when:

- it is the **last remaining channel**, or
- it is the **default app channel** (the channel whose code matches the store's configured default).

## Notes

- The returned node is an in-memory snapshot of the just-deleted record — its scalar fields (`_id`, `code`, `name`) still resolve so you can confirm what was removed. The detail-only connections (`locales`, `currencies`, `inventorySources`, `translations`) come back empty on a delete result.
- Select **`message`** for the success confirmation — it resolves to `"Channel deleted successfully."` on a successful delete. `message` is `null` on read / list / create / update; a failed delete returns a top-level `errors[]` entry instead.

The example uses an illustrative `id`. Replace it with a channel id that exists in your store — use the [`adminSettingsChannels`](./list) query to discover valid ids.
