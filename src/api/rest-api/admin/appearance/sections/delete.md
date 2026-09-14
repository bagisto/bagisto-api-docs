---
outline: false
apiType: rest
examples:
  - id: rest
    title: Delete Section
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/appearance/sections/12" \
        -H "Authorization: Bearer <token>"
    response: |
      HTTP/1.1 204 No Content
---

# Delete Section

Removes a section and its content for every locale. Media the section uploaded is cleaned up with it.

## Endpoint

| Method | Path | Purpose |
|--------|------|---------|
| `DELETE` | `/api/admin/appearance/sections/{id}` | Delete a section |

## Path parameters

| Parameter | Description |
|-----------|-------------|
| `id` | Section ID. |

## Best practices

- **Deleting is immediate and is not a staged edit.** [Discard](/api/rest-api/admin/appearance/sections/discard) does not bring a deleted section back — to take a section off the storefront reversibly, stage it off with [Stage status](/api/rest-api/admin/appearance/sections/status) instead.
- **Removing a section from one channel leaves the other channels alone**, because a section belongs to a single theme and channel.

## Errors

| Status | When |
|--------|------|
| `404` | No section with this ID. |

## Permissions

Requires `appearance.sections.delete`.
