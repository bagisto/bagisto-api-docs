---
outline: false
examples:
  - id: gql
    title: Mass Update Theme Status
    query: |
      mutation MassUpdate($input: createAdminSettingsThemeMassUpdateStatusInput!) {
        createAdminSettingsThemeMassUpdateStatus(input: $input) { adminSettingsThemeMassUpdateStatus { updated value message } }
      }
    variables: |
      { "input": { "indices": [1, 2], "value": 0 } }
    response: |
      { "data": { "createAdminSettingsThemeMassUpdateStatus": { "adminSettingsThemeMassUpdateStatus": { "updated": [1, 2], "value": 0, "message": "Statuses updated." } } } }
---

# Mass Update Theme Status (GraphQL)
