---
outline: false
examples:
  - id: gql
    title: Inventory Source Detail
    query: |
      query A($id: ID!) { adminSettingsInventorySource(id: $id) { id _id code name country state city postcode priority status } }
    variables: |
      { "id": "/api/admin/settings/inventory-sources/1" }
    response: |
      { "data": { "adminSettingsInventorySource": { "id": "/api/admin/settings/inventory-sources/1", "_id": 1, "code": "default", "name": "Default Warehouse", "country": "US", "state": "IL", "city": "Springfield", "postcode": "62704", "priority": 1, "status": 1 } } }
---

# Inventory Source Detail (GraphQL)
