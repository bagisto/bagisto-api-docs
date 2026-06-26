---
outline: false
examples:
  - id: gql
    title: Mass Delete Theme Customizations
    description: Delete several theme customization blocks at once by their ids. Non-existent ids are skipped.
    query: |
      mutation MassDeleteAdminSettingsTheme($input: createAdminSettingsThemeMassDeleteInput!) {
        createAdminSettingsThemeMassDelete(input: $input) {
          adminSettingsThemeMassDelete {
            deleted
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "indices": [27, 28]
        }
      }
    response: |
      {
        "data": {
          "createAdminSettingsThemeMassDelete": {
            "adminSettingsThemeMassDelete": {
              "deleted": [27, 28],
              "message": "Theme customizations deleted successfully."
            }
          }
        }
      }
---

# Mass Delete Theme Customizations

Delete several theme customization blocks in one call by passing their numeric ids in `indices`. Non-existent ids are silently skipped.

The `deleted` field returns a plain array of the ids that were removed.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminSettingsThemeMassDelete` | Mutation | Delete several theme customization blocks |

## Input

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `indices` | Iterable | yes | Array of numeric block ids to delete. An empty array is rejected. |

Permission: `settings.themes.delete`. All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
