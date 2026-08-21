---
outline: false
apiType: rest
examples:
  - id: update-json
    title: Update — JSON (scalars)
    description: Bulk-upsert a code → value map under a slug. Returns the re-resolved values.
    query: |
      curl -X POST "https://your-domain.com/api/admin/configuration" \
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
      {
        "success": true,
        "message": "Configuration updated successfully.",
        "slug": "sales.order_settings",
        "channel": "default",
        "locale": "en",
        "values": {
          "sales.order_settings.reorder.admin": "1",
          "sales.order_settings.reorder.shop": "0"
        }
      }
  - id: update-multipart
    title: Update — multipart (file upload)
    description: Image / file fields must be sent as multipart/form-data. Mixed scalars + files are allowed in one request.
    query: |
      curl -X POST "https://your-domain.com/api/admin/configuration" \
        -H "Authorization: Bearer <token>" \
        -F "slug=general.design.admin_logo" \
        -F "channel=default" \
        -F "locale=en" \
        -F "values[general.design.admin_logo.logo_image]=@/path/to/logo.png"
    response: |
      {
        "success": true,
        "message": "Configuration updated successfully.",
        "slug": "general.design.admin_logo",
        "channel": "default",
        "locale": "en",
        "values": {
          "general.design.admin_logo.logo_image": "configuration/abc123.png"
        }
      }
---

# Configuration Update

| Endpoint | Method |
|----------|--------|
| `/api/admin/configuration` | POST |

Bulk-upserts every entry in `values` under the given `slug`. On success the
response returns the freshly-resolved values for that slug (the same shape as the
[Values](./values) endpoint), so the client can refresh its form state without a
follow-up read. See the [Configuration overview](./) for the full flow.

## Request body

Accepts `application/json` (for scalar fields) or `multipart/form-data` (when
uploading `image` / `file` fields). Mixed payloads — some scalars and some
files — are supported in a single multipart request.

| Field | Type | Notes |
|-------|------|-------|
| `slug` | string | **Required.** The slug whose subtree is being written. |
| `channel` | string | Channel code. Defaults to the default channel. |
| `locale` | string | Locale code. Defaults to the app locale. |
| `values` | object | Map of `code → value`. **Every key must start with `slug.`.** |

For multipart, file parts use `values[<code>]` as the field name — for example
`values[general.design.admin_logo.logo_image]`. Uploaded files are stored and
the resulting storage path is written as the field's value.

## Validation

Each field's validation rules come from the schema (discovered via
[Menu](./menu)), resolved and enforced on the server — they are never trusted
from the client. Call Menu first to know which rules apply to a given code.

## Permission

Requires the admin role to carry `configuration` (or the finer-grained
`configuration.edit`), or `permission_type = "all"`.

## Response codes

| Code | Meaning |
|------|---------|
| 200 | Updated. Body returns the freshly-resolved values. |
| 401 | Unauthenticated. |
| 403 | Missing the `configuration` permission. |
| 404 | Slug not registered. |
| 422 | Validation failed, out-of-scope key, missing `slug` / `values`, or an attempt to write a custom (blade) field. |

### Stay in scope

Every key in `values` must start with the supplied `slug.` prefix. A request
with `slug: "sales.order_settings"` cannot write `catalog.inventory.stock_threshold`
even if the fully-qualified key is supplied — the server rejects it with the
offending key before any write happens.

### File / image fields are multipart-only

JSON (and GraphQL) cannot carry binaries. To set an `image` / `file` field, send
`multipart/form-data` with the file at `values[<code>]`.

### Custom fields are read-only

Fields whose schema declares `type: "custom"` (blade-rendered in the admin)
cannot be written via the API.

### Password fields are stored plaintext

`type: "password"` fields are UI-masking only; the value is stored as plaintext.
This is a Bagisto core behaviour, not an API limitation.
