---
outline: false
apiType: rest
examples:
  - id: rest
    title: Create Section
    query: |
      curl -X POST "https://your-domain.com/api/admin/appearance/themes/default/sections?channel=1" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "name": "Summer Banner", "type": "image_carousel" }'
    response: |
      {
        "id": 12,
        "name": "Summer Banner",
        "type": "image_carousel",
        "themeCode": "default",
        "channelId": 1,
        "sortOrder": 5,
        "status": 0,
        "draftStatus": true,
        "draftSortOrder": null,
        "hasDraft": true,
        "isPinned": false,
        "createdAt": "2026-08-26T11:04:02+05:30",
        "updatedAt": "2026-08-26T11:04:02+05:30",
        "translations": [],
        "message": "Section created successfully."
      }
---

# Create Section

Adds a section to a theme and channel. The section is created **switched off with a staged on-state**, so it is drawn in the editor and its preview but not on the storefront until it has been built and published.

Content is not part of creation. Add it with [Stage edits](/api/rest-api/admin/appearance/sections/draft) or [Update section](/api/rest-api/admin/appearance/sections/update) afterwards.

## Endpoint

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/admin/appearance/themes/{code}/sections` | Create a section |

## Path parameters

| Parameter | Description |
|-----------|-------------|
| `code` | Theme the section belongs to. |

## Query parameters

| Parameter | Description |
|-----------|-------------|
| `channel` | Channel the section is created for. Falls back to the current channel. |

## Request body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Name shown in the editor. |
| `type` | string | Yes | `image_carousel`, `product_carousel`, `category_carousel`, `footer_links`, `static_content` or `services_content`. |

## Response fields

The created section, same shape as [Get section](/api/rest-api/admin/appearance/sections/detail), with `message` set.

## Use cases

- **Add a promo banner to one channel** — create with `type: image_carousel`, upload the slide through [Upload media](/api/rest-api/admin/appearance/sections/media), stage the returned path in the section's options, then publish.

## Best practices

- **`status` comes back `0` on purpose.** A new section is off until published; sending a status in the body does not change that, and switching it on is [Stage status](/api/rest-api/admin/appearance/sections/status) followed by a publish.
- **`sortOrder` is assigned, not chosen.** The section is appended to the end and the whole set is renumbered, with `footer_links` kept last — send a [Stage order](/api/rest-api/admin/appearance/sections/reorder) afterwards to place it.
- **A channel gets one footer.** Creating a second `footer_links` section for the same theme and channel is rejected with `422`.

## Errors

| Status | When |
|--------|------|
| `404` | Unknown theme code. |
| `422` | `name` missing, `type` missing or not one of the six, or a second `footer_links` section. |

## Permissions

Requires `appearance.sections.create`.
