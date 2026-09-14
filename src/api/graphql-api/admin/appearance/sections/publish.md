---
outline: false
apiType: graphql
examples:
  - id: basic
    title: Publish
    query: |
      mutation publish($input: createAdminAppearanceSectionPublishInput!) {
        createAdminAppearanceSectionPublish(input: $input) {
          adminAppearanceSectionPublish {
            themeCode
            channelId
            sectionIds
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "code": "default",
          "channel": 1
        }
      }
    response: |
      {
        "data": {
          "createAdminAppearanceSectionPublish": {
            "adminAppearanceSectionPublish": {
              "themeCode": "default",
              "channelId": 1,
              "sectionIds": [3, 15],
              "message": "Section changes published successfully."
            }
          }
        }
      }
---

# createAdminAppearanceSectionPublish

Promotes every staged edit of a theme and channel — content in all locales, on/off states and order — to what the storefront draws. Sections holding nothing staged are untouched.

## Input fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | `String` | Yes | Theme whose staged edits are published. |
| `channel` | `Int` | No | Channel being published. Falls back to the current channel. |

## Payload fields

| Field | Type | Description |
|-------|------|-------------|
| `themeCode` | `String` | Theme that was published. |
| `channelId` | `Int` | Channel that was published. |
| `sectionIds` | `Iterable` | Sections that had staged edits promoted. Empty when nothing was staged. |
| `message` | `String` | Confirmation text. |

## Use cases

- **Ship a redesign at once** — stage new content, statuses and order across several sections, preview, then publish so shoppers never see a half-finished page.

## Best practices

- **Publishing is per theme and channel, not per section.** A half-finished section staged in the same channel goes live too — stage it off first.
- **An empty `sectionIds` is a success**, meaning nothing was staged.
- **Publishing clears the drafts** — `hasDraft` returns to `"0"` and the staged columns are emptied.

## Permissions

Requires `appearance.sections.edit`.
