---
outline: false
examples:
  - id: gql
    title: Update Inventory Source
    query: |
      mutation Update($input: updateAdminSettingsInventorySourceInput!) {
        updateAdminSettingsInventorySource(input: $input) { adminSettingsInventorySource { id _id name } }
      }
    variables: |
      { "input": { "id": "/api/admin/settings/inventory-sources/2", "name": "East Coast (NY)" } }
    response: |
      { "data": { "updateAdminSettingsInventorySource": { "adminSettingsInventorySource": { "id": "/api/admin/settings/inventory-sources/2", "_id": 2, "name": "East Coast (NY)" } } } }
---

# Update Inventory Source (GraphQL)

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a inventory source that exists in your store — use the [`adminSettingsInventorySources`](./list.md) query to discover valid ids.
:::
