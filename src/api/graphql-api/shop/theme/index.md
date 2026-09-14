---
outline: false
apiType: graphql
examples:
  - id: basic
    title: Get Theme
    query: |
      query {
        theme {
          code
          name
          sectionTypes
        }
      }
    response: |
      {
        "data": {
          "theme": {
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
        }
      }
---

# theme

The theme the current channel's storefront is drawn with, and the section types it can hold.

Each channel runs exactly one theme, and a section belongs to a theme and a channel together. The [sections](/api/graphql-api/shop/sections/list) query is already scoped to the theme this query reports, so a storefront that only draws sections does not need it — it matters when a client picks templates, assets or copy per theme.

## Arguments

None. The channel resolved from the request decides the theme.

## Fields

| Field | Type | Description |
|-------|------|-------------|
| `code` | `String` | Theme code, e.g. `default`. |
| `name` | `String` | Display name, falling back to the code when the theme declares none. |
| `sectionTypes` | `Iterable` | The six section types a theme can hold: `image_carousel`, `product_carousel`, `category_carousel`, `footer_links`, `static_content`, `services_content`. |

## Use cases

- **Pick a template set per theme** — read `code` once at boot and choose the component map a storefront renders sections with.
- **Validate a section type before rendering** — `sectionTypes` is the closed set the `sections` query can return.

## Best practices

- **Query `sectionTypes` bare.** It is a JSON value and takes no sub-selection.
- **Do not select `id`** — this query is keyed by `code`, and there is no per-theme storefront route behind an IRI.
- **A channel never pointed at a theme reports the shop default**, so `code` is never null.
- **This is the storefront view of a theme, not the admin gallery** — author, version, screenshot and install state stay on [adminAppearanceThemes](/api/graphql-api/admin/appearance/themes/list).

## Permissions

Public. Requires only the storefront key.
