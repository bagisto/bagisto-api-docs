---
outline: false
apiType: rest
examples:
  - id: rest
    title: Update Inventory Source
    query: |
      curl -X PUT "https://your-domain.com/api/admin/settings/inventory-sources/2" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{ "name": "East Coast Warehouse (NY)" }'
    response: |
      { "id": 2, "name": "East Coast Warehouse (NY)" }
---

# Update Inventory Source

Partial. `code` uniqueness excludes self. Permission: `settings.inventory_sources.edit`.
