---
outline: false
examples:
  - id: gql
    title: Delete Inventory Source
    query: |
      mutation Delete($input: deleteAdminSettingsInventorySourceInput!) {
        deleteAdminSettingsInventorySource(input: $input) { adminSettingsInventorySource { id } }
      }
    variables: |
      { "input": { "id": "/api/admin/settings/inventory-sources/2" } }
    response: |
      { "data": { "deleteAdminSettingsInventorySource": { "adminSettingsInventorySource": null } } }
---

# Delete Inventory Source (GraphQL)

::: warning Guards
Refuses if last source or referenced by `product_inventories`.
:::
