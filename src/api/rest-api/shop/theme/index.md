---
outline: false
apiType: rest
examples:
  - id: rest
    title: Get Theme
    query: |
      curl -X GET "https://your-domain.com/api/shop/theme" \
        -H "X-STOREFRONT-KEY: <storefront-key>"
    response: |
      [
        {
          "code": "default",
          "name": "Default",
          "sectionTypes": [
            "image_carousel",
            "product_carousel",
            "category_carousel",
            "footer_links",
            "static_content",
            "services_content"
          ]
        }
      ]
---

# Theme

The theme the current channel's storefront is drawn with, and the section types it can hold.

Each channel runs exactly one theme, and a section belongs to a theme and a channel together. [List Sections](/api/rest-api/shop/sections/list) is already scoped to the theme this endpoint reports, so a storefront that only draws sections does not need to read it — it matters when a client picks templates, assets or copy per theme.

## Endpoint

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/shop/theme` | Get the active theme of the current channel |

## Response fields

Returns a single-entry array, the same shape the other single-resource endpoints use.

| Field | Type | Description |
|-------|------|-------------|
| `code` | string | Theme code, e.g. `default`. |
| `name` | string | Display name, falling back to the code when the theme declares none. |
| `sectionTypes` | array | The six section types a theme can hold: `image_carousel`, `product_carousel`, `category_carousel`, `footer_links`, `static_content`, `services_content`. |

## Use cases

- **Pick a template set per theme** — read `code` once at boot and choose the component map a storefront renders sections with.
- **Validate a section type before rendering** — `sectionTypes` is the closed set `/api/shop/sections` can return, so a client can fall back gracefully on anything outside it.

## Best practices

- **A channel that has never been pointed at a theme reports the shop default**, so `code` is never null and needs no fallback client-side.
- **This is the storefront view of a theme, not the admin gallery.** Author, version, screenshot and install state belong to the admin [theme gallery](/api/rest-api/admin/appearance/themes/list) and are deliberately not public.
- **`sectionTypes` is the catalogue of types, not what this channel holds.** For the sections a channel actually draws, read [List Sections](/api/rest-api/shop/sections/list).

## Permissions

Public. Requires only the storefront key.
