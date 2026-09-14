---
outline: false
apiType: rest
examples:
  - id: rest
    title: Copy Section
    query: |
      curl -X POST "https://your-domain.com/api/admin/appearance/sections/3/duplicate" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{}'
    response: |
      {
        "sectionId": 12,
        "sourceId": 3,
        "name": "Categories Collections (copy)",
        "type": "category_carousel",
        "message": "Section copied successfully."
      }
---

# Copy Section

Copies a section, including its content in every locale, into the same theme and channel.

## Endpoint

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/admin/appearance/sections/{id}/duplicate` | Copy a section |

## Path parameters

| Parameter | Description |
|-----------|-------------|
| `id` | Section to copy. |

## Response fields

| Field | Type | Description |
|-------|------|-------------|
| `sectionId` | integer | ID of the new copy. |
| `sourceId` | integer | Section that was copied. |
| `name` | string | Name given to the copy. |
| `type` | string | Section type, same as the source. |
| `message` | string | Confirmation text. |

## Use cases

- **Build a variant of a working block** — copy the section, then stage different content on the copy while the original keeps running.

## Best practices

- **Read the copy back with [Get section](/api/rest-api/admin/appearance/sections/detail).** This response carries the identity of the new section, not its content or position.
- **Copying a `footer_links` section is refused** for a channel that already has one, the same rule that governs creating and updating.

## Errors

| Status | When |
|--------|------|
| `404` | No section with this ID. |
| `422` | The copy would be a second `footer_links` section for the channel. |

## Permissions

Requires `appearance.sections.create`.
