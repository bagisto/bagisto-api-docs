---
outline: false
apiType: rest
examples:
  - id: rest
    title: Discard
    query: |
      curl -X POST "https://your-domain.com/api/admin/appearance/themes/default/sections/discard?channel=1" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{}'
    response: |
      {
        "themeCode": "default",
        "channelId": 1,
        "sectionIds": [3, 15],
        "message": "Section changes discarded successfully."
      }
---

# Discard

Throws away every staged edit of a theme and channel. The published content, statuses and order are left exactly as they are, so the storefront does not change.

## Endpoint

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/admin/appearance/themes/{code}/sections/discard` | Discard staged section edits |

## Path parameters

| Parameter | Description |
|-----------|-------------|
| `code` | Theme whose staged edits are discarded. |

## Query parameters

| Parameter | Description |
|-----------|-------------|
| `channel` | Channel being discarded. Falls back to the current channel. |

## Response fields

| Field | Type | Description |
|-------|------|-------------|
| `themeCode` | string | Theme that was discarded. |
| `channelId` | integer | Channel that was discarded. |
| `sectionIds` | array | Sections whose staged edits were thrown away. Empty when nothing was staged. |
| `message` | string | Confirmation text. |

## Use cases

- **Abandon an edit session** — one call resets every section a merchant touched back to what shoppers already see.

## Best practices

- **Discarding cannot be undone**, because a staged edit is the only copy of the unpublished work. There is no history to restore it from.
- **It does not restore deleted sections.** [Delete section](/api/rest-api/admin/appearance/sections/delete) is immediate and outside the staging cycle.
- **Like publishing, it works per theme and channel** — every section in that pair is reset, not just the one being edited.

## Errors

| Status | When |
|--------|------|
| `404` | Unknown theme code. |

## Permissions

Requires `appearance.sections.edit`.
