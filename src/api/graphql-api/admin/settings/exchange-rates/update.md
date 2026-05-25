---
outline: false
examples:
  - id: gql
    title: Update Exchange Rate
    query: |
      mutation Update($input: updateAdminSettingsExchangeRateInput!) {
        updateAdminSettingsExchangeRate(input: $input) { adminSettingsExchangeRate { id _id rate } }
      }
    variables: |
      { "input": { "id": "/api/admin/settings/exchange-rates/1", "rate": 0.94 } }
    response: |
      { "data": { "updateAdminSettingsExchangeRate": { "adminSettingsExchangeRate": { "id": "/api/admin/settings/exchange-rates/1", "_id": 1, "rate": 0.94 } } } }
---

# Update Exchange Rate (GraphQL)
