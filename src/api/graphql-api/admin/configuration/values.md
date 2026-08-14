---
outline: false
examples:
  - id: values-section
    title: Values — a whole section
    description: Effective values for every field under sales.order_settings.
    query: |
      query AdminConfigurationValues(
        $slug: String!
        $channel: String
        $locale: String
      ) {
        valuesAdminConfigurationValues(
          slug: $slug
          channel: $channel
          locale: $locale
        ) {
          slug
          channel
          locale
          values
        }
      }
    variables: |
      {
        "slug": "sales.order_settings",
        "channel": "default",
        "locale": "en"
      }
    response: |
      {
        "data": {
          "valuesAdminConfigurationValues": {
            "slug": "sales.order_settings",
            "channel": "default",
            "locale": "en",
            "values": {
              "sales.order_settings.order_number.order_number_prefix": null,
              "sales.order_settings.order_number.order_number_length": null,
              "sales.order_settings.order_number.order_number_suffix": null,
              "sales.order_settings.order_number.order_number_generator": null,
              "sales.order_settings.minimum_order.enable": null,
              "sales.order_settings.minimum_order.minimum_order_amount": null,
              "sales.order_settings.minimum_order.include_discount_amount": null,
              "sales.order_settings.minimum_order.include_tax_to_amount": null,
              "sales.order_settings.minimum_order.description": null,
              "sales.order_settings.reorder.admin": "1",
              "sales.order_settings.reorder.shop": "0"
            }
          }
        }
      }
  - id: values-group
    title: Values — a single group
    description: Narrow the slug to one group to read just those fields.
    query: |
      query AdminConfigurationValues(
        $slug: String!
        $channel: String
        $locale: String
      ) {
        valuesAdminConfigurationValues(
          slug: $slug
          channel: $channel
          locale: $locale
        ) {
          slug
          channel
          locale
          values
        }
      }
    variables: |
      {
        "slug": "sales.order_settings.reorder",
        "channel": "default",
        "locale": "en"
      }
    response: |
      {
        "data": {
          "valuesAdminConfigurationValues": {
            "slug": "sales.order_settings.reorder",
            "channel": "default",
            "locale": "en",
            "values": {
              "sales.order_settings.reorder.admin": "1",
              "sales.order_settings.reorder.shop": "0"
            }
          }
        }
      }
---

# Configuration Values (GraphQL)

Query field: **`valuesAdminConfigurationValues`**.

Returns the flat `code → value` map of effective values for every field under
the given `slug`. A field with no saved value falls back to the schema `default`
reported by the [Menu](./menu) query. See the
[Configuration overview](./) for the full read → write flow.

## Arguments

| Argument | Type | Notes |
|----------|------|-------|
| `slug` | `String!` | **Required.** The `section.group` (or deeper) scope to read, e.g. `sales.order_settings`. |
| `channel` | `String` | Channel code for resolution. Defaults to the requested channel. |
| `locale` | `String` | Locale code for resolution. Defaults to the requested locale. |

## Response shape

`values` is a string → string map — the underlying store column is text, so
booleans, numbers, and JSON all come back as strings (`"1"`, `"0"`, `"49.99"`).
`image` / `file` fields return the storage path written by Update.

### Slug is required

Unlike Menu, `slug` is mandatory here — it prevents accidentally dumping the
entire configuration store in one call.

### Scope is per-field

Whether `channel` / `locale` change the result depends on each field's
`channelBased` / `localeBased` flags (see [Menu](./menu)). A global field returns
the same value regardless of the channel / locale you pass.
