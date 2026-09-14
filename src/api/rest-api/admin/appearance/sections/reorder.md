---
outline: false
apiType: rest
examples:
  - id: rest
    title: Stage Order
    query: |
      curl -X POST "https://your-domain.com/api/admin/appearance/sections/reorder" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "sectionIds": [8, 5, 3] }'
    response: |
      {
        "sectionIds": [5, 3, 8],
        "hasDraft": { "5": true, "3": true, "8": true },
        "message": "Section order staged successfully."
      }
---

# Stage Order

Stages the order sections are drawn in. `footer_links` is moved back to the end of whatever order is sent, and the response returns the order that was actually stored.

## Endpoint

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/admin/appearance/sections/reorder` | Stage a new render order |

## Request body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `sectionIds` | array of integers | Yes | Section IDs in the order they should be drawn. |

## Response fields

| Field | Type | Description |
|-------|------|-------------|
| `sectionIds` | array | The order as stored, with `footer_links` last. |
| `hasDraft` | object | Section ID to whether it now holds a staged edit. |
| `message` | string | Confirmation text. |

## Use cases

- **Drag-and-drop reordering** — send the list in its new order after a drop and render the response's `sectionIds`, which is authoritative when the footer was dragged.

## Best practices

- **Read `sectionIds` back rather than assuming your order stuck.** A request that puts the footer anywhere but last comes back reordered — the example above sent `[8, 5, 3]` and stored `[5, 3, 8]`.
- **Send the whole channel's sections, not a subset.** Positions are assigned from the list you send, so omitting sections leaves them with stale positions relative to the ones you moved.

## Errors

| Status | When |
|--------|------|
| `422` | `sectionIds` missing or empty, or naming a section that does not exist. |

## Permissions

Requires `appearance.sections.edit`.
