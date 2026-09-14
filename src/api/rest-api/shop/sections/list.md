---
outline: false
apiType: rest
examples:
  - id: rest
    title: List Sections
    query: |
      curl -X GET "https://your-domain.com/api/shop/sections" \
        -H "X-STOREFRONT-KEY: <storefront-key>"
    response: |
      [
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
            }
          ]
        }
      ]
  - id: rest-filtered
    title: Filter by Type
    query: |
      curl -X GET "https://your-domain.com/api/shop/sections?type=static_content&per_page=10&page=1" \
        -H "X-STOREFRONT-KEY: <storefront-key>"
    response: |
      [
        {
          "id": 15,
          "themeCode": "default",
          "channelId": 1,
          "type": "static_content",
          "name": "Summer Sale",
          "sortOrder": 5,
          "status": 1,
          "createdAt": "2026-08-01T10:12:00+05:30",
          "updatedAt": "2026-08-21T18:05:39+05:30",
          "translation": {
            "id": 41,
            "sectionId": 15,
            "locale": "en",
            "options": "{\"html\": \"<h2>Summer sale</h2>\", \"css\": \".sale { color: #c00; }\"}"
          },
          "translations": [
            {
              "id": 41,
              "sectionId": 15,
              "locale": "en",
              "options": "{\"html\": \"<h2>Summer sale</h2>\", \"css\": \".sale { color: #c00; }\"}"
            }
          ]
        }
      ]
---

# List Sections

The published sections of the current channel's active theme, in the order they are drawn.

## Endpoint

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/shop/sections` | List sections |

## Query parameters

| Parameter | Description |
|-----------|-------------|
| `type` | Exact match on the section type. |
| `page` | Page number (1-based). |
| `per_page` | Items per page (default `10`, max `100`). |

## Response fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Section ID. |
| `themeCode` | string | Theme the section belongs to. |
| `channelId` | integer | Channel the section belongs to. |
| `type` | string | One of the six section types. |
| `name` | string | Section name. |
| `sortOrder` | integer | Position in the page. |
| `status` | integer | Always `1` — only published sections are returned. |
| `createdAt` | string | ISO 8601. |
| `updatedAt` | string | ISO 8601. |
| `translation` | object \| null | Content for the current locale. |
| `translation.id` | integer | Translation row ID. |
| `translation.sectionId` | integer | Section the translation belongs to. |
| `translation.locale` | string | Locale code. |
| `translation.options` | string | JSON-encoded content. |
| `translations` | array | Every locale the section has content for, same shape as `translation`. |

## Use cases

- **Render a home page** — request without `type`, then switch on each section's `type` to pick a component, and parse `options` for its content.
- **Render just the footer** — `?type=footer_links` returns the one footer section the channel has.

## Best practices

- **`options` is a JSON string, not an object.** Parse it before reading fields out of it, in both `translation` and each entry of `translations`.
- **Draw them in the order returned.** The response is already in render order; sorting by `sortOrder` yourself is unnecessary and gets the footer wrong.
- **An empty array means the channel's active theme has no published sections**, not that something failed — a freshly switched theme starts empty.

## Permissions

Public. Requires only the storefront key.
