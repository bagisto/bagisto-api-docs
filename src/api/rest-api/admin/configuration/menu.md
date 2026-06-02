---
outline: false
apiType: rest
examples:
  - id: admin-configuration-menu
    title: Configuration Menu (schema)
    query: |
      curl -X GET "https://your-domain.com/api/admin/configuration/menu?slug=sales.order_settings" \
        -H "Authorization: Bearer <token>"
    response: |
      [{ "key": "sales", "name": "Sales", "children": [{ "key": "sales.order_settings", "name": "Order Settings", "children": [{ "key": "sales.order_settings.reorder", "name": "Reorder", "fields": [{ "name": "admin", "code": "sales.order_settings.reorder.admin", "title": "Allow Reorder (Admin)", "type": "boolean", "default": "1", "channelBased": false, "localeBased": false, "validation": null, "options": null }, { "name": "shop", "code": "sales.order_settings.reorder.shop", "title": "Allow Reorder (Storefront)", "type": "boolean", "default": "1", "channelBased": false, "localeBased": false, "validation": null, "options": null }] }] }] }]
---

# Configuration Menu

| Endpoint | Method |
|----------|--------|
| `/api/admin/configuration/menu` | GET |

Returns the merged `system_config` tree (sections → groups → field groups → fields) registered by every installed package's `Config/system.php`. Use this endpoint as the **discovery surface** — every field carries the metadata clients need to render forms and to validate writes locally.

## Query parameters

| Param | Type | Notes |
|-------|------|-------|
| `slug` | string | Optional. Scopes the response to one node, e.g. `sales.order_settings`. Omit to return the full tree. |
| `include_values` | boolean | When `true`, embeds the currently-effective value per field. |
| `channel` | string | Channel code used when resolving values. |
| `locale` | string | Locale code used when resolving values. |

## Field shape

Each leaf field carries:

| Key | Meaning |
|-----|---------|
| `name` | Short code within the field-group. |
| `code` | Fully-qualified dotted path (`<section>.<group>.<fieldGroup>.<field>`). Use this when reading or writing. |
| `title` | Human-readable label. |
| `type` | `text`, `textarea`, `boolean`, `select`, `multiselect`, `password`, `image`, `file`, or `custom`. |
| `default` | Default value when no `core_config` row exists. |
| `channelBased` / `localeBased` | Whether the field is scoped per channel / per locale. |
| `validation` | Laravel validation string (server-enforced). |
| `options` | For `select` / `multiselect`. |
| `depends`, `info` | Optional UI hints. |

Custom blade-rendered fields surface as `type: "custom"` with an additional `customView: "<view>"` key — they are read-only via the API.

## Response codes

| Code | Meaning |
|------|---------|
| 200 | Tree returned. |
| 401 | Unauthenticated. |
| 404 | Slug not registered. |

::: warning Discover before you write
Validation rules for the Update endpoint are pulled from each field's `validation` string here — they are not trusted from the client. Always discover the schema first to know which keys exist and how they are scoped.
:::
