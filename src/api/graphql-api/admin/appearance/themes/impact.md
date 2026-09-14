---
outline: false
apiType: graphql
examples:
  - id: basic
    title: Theme Impact
    query: |
      query themeImpact($code: String!, $channelIds: [Int!]!) {
        adminAppearanceThemeImpact(code: $code, channelIds: $channelIds) {
          code
          impact
        }
      }
    variables: |
      {
        "code": "velocity",
        "channelIds": [1, 2]
      }
    response: |
      {
        "data": {
          "adminAppearanceThemeImpact": {
            "code": "velocity",
            "impact": [
              {
                "channelId": 1,
                "channel": "Default",
                "currentTheme": "Default",
                "customizations": 6
              }
            ]
          }
        }
      }
  - id: none
    title: Nothing Left Behind
    query: |
      query themeImpact($code: String!, $channelIds: [Int!]!) {
        adminAppearanceThemeImpact(code: $code, channelIds: $channelIds) {
          code
          impact
        }
      }
    variables: |
      {
        "code": "default",
        "channelIds": [1]
      }
    response: |
      {
        "data": {
          "adminAppearanceThemeImpact": {
            "code": "default",
            "impact": []
          }
        }
      }
---

# adminAppearanceThemeImpact

What activating a theme on the given channels would leave behind. Reports only; nothing is written.

A channel is listed when it currently runs a **different** theme and already holds sections built for it. Those sections are not deleted by activation — they stop being drawn, and return if the channel is pointed back at that theme.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `code` | `String!` | Theme code being considered. |
| `channelIds` | `[Int!]!` | Channels the theme would be applied to. |

## Fields

| Field | Type | Description |
|-------|------|-------------|
| `code` | `String` | The theme code that was asked about. |
| `impact` | `Iterable` | One entry per affected channel, each `{ channelId, channel, currentTheme, customizations }`. Empty when nothing would be left behind. |

## Use cases

- **Confirmation dialog before switching** — query with the channels the merchant ticked; an empty `impact` means the switch is uneventful and the dialog can be skipped.

## Best practices

- **Query `impact` bare.** It is a JSON value and takes no sub-selection.
- **A channel already on this theme is never listed**, so an empty array is the normal answer when re-activating a theme a channel already runs.

## Permissions

Requires `appearance.themes`.
