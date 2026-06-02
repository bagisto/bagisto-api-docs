---
outline: false
apiType: rest
examples:
  - id: admin-configuration-values
    title: Configuration Values
    query: |
      curl -X GET "https://your-domain.com/api/admin/configuration?slug=sales.order_settings&channel=default&locale=en" \
        -H "Authorization: Bearer <token>"
    response: |
      [{ "slug": "sales.order_settings", "channel": "default", "locale": "en", "values": { "sales.order_settings.reorder.admin": "1", "sales.order_settings.reorder.shop": "1", "sales.order_settings.minimum_order.enable": "0" } }]
---

# Configuration Values

| Endpoint | Method |
|----------|--------|
| `/api/admin/configuration?slug=<…>` | GET |

Returns the flat `dottedCode → stringValue` map of effective values for every field under the given slug. Fields with no `core_config` row fall back to the field's `default` from the schema (see the Menu endpoint).

## Query parameters

| Param | Type | Notes |
|-------|------|-------|
| `slug` | string | **Required.** `<section>.<group>` slug, e.g. `sales.order_settings`. |
| `channel` | string | Defaults to the requested channel. |
| `locale` | string | Defaults to the requested locale. |

## Response shape

`values` is always a string→string map (the underlying `core_config.value` column is TEXT — booleans, integers, JSON blobs all surface as strings). Image and file fields return the storage path that Update wrote to the `configuration` disk.

## Response codes

| Code | Meaning |
|------|---------|
| 200 | Values returned. |
| 401 | Unauthenticated. |
| 404 | Slug not registered. |
| 422 | `slug` query parameter missing. |

::: warning Slug is required
The slug parameter is mandatory to prevent accidentally dumping the entire `core_config` table.
:::

::: warning Scope columns are per-field
Whether a write lands under a global, per-channel, or per-channel-per-locale row depends on the field's `channelBased` / `localeBased` flags (see the Menu endpoint). A scalar field with both false ignores the `channel` and `locale` query parameters.
:::
