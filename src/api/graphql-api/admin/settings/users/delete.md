---
outline: false
examples:
  - id: gql
    title: Delete Admin User
    query: |
      mutation Delete($input: deleteAdminSettingsUserInput!) {
        deleteAdminSettingsUser(input: $input) { adminSettingsUser { id } }
      }
    variables: |
      { "input": { "id": "/api/admin/settings/users/4" } }
    response: |
      { "data": { "deleteAdminSettingsUser": { "adminSettingsUser": null } } }
---

# Delete Admin User (GraphQL)

::: warning Guards
Refuses self-delete or last-admin.
:::
