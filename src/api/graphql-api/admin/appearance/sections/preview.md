---
outline: false
apiType: graphql
examples:
  - id: basic
    title: Preview
    query: |
      query preview($code: String!, $channel: Int, $locale: String) {
        adminAppearanceSectionPreview(code: $code, channel: $channel, locale: $locale) {
          themeCode
          channelId
          locale
          sections
        }
      }
    variables: |
      {
        "code": "default",
        "channel": 1,
        "locale": "en"
      }
    response: |
      {
        "data": {
          "adminAppearanceSectionPreview": {
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
        }
      }
---

# adminAppearanceSectionPreview

The sections a channel would draw if its staged edits were published: draft content replaces published content, staged status and order are applied, sections that are off are left out, and `footer_links` stays last.

A headless storefront renders this to show a merchant their unpublished work. The storefront's own [sections](/api/graphql-api/shop/sections/list) query never returns staged content, which is why the preview lives on the admin side and needs an admin token.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `code` | `String!` | Theme being previewed. |
| `channel` | `Int` | Channel being previewed. Falls back to the current channel. |
| `locale` | `String` | Locale the content is read in. Falls back to the channel locale. |

## Fields

| Field | Type | Description |
|-------|------|-------------|
| `themeCode` | `String` | Theme that was previewed. |
| `channelId` | `Int` | Channel that was previewed. |
| `locale` | `String` | Locale the content was read in. |
| `sections` | `Iterable` | Sections in the order they would be drawn, each `{ id, name, type, sortOrder, status, hasDraft, options }`. |

## Use cases

- **Render an unpublished storefront page** — the list is ready to draw in order, each section's content already resolved for the locale.
- **Show what publishing would change** — compare each entry's `hasDraft` against the published [adminAppearanceSections](/api/graphql-api/admin/appearance/sections/list).

## Best practices

- **Query `sections` bare.** It is a JSON value and takes no sub-selection.
- **Sections staged off do not appear at all** — the preview is what shoppers would see, so do not use it to build the editor's list.
- **A section with no staged edits is returned with its published values**, so the preview is complete even when only one section was touched.

## Permissions

Requires `appearance.sections`.
