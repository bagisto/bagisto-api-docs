---
outline: false
examples:
  - id: gql
    title: List Admin Users
    query: |
      query AdminSettingsUsers($first: Int) {
        adminSettingsUsers(first: $first) {
          edges {
            cursor
            node {
              id
              _id
              name
              email
              roleId
              roleName
              status
              image
              imageUrl
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
          "adminSettingsUsers": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/settings/users/1919",
                  "_id": 1919,
                  "name": "Everette Reilly",
                  "email": "nikita36@gmail.com",
                  "roleId": 42,
                  "roleName": "test-6a17f774eaff8",
                  "status": 1,
                  "image": null,
                  "imageUrl": null,
                  "createdAt": "2026-05-28T13:36:13+05:30",
                  "updatedAt": "2026-05-28T13:36:13+05:30"
                }
              },
              {
                "cursor": "Nw==",
                "node": {
                  "id": "/api/admin/settings/users/3",
                  "_id": 3,
                  "name": "Admin",
                  "email": "admin@example.com",
                  "roleId": 1,
                  "roleName": "Administrator",
                  "status": 1,
                  "image": null,
                  "imageUrl": null,
                  "createdAt": "2026-01-02T17:24:30+05:30",
                  "updatedAt": "2026-06-05T10:40:17+05:30"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "hasPreviousPage": false,
              "startCursor": "MA==",
              "endCursor": "Nw=="
            },
            "totalCount": 8
          }
        }
      }
  - id: filtered
    title: Filtered + Sorted
    description: Narrow by name and status and sort by name ascending. Filter args, sorting and pagination all combine in one query. Supplying multiple filters narrows the result (logical AND).
    query: |
      query AdminSettingsUsers(
        $first: Int
        $name: String
        $email: String
        $role_id: Int
        $status: Int
        $sort: String
        $order: String
      ) {
        adminSettingsUsers(
          first: $first
          name: $name
          email: $email
          role_id: $role_id
          status: $status
          sort: $sort
          order: $order
        ) {
          edges {
            cursor
            node {
              id
              _id
              name
              email
              roleId
              roleName
              status
              image
              imageUrl
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
        "name": "Admin",
        "status": 1,
        "sort": "name",
        "order": "asc"
      }
    response: |
      {
        "data": {
          "adminSettingsUsers": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/settings/users/3",
                  "_id": 3,
                  "name": "Admin",
                  "email": "admin@example.com",
                  "roleId": 1,
                  "roleName": "Administrator",
                  "status": 1,
                  "image": null,
                  "imageUrl": null,
                  "createdAt": "2026-01-02T17:24:30+05:30",
                  "updatedAt": "2026-06-05T10:40:17+05:30"
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

# List Admin Users

Returns the paginated list of admin users — the back-office accounts that can sign in to the admin panel. Each row carries its assigned role (`roleId` / `roleName`) and active `status`.

The `password` and `api_token` values are never returned by any user operation.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminSettingsUsers` | QueryCollection | List admin users with cursor pagination |

## Arguments

All arguments are optional and combine in a single query — filter, sort and paginate together.

### Pagination

| Argument | Description |
|----------|-------------|
| `first` | Number of records to return. |
| `after` | Cursor to fetch the page after (from `pageInfo.endCursor`). |

### Filters

Each filter narrows the result; supplying more than one combines with logical **AND**. They mirror the admin Users datagrid filters.

| Argument | Type | Match | Example |
|----------|------|-------|---------|
| `name` | `String` | Partial (contains). | `"Admin"` |
| `email` | `String` | Partial (contains). | `"@example.com"` |
| `role_id` | `Int` | Exact — the assigned role id. | `1` |
| `status` | `Int` | Exact — `1` (active) or `0` (inactive). | `1` |

### Sorting

| Argument | Type | Values |
|----------|------|--------|
| `sort` | `String` | `id` (default), `name`, `email` |
| `order` | `String` | `asc`, `desc` (default `desc`) |

For field meanings, create/update/delete rules, and delete guards, see the [Users overview](./).
