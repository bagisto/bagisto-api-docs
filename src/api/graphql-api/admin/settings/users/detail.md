---
outline: false
examples:
  - id: gql
    title: Admin User Detail
    query: |
      query AdminSettingsUser($id: ID!) {
        adminSettingsUser(id: $id) {
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
    variables: |
      {
        "id": "/api/admin/settings/users/3"
      }
    response: |
      {
        "data": {
          "adminSettingsUser": {
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
      }
---

# Get Admin User

Returns a single admin user by id, including the assigned role (`roleId` / `roleName`), active `status`, and profile image (`image` path / `imageUrl`).

The `password` and `api_token` values are never returned.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminSettingsUser(id: ID!)` | Query | Fetch one admin user |

For field meanings, create/update/delete rules, and delete guards, see the [Users overview](./).
