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
---

# List Admin Users

Returns the paginated list of admin users — the back-office accounts that can sign in to the admin panel. Each row carries its assigned role (`roleId` / `roleName`) and active `status`.

The `password` and `api_token` values are never returned by any user operation.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminSettingsUsers(first: Int)` | QueryCollection | List admin users with cursor pagination |

::: tip Overview
For field meanings, create/update/delete rules, and delete guards, see the [Users overview](./).
:::

All admin endpoints require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
