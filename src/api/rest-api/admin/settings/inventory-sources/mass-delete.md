---
outline: false
apiType: rest
examples:
  - id: rest
    title: Mass Delete Inventory Sources
    query: |
      curl -X POST "https://your-domain.com/api/admin/settings/inventory-sources/mass-delete" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{ "indices": [3, 4] }'
    response: |
      { "deleted": [4], "skipped": [{ "id": 3, "reason": "In use by product_inventories" }], "message": "Inventory sources processed." }
---

# Mass Delete Inventory Sources

Pre-validates the whole batch: 400 if delete would leave zero sources OR if any id is referenced by `product_inventories`. Empty `indices` → 422.
