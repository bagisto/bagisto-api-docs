---
outline: false
apiType: rest
examples:
  - id: rest
    title: Update Role
    query: |
      curl -X PUT "https://your-domain.com/api/admin/settings/roles/3" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{ "name": "Catalog Manager+", "description": "Updated", "permission_type": "custom", "permissions": ["catalog.products.view", "catalog.products.edit", "catalog.categories.view"] }'
    response: |
      { "id": 3, "name": "Catalog Manager+", "permissions": ["catalog.products.view", "catalog.products.edit", "catalog.categories.view"] }
---

# Update Role
