---
outline: false
apiType: rest
examples:
  - id: rest
    title: Get Section
    query: |
      curl -X GET "https://your-domain.com/api/shop/sections/3" \
        -H "X-STOREFRONT-KEY: <storefront-key>"
    response: |
      {
        "id": 3,
        "themeCode": "default",
        "channelId": 1,
        "type": "category_carousel",
        "name": "Categories Collections",
        "sortOrder": 3,
        "status": 1,
        "createdAt": "2024-04-16T21:44:15+05:30",
        "updatedAt": "2026-08-21T18:05:39+05:30",
        "translation": {
          "id": 3,
          "sectionId": 3,
          "locale": "en",
          "options": "{\"filters\": {\"sort\": \"asc\", \"limit\": \"10\", \"parent_id\": \"1\"}}"
        },
        "translations": [
          {
            "id": 3,
            "sectionId": 3,
            "locale": "en",
            "options": "{\"filters\": {\"sort\": \"asc\", \"limit\": \"10\", \"parent_id\": \"1\"}}"
          },
          {
            "id": 29,
            "sectionId": 3,
            "locale": "ar",
            "options": "{\"filters\": {\"sort\": \"asc\", \"limit\": \"10\", \"parent_id\": \"1\"}}"
          }
        ]
      }
---

# Get Section

One published section of the current channel's active theme.

## Endpoint

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/shop/sections/{id}` | Get a section |

## Path parameters

| Parameter | Description |
|-----------|-------------|
| `id` | Section ID. |

## Response fields

Identical to [List sections](/api/rest-api/shop/sections/list).

## Best practices

- **A `404` here does not always mean the section was deleted.** A section that is switched off, or belongs to a theme the channel no longer runs, is not part of the storefront surface and answers `404` the same way.
- **Read every locale from `translations`** when building a language switcher that keeps the shopper on the same block.

## Errors

| Status | When |
|--------|------|
| `404` | No published section with this ID in the current channel's active theme. |

## Permissions

Public. Requires only the storefront key.
