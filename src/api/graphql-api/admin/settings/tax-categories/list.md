---
outline: false
examples:
  - id: admin-settings-tax-categories-list
    title: List Tax Categories
    description: Page through every tax category in the store. The per-row taxRates connection is detail-only (empty on the listing) — fetch a single category to read its attached rates.
    query: |
      query AdminSettingsTaxCategories($first: Int) {
        adminSettingsTaxCategories(first: $first) {
          edges {
            cursor
            node {
              id
              _id
              code
              name
              description
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
        "first": 3
      }
    response: |
      {
        "data": {
          "adminSettingsTaxCategories": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/settings/tax-categories/32",
                  "_id": 32,
                  "code": "doc-demo-tc",
                  "name": "Documentation Demo Tax Category (Updated)",
                  "description": "Updated for docs examples",
                  "createdAt": "2026-06-19T17:47:49+05:30",
                  "updatedAt": "2026-06-19T17:48:10+05:30"
                }
              },
              {
                "cursor": "MQ==",
                "node": {
                  "id": "/api/admin/settings/tax-categories/29",
                  "_id": 29,
                  "code": "e2e_tc_hpj72b",
                  "name": "E2E Tax Cat e2e_tc_hpj72b",
                  "description": "e2e generated",
                  "createdAt": "2026-06-17T12:16:02+05:30",
                  "updatedAt": "2026-06-17T12:16:02+05:30"
                }
              },
              {
                "cursor": "Mg==",
                "node": {
                  "id": "/api/admin/settings/tax-categories/28",
                  "_id": 28,
                  "code": "e2e_tc_hp9a0w67",
                  "name": "E2E TC e2e_tc_hp9a0w67",
                  "description": "desc",
                  "createdAt": "2026-06-17T12:08:21+05:30",
                  "updatedAt": "2026-06-17T12:08:21+05:30"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "hasPreviousPage": false,
              "startCursor": "MA==",
              "endCursor": "Mg=="
            },
            "totalCount": 20
          }
        }
      }
  - id: filtered
    title: Filtered + Sorted
    description: Narrow by code and name and sort by name ascending. Filter args, sorting and pagination all combine in one query. Supplying multiple filters narrows the result (logical AND).
    query: |
      query AdminSettingsTaxCategories(
        $first: Int
        $code: String
        $name: String
        $sort: String
        $order: String
      ) {
        adminSettingsTaxCategories(
          first: $first
          code: $code
          name: $name
          sort: $sort
          order: $order
        ) {
          edges {
            cursor
            node {
              id
              _id
              code
              name
              description
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
        "code": "doc",
        "name": "Demo",
        "sort": "name",
        "order": "asc"
      }
    response: |
      {
        "data": {
          "adminSettingsTaxCategories": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/settings/tax-categories/32",
                  "_id": 32,
                  "code": "doc-demo-tc",
                  "name": "Documentation Demo Tax Category (Updated)",
                  "description": "Updated for docs examples",
                  "createdAt": "2026-06-19T17:47:49+05:30",
                  "updatedAt": "2026-06-19T17:48:10+05:30"
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

# List Tax Categories

Returns a cursor-paginated list of every tax category in the store, newest first. Each tax category is a named group of tax rates that you assign to products to determine how they are taxed.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminSettingsTaxCategories` | QueryCollection | Page through every tax category |

## Arguments

All arguments are optional and combine in a single query — filter, sort and paginate together.

### Pagination

| Argument | Description |
|----------|-------------|
| `first` | Number of records to return. |
| `after` | Cursor to fetch the page after (from `pageInfo.endCursor`). |

### Filters

Each filter narrows the result; supplying more than one combines with logical **AND**. They mirror the admin Tax Categories datagrid filters.

| Argument | Type | Match | Example |
|----------|------|-------|---------|
| `code` | `String` | Partial (contains). | `"doc"` |
| `name` | `String` | Partial (contains). | `"Demo"` |

### Sorting

| Argument | Type | Values |
|----------|------|--------|
| `sort` | `String` | `id` (default), `code`, `name` |
| `order` | `String` | `asc`, `desc` (default `desc`) |

## Fields

| Field | Meaning |
|-------|---------|
| `_id` | Numeric tax-category id — use it when referencing a category from other operations. |
| `id` | The category's resource path. |
| `code` | Unique machine code identifying the category. |
| `name` | Human-readable display name. |
| `description` | Free-text description. |
| `taxRates` | The attached tax rates connection — **detail-only**. Has empty `edges` on the listing (see the note below). |
| `createdAt` / `updatedAt` | ISO 8601 timestamps. |

::: tip taxRates is detail-only
The `taxRates` connection is **not** loaded on the listing — its `edges` are empty for every row here to keep the list query light. To read a category's attached rates, fetch the single category with the [detail query](./detail.md) and select `taxRates { edges { node { _id identifier taxRate } } }`.
:::

Pass `first` (page size) and `after` (an `endCursor` from a previous page) to paginate. `totalCount` is the total number of tax categories across all pages.
