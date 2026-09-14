---
outline: false
apiType: rest
examples:
  - id: rest
    title: Stage Edits
    query: |
      curl -X POST "https://your-domain.com/api/admin/appearance/sections/15/draft?locale=en" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "options": { "html": "<h2>Summer sale</h2>", "css": ".sale { color: #c00; }" } }'
    response: |
      {
        "sectionId": 15,
        "locale": "en",
        "hasDraft": true,
        "message": "Section changes staged successfully."
      }
---

# Stage Edits

Holds a section's content as an unpublished draft for one locale. The storefront keeps drawing the published content until [Publish](/api/rest-api/admin/appearance/sections/publish) promotes it, and [Preview](/api/rest-api/admin/appearance/sections/preview) shows what it would look like meanwhile.

## Endpoint

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/admin/appearance/sections/{id}/draft` | Stage content for a section |

## Path parameters

| Parameter | Description |
|-----------|-------------|
| `id` | Section ID. |

## Query parameters

| Parameter | Description |
|-----------|-------------|
| `locale` | Locale the options belong to. Must be one the channel runs; otherwise the app locale, then the channel's first locale. |

## Request body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `options` | object | Yes | The full option set for the locale, shaped by the section's type. |

## Response fields

| Field | Type | Description |
|-------|------|-------------|
| `sectionId` | integer | Section the draft belongs to. |
| `locale` | string | Locale the draft was written for. |
| `hasDraft` | boolean | Whether the section now holds any staged edit. |
| `message` | string | Confirmation text. |

## Use cases

- **Autosave an editor** — post the whole option set on each change; the draft is replaced, never merged, so the last call wins.
- **Translate before going live** — stage each locale separately, then publish once and every locale goes live together.

## Best practices

- **Send the complete option set.** The draft replaces the previous one for that locale rather than merging into it, so a partial body drops the fields it omits. Read the current values from [Section fields](/api/rest-api/admin/appearance/sections/fields) first.
- **Upload media before staging.** [Upload media](/api/rest-api/admin/appearance/sections/media) returns a stored path; the path only becomes part of the section when it appears in the options you stage here.
- **Staging content does not switch a section on.** A section created off stays off until [Stage status](/api/rest-api/admin/appearance/sections/status) and a publish.

## Errors

| Status | When |
|--------|------|
| `404` | No section with this ID. |
| `422` | `options` missing or not an object. |

## Permissions

Requires `appearance.sections.edit`.
