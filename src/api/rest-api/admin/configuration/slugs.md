---
outline: false
apiType: rest
examples:
  - id: list-slugs
    title: List all slugs
    description: Discover every configuration slug (section / group key) you can pass to the Values and Update endpoints.
    query: |
      curl -X GET "https://your-domain.com/api/admin/configuration/slugs" \
        -H "Authorization: Bearer <token>"
    response: |
      [
        {
          "id": "configuration-slugs",
          "slugs": [
            {
              "slug": "general",
              "name": "General",
              "sort": 1,
              "hasFields": false,
              "hasChildren": true
            },
            {
              "slug": "general.general",
              "name": "General",
              "sort": 1,
              "hasFields": false,
              "hasChildren": true
            },
            {
              "slug": "general.general.locale_options",
              "name": "Unit Options",
              "sort": 1,
              "hasFields": true,
              "hasChildren": false
            },
            {
              "slug": "sales.order_settings",
              "name": "Order Settings",
              "sort": 4,
              "hasFields": false,
              "hasChildren": true
            }
          ]
        }
      ]
---

# Configuration Slugs

| Endpoint | Method |
|----------|--------|
| `/api/admin/configuration/slugs` | GET |

Lists every registered configuration **slug** (a section or group key) so you
can discover the valid slugs to pass to the
[Values](./values) and [Update](./update) endpoints — without trial and error.
See the [Configuration overview](./) for how the endpoints fit together.

The response is a one-element array; the object inside carries `slugs` (the
list).

## Slug shape

Each entry in `slugs[]` carries:

| Key | Meaning |
|-----|---------|
| `slug` | Dotted key (e.g. `sales.order_settings`). Pass this to Values / Update. |
| `name` | Human-readable label (already translated). |
| `sort` | Display order within its parent. |
| `hasFields` | `true` when the node holds editable fields directly. |
| `hasChildren` | `true` when the node nests further sub-nodes. |

A node where `hasFields` is `true` is the level you read values for; a node
where only `hasChildren` is `true` is a parent you can drill into.

## Response codes

| Code | Meaning |
|------|---------|
| 200 | Slug list returned. |
| 401 | Unauthenticated. |
