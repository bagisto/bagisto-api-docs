---
outline: false
examples:
  - id: gql
    title: List Roles
    query: |
      query ListRoles($first: Int) {
        adminSettingsRoles(first: $first) {
          edges {
            cursor
            node {
              id
              _id
              name
              description
              permissionType
              permissions
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
          "adminSettingsRoles": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/settings/roles/68",
                  "_id": 68,
                  "name": "Anything but Sales",
                  "description": "Permission to access all menu except sales menu",
                  "permissionType": "custom",
                  "permissions": [
                    "dashboard",
                    "catalog",
                    "catalog.products",
                    "catalog.products.create",
                    "catalog.products.edit",
                    "catalog.products.delete"
                  ],
                  "createdAt": "2026-06-04T11:12:21+05:30",
                  "updatedAt": "2026-06-04T11:12:21+05:30"
                }
              },
              {
                "cursor": "Mw==",
                "node": {
                  "id": "/api/admin/settings/roles/3",
                  "_id": 3,
                  "name": "Catalogue manager",
                  "description": "This is catalogue manager and permissions are added accordingly",
                  "permissionType": "custom",
                  "permissions": [
                    "catalog",
                    "catalog.products",
                    "catalog.products.create",
                    "catalog.products.edit"
                  ],
                  "createdAt": "2026-05-13T18:30:58+05:30",
                  "updatedAt": "2026-05-13T18:30:58+05:30"
                }
              },
              {
                "cursor": "NQ==",
                "node": {
                  "id": "/api/admin/settings/roles/1",
                  "_id": 1,
                  "name": "Administrator",
                  "description": "Administrator role",
                  "permissionType": "all",
                  "permissions": null,
                  "createdAt": null,
                  "updatedAt": null
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "hasPreviousPage": false,
              "startCursor": "MA==",
              "endCursor": "NQ=="
            },
            "totalCount": 6
          }
        }
      }
  - id: filtered
    title: Filtered + Sorted
    description: Narrow by name and permission type and sort by name ascending. Filter args, sorting and pagination all combine in one query. Supplying multiple filters narrows the result (logical AND).
    query: |
      query ListRoles(
        $first: Int
        $name: String
        $permission_type: String
        $sort: String
        $order: String
      ) {
        adminSettingsRoles(
          first: $first
          name: $name
          permission_type: $permission_type
          sort: $sort
          order: $order
        ) {
          edges {
            cursor
            node {
              id
              _id
              name
              description
              permissionType
              permissions
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
        "name": "Catalog",
        "permission_type": "custom",
        "sort": "name",
        "order": "asc"
      }
    response: |
      {
        "data": {
          "adminSettingsRoles": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/settings/roles/3",
                  "_id": 3,
                  "name": "Catalogue manager",
                  "description": "This is catalogue manager and permissions are added accordingly",
                  "permissionType": "custom",
                  "permissions": [
                    "catalog",
                    "catalog.products",
                    "catalog.products.create",
                    "catalog.products.edit"
                  ],
                  "createdAt": "2026-05-13T18:30:58+05:30",
                  "updatedAt": "2026-05-13T18:30:58+05:30"
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

# List Roles (GraphQL)

Returns the paginated list of admin roles. A role is a named permission set assigned to admin users to control which areas of the admin panel they can access.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminSettingsRoles` | QueryCollection | List all roles (cursor-paginated) |

## Arguments

All arguments are optional and combine in a single query — filter, sort and paginate together.

### Pagination

| Argument | Description |
|----------|-------------|
| `first` | Number of records to return. |
| `after` | Cursor to fetch the page after (from `pageInfo.endCursor`). |

### Filters

Each filter narrows the result; supplying more than one combines with logical **AND**. They mirror the admin Roles datagrid filters.

| Argument | Type | Match | Example |
|----------|------|-------|---------|
| `name` | `String` | Partial (contains). | `"Catalog"` |
| `permission_type` | `String` | Exact — `all` or `custom`. | `"custom"` |

### Sorting

| Argument | Type | Values |
|----------|------|--------|
| `sort` | `String` | `id` (default), `name` |
| `order` | `String` | `asc`, `desc` (default `desc`) |

## Quirks

- `permissions` is a **string array** of permission keys for a `custom` role. For an `all` role it is `null` (full access — no explicit key list is stored).
- The example trims the `permissions` list to a few entries; a real `custom` role can hold over a hundred keys.
- The seeded **Administrator** role (`_id: 1`) has `null` timestamps — it predates timestamp tracking.
- Page forward with `first` + `after` (pass the previous response's `endCursor`); `totalCount` is the unfiltered total.

