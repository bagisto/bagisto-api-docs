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
            _id
            name
            type
            status
            channelId
            themeCode
            message
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
              "_id": 25,
              "name": "throwaway-del-test",
              "type": "static_content",
              "status": true,
              "channelId": 17,
              "themeCode": "default",
              "message": "Theme customization deleted successfully."
            }
          }
        }
      }
---

# Delete Theme Customization

Delete a theme customization block by id. The block's associated storage directory (any uploaded slide images / service icons) is wiped along with the row.

The mutation returns a snapshot of the deleted block, so you can read back its `_id` and scalar fields. The per-locale `translations` are no longer available after deletion.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminSettingsTheme` | Mutation | Delete one theme customization block |

## Input

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `id` | ID | yes | The resource IRI of the block to delete. |

## Notes

- The returned node is an in-memory snapshot of the just-deleted record — its scalar fields (`_id`, `name`, `type`, `status`, `channelId`, `themeCode`) still resolve so you can confirm what was removed. The per-locale `translations` come back empty (the row is gone).
- Select **`message`** for the success confirmation — it resolves to `"Theme customization deleted successfully."` on a successful delete. `message` is `null` on read / list / create / update; a failed delete returns a top-level `errors[]` entry instead.
- Do **not** select the node's IRI `id` field on this mutation — the IRI cannot be generated for a deleted record and the field resolves with an `errors[]` entry. Select `_id` instead, as shown.
- Use the [`adminSettingsThemes`](./list) query to discover valid ids.

Permission: `settings.themes.delete`.
