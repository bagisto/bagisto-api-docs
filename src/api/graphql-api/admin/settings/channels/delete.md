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
