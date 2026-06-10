---
outline: false
examples:
  - id: menu-schema
    title: Menu — schema only
    description: Discover the fields under a slug. include_values is false, so no values are embedded.
    query: |
      query AdminConfigurationMenu(
        $slug: String
        $include_values: Boolean
        $channel: String
        $locale: String
      ) {
        menuAdminConfigurationMenu(
          slug: $slug
          include_values: $include_values
          channel: $channel
          locale: $locale
        ) {
          slug
          tree
        }
      }
    variables: |
      {
        "slug": "sales.order_settings",
        "include_values": false,
        "channel": "default",
        "locale": "en"
      }
    response: |
      {
        "data": {
          "menuAdminConfigurationMenu": {
            "slug": "sales.order_settings",
            "tree": [
              {
                "key": "sales.order_settings",
                "name": "Order Settings",
                "info": "Set order numbers, minimum orders and back orders.",
                "icon": "settings/order.svg",
                "sort": 4,
                "children": [
                  {
                    "key": "sales.order_settings.reorder",
                    "name": "Allow Reorder",
                    "info": "Enable or disable the reordering feature for admin users.",
                    "icon": null,
                    "sort": 2,
                    "fields": [
                      {
                        "name": "admin",
                        "code": "sales.order_settings.reorder.admin",
                        "title": "Admin Reorder",
                        "type": "boolean",
                        "customView": null,
                        "default": true,
                        "channelBased": false,
                        "localeBased": false,
                        "validation": null,
                        "options": null,
                        "depends": null,
                        "info": "Enable or disable the reordering feature for admin users."
                      },
                      {
                        "name": "shop",
                        "code": "sales.order_settings.reorder.shop",
                        "title": "Shop Reorder",
                        "type": "boolean",
                        "customView": null,
                        "default": true,
                        "channelBased": false,
                        "localeBased": false,
                        "validation": null,
                        "options": null,
                        "depends": null,
                        "info": "Enable or disable the reordering feature for shop users."
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      }
  - id: menu-with-values
    title: Menu — schema + values
    description: Set include_values true to embed each field's current value (resolved for the given channel / locale).
    query: |
      query AdminConfigurationMenu(
        $slug: String
        $include_values: Boolean
        $channel: String
        $locale: String
      ) {
        menuAdminConfigurationMenu(
          slug: $slug
          include_values: $include_values
          channel: $channel
          locale: $locale
        ) {
          slug
          tree
        }
      }
    variables: |
      {
        "slug": "sales.order_settings.reorder",
        "include_values": true,
        "channel": "default",
        "locale": "en"
      }
    response: |
      {
        "data": {
          "menuAdminConfigurationMenu": {
            "slug": "sales.order_settings.reorder",
            "tree": [
              {
                "key": "sales.order_settings.reorder",
                "name": "Allow Reorder",
                "info": "Enable or disable the reordering feature for admin users.",
                "icon": null,
                "sort": 2,
                "fields": [
                  {
                    "name": "admin",
                    "code": "sales.order_settings.reorder.admin",
                    "title": "Admin Reorder",
                    "type": "boolean",
                    "customView": null,
                    "default": true,
                    "channelBased": false,
                    "localeBased": false,
                    "validation": null,
                    "options": null,
                    "depends": null,
                    "info": "Enable or disable the reordering feature for admin users.",
                    "value": "1"
                  },
                  {
                    "name": "shop",
                    "code": "sales.order_settings.reorder.shop",
                    "title": "Shop Reorder",
                    "type": "boolean",
                    "customView": null,
                    "default": true,
                    "channelBased": false,
                    "localeBased": false,
                    "validation": null,
                    "options": null,
                    "depends": null,
                    "info": "Enable or disable the reordering feature for shop users.",
                    "value": "0"
                  }
                ]
              }
            ]
          }
        }
      }
---

# Configuration Menu (GraphQL)

Query field: **`menuAdminConfigurationMenu`**.

This is the **discovery** operation — it returns the configuration schema tree
(Section → Group → Field group → Field). Call it first to learn which fields a
section has, each field's dotted `code` (the key you read and write), its
`type`, `default`, scoping flags, `validation`, and `options`. See the
[Configuration overview](./) for how Menu, Values, and Update fit together.

::: tip Selection set
The query exposes two fields: `slug` (echoes the requested scope) and `tree`
(the schema, a JSON array — select it bare; it is not a typed sub-object).
:::

## Arguments

| Argument | Type | Notes |
|----------|------|-------|
| `slug` | `String` | Optional. Scopes the response to one node, e.g. `sales.order_settings`. Omit to return the whole tree. |
| `include_values` | `Boolean` | When `true`, embeds each field's current `value` (resolved with `channel` / `locale`). |
| `channel` | `String` | Channel code used when resolving values. Defaults to the default channel. |
| `locale` | `String` | Locale code used when resolving values. Defaults to the app locale. |

::: warning Arguments are snake_case
The flag is **`include_values`**, not `includeValues`. All admin GraphQL query
arguments use snake_case in this API.
:::

## Field shape

Each leaf field in `tree[*]…fields[]` carries:

| Key | Meaning |
|-----|---------|
| `name` | Short field name within its group. |
| `code` | Fully-qualified dotted path (e.g. `sales.order_settings.reorder.admin`). Use this to read / write. |
| `title` | Human-readable label (already translated). |
| `type` | `text`, `textarea`, `boolean`, `select`, `multiselect`, `password`, `image`, `file`, or `custom`. |
| `default` | Default used when no value has been saved. |
| `channelBased` / `localeBased` | Whether the field is scoped per channel / per locale. |
| `validation` | Laravel validation string applied on Update (server-enforced). |
| `options` | For `select` / `multiselect` — array of `{ title, value }`. |
| `depends`, `info` | Optional UI hints. |
| `customView` | Set for `type: "custom"` (blade-rendered) fields. These are read-only via the API. |
| `value` | Only present when `include_values: true` — the field's current value (a string, or `null` if unset). |

## Errors

| Cause | Response |
|-------|----------|
| Unknown `slug` | `errors[]` — slug not registered. |
| Unauthenticated | `errors[]` — admin Bearer token required. |
