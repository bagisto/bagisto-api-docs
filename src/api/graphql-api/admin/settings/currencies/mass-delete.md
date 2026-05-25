---
outline: false
examples:
  - id: gql
    title: Mass Delete Currencies
    query: |
      mutation MassDelete($input: createAdminSettingsCurrencyMassDeleteInput!) {
        createAdminSettingsCurrencyMassDelete(input: $input) { adminSettingsCurrencyMassDelete { deleted message } }
      }
    variables: |
      { "input": { "indices": [3, 4] } }
    response: |
      { "data": { "createAdminSettingsCurrencyMassDelete": { "adminSettingsCurrencyMassDelete": { "deleted": [3, 4], "message": "Currencies deleted." } } } }
---

# Mass Delete Currencies (GraphQL)
