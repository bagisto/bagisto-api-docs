---
outline: false
examples:
  - id: admin-inventory-source-mass-delete-gql
    title: Mass Delete Inventory Sources
    description: Delete several inventory sources by numeric id in one call.
    query: |
      mutation CreateAdminSettingsInventorySourceMassDelete($input: createAdminSettingsInventorySourceMassDeleteInput!) {
        createAdminSettingsInventorySourceMassDelete(input: $input) {
          adminSettingsInventorySourceMassDelete {
            deleted
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "indices": [64, 65]
        }
      }
    response: |
      {
        "data": {
          "createAdminSettingsInventorySourceMassDelete": {
            "adminSettingsInventorySourceMassDelete": {
              "deleted": [
                64,
                65
              ],
              "message": "Inventory sources deleted successfully."
            }
          }
        }
      }
---

# Mass Delete Inventory Sources

Deletes several inventory sources by numeric id in one call.

::: tip How this menu works
For field meanings and the delete guards, see the [Inventory Sources overview](/api/graphql-api/admin/settings/inventory-sources/).
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminSettingsInventorySourceMassDelete(input:)` | Mutation | Delete inventory sources in bulk |

`input.indices` is an array of **numeric** ids. An empty array is rejected (equivalent to HTTP 422 on REST). The same [delete guards](/api/graphql-api/admin/settings/inventory-sources/#delete-guards) apply per id — the batch is refused if it would empty the table or if any id is still referenced by product inventories.

`deleted` is a plain array of the removed numeric ids; `message` is a plain string.

Permission: `settings.inventory_sources.delete`. All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
