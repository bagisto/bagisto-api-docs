---
outline: false
apiType: graphql
examples:
  - id: basic
    title: Create Section
    query: |
      mutation createSection($input: createAdminAppearanceSectionInput!) {
        createAdminAppearanceSection(input: $input) {
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
          "code": "default",
          "channel": 1,
          "name": "Summer Banner",
          "type": "image_carousel"
        }
      }
    response: |
      {
        "data": {
          "createAdminAppearanceSection": {
            "adminAppearanceSection": {
              "id": "/api/admin/appearance/sections/12",
              "_id": 12,
              "name": "Summer Banner",
              "type": "image_carousel",
              "themeCode": "default",
              "channelId": 1,
              "sortOrder": 5,
              "status": 0,
              "draftStatus": true,
              "draftSortOrder": null,
              "hasDraft": "1",
              "isPinned": "0",
              "createdAt": "2026-08-26T11:04:02+05:30",
              "updatedAt": "2026-08-26T11:04:02+05:30",
              "message": "Section created successfully."
            }
          }
        }
      }
---

# createAdminAppearanceSection

Adds a section to a theme and channel. The section is created **switched off with a staged on-state**, so it is drawn in the editor and its preview but not on the storefront until it has been built and published.

Content is not part of creation. Add it with [createAdminAppearanceSectionDraft](/api/graphql-api/admin/appearance/sections/draft) or [updateAdminAppearanceSection](/api/graphql-api/admin/appearance/sections/update) afterwards.

## Input fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | `String` | Yes | Theme the section belongs to. |
| `channel` | `Int` | No | Channel the section is created for. Falls back to the current channel. |
| `name` | `String` | Yes | Name shown in the editor. |
| `type` | `String` | Yes | `image_carousel`, `product_carousel`, `category_carousel`, `footer_links`, `static_content` or `services_content`. |

## Payload fields

The created section, same fields as [adminAppearanceSection](/api/graphql-api/admin/appearance/sections/detail), with `message` set.

## Use cases

- **Add a promo banner to one channel** — create with `type: "image_carousel"`, upload the slide through the REST [media endpoint](/api/rest-api/admin/appearance/sections/media), stage the returned path, then publish.

## Best practices

- **Do not select `translations` on the payload.** A create mutation returns the section's own fields; its connections resolve empty. Re-query [adminAppearanceSection](/api/graphql-api/admin/appearance/sections/detail) for content.
- **`status` comes back `0` on purpose** — a new section is off until published.
- **`sortOrder` is assigned, not chosen.** The section is appended and the set renumbered, with `footer_links` kept last.
- **A channel gets one footer.** A second `footer_links` section is rejected.

## Permissions

Requires `appearance.sections.create`.
