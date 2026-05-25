---
outline: false
apiType: rest
examples:
  - id: admin-configuration-update-json
    title: Update Configuration (JSON)
    query: |
      curl -X POST "https://your-domain.com/api/admin/configuration" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "slug": "sales.order_settings",
          "channel": "default",
          "locale": "en",
          "values": {
            "sales.order_settings.reorder.admin": "1",
            "sales.order_settings.reorder.shop": "0"
          }
        }'
    response: |
      { "success": true, "message": "Configuration updated successfully.", "slug": "sales.order_settings", "channel": "default", "locale": "en", "values": { "sales.order_settings.reorder.admin": "1", "sales.order_settings.reorder.shop": "0" } }
  - id: admin-configuration-update-multipart
    title: Update Configuration (multipart, file upload)
    query: |
      curl -X POST "https://your-domain.com/api/admin/configuration" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -F "slug=general.design.admin_logo" \
        -F "channel=default" \
        -F "locale=en" \
        -F "values[general.design.admin_logo.logo_image]=@/path/to/logo.png"
    response: |
      { "success": true, "message": "Configuration updated successfully.", "slug": "general.design.admin_logo", "channel": "default", "locale": "en", "values": { "general.design.admin_logo.logo_image": "configuration/abc123.png" } }
---

# Configuration Update

| Endpoint | Method |
|----------|--------|
| `/api/admin/configuration` | POST |

Bulk-upserts every entry in `values` under the given slug. Server-side validation is built from each field's `validation` string registered in `system_config()` — what the client sends in is ignored except for the value itself. On success the response returns the freshly-resolved values map (same shape as the Values endpoint) so the client can refresh its form state without a follow-up GET.

## Request body

Accepts either `application/json` (for scalars) or `multipart/form-data` (when uploading `image` / `file` fields). Mixed payloads — some scalars and some files — are supported in a single multipart request.

| Field | Type | Notes |
|-------|------|-------|
| `slug` | string | **Required.** The slug whose subtree is being updated. |
| `channel` | string | Channel code. Defaults to the default channel. |
| `locale` | string | Locale code. Defaults to the current app locale. |
| `values` | object | Map of `dottedCode → value`. **Every key must start with `slug.`.** |

For multipart, file parts use `values[<dotted.code>]` as the field name — for example `values[general.design.admin_logo.logo_image]`. Uploaded files are stored on the `configuration` disk and the resulting storage path is written as the field value.

## Permission

Requires the admin role to carry `system.configuration.edit`, the parent `configuration` permission, or `permission_type = 'all'`.

## Events

Fires `core.configuration.save.before` and `core.configuration.save.after` inside `CoreConfigRepository::create()` — existing core listeners (cache flushers, etc.) keep working transparently.

## Response codes

| Code | Meaning |
|------|---------|
| 200 | Updated. Body returns the freshly-resolved values. |
| 401 | Unauthenticated. |
| 403 | Missing `system.configuration.edit` permission. |
| 404 | Slug not registered. |
| 422 | Validation failed, scope-escape, missing `slug` / `values`, or attempt to write a custom-view field. |

::: warning Anti-scope-escape
Every key in `values` must start with the supplied `slug.` prefix. A request with `slug: "sales.order_settings"` cannot write to `catalog.inventory.stock_threshold` even when the fully-qualified key is supplied — the server rejects with HTTP 422 and the offending key in the message before any write happens.
:::

::: warning Validation comes from the schema, not the client
Each field's `validation` string is resolved from `system_config()` at write time and run through a Laravel Validator. To know which rules apply to a given dotted code, call the Menu endpoint first.
:::

::: warning File uploads are REST-multipart only
GraphQL has no binary transport for `image` / `file` field types. When such a field needs to be set, the request must be `multipart/form-data` here, with the file at `values[<dotted.code>]`.
:::

::: warning Custom-view fields are read-only
Fields whose schema declares `type: "custom"` (blade-rendered in the admin UI) cannot be written via the API. The admin blade owns its own round-trip.
:::

::: warning No encryption at rest
Fields declared as `type: "password"` are UI-masking only. Bagisto core stores the value as plaintext in `core_config.value`. This is a core limitation, not an API bug.
:::
