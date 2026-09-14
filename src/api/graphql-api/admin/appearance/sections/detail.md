---
outline: false
apiType: graphql
examples:
  - id: basic
    title: Get Section
    query: |
      query getSection($id: ID!) {
        adminAppearanceSection(id: $id) {
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
          translations {
            edges {
              node {
                locale
                options
                draftOptions
              }
            }
          }
        }
      }
    variables: |
      {
        "id": "/api/admin/appearance/sections/3"
      }
    response: |
      {
        "data": {
          "adminAppearanceSection": {
            "id": "/api/admin/appearance/sections/3",
            "_id": 3,
            "name": "Categories Collections",
            "type": "category_carousel",
            "themeCode": "default",
            "channelId": 1,
            "sortOrder": 1,
            "status": 1,
            "draftStatus": null,
            "draftSortOrder": null,
            "hasDraft": "0",
            "isPinned": "0",
            "createdAt": "2024-04-16T21:44:15+05:30",
            "updatedAt": "2026-08-21T18:05:39+05:30",
            "message": null,
            "translations": {
              "edges": [
                {
                  "node": {
                    "locale": "en",
                    "options": { "filters": { "sort": "asc", "limit": "10" } },
                    "draftOptions": null
                  }
                },
                {
                  "node": {
                    "locale": "ar",
                    "options": { "filters": { "sort": "asc", "limit": "10" } },
                    "draftOptions": null
                  }
                }
              ]
            }
          }
        }
      }
---

# adminAppearanceSection

One section with every locale's content.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `id` | `ID!` | Section IRI, e.g. `/api/admin/appearance/sections/3`. |

## Fields

Identical to [adminAppearanceSections](/api/graphql-api/admin/appearance/sections/list).

## Use cases

- **Read back a copy** — [createAdminAppearanceSectionDuplicate](/api/graphql-api/admin/appearance/sections/duplicate) returns only the new section's identity; this query returns its content.

## Best practices

- **Pass the IRI, not the bare number.**
- **Use [adminAppearanceSectionFields](/api/graphql-api/admin/appearance/sections/fields) to build an editing form** — it returns the type's field schema and resolves staged content over published, which this query deliberately keeps separate.

## Permissions

Requires `appearance.sections`.
