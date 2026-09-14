---
outline: false
apiType: rest
examples:
  - id: rest
    title: List Sections
    query: |
      curl -X GET "https://your-domain.com/api/admin/appearance/themes/default/sections?channel=1&locale=en" \
        -H "Authorization: Bearer <token>"
    response: |
      [
        {
          "id": 3,
          "name": "Categories Collections",
          "type": "category_carousel",
          "themeCode": "default",
          "channelId": 1,
          "sortOrder": 1,
          "status": 1,
          "draftStatus": null,
          "draftSortOrder": null,
          "hasDraft": false,
          "isPinned": false,
          "createdAt": "2024-04-16T21:44:15+05:30",
          "updatedAt": "2026-08-21T18:05:39+05:30",
          "translations": [
            { "locale": "en", "options": { "filters": { "sort": "asc", "limit": "10" } }, "draftOptions": null }
          ],
          "message": null
        },
        {
          "id": 8,
          "name": "Footer",
          "type": "footer_links",
          "themeCode": "default",
          "channelId": 1,
          "sortOrder": 4,
          "status": 1,
          "draftStatus": null,
          "draftSortOrder": null,
          "hasDraft": false,
          "isPinned": true,
          "createdAt": "2024-04-16T21:44:15+05:30",
          "updatedAt": "2026-08-21T18:05:39+05:30",
          "translations": [
            { "locale": "en", "options": { "column_1": [] }, "draftOptions": null }
          ],
          "message": null
        }
      ]
---

# List Sections

The sections a channel holds for a theme, in the order they are drawn, with `footer_links` last. Returns a plain array — the set is one channel's page layout, so it is not paginated.

## Endpoint

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/admin/appearance/themes/{code}/sections` | List the sections of a theme |

## Path parameters

| Parameter | Description |
|-----------|-------------|
| `code` | Theme code, e.g. `default`. |

## Query parameters

| Parameter | Description |
|-----------|-------------|
| `channel` | Channel ID. Falls back to the current channel. |
| `locale` | Locale the options are read in. Must be one the channel runs; otherwise the app locale, then the channel's first locale. |

## Response fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Section ID. |
| `name` | string | Name shown in the editor. |
| `type` | string | One of the six section types. |
| `themeCode` | string | Theme the section belongs to. |
| `channelId` | integer | Channel the section belongs to. |
| `sortOrder` | integer | Published position. |
| `status` | integer | Published on/off — `1` or `0`. |
| `draftStatus` | boolean \| null | Staged on/off, `null` when nothing is staged. |
| `draftSortOrder` | integer \| null | Staged position, `null` when nothing is staged. |
| `hasDraft` | boolean | Whether the section holds any staged edit. |
| `isPinned` | boolean | `true` for `footer_links`, which is always drawn last. |
| `createdAt` | string | ISO 8601. |
| `updatedAt` | string | ISO 8601. |
| `translations` | array | One entry per locale that has content. |
| `translations[].locale` | string | Locale code. |
| `translations[].options` | object \| null | Published content. |
| `translations[].draftOptions` | object \| null | Staged content, `null` when nothing is staged. |
| `message` | string \| null | Action confirmation; `null` on reads. |

## Use cases

- **Draw the editor list** — the array is already in render order, so a client renders it as returned rather than sorting by `sortOrder` (which would put a staged reorder in the wrong place and lift the footer).
- **Show a "you have unpublished changes" banner** — true when any row has `hasDraft`.

## Best practices

- **A section belongs to a theme and a channel together.** Listing without `channel` returns the current channel's sections, which is rarely what a multi-channel editor wants — send the channel explicitly.
- **`translations` carries every locale the section has content for**, not just the requested one. `locale` decides which locale the fields endpoint reads, not what this listing returns.

## Errors

| Status | When |
|--------|------|
| `404` | The installation has no theme with this code. |

## Permissions

Requires `appearance.sections`.
