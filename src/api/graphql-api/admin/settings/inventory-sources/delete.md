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

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a inventory source that exists in your store — use the [`adminSettingsInventorySources`](./list.md) query to discover valid ids.
:::
