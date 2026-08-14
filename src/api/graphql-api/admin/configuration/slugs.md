---
outline: false
examples:
  - id: list-slugs
    title: List all slugs
    description: Discover every configuration slug (section / group key) you can pass to the Values and Update operations.
    query: |
      query AdminConfigurationSlugs {
        listAdminConfigurationSlug {
          slugs
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "listAdminConfigurationSlug": {
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
        }
      }
---

# Configuration Slugs (GraphQL)

Query field: **`listAdminConfigurationSlug`**.

Lists every registered configuration **slug** (a section or group key) so you
can discover the valid slugs to pass to the
[Values](./values) and [Update](./update) operations — without trial and error.
See the [Configuration overview](./) for how the operations fit together.

The query exposes one field, `slugs` — a JSON array. Select it bare; it is not
a typed sub-object.

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

## Errors

| Cause | Response |
|-------|----------|
| Unauthenticated | `errors[]` — admin Bearer token required. |
