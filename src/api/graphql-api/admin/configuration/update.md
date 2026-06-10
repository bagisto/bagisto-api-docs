---
outline: false
examples:
  - id: update
    title: Update Configuration
    description: Bulk-upsert a code → value map under a slug. Returns the re-resolved values.
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
      {
        "input": {
          "slug": "sales.order_settings",
          "channel": "default",
          "locale": "en",
          "values": {
            "sales.order_settings.reorder.admin": "1",
            "sales.order_settings.reorder.shop": "0"
          }
        }
      }
    response: |
      {
        "data": {
          "createAdminConfigurationUpdate": {
            "adminConfigurationUpdate": {
              "slug": "sales.order_settings",
              "channel": "default",
              "locale": "en",
              "success": true,
              "message": "Configuration updated successfully.",
              "values": {
                "sales.order_settings.reorder.admin": "1",
                "sales.order_settings.reorder.shop": "0"
              }
            }
          }
        }
      }
---

# Configuration Update (GraphQL)

Mutation field: **`createAdminConfigurationUpdate`**.

Bulk-upserts every entry in `values` under the given `slug`. On success the
mutation returns the freshly-resolved values for that slug (the same shape as the
[Values](./values) query), so the client can refresh its form state without a
follow-up read. See the [Configuration overview](./) for the full flow.

::: tip Selection set
The payload wraps the result in `adminConfigurationUpdate` — select `slug`,
`success`, `message`, `channel`, `locale`, and `values` inside it.
:::

## Input

| Field | Type | Notes |
|-------|------|-------|
| `slug` | `String!` | The slug whose subtree is being written. |
| `channel` | `String` | Channel code. Defaults to the default channel. |
| `locale` | `String` | Locale code. Defaults to the app locale. |
| `values` | `Iterable!` | Map of `code → value`. Every key MUST start with `slug.`. |

## Validation

Each field's validation rules come from the schema (discovered via
[Menu](./menu)), resolved and enforced on the server — they are never trusted
from the client. Call Menu first to know which rules apply to a given code.

## Permission

Requires the admin role to carry `configuration` (or the finer-grained
`configuration.edit`), or `permission_type = "all"`.

::: warning Stay in scope
Every key in `values` must start with the supplied `slug.` prefix. A request
with `slug: "sales.order_settings"` cannot write `catalog.inventory.stock_threshold`
even if the fully-qualified key is supplied — the server rejects it before any
write.
:::

::: warning File / image fields are REST-only
GraphQL has no binary transport, so `image` / `file` fields cannot be set here.
Sending a non-string value for such a field is rejected; use the REST multipart
endpoint instead.
:::

::: warning Custom fields are read-only
Fields whose schema declares `type: "custom"` (blade-rendered in the admin)
cannot be written via the API.
:::

::: warning Password fields are stored plaintext
`type: "password"` fields are UI-masking only; the value is stored as plaintext.
This is a Bagisto core behaviour, not an API limitation.
:::
