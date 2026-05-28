---
outline: false
examples:
  - id: gql
    title: Delete Channel
    query: |
      mutation Delete($input: deleteAdminSettingsChannelInput!) {
        deleteAdminSettingsChannel(input: $input) { adminSettingsChannel { id } }
      }
    variables: |
      { "input": { "id": "/api/admin/settings/channels/2" } }
    response: |
      { "data": { "deleteAdminSettingsChannel": { "adminSettingsChannel": null } } }
---

# Delete Channel (GraphQL)

::: warning Guards
Refuses if last channel or `app.channel` default.
:::

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a channel that exists in your store — use the [`adminSettingsChannels`](./list.md) query to discover valid ids.
:::
