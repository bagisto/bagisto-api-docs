---
outline: false
examples:
  - id: gql
    title: Mass Delete Locales
    query: |
      mutation MassDelete($input: createAdminSettingsLocaleMassDeleteInput!) {
        createAdminSettingsLocaleMassDelete(input: $input) { adminSettingsLocaleMassDelete { deleted skipped message } }
      }
    variables: |
      { "input": { "indices": [3, 4] } }
    response: |
      { "data": { "createAdminSettingsLocaleMassDelete": { "adminSettingsLocaleMassDelete": { "deleted": [4], "skipped": [{ "id": 3, "reason": "Channel default" }], "message": "Locales processed." } } } }
---

# Mass Delete Locales (GraphQL)
