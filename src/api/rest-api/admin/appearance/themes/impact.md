---
outline: false
apiType: rest
examples:
  - id: rest
    title: Theme Impact
    query: |
      curl -X GET "https://your-domain.com/api/admin/appearance/themes/velocity/impact?channel_ids[]=1&channel_ids[]=2" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "code": "velocity",
        "impact": [
          { "channelId": 1, "channel": "Default", "currentTheme": "Default", "customizations": 6 }
        ]
      }
  - id: rest-none
    title: Nothing Left Behind
    query: |
      curl -X GET "https://your-domain.com/api/admin/appearance/themes/default/impact?channel_ids[]=1" \
        -H "Authorization: Bearer <token>"
    response: |
      { "code": "default", "impact": [] }
---

# Theme Impact

What activating a theme on the given channels would leave behind, so the change can be spelled out before anything is written. Reports only; nothing is modified.

A channel is listed when it currently runs a **different** theme and already holds sections built for it. Those sections are not deleted by activation — they stop being drawn, and return if the channel is pointed back at that theme.

## Endpoint

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/admin/appearance/themes/{code}/impact` | Report the impact of activating a theme |

## Path parameters

| Parameter | Description |
|-----------|-------------|
| `code` | Theme code being considered. |

## Query parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `channel_ids[]` | Yes | Channels the theme would be applied to. Repeat for each channel. |

## Response fields

| Field | Type | Description |
|-------|------|-------------|
| `code` | string | The theme code that was asked about. |
| `impact` | array | One entry per affected channel. Empty when nothing would be left behind. |
| `impact[].channelId` | integer | Channel ID. |
| `impact[].channel` | string | Channel name. |
| `impact[].currentTheme` | string \| null | Name of the theme the channel runs today. |
| `impact[].customizations` | integer | Sections the channel holds for that theme. |

## Use cases

- **Confirmation dialog before switching** — call with the channels the merchant ticked; an empty `impact` means the switch is uneventful and the confirmation can be skipped.

## Best practices

- **A channel already on this theme is never listed.** `impact` counts only channels whose current theme differs, so an empty array is the normal answer when re-activating the theme a channel already runs.

## Errors

| Status | When |
|--------|------|
| `404` | No theme with this code. |
| `422` | `channel_ids` missing, or naming a channel that does not exist. |

## Permissions

Requires `appearance.themes`.
