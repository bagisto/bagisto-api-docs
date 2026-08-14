---
outline: false
apiType: rest
examples:
  - id: rest
    title: Delete Inventory Source
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/settings/inventory-sources/2" -H "Authorization: Bearer <token>"
    response: |
      { "message": "Inventory source deleted." }
---

# Delete Inventory Source

### Two guards (HTTP 400)

- **Last source** — refuses if this is the only inventory source left (parity with monolith).
- **FK guard** — refuses if `product_inventories.inventory_source_id` references it. API-specific safeguard.

Permission: `settings.inventory_sources.delete`.
