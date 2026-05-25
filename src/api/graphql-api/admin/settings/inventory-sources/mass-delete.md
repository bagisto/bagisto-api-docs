---
outline: false
examples:
  - id: gql
    title: Mass Delete Inventory Sources
    query: |
      mutation MassDelete($input: createAdminSettingsInventorySourceMassDeleteInput!) {
        createAdminSettingsInventorySourceMassDelete(input: $input) { adminSettingsInventorySourceMassDelete { deleted skipped message } }
      }
    variables: |
      { "input": { "indices": [3, 4] } }
    response: |
      { "data": { "createAdminSettingsInventorySourceMassDelete": { "adminSettingsInventorySourceMassDelete": { "deleted": [4], "skipped": [{ "id": 3, "reason": "In use" }], "message": "Inventory sources processed." } } } }
---

# Mass Delete Inventory Sources (GraphQL)
