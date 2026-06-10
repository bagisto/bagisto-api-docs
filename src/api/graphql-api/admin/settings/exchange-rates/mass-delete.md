---
outline: false
examples:
  - id: gql
    title: Mass Delete Exchange Rates
    query: |
      mutation MassDelete($input: createAdminSettingsExchangeRateMassDeleteInput!) {
        createAdminSettingsExchangeRateMassDelete(input: $input) { adminSettingsExchangeRateMassDelete { deleted message } }
      }
    variables: |
      { "input": { "indices": [1, 2] } }
    response: |
      { "data": { "createAdminSettingsExchangeRateMassDelete": { "adminSettingsExchangeRateMassDelete": { "deleted": [1, 2], "message": "Exchange rates deleted." } } } }
---

# Mass Delete Exchange Rates (GraphQL)
