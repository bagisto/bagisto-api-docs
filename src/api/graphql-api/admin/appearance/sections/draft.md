---
outline: false
apiType: graphql
examples:
  - id: basic
    title: Stage Edits
    query: |
      mutation saveDraft($input: createAdminAppearanceSectionDraftInput!) {
        createAdminAppearanceSectionDraft(input: $input) {
          adminAppearanceSectionDraft {
            sectionId
            locale
            hasDraft
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "sectionId": 15,
          "locale": "en",
          "options": { "html": "<h2>Summer sale</h2>", "css": ".sale { color: #c00; }" }
        }
      }
    response: |
      {
        "data": {
          "createAdminAppearanceSectionDraft": {
            "adminAppearanceSectionDraft": {
              "sectionId": 15,
              "locale": "en",
              "hasDraft": true,
              "message": "Section changes staged successfully."
            }
          }
        }
      }
---

# createAdminAppearanceSectionDraft

Holds a section's content as an unpublished draft for one locale. The storefront keeps drawing the published content until [createAdminAppearanceSectionPublish](/api/graphql-api/admin/appearance/sections/publish) promotes it, and [adminAppearanceSectionPreview](/api/graphql-api/admin/appearance/sections/preview) shows what it would look like meanwhile.

## Input fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `sectionId` | `Int` | Yes | Section the draft belongs to. |
| `locale` | `String` | No | Locale the options belong to. Falls back to the channel locale. |
| `options` | `Iterable` | Yes | The full option set for the locale, shaped by the section's type. |

## Payload fields

| Field | Type | Description |
|-------|------|-------------|
| `sectionId` | `Int` | Section the draft belongs to. |
| `locale` | `String` | Locale the draft was written for. |
| `hasDraft` | `Boolean` | Whether the section now holds any staged edit. |
| `message` | `String` | Confirmation text. |

## Use cases

- **Autosave an editor** — send the whole option set on each change; the draft is replaced, so the last call wins.
- **Translate before going live** — stage each locale separately, then publish once and every locale goes live together.

## Best practices

- **Send the complete option set.** The draft replaces the previous one rather than merging, so a partial input drops the fields it omits — read current values from [adminAppearanceSectionFields](/api/graphql-api/admin/appearance/sections/fields) first.
- **Do not select `id` on the payload.** This result is an action outcome with no resource route; `sectionId` identifies it.
- **Staging content does not switch a section on.**

## Permissions

Requires `appearance.sections.edit`.
