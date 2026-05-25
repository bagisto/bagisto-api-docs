---
outline: false
examples:
  - id: gql
    title: Create Role
    query: |
      mutation Create($input: createAdminSettingsRoleInput!) {
        createAdminSettingsRole(input: $input) { adminSettingsRole { id _id name permissionType } }
      }
    variables: |
      { "input": { "name": "Catalog Manager", "description": "Catalog only", "permission_type": "custom", "permissions": ["catalog.products.view", "catalog.products.edit"] } }
    response: |
      { "data": { "createAdminSettingsRole": { "adminSettingsRole": { "id": "/api/admin/settings/roles/3", "_id": 3, "name": "Catalog Manager", "permissionType": "custom" } } } }
---

# Create Role (GraphQL)
