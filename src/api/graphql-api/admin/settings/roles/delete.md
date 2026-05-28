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

::: tip Prerequisites
The example role id must not be assigned to any admin. If admins are using it, deletion is refused with *"This role is assigned to one or more admins and cannot be deleted."* — reassign those admins to a different role first, or pick an unused role id.
:::
