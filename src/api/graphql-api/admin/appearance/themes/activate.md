---
outline: false
apiType: graphql
examples:
  - id: basic
    title: Activate Theme
    query: |
      mutation activateTheme($input: createAdminAppearanceThemeActivateInput!) {
        createAdminAppearanceThemeActivate(input: $input) {
          adminAppearanceThemeActivate {
            code
            activatedOn
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "code": "default",
          "channelIds": [1]
        }
      }
    response: |
      {
        "data": {
          "createAdminAppearanceThemeActivate": {
            "adminAppearanceThemeActivate": {
              "code": "default",
              "activatedOn": [{ "id": 1, "name": "Default" }],
              "message": "Theme activated successfully."
            }
          }
        }
      }
---

# createAdminAppearanceThemeActivate

Points one or more channels at a theme. Each channel keeps its own theme, so activating on one leaves the others alone.

Sections built for a channel's previous theme are left in place and stop being drawn. Query [adminAppearanceThemeImpact](/api/graphql-api/admin/appearance/themes/impact) first to report that before switching.

## Input fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | `String` | Yes | Theme code to activate. Must be installed. |
| `channelIds` | `Iterable` | Yes | Channels to point at the theme. |

## Payload fields

| Field | Type | Description |
|-------|------|-------------|
| `code` | `String` | Activated theme code. |
| `activatedOn` | `Iterable` | Channels that were switched, each `{ id, name }`. |
| `message` | `String` | Confirmation text. |

## Use cases

- **Roll a theme out to one channel first** — send a single channel ID, verify the storefront, then send the rest.

## Best practices

- **Do not select `id` on the payload.** This result is an action outcome with no resource route of its own; `code` identifies it.
- **The theme must be installed, not merely listed** — an `available` theme is refused.
- **Build the sections before switching a live channel.** A channel pointed at a theme it has no sections for renders that theme's own defaults.

## Permissions

Requires `appearance.themes.activate`.
