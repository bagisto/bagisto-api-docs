---
outline: false
apiType: rest
examples:
  - id: rest
    title: Preview
    query: |
      curl -X GET "https://your-domain.com/api/admin/appearance/themes/default/sections/preview?channel=1&locale=en" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "themeCode": "default",
        "channelId": 1,
        "locale": "en",
        "sections": [
          {
            "id": 3,
            "name": "Categories Collections",
            "type": "category_carousel",
            "sortOrder": 1,
            "status": true,
            "hasDraft": false,
            "options": { "filters": { "sort": "asc", "limit": "10" } }
          },
          {
            "id": 15,
            "name": "Summer Sale",
            "type": "static_content",
            "sortOrder": 2,
            "status": true,
            "hasDraft": true,
            "options": { "html": "<h2>Summer sale</h2>", "css": ".sale { color: #c00; }" }
          }
        ]
      }
---

# Preview

The sections a channel would draw if its staged edits were published: draft content replaces published content, staged status and order are applied, sections that are off are left out, and `footer_links` stays last.

A headless storefront renders this to show a merchant their unpublished work. The storefront's own [sections endpoint](/api/rest-api/shop/sections/list) never returns staged content, which is why the preview lives on the admin side and needs an admin token.

## Endpoint

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/admin/appearance/themes/{code}/sections/preview` | Preview a theme with staged edits applied |

## Path parameters

| Parameter | Description |
|-----------|-------------|
| `code` | Theme being previewed. |

## Query parameters

| Parameter | Description |
|-----------|-------------|
| `channel` | Channel being previewed. Falls back to the current channel. |
| `locale` | Locale the content is read in. Must be one the channel runs; otherwise the app locale, then the channel's first locale. |

## Response fields

| Field | Type | Description |
|-------|------|-------------|
| `themeCode` | string | Theme that was previewed. |
| `channelId` | integer | Channel that was previewed. |
| `locale` | string | Locale the content was read in. |
| `sections` | array | Sections in the order they would be drawn. |
| `sections[].id` | integer | Section ID. |
| `sections[].name` | string | Section name. |
| `sections[].type` | string | Section type. |
| `sections[].sortOrder` | integer | Position, staged value applied. |
| `sections[].status` | boolean | On/off, staged value applied. Always `true` for returned sections. |
| `sections[].hasDraft` | boolean | Whether this section is holding a staged edit. |
| `sections[].options` | object \| null | Content for the locale, staged value applied. |

## Use cases

- **Render an unpublished storefront page** — the array is ready to draw in order, with each section's content already resolved for the locale.
- **Show a merchant what publishing would change** — compare `hasDraft` per section against the published [List sections](/api/rest-api/admin/appearance/sections/list) response.

## Best practices

- **Sections staged off do not appear at all.** The preview is what shoppers would see, so an off section is absent rather than present with `status: false` — do not use this endpoint to build the editor's list.
- **A section with no staged edits is returned with its published values**, so the preview is complete even when only one section was touched.

## Errors

| Status | When |
|--------|------|
| `404` | Unknown theme code. |

## Permissions

Requires `appearance.sections`.
