---
outline: false
examples:
  - id: gql
    title: Cancel Import
    description: Aborts a pending or processing import. The field name follows API Platform naming — clients typically alias it.
    query: |
      mutation CancelImport($input: cancelAdminSettingsDataTransferImportCancelInput!) {
        cancelAdminSettingsDataTransferImportCancel(input: $input) {
          adminSettingsDataTransferImportCancel {
            _id
            state
            message
            success
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/settings/data-transfer/imports/3/cancel",
          "importId": 3
        }
      }
    response: |
      {
        "data": {
          "cancelAdminSettingsDataTransferImportCancel": {
            "adminSettingsDataTransferImportCancel": {
              "_id": 3,
              "state": "cancelled",
              "message": "Import cancelled successfully.",
              "success": true
            }
          }
        }
      }
---

# Cancel Import (GraphQL)

Aborts an import that is still running. Sets its `state` to `cancelled`.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `cancelAdminSettingsDataTransferImportCancel` | Mutation | Cancel a pending/processing import |

::: warning Cancellable states
Only `pending` or `processing` imports can be cancelled. Any other state (e.g. `validated`, `processed`, `completed`, already `cancelled`) is refused with an `errors[]` entry naming the current state.
:::

## Quirks

- The input takes the import's `importId` **and** an `id` (the cancel IRI) — API Platform requires the `id` field on every non-create mutation.
- Select `_id` for the numeric import id; the payload `id` IRI does not resolve on mutation results.

::: tip Prerequisites
The example uses an illustrative import. Replace it with a pending/processing import in your store — use the [`adminSettingsDataTransferImports`](./list.md) query to discover valid ids.
:::

Permission: `settings.data_transfer.imports.edit`. All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
