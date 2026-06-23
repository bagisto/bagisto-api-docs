---
outline: false
examples:
  - id: gql
    title: Delete Theme Customization
    description: Delete a theme customization block. Its associated storage directory is wiped along with the row. The mutation returns a snapshot of the deleted block.
    query: |
      mutation DeleteAdminSettingsTheme($input: deleteAdminSettingsThemeInput!) {
        deleteAdminSettingsTheme(input: $input) {
          adminSettingsTheme {
            id
            _id
            name
            type
            status
            channelId
            themeCode
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/settings/themes/25"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminSettingsTheme": {
            "adminSettingsTheme": {
              "id": "/api/admin/settings/themes/25",
              "_id": 25,
              "name": "throwaway-del-test",
              "type": "static_content",
              "status": true,
              "channelId": 17,
              "themeCode": "default"
            }
          }
        }
      }
---

# Delete Theme Customization

Delete a theme customization block by id. The block's associated storage directory (any uploaded slide images / service icons) is wiped along with the row.

The mutation returns a snapshot of the deleted block, so you can read back its `id`, `_id`, and scalar fields. The per-locale `translations` are no longer available after deletion.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminSettingsTheme` | Mutation | Delete one theme customization block |

## Input

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `id` | ID | yes | The resource IRI of the block to delete. |

Permission: `settings.themes.delete`. All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
