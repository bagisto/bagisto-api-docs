---
outline: false
apiType: graphql
examples:
  - id: basic
    title: Discard
    query: |
      mutation discard($input: createAdminAppearanceSectionDiscardInput!) {
        createAdminAppearanceSectionDiscard(input: $input) {
          adminAppearanceSectionDiscard {
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
          "createAdminAppearanceSectionDiscard": {
            "adminAppearanceSectionDiscard": {
              "themeCode": "default",
              "channelId": 1,
              "sectionIds": [3, 15],
              "message": "Section changes discarded successfully."
            }
          }
        }
      }
---

# createAdminAppearanceSectionDiscard

Throws away every staged edit of a theme and channel. The published content, statuses and order are left exactly as they are, so the storefront does not change.

## Input fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | `String` | Yes | Theme whose staged edits are discarded. |
| `channel` | `Int` | No | Channel being discarded. Falls back to the current channel. |

## Payload fields

| Field | Type | Description |
|-------|------|-------------|
| `themeCode` | `String` | Theme that was discarded. |
| `channelId` | `Int` | Channel that was discarded. |
| `sectionIds` | `Iterable` | Sections whose staged edits were thrown away. Empty when nothing was staged. |
| `message` | `String` | Confirmation text. |

## Use cases

- **Abandon an edit session** — one call resets every section a merchant touched back to what shoppers already see.

## Best practices

- **Discarding cannot be undone** — a staged edit is the only copy of the unpublished work.
- **It does not restore deleted sections.**
- **Like publishing, it works per theme and channel**, not per section.

## Permissions

Requires `appearance.sections.edit`.
