---
outline: false
apiType: graphql
examples:
  - id: basic
    title: Stage Status
    query: |
      mutation stageStatus($input: createAdminAppearanceSectionStatusInput!) {
        createAdminAppearanceSectionStatus(input: $input) {
          adminAppearanceSectionStatus {
            sectionId
            draftStatus
            hasDraft
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "sectionId": 15,
          "status": false
        }
      }
    response: |
      {
        "data": {
          "createAdminAppearanceSectionStatus": {
            "adminAppearanceSectionStatus": {
              "sectionId": 15,
              "draftStatus": false,
              "hasDraft": true,
              "message": "Section status staged successfully."
            }
          }
        }
      }
---

# createAdminAppearanceSectionStatus

Stages a section on or off. Like every other edit, it reaches the storefront only when the theme is published.

## Input fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `sectionId` | `Int` | Yes | Section whose state is being staged. |
| `status` | `Boolean` | Yes | `true` to show the section once published, `false` to hide it. |

## Payload fields

| Field | Type | Description |
|-------|------|-------------|
| `sectionId` | `Int` | Section the status belongs to. |
| `draftStatus` | `Boolean` | The staged state. |
| `hasDraft` | `Boolean` | Whether the section now holds any staged edit. |
| `message` | `String` | Confirmation text. |

## Use cases

- **Take a section down at the next publish** — stage `false`, keep the content, publish when ready. Staging `true` later brings it back exactly as it was.

## Best practices

- **The published `status` does not move here.** Re-querying the section still shows the old value; the new one sits in `draftStatus` until publish.
- **To switch a section on or off immediately**, send `status` on [updateAdminAppearanceSection](/api/graphql-api/admin/appearance/sections/update) instead.

## Permissions

Requires `appearance.sections.edit`.
