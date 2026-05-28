---
outline: false
examples:
  - id: gql
    title: Configuration Values
    query: |
      query AdminConfigurationValues($slug: String!, $channel: String, $locale: String) {
        valuesAdminConfigurationValues(slug: $slug, channel: $channel, locale: $locale) {
          slug
          channel
          locale
          values
        }
      }
    variables: |
      { "slug": "sales.order_settings", "channel": "default", "locale": "en" }
    response: |
      { "data": { "valuesAdminConfigurationValues": { "slug": "sales.order_settings", "channel": "default", "locale": "en", "values": { "sales.order_settings.reorder.admin": "1", "sales.order_settings.reorder.shop": "1", "sales.order_settings.minimum_order.enable": "0" } } } }
---

# Configuration Values (GraphQL)

Query: `adminConfigurationValues`.

Returns the flat `dottedCode → stringValue` map of effective values for every field under the given slug. Fields with no `core_config` row fall back to the field's `default` from the schema.

## Arguments

| Argument | Type | Notes |
|----------|------|-------|
| `slug` | String! | Required — `<section>.<group>` slug. |
| `channel` | String | Defaults to the requested channel. |
| `locale` | String | Defaults to the requested locale. |

## Response shape

`values` is always a string→string map (the underlying `core_config.value` column is TEXT — booleans, integers, JSON blobs all surface as strings). Image and file fields return the storage path written by Update.

::: warning Slug is required
The slug parameter is mandatory to prevent accidentally dumping the entire `core_config` table.
:::

::: warning Scope columns are per-field
Whether a write lands under a global, per-channel, or per-channel-per-locale row depends on the field's `channelBased` / `localeBased` flags (see the Menu endpoint). A scalar field with both false ignores the `channel` and `locale` arguments.
:::
