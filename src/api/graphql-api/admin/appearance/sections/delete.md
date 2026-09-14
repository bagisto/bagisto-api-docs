---
outline: false
apiType: graphql
examples:
  - id: basic
    title: Delete Section
    query: |
      mutation deleteSection($input: deleteAdminAppearanceSectionInput!) {
        deleteAdminAppearanceSection(input: $input) {
          adminAppearanceSection {
            id
            _id
            name
            type
            themeCode
            channelId
            sortOrder
            status
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/appearance/sections/12"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminAppearanceSection": {
            "adminAppearanceSection": {
              "id": "/api/admin/appearance/sections/12",
              "_id": 12,
              "name": "Summer Banner",
              "type": "image_carousel",
              "themeCode": "default",
              "channelId": 1,
              "sortOrder": 2,
              "status": 1,
              "message": "Section deleted successfully."
            }
          }
        }
      }
---

# deleteAdminAppearanceSection

Removes a section and its content for every locale. Media the section uploaded is cleaned up with it.

The payload is a snapshot of the section as it was, so a client can confirm exactly what was removed.

## Input fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `ID` | Yes | Section IRI. |

## Payload fields

The deleted section's own fields, with `message` set.

## Best practices

- **Do not select `translations` on the payload.** The row is gone, so its connections come back empty; the scalars are the in-memory snapshot.
- **Deleting is immediate and is not a staged edit.** [createAdminAppearanceSectionDiscard](/api/graphql-api/admin/appearance/sections/discard) does not bring it back — to take a section down reversibly, stage it off instead.

## Permissions

Requires `appearance.sections.delete`.
