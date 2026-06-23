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
            id
            _id
            code
            name
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
              "id": "/api/admin/settings/channels/29",
              "_id": 29,
              "code": "thrawaychan29391",
              "name": "Throwaway 29391"
            }
          }
        }
      }
---

# Delete Channel

Deletes a channel by id. On success the deleted record is returned as a snapshot — `id`, `_id`, `code`, and `name` reflect the channel that was removed.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminSettingsChannel(input:)` | Mutation | Delete a channel |

## Delete guards

The store refuses the delete (returns an `errors[]` entry) when:

- it is the **last remaining channel**, or
- it is the **default app channel** (the channel whose code matches the store's configured default).

::: tip Prerequisites
The example uses an illustrative `id`. Replace it with a channel id that exists in your store — use the [`adminSettingsChannels`](./list) query to discover valid ids.
:::
