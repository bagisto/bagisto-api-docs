---
outline: false
examples:
  - id: gql
    title: Create Import (rejected)
    description: Creating an import requires a multipart file upload, which GraphQL cannot carry. The mutation rejects with an error directing you to the REST endpoint.
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
      {
        "input": {
          "type": "products",
          "action": "append"
        }
      }
    response: |
      {
        "errors": [
          {
            "message": "File upload over GraphQL is not supported. Use the REST endpoint instead.",
            "path": [
              "createAdminSettingsDataTransferImport"
            ]
          }
        ],
        "data": {
          "createAdminSettingsDataTransferImport": null
        }
      }
---

# Create Import (GraphQL)

::: warning REST only
Creating an import requires **uploading the source file** (CSV / XLSX / XML) as multipart form data, which cannot be carried over a JSON GraphQL request. The `createAdminSettingsDataTransferImport` mutation always **rejects** with an error pointing to the REST endpoint.

Create the import over REST: [Create Import](/api/rest-api/admin/settings/data-transfer-imports/create).
:::

Once an import row exists (created over REST), you can drive the rest of the lifecycle over GraphQL — [validate](./validate.md), [start](./start.md), [link](./link.md), [index](./index.md), poll [stats](./stats.md), and [cancel](./cancel.md).

Permission: `settings.data_transfer.imports.create`. All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
