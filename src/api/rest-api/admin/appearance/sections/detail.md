---
outline: false
apiType: rest
examples:
  - id: rest
    title: Get Section
    query: |
      curl -X GET "https://your-domain.com/api/admin/appearance/sections/3" \
        -H "Authorization: Bearer <token>"
    response: |
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
          { "locale": "en", "options": { "filters": { "sort": "asc", "limit": "10" } }, "draftOptions": null },
          { "locale": "ar", "options": { "filters": { "sort": "asc", "limit": "10" } }, "draftOptions": null }
        ],
        "message": null
      }
---

# Get Section

One section with every locale's content.

## Endpoint

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/admin/appearance/sections/{id}` | Get a section |

## Path parameters

| Parameter | Description |
|-----------|-------------|
| `id` | Section ID. |

## Response fields

Identical to [List sections](/api/rest-api/admin/appearance/sections/list).

## Use cases

- **Read back a copy** — [Copy section](/api/rest-api/admin/appearance/sections/duplicate) returns only the new section's id, name and type; this endpoint returns the copied content.

## Best practices

- **Use [Section fields](/api/rest-api/admin/appearance/sections/fields) to build an editing form**, not this endpoint — it returns the field schema for the type and resolves staged content over published, which this endpoint deliberately keeps separate.

## Errors

| Status | When |
|--------|------|
| `404` | No section with this ID. |

## Permissions

Requires `appearance.sections`.
