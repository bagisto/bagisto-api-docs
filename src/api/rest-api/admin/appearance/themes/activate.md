---
outline: false
apiType: rest
examples:
  - id: rest
    title: Activate Theme
    query: |
      curl -X POST "https://your-domain.com/api/admin/appearance/themes/default/activate" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "channelIds": [1] }'
    response: |
      {
        "code": "default",
        "activatedOn": [{ "id": 1, "name": "Default" }],
        "message": "Theme activated successfully."
      }
---

# Activate Theme

Points one or more channels at a theme. Each channel keeps its own theme, so activating on one channel leaves the others alone.

Sections built for a channel's previous theme are left in place and stop being drawn. Call [Theme impact](/api/rest-api/admin/appearance/themes/impact) first to report that before switching.

## Endpoint

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/admin/appearance/themes/{code}/activate` | Activate a theme on channels |

## Path parameters

| Parameter | Description |
|-----------|-------------|
| `code` | Theme code to activate. Must be installed. |

## Request body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `channelIds` | array of integers | Yes | Channels to point at the theme. |

## Response fields

| Field | Type | Description |
|-------|------|-------------|
| `code` | string | Activated theme code. |
| `activatedOn` | array | Channels that were switched, each `{ id, name }`. |
| `message` | string | Confirmation text. |

## Use cases

- **Roll a theme out to one channel first** — send a single channel ID, verify the storefront, then send the rest.

## Best practices

- **The theme must be installed, not merely listed.** An `available` theme answers `404` here; check `isInstalled` on the theme before offering activation.
- **Build the sections before switching a live channel.** A channel pointed at a theme it has no sections for renders the theme's own defaults, so create and publish sections for the target theme first.

## Errors

| Status | When |
|--------|------|
| `404` | Unknown theme code, or the theme is not installed. |
| `422` | `channelIds` missing, or naming a channel that does not exist. |

## Permissions

Requires `appearance.themes.activate`.
