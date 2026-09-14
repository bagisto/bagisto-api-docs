---
outline: false
apiType: rest
examples:
  - id: rest
    title: Publish
    query: |
      curl -X POST "https://your-domain.com/api/admin/appearance/themes/default/sections/publish?channel=1" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{}'
    response: |
      {
        "themeCode": "default",
        "channelId": 1,
        "sectionIds": [3, 15],
        "message": "Section changes published successfully."
      }
---

# Publish

Promotes every staged edit of a theme and channel — content in all locales, on/off states and order — to what the storefront draws. Sections holding nothing staged are untouched.

## Endpoint

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/admin/appearance/themes/{code}/sections/publish` | Publish staged section edits |

## Path parameters

| Parameter | Description |
|-----------|-------------|
| `code` | Theme whose staged edits are published. |

## Query parameters

| Parameter | Description |
|-----------|-------------|
| `channel` | Channel being published. Falls back to the current channel. |

## Response fields

| Field | Type | Description |
|-------|------|-------------|
| `themeCode` | string | Theme that was published. |
| `channelId` | integer | Channel that was published. |
| `sectionIds` | array | Sections that had staged edits promoted. Empty when nothing was staged. |
| `message` | string | Confirmation text. |

## Use cases

- **Ship a full redesign at once** — stage new content, statuses and order across several sections, preview them, then publish so shoppers never see a half-finished page.

## Best practices

- **Publishing is per theme and channel, not per section.** Every staged edit for that pair goes live together, so a half-finished section staged in the same channel goes live too — stage it off before publishing.
- **An empty `sectionIds` is a success, not an error.** It means nothing was staged for that theme and channel.
- **Publishing clears the drafts.** `hasDraft` returns to `false` and `draftOptions`, `draftStatus` and `draftSortOrder` are emptied.

## Errors

| Status | When |
|--------|------|
| `404` | Unknown theme code. |

## Permissions

Requires `appearance.sections.edit`.
