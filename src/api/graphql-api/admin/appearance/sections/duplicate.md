---
outline: false
apiType: graphql
examples:
  - id: basic
    title: Copy Section
    query: |
      mutation duplicateSection($input: createAdminAppearanceSectionDuplicateInput!) {
        createAdminAppearanceSectionDuplicate(input: $input) {
          adminAppearanceSectionDuplicate {
            sectionId
            sourceId
            name
            type
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "sectionId": 3
        }
      }
    response: |
      {
        "data": {
          "createAdminAppearanceSectionDuplicate": {
            "adminAppearanceSectionDuplicate": {
              "sectionId": 12,
              "sourceId": 3,
              "name": "Categories Collections (copy)",
              "type": "category_carousel",
              "message": "Section copied successfully."
            }
          }
        }
      }
---

# createAdminAppearanceSectionDuplicate

Copies a section, including its content in every locale, into the same theme and channel.

## Input fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `sectionId` | `Int` | Yes | Section to copy. |

## Payload fields

| Field | Type | Description |
|-------|------|-------------|
| `sectionId` | `Int` | ID of the new copy. |
| `sourceId` | `Int` | Section that was copied. |
| `name` | `String` | Name given to the copy. |
| `type` | `String` | Section type, same as the source. |
| `message` | `String` | Confirmation text. |

## Use cases

- **Build a variant of a working block** — copy it, then stage different content on the copy while the original keeps running.

## Best practices

- **Read the copy back with [adminAppearanceSection](/api/graphql-api/admin/appearance/sections/detail).** This payload carries identity, not content or position.
- **Copying a `footer_links` section is refused** for a channel that already has one.

## Permissions

Requires `appearance.sections.create`.
