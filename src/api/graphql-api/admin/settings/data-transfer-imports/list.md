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
  - id: filtered
    title: Filtered + Sorted
    description: Narrow by entity type, action and state, then sort by created_at descending. Filter args, sorting and pagination all combine in one query. Supplying multiple filters narrows the result (logical AND).
    query: |
      query ListImports(
        $first: Int
        $code: String
        $action: String
        $state: String
        $createdAtFrom: String
        $createdAtTo: String
        $sort: String
        $order: String
      ) {
        adminSettingsDataTransferImports(
          first: $first
          code: $code
          action: $action
          state: $state
          created_at_from: $createdAtFrom
          created_at_to: $createdAtTo
          sort: $sort
          order: $order
        ) {
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
        "first": 10,
        "code": "products",
        "action": "append",
        "state": "validated",
        "createdAtFrom": "2026-01-01",
        "createdAtTo": "2026-12-31",
        "sort": "created_at",
        "order": "desc"
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
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "hasPreviousPage": false,
              "startCursor": "MA==",
              "endCursor": "MA=="
            },
            "totalCount": 1
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

## Arguments

All arguments are optional and combine in a single query — filter, sort and paginate together.

### Pagination

| Argument | Description |
|----------|-------------|
| `first` | Number of records to return. |
| `after` | Cursor to fetch the page after (from `pageInfo.endCursor`). |

### Filters

Each filter narrows the result; supplying more than one combines with logical **AND**. They mirror the admin Imports datagrid filters.

| Argument | Type | Match | Example |
|----------|------|-------|---------|
| `code` | `String` | Entity type (exact). | `"products"` |
| `type` | `String` | Synonym for `code` (kept for spec compatibility). | `"products"` |
| `action` | `String` | Exact — `append` or `delete`. | `"append"` |
| `state` | `String` | Exact. | `"validated"` |
| `created_at_from` | `String` | `created_at` >= the given ISO date. | `"2026-01-01"` |
| `created_at_to` | `String` | `created_at` <= the given ISO date. | `"2026-12-31"` |

### Sorting

| Argument | Type | Values |
|----------|------|--------|
| `sort` | `String` | `id` (default), `state`, `created_at` |
| `order` | `String` | `asc`, `desc` (default `desc`) |

## Quirks

- The heavy `errors` and `summary` fields are **left null on listing rows** to keep the response light — fetch a single import with the [detail](./detail.md) query to read them.
- `code` is the entity being imported (`products`, `customers`, `tax_rates`, …). `action` is `append` or `delete`.
- `processedRowsCount` advances as the import runs; `errorsCount` / `invalidRowsCount` reflect validation outcomes.
