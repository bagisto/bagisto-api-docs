---
outline: false
apiType: rest
examples:
  - id: rest
    title: Stage Status
    query: |
      curl -X POST "https://your-domain.com/api/admin/appearance/sections/15/status" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "status": false }'
    response: |
      {
        "sectionId": 15,
        "draftStatus": false,
        "hasDraft": true,
        "message": "Section status staged successfully."
      }
---

# Stage Status

Stages a section on or off. Like every other edit, it reaches the storefront only when the theme is published.

## Endpoint

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/admin/appearance/sections/{id}/status` | Stage a section on or off |

## Path parameters

| Parameter | Description |
|-----------|-------------|
| `id` | Section ID. |

## Request body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `status` | boolean | Yes | `true` to show the section once published, `false` to hide it. |

## Response fields

| Field | Type | Description |
|-------|------|-------------|
| `sectionId` | integer | Section the status belongs to. |
| `draftStatus` | boolean \| null | The staged state. |
| `hasDraft` | boolean | Whether the section now holds any staged edit. |
| `message` | string | Confirmation text. |

## Use cases

- **Take a section down at the next publish** — stage `false`, keep the content, publish when ready. Nothing is deleted, so staging `true` later brings it back exactly as it was.

## Best practices

- **The published `status` does not move here.** Reading the section back still shows the old `status`; the new value sits in `draftStatus` until publish, which is what lets a merchant stage a takedown without it going live mid-edit.
- **To switch a section on or off immediately**, send `status` on [Update section](/api/rest-api/admin/appearance/sections/update) instead — that writes the published value directly.

## Errors

| Status | When |
|--------|------|
| `404` | No section with this ID. |
| `422` | `status` missing. |

## Permissions

Requires `appearance.sections.edit`.
