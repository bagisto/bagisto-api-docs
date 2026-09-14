---
outline: false
apiType: rest
examples:
  - id: rest
    title: Update Section
    query: |
      curl -X PUT "https://your-domain.com/api/admin/appearance/sections/12?locale=en" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
              "name": "Summer Banner",
              "type": "image_carousel",
              "sortOrder": 2,
              "channelId": 1,
              "themeCode": "default",
              "status": true
            }'
    response: |
      {
        "id": 12,
        "name": "Summer Banner",
        "type": "image_carousel",
        "themeCode": "default",
        "channelId": 1,
        "sortOrder": 2,
        "status": 1,
        "draftStatus": null,
        "draftSortOrder": null,
        "hasDraft": false,
        "isPinned": false,
        "createdAt": "2026-08-26T11:04:02+05:30",
        "updatedAt": "2026-08-26T11:22:41+05:30",
        "translations": [
          { "locale": "en", "options": { "images": [] }, "draftOptions": null }
        ],
        "message": "Section updated successfully."
      }
  - id: rest-content
    title: Write Published Content
    query: |
      curl -X PUT "https://your-domain.com/api/admin/appearance/sections/15?locale=en" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
              "name": "About Us",
              "type": "static_content",
              "sortOrder": 3,
              "channelId": 1,
              "themeCode": "default",
              "status": true,
              "options": { "html": "<h2>About us</h2>", "css": ".about { color: #333; }" }
            }'
    response: |
      {
        "id": 15,
        "name": "About Us",
        "type": "static_content",
        "themeCode": "default",
        "channelId": 1,
        "sortOrder": 3,
        "status": 1,
        "draftStatus": null,
        "draftSortOrder": null,
        "hasDraft": false,
        "isPinned": false,
        "createdAt": "2026-08-20T09:00:00+05:30",
        "updatedAt": "2026-08-26T11:30:12+05:30",
        "translations": [
          { "locale": "en", "options": { "html": "<h2>About us</h2>", "css": ".about { color: #333; }" }, "draftOptions": null }
        ],
        "message": "Section updated successfully."
      }
---

# Update Section

Writes a section's **published** values — what the storefront draws immediately. To hold a change back until publishing, use [Stage edits](/api/rest-api/admin/appearance/sections/draft) instead.

## Endpoint

| Method | Path | Purpose |
|--------|------|---------|
| `PUT` | `/api/admin/appearance/sections/{id}` | Update a section |

## Path parameters

| Parameter | Description |
|-----------|-------------|
| `id` | Section ID. |

## Query parameters

| Parameter | Description |
|-----------|-------------|
| `locale` | Locale the `options` belong to. Must be one the channel runs; otherwise the app locale, then the channel's first locale. |

## Request body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Section name. |
| `type` | string | Yes | One of the six section types. |
| `sortOrder` | integer | Yes | Published position. |
| `channelId` | integer | Yes | Channel the section belongs to. |
| `themeCode` | string | Yes | Theme the section belongs to. |
| `status` | boolean | No | Published on/off. Keeps the current value when omitted. |
| `options` | object | No | Published content for the locale. Keeps the current content when omitted. |

## Response fields

The updated section, same shape as [Get section](/api/rest-api/admin/appearance/sections/detail), with `message` set.

## Use cases

- **Rename or reposition without touching content** — send the five required fields and leave `options` out.
- **Publish content straight away** — send `options` for a section whose copy is already final, skipping the draft cycle.

## Best practices

- **Send every required field, including the ones you are not changing.** The body is a full form: `name`, `type`, `sortOrder`, `channelId` and `themeCode` are validated on every call, and a missing one is a `422` rather than a no-op.
- **`options` writes one locale.** Repeat the call per locale with a different `locale` to fill the rest.
- **Switching a section to `footer_links` follows the same one-per-channel rule** as creating one, so a channel that already has a footer rejects the change with `422`.

## Errors

| Status | When |
|--------|------|
| `404` | No section with this ID. |
| `422` | A required field missing, an unknown `type`, an unknown `channelId`, or a second `footer_links` section. |

## Permissions

Requires `appearance.sections.edit`.
