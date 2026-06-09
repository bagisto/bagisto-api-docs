---
outline: false
examples:
  - id: gql
    title: Create Import (rejected)
    description: Creating an import requires a file upload, which GraphQL cannot carry. The mutation returns an error directing you to the REST endpoint.
    query: |
      mutation CreateImport($input: createAdminSettingsDataTransferImportInput!) {
        createAdminSettingsDataTransferImport(input: $input) {
          adminSettingsDataTransferImport {
            id
            state
          }
        }
      }
    variables: |
      { "input": { "type": "products", "action": "append" } }
    response: |
      { "errors": [{ "message": "Importing files is only supported over the REST API. Use POST /api/admin/settings/data-transfer/imports." }] }
---

# Create Import (GraphQL)

::: warning Use the REST endpoint
Creating an import requires uploading a file, which cannot be done over GraphQL. The GraphQL `create` mutation returns an error pointing to the REST endpoint.

Use the REST [Create Import](/api/rest-api/admin/settings/data-transfer-imports/create) endpoint instead.
:::

Once an import exists, you can validate, start, link, index, and read its stats over GraphQL.

Permission: `settings.data_transfer.imports.create`.
