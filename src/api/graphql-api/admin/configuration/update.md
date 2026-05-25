---
outline: false
examples:
  - id: gql
    title: Configuration Update
    query: |
      mutation CreateAdminConfigurationUpdate($input: createAdminConfigurationUpdateInput!) {
        createAdminConfigurationUpdate(input: $input) {
          adminConfigurationUpdate {
            slug
            channel
            locale
            success
            message
            values
          }
        }
      }
    variables: |
      { "input": { "slug": "sales.order_settings", "channel": "default", "locale": "en", "values": { "sales.order_settings.reorder.admin": "1", "sales.order_settings.reorder.shop": "0" } } }
    response: |
      { "data": { "createAdminConfigurationUpdate": { "adminConfigurationUpdate": { "slug": "sales.order_settings", "channel": "default", "locale": "en", "success": true, "message": "Configuration updated successfully.", "values": { "sales.order_settings.reorder.admin": "1", "sales.order_settings.reorder.shop": "0" } } } } }
---

# Configuration Update (GraphQL)

Mutation: `createAdminConfigurationUpdate`.

Bulk-upserts every entry in `values` under the given slug. Server-side validation is built from each field's `validation` string registered in `system_config()` — what the client sends in is ignored except for the actual value. On success the mutation returns the freshly-resolved values map (same shape as the Values query) so the client can refresh its form state without a follow-up read.

## Input

| Field | Type | Notes |
|-------|------|-------|
| `slug` | String! | The slug whose subtree is being updated. |
| `channel` | String | Channel code. Defaults to the default channel. |
| `locale` | String | Locale code. Defaults to the current app locale. |
| `values` | Iterable! | Map of `dottedCode → string`. Every key MUST start with `slug.`. |

## Permission

Requires the admin role to carry `system.configuration.edit`, the parent `configuration` permission, or `permission_type = 'all'`.

## Events

Fires `core.configuration.save.before` and `core.configuration.save.after` inside `CoreConfigRepository::create()` — existing core listeners (cache flushers, etc.) keep working transparently.

::: warning Anti-scope-escape
Every key in `values` must start with the supplied `slug.` prefix. A request with `slug: "sales.order_settings"` cannot write to `catalog.inventory.stock_threshold` even when the fully-qualified key is supplied — the server rejects with HTTP 422 / `errors[]` entry `scope-escape` before any write.
:::

::: warning File uploads are REST-only
GraphQL has no binary transport for `image` / `file` field types. Any non-string value sent for such a field is rejected with HTTP 422 / `errors[]` entry `file-upload-rest-only`. Use the REST multipart endpoint for those fields.
:::

::: warning Custom-view fields are read-only
Fields whose schema declares `type: "custom"` (blade-rendered in the admin UI) cannot be written via the API. The admin blade owns its own round-trip.
:::

::: warning No encryption at rest
Fields declared as `type: "password"` are UI-masking only. Bagisto core stores the value as plaintext in `core_config.value`. This is a core limitation, not an API bug.
:::
