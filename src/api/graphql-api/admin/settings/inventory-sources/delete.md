---
outline: false
examples:
  - id: admin-inventory-source-delete-gql
    title: Delete Inventory Source
    description: Delete a single inventory source. The response echoes the deleted record.
    query: |
      mutation DeleteAdminSettingsInventorySource($input: deleteAdminSettingsInventorySourceInput!) {
        deleteAdminSettingsInventorySource(input: $input) {
          adminSettingsInventorySource {
            id
            _id
            code
            name
            contactEmail
            priority
            status
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/settings/inventory-sources/62"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminSettingsInventorySource": {
            "adminSettingsInventorySource": {
              "id": "/api/admin/settings/inventory-sources/62",
              "_id": 62,
              "code": "throwaway_gqltest",
              "name": "Throwaway GQL Test",
              "contactEmail": "qa@example.com",
              "priority": 1,
              "status": 1
            }
          }
        }
      }
---

# Delete Inventory Source

Deletes a single inventory source by its IRI `id`.

::: tip How this menu works
For field meanings and the delete guards, see the [Inventory Sources overview](/api/graphql-api/admin/settings/inventory-sources/).
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminSettingsInventorySource(input:)` | Mutation | Delete an inventory source |

The `input.id` is the resource IRI. Use the [`adminSettingsInventorySources`](./list.md) query to discover valid ids.

The mutation returns the deleted record under `adminSettingsInventorySource` — its `id` (IRI), `_id` (numeric) and scalar fields all resolve, so you can confirm exactly which source was removed.

::: warning Delete guards
A delete is **refused** (error, equivalent to HTTP 422 on REST) when it would remove the **last remaining** inventory source, or when the source is still **referenced by product inventories**. Re-assign or zero out those product quantities first.
:::

Permission: `settings.inventory_sources.delete`. All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
