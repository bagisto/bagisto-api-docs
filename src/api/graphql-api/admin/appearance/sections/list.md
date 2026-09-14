---
outline: false
apiType: graphql
examples:
  - id: basic
    title: List Sections
    query: |
      query sections($code: String!, $channel: Int, $locale: String) {
        adminAppearanceSections(code: $code, channel: $channel, locale: $locale) {
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
        "code": "default",
        "channel": 1,
        "locale": "en"
      }
    response: |
      {
        "data": {
          "adminAppearanceSections": [
            {
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
                  }
                ]
              }
            },
            {
              "id": "/api/admin/appearance/sections/8",
              "_id": 8,
              "name": "Footer",
              "type": "footer_links",
              "themeCode": "default",
              "channelId": 1,
              "sortOrder": 4,
              "status": 1,
              "draftStatus": null,
              "draftSortOrder": null,
              "hasDraft": "0",
              "isPinned": "1",
              "createdAt": "2024-04-16T21:44:15+05:30",
              "updatedAt": "2026-08-21T18:05:39+05:30",
              "message": null,
              "translations": {
                "edges": [
                  {
                    "node": {
                      "locale": "en",
                      "options": { "column_1": [] },
                      "draftOptions": null
                    }
                  }
                ]
              }
            }
          ]
        }
      }
---

# adminAppearanceSections

The sections a channel holds for a theme, in the order they are drawn, with `footer_links` last. Returns a plain list — one channel's page layout is not paginated.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `code` | `String!` | Theme code. |
| `channel` | `Int` | Channel ID. Falls back to the current channel. |
| `locale` | `String` | Locale the options are read in. Must be one the channel runs; otherwise the app locale, then the channel's first locale. |

## Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Resource IRI. |
| `_id` | `Int!` | Section ID. |
| `name` | `String` | Name shown in the editor. |
| `type` | `String` | One of the six section types. |
| `themeCode` | `String` | Theme the section belongs to. |
| `channelId` | `Int` | Channel the section belongs to. |
| `sortOrder` | `Int` | Published position. |
| `status` | `Int` | Published on/off — `1` or `0`. |
| `draftStatus` | `Boolean` | Staged on/off, `null` when nothing is staged. |
| `draftSortOrder` | `Int` | Staged position, `null` when nothing is staged. |
| `hasDraft` | `String` | `"1"` when the section holds any staged edit, else `"0"`. |
| `isPinned` | `String` | `"1"` for `footer_links`, which is always drawn last. |
| `createdAt` | `String` | ISO 8601. |
| `updatedAt` | `String` | ISO 8601. |
| `message` | `String` | Action confirmation; `null` on reads. |
| `translations` | connection | One node per locale that has content, each with `locale`, `options` and `draftOptions`. |

## Use cases

- **Draw the editor list** — the list is already in render order, so render it as returned rather than sorting by `sortOrder`, which would misplace a staged reorder and lift the footer.
- **Show an unpublished-changes banner** — true when any node's `hasDraft` is `"1"`.

## Best practices

- **`hasDraft` and `isPinned` resolve as the strings `"1"` and `"0"`.** Compare against those, not against `true`.
- **`options` and `draftOptions` are JSON values** and take no sub-selection — their shape changes per section type.
- **Ask for a channel explicitly.** Without `channel` the current channel answers, which is rarely what a multi-channel editor wants.

## Permissions

Requires `appearance.sections`.
