---
outline: false
apiType: graphql
examples:
  - id: basic
    title: List Themes
    query: |
      query {
        adminAppearanceThemes {
          code
          name
          author
          version
          url
          demoUrl
          screenshot
          rating
          tags
          description
          isInstalled
          status
          activeOn
        }
      }
    response: |
      {
        "data": {
          "adminAppearanceThemes": [
            {
              "code": "default",
              "name": "Default",
              "author": "Bagisto",
              "version": "2.4.10",
              "url": null,
              "demoUrl": null,
              "screenshot": "https://your-domain.com/themes/admin/default/images/default.png",
              "rating": null,
              "tags": [],
              "description": "The theme Bagisto ships with.",
              "isInstalled": true,
              "status": "active",
              "activeOn": [{ "id": 1, "name": "Default" }]
            }
          ]
        }
      }
---

# adminAppearanceThemes

Every theme the installation knows about, active ones first. Returns a plain list — the gallery is small and not paginated.

## Arguments

None.

## Fields

| Field | Type | Description |
|-------|------|-------------|
| `code` | `String` | Theme code, used by every other Appearance operation. |
| `name` | `String` | Display name. |
| `author` | `String` | Theme author. |
| `version` | `String` | Theme version. |
| `url` | `String` | Theme homepage. |
| `demoUrl` | `String` | Live demo. |
| `screenshot` | `String` | Preview image URL. |
| `rating` | `String` | Catalog rating. |
| `tags` | `Iterable` | Catalog tags. |
| `description` | `String` | Catalog description. |
| `isInstalled` | `Boolean` | Whether the theme's files are on the server. |
| `status` | `String` | `active`, `installed` or `available`. |
| `activeOn` | `Iterable` | Channels running the theme, each `{ id, name }`. |

## Use cases

- **Build a theme picker** — group by `status`: `active` is in use, `installed` can be activated now, `available` needs installing on the server first.

## Best practices

- **Query `activeOn` bare.** It is a JSON value, not a typed object, so it takes no sub-selection.
- **Do not select `id`** — the gallery is keyed by `code`, which is what every other operation takes.
- **Only an installed theme can be activated.** Gate the activate control on `isInstalled`.

## Permissions

Requires `appearance.themes`.
