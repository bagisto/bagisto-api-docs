---
outline: false
apiType: rest
examples:
  - id: rest
    title: Create Inventory Source
    query: |
      curl -X POST "https://your-domain.com/api/admin/settings/inventory-sources" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{ "code": "warehouse-east", "name": "East Coast Warehouse", "contact_name": "Ops", "contact_email": "east@example.com", "contact_number": "+15551112222", "country": "US", "state": "NY", "city": "Brooklyn", "street": "123 Front St", "postcode": "11201", "priority": 1, "status": 1 }'
    response: |
      { "id": 2, "code": "warehouse-east", "name": "East Coast Warehouse" }
---

# Create Inventory Source

Required: `code` (unique alpha-dash), `name`, `contact_name`, `contact_number`, `country`, `state`, `city`, `street`, `postcode`. Optional: `description`, `contact_email`, `contact_fax`, `latitude`, `longitude`, `priority`, `status` (`0`/`1`).

Fires `inventory.inventory_source.create.before/after`. Permission: `settings.inventory_sources.create`.
