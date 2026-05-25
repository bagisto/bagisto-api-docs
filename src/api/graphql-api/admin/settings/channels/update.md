---
outline: false
examples:
  - id: gql
    title: Update Channel
    query: |
      mutation Update($input: updateAdminSettingsChannelInput!) {
        updateAdminSettingsChannel(input: $input) { adminSettingsChannel { id _id name } }
      }
    variables: |
      { "input": { "id": "/api/admin/settings/channels/2", "name": "United States Store" } }
    response: |
      { "data": { "updateAdminSettingsChannel": { "adminSettingsChannel": { "id": "/api/admin/settings/channels/2", "_id": 2, "name": "United States Store" } } } }
---

# Update Channel (GraphQL)

Use the `translations` map for locale-nested attributes. Top-level scalars broadcast to every locale.
