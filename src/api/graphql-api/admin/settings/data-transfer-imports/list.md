---
outline: false
examples:
  - id: gql
    title: List Imports
    query: |
      query ListImports($first: Int) {
        adminSettingsDataTransferImports(first: $first) {
          edges {
            cursor
            node {
              id
              _id
              code
              action
              state
              processInQueue
              validationStrategy
              allowedErrors
              processedRowsCount
              invalidRowsCount
              errorsCount
              fieldSeparator
              filePath
              imagesDirectoryPath
              errorFilePath
              startedAt
              completedAt
              createdAt
              updatedAt
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10
      }
    response: |
      {
        "data": {
          "adminSettingsDataTransferImports": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/settings/data-transfer/imports/13",
                  "_id": 13,
                  "code": "products",
                  "action": "append",
                  "state": "validated",
                  "processInQueue": false,
                  "validationStrategy": "stop-on-errors",
                  "allowedErrors": 10,
                  "processedRowsCount": 0,
                  "invalidRowsCount": 0,
                  "errorsCount": 2,
                  "fieldSeparator": ",",
                  "filePath": "imports/695deb404dcb9_abfe03fa9c1740306b93d365d3213c217cdb1f08003dd58a400edd76729f985c.csv",
                  "imagesDirectoryPath": "",
                  "errorFilePath": null,
                  "startedAt": null,
                  "completedAt": null,
                  "createdAt": "2026-01-07T16:11:21+05:30",
                  "updatedAt": "2026-01-07T16:12:33+05:30"
                }
              },
              {
                "cursor": "MQ==",
                "node": {
                  "id": "/api/admin/settings/data-transfer/imports/12",
                  "_id": 12,
                  "code": "products",
                  "action": "append",
                  "state": "validated",
                  "processInQueue": false,
                  "validationStrategy": "stop-on-errors",
                  "allowedErrors": 10,
                  "processedRowsCount": 0,
                  "invalidRowsCount": 0,
                  "errorsCount": 2,
                  "fieldSeparator": ",",
                  "filePath": "imports/695de95e54b65_abfe03fa9c1740306b93d365d3213c217cdb1f08003dd58a400edd76729f985c.csv",
                  "imagesDirectoryPath": "",
                  "errorFilePath": null,
                  "startedAt": null,
                  "completedAt": null,
                  "createdAt": "2026-01-07T16:04:30+05:30",
                  "updatedAt": "2026-01-07T16:04:32+05:30"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "hasPreviousPage": false,
              "startCursor": "MA==",
              "endCursor": "MQ=="
            },
            "totalCount": 2
          }
        }
      }
---

# List Imports (GraphQL)

Lists every data transfer import, newest first, as a cursor-paginated connection. Each node is one import job — the file uploaded, the entity it targets, and how far it has run.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminSettingsDataTransferImports` | QueryCollection | List import jobs (cursor pagination) |

## Quirks

- The heavy `errors` and `summary` fields are **left null on listing rows** to keep the response light — fetch a single import with the [detail](./detail.md) query to read them.
- `code` is the entity being imported (`products`, `customers`, `tax_rates`, …). `action` is `append` or `delete`.
- `processedRowsCount` advances as the import runs; `errorsCount` / `invalidRowsCount` reflect validation outcomes.

All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
