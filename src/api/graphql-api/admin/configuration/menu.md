---
outline: false
examples:
  - id: gql
    title: Configuration Menu (schema)
    query: |
      query AdminConfigurationMenu($slug: String, $includeValues: Boolean, $channel: String, $locale: String) {
        adminConfigurationMenu(slug: $slug, include_values: $includeValues, channel: $channel, locale: $locale) {
          slug
          tree
        }
      }
    variables: |
      { "slug": "sales.order_settings", "includeValues": false }
    response: |
      { "data": { "adminConfigurationMenu": { "slug": "sales.order_settings", "tree": [{ "key": "sales", "name": "Sales", "children": [{ "key": "sales.order_settings", "name": "Order Settings", "children": [{ "key": "sales.order_settings.reorder", "name": "Reorder", "fields": [{ "name": "admin", "code": "sales.order_settings.reorder.admin", "title": "Allow Reorder (Admin)", "type": "boolean", "default": "1", "channelBased": false, "localeBased": false, "validation": null, "options": null, "depends": null, "info": null }, { "name": "shop", "code": "sales.order_settings.reorder.shop", "title": "Allow Reorder (Storefront)", "type": "boolean", "default": "1", "channelBased": false, "localeBased": false, "validation": null, "options": null, "depends": null, "info": null }] }] }] }] } } }
---

# Configuration Menu (GraphQL)

Query: `adminConfigurationMenu`.

Returns the merged `system_config` tree (sections → groups → field groups → fields). Use this as the discovery endpoint — every field carries its declared `type`, `default`, scoping flags, `validation` string, and (where applicable) `options` / `depends` / `info` metadata. Clients should hit this first to know which dotted-code keys exist before reading or writing values.

## Arguments

| Argument | Type | Notes |
|----------|------|-------|
| `slug` | String | Optional. Scopes the response to one node, e.g. `sales.order_settings`. Omit to return the full tree. |
| `include_values` | Boolean | When true, embeds the currently-effective value per field. |
| `channel` | String | Channel code used when resolving values. |
| `locale` | String | Locale code used when resolving values. |

## Field shape

Each leaf field surfaces the following keys:

| Key | Meaning |
|-----|---------|
| `name` | Short code within the field-group. |
| `code` | Fully-qualified dotted path (e.g. `sales.order_settings.reorder.admin`). Use this when reading / writing. |
| `title` | Human-readable label. |
| `type` | `text`, `textarea`, `boolean`, `select`, `multiselect`, `password`, `image`, `file`, or `custom`. |
| `default` | Default value when no `core_config` row exists. |
| `channelBased` / `localeBased` | Whether the field is scoped per channel / per locale. |
| `validation` | Laravel validation string (server-enforced). |
| `options` | For `select` / `multiselect`. |
| `depends`, `info` | Optional UI hints. |

Custom blade-rendered fields surface as `type: "custom"` with an additional `customView: "<view>"` key — they are read-only over the API.

::: warning Validation comes from the schema
Validation rules for the Update endpoint are pulled from each field's registered `validation` string here — they are not trusted from the client. Always discover the schema first.
:::
