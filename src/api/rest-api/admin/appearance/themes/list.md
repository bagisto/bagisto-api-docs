---
outline: false
apiType: rest
examples:
  - id: rest
    title: List Themes
    query: |
      curl -X GET "https://your-domain.com/api/admin/appearance/themes" \
        -H "Authorization: Bearer <token>"
    response: |
      [
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
---

# List Themes

Every theme the installation knows about, active ones first. Not paginated — the gallery is small and returned whole.

## Endpoint

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/admin/appearance/themes` | List themes |

## Response fields

| Field | Type | Description |
|-------|------|-------------|
| `code` | string | Theme code, used in every other Appearance path. |
| `name` | string | Display name. |
| `author` | string \| null | Theme author. |
| `version` | string \| null | Theme version. |
| `url` | string \| null | Theme homepage. |
| `demoUrl` | string \| null | Live demo. |
| `screenshot` | string \| null | Preview image URL. |
| `rating` | string \| null | Catalog rating. |
| `tags` | array | Catalog tags. |
| `description` | string \| null | Catalog description. |
| `isInstalled` | boolean | Whether the theme's files are on the server. |
| `status` | string | `active`, `installed` or `available`. |
| `activeOn` | array | Channels running the theme, each `{ id, name }`. Empty when none. |

## Use cases

- **Build a theme picker** — `status` is the only field you need to group the gallery: `active` themes are in use, `installed` can be activated now, `available` needs installing on the server first.
- **Find which theme a channel runs** — read it from `activeOn` here, or from the channel's own `theme` field on [Get channel](/api/rest-api/admin/settings/channels/detail).

## Best practices

- **Only an installed theme can be activated.** `POST /appearance/themes/{code}/activate` answers `404` for a theme whose `isInstalled` is `false`, so gate the activate control on that flag rather than on `status` alone.
- **Call impact before activate.** A channel that already holds sections for another theme is worth warning about — [Theme impact](/api/rest-api/admin/appearance/themes/impact) reports exactly how many.

## Permissions

Requires `appearance.themes`.
