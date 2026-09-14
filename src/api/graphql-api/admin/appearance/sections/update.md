---
outline: false
apiType: graphql
examples:
  - id: basic
    title: Update Section
    query: |
      mutation updateSection($input: updateAdminAppearanceSectionInput!) {
        updateAdminAppearanceSection(input: $input) {
          adminAppearanceSection {
            id
            _id
            name
            type
            themeCode
            channelId
            sortOrder
            status
            draftStatus
            draftSortOrder
            hasDraft
            isPinned
            createdAt
            updatedAt
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/appearance/sections/12",
          "name": "Summer Banner",
          "type": "image_carousel",
          "sortOrder": 2,
          "channelId": 1,
          "themeCode": "default",
          "status": true
        }
      }
    response: |
      {
        "data": {
          "updateAdminAppearanceSection": {
            "adminAppearanceSection": {
              "id": "/api/admin/appearance/sections/12",
              "_id": 12,
              "name": "Summer Banner",
              "type": "image_carousel",
              "themeCode": "default",
              "channelId": 1,
              "sortOrder": 2,
              "status": 1,
              "draftStatus": null,
              "draftSortOrder": null,
              "hasDraft": "0",
              "isPinned": "0",
              "createdAt": "2026-08-26T11:04:02+05:30",
              "updatedAt": "2026-08-26T11:22:41+05:30",
              "message": "Section updated successfully."
            }
          }
        }
      }
  - id: content
    title: Write Published Content
    query: |
      mutation updateSection($input: updateAdminAppearanceSectionInput!) {
        updateAdminAppearanceSection(input: $input) {
          adminAppearanceSection {
            _id
            name
            status
            hasDraft
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/appearance/sections/15",
          "name": "About Us",
          "type": "static_content",
          "sortOrder": 3,
          "channelId": 1,
          "themeCode": "default",
          "status": true,
          "locale": "en",
          "options": { "html": "<h2>About us</h2>", "css": ".about { color: #333; }" }
        }
      }
    response: |
      {
        "data": {
          "updateAdminAppearanceSection": {
            "adminAppearanceSection": {
              "_id": 15,
              "name": "About Us",
              "status": 1,
              "hasDraft": "0",
              "message": "Section updated successfully."
            }
          }
        }
      }
---

# updateAdminAppearanceSection

Writes a section's **published** values — what the storefront draws immediately. To hold a change back until publishing, use [createAdminAppearanceSectionDraft](/api/graphql-api/admin/appearance/sections/draft) instead.

## Input fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `ID` | Yes | Section IRI. |
| `name` | `String` | Yes | Section name. |
| `type` | `String` | Yes | One of the six section types. |
| `sortOrder` | `Int` | Yes | Published position. |
| `channelId` | `Int` | Yes | Channel the section belongs to. |
| `themeCode` | `String` | Yes | Theme the section belongs to. |
| `status` | `Boolean` | No | Published on/off. Keeps the current value when omitted. |
| `locale` | `String` | No | Locale the `options` belong to. Falls back to the channel locale. |
| `options` | `Iterable` | No | Published content for the locale. Keeps the current content when omitted. |

## Payload fields

The updated section, same fields as [adminAppearanceSection](/api/graphql-api/admin/appearance/sections/detail), with `message` set.

## Use cases

- **Rename or reposition without touching content** — send the required fields and leave `options` out.
- **Publish content straight away** — send `options` for copy that is already final, skipping the draft cycle.

## Best practices

- **Send every required field, including the ones you are not changing.** The input is a full form; a missing one is a validation error rather than a no-op.
- **`options` writes one locale.** Repeat the mutation per locale with a different `locale`.
- **Switching a section to `footer_links` follows the one-per-channel rule** and is rejected when the channel already has a footer.

## Permissions

Requires `appearance.sections.edit`.
