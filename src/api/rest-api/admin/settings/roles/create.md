---
outline: false
apiType: rest
examples:
  - id: rest
    title: Create Role
    query: |
      curl -X POST "https://your-domain.com/api/admin/settings/roles" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{ "name": "Catalog Manager", "description": "Can manage catalog only", "permission_type": "custom", "permissions": ["catalog.products.view", "catalog.products.edit"] }'
    response: |
      { "id": 3, "name": "Catalog Manager", "permissionType": "custom", "permissions": ["catalog.products.view", "catalog.products.edit"] }
---

# Create Role

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | yes | |
| `description` | string | yes | |
| `permission_type` | enum | yes | `all` or `custom`. |
| `permissions` | string[] | conditional | Required when `permission_type=custom`. |

Permission: `settings.roles.create`.
