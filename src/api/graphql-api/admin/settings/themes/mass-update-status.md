---
outline: false
examples:
  - id: gql
    title: Mass Update Theme Status
    description: Bulk-set the active/inactive status on several theme customization blocks at once.
    query: |
      mutation MassUpdateStatusAdminSettingsTheme($input: createAdminSettingsThemeMassUpdateStatusInput!) {
        createAdminSettingsThemeMassUpdateStatus(input: $input) {
          adminSettingsThemeMassUpdateStatus {
            updated
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "indices": [27, 28],
          "value": 0
        }
      }
    response: |
      {
        "data": {
          "createAdminSettingsThemeMassUpdateStatus": {
            "adminSettingsThemeMassUpdateStatus": {
              "updated": [27, 28],
              "message": "Theme customizations updated successfully."
            }
          }
        }
      }
---

# Mass Update Theme Status

Bulk-set the `status` flag on several theme customization blocks in one call. Pass the block ids in `indices` and the target status in `value` — `1` for active, `0` for inactive.

The `updated` field returns a plain array of the ids that were updated.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminSettingsThemeMassUpdateStatus` | Mutation | Bulk-set the active/inactive status of several blocks |

## Input

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `indices` | Iterable | yes | Array of numeric block ids to update. An empty array is rejected. |
| `value` | Int | yes | The status to set — `1` (active) or `0` (inactive). |

Permission: `settings.themes.edit`.
