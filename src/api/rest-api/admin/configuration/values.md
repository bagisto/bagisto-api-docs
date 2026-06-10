---
outline: false
apiType: rest
examples:
  - id: values-section
    title: Values — a whole section
    description: Effective values for every field under sales.order_settings.
    query: |
      curl -X GET "https://your-domain.com/api/admin/configuration?slug=sales.order_settings&channel=default&locale=en" \
        -H "Authorization: Bearer <token>"
    response: |
      [
        {
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
      ]
  - id: values-group
    title: Values — a single group
    description: Narrow the slug to one group to read just those fields.
    query: |
      curl -X GET "https://your-domain.com/api/admin/configuration?slug=sales.order_settings.reorder&channel=default&locale=en" \
        -H "Authorization: Bearer <token>"
    response: |
      [
        {
          "slug": "sales.order_settings.reorder",
          "channel": "default",
          "locale": "en",
          "values": {
            "sales.order_settings.reorder.admin": "1",
            "sales.order_settings.reorder.shop": "0"
          }
        }
      ]
---

# Configuration Values

| Endpoint | Method |
|----------|--------|
| `/api/admin/configuration?slug=<…>` | GET |

Returns the flat `code → value` map of effective values for every field under
the given `slug`. A field with no saved value falls back to the schema `default`
reported by the [Menu](./menu) endpoint. See the
[Configuration overview](./) for the full read → write flow.

The response is a one-element array; the object inside carries `slug`,
`channel`, `locale`, and the `values` map.

## Query parameters

| Param | Type | Notes |
|-------|------|-------|
| `slug` | string | **Required.** The `section.group` (or deeper) scope to read, e.g. `sales.order_settings`. |
| `channel` | string | Channel code for resolution. Defaults to the requested channel. |
| `locale` | string | Locale code for resolution. Defaults to the requested locale. |

## Response shape

`values` is a string → string map — the underlying store column is text, so
booleans, numbers, and JSON all come back as strings (`"1"`, `"0"`, `"49.99"`).
`image` / `file` fields return the storage path written by Update.

## Response codes

| Code | Meaning |
|------|---------|
| 200 | Values returned. |
| 401 | Unauthenticated. |
| 404 | Slug not registered. |
| 422 | `slug` query parameter missing. |

::: warning slug is required
The `slug` parameter is mandatory — it prevents accidentally dumping the entire
configuration store in one call.
:::

::: tip Scope is per-field
Whether `channel` / `locale` change the result depends on each field's
`channelBased` / `localeBased` flags (see [Menu](./menu)). A global field returns
the same value regardless of the channel / locale you pass.
:::
