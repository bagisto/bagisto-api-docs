---
outline: false
examples:
  - id: gql
    title: Delete Role
    query: |
      mutation Delete($input: deleteAdminSettingsRoleInput!) {
        deleteAdminSettingsRole(input: $input) { adminSettingsRole { id } }
      }
    variables: |
      { "input": { "id": "/api/admin/settings/roles/3" } }
    response: |
      { "data": { "deleteAdminSettingsRole": { "adminSettingsRole": null } } }
---

# Delete Role (GraphQL)

::: warning Guards
Refuses if in use by admins or last role.
:::
