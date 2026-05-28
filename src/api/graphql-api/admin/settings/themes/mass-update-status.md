---
outline: false
examples:
  - id: gql
    title: Mass Update Theme Status
    query: |
      mutation MassUpdate($input: createAdminSettingsThemeMassUpdateStatusInput!) {
      }
    variables: |
    response: |
      { "data": { "createAdminSettingsThemeMassUpdateStatus": { "adminSettingsThemeMassUpdateStatus": { "updated": [1, 2], "value": 0, "message": "Statuses updated." } } } }
---

# Mass Update Theme Status (GraphQL)
