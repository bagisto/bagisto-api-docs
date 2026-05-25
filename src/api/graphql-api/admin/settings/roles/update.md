---
outline: false
examples:
  - id: gql
    title: Update Role
    query: |
      mutation Update($input: updateAdminSettingsRoleInput!) {
        updateAdminSettingsRole(input: $input) { adminSettingsRole { id _id name } }
      }
    variables: |
      { "input": { "id": "/api/admin/settings/roles/3", "name": "Catalog Manager+", "description": "Updated", "permission_type": "custom", "permissions": ["catalog.products.view", "catalog.products.edit"] } }
    response: |
      { "data": { "updateAdminSettingsRole": { "adminSettingsRole": { "id": "/api/admin/settings/roles/3", "_id": 3, "name": "Catalog Manager+" } } } }
---

# Update Role (GraphQL)
