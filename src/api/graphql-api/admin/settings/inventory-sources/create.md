---
outline: false
examples:
  - id: gql
    title: Create Inventory Source
    query: |
      mutation Create($input: createAdminSettingsInventorySourceInput!) {
        createAdminSettingsInventorySource(input: $input) { adminSettingsInventorySource { id _id code name } }
      }
    variables: |
      { "input": { "code": "warehouse-east", "name": "East Coast Warehouse", "contactName": "Ops", "contactEmail": "ops@example.com", "contactNumber": "+15551112222", "country": "US", "state": "NY", "city": "Brooklyn", "street": "123 Front St", "postcode": "11201", "status": 1 } }
    response: |
      { "data": { "createAdminSettingsInventorySource": { "adminSettingsInventorySource": { "id": "/api/admin/settings/inventory-sources/2", "_id": 2, "code": "warehouse-east", "name": "East Coast Warehouse" } } } }
---

# Create Inventory Source (GraphQL)

Permission: `settings.inventory_sources.create`.
