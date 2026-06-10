---
outline: false
examples:
  - id: gql
    title: Create Exchange Rate
    query: |
      mutation Create($input: createAdminSettingsExchangeRateInput!) {
        createAdminSettingsExchangeRate(input: $input) { adminSettingsExchangeRate { id _id targetCurrency rate } }
      }
    variables: |
      { "input": { "targetCurrency": 2, "rate": 0.92 } }
    response: |
      { "data": { "createAdminSettingsExchangeRate": { "adminSettingsExchangeRate": { "id": "/api/admin/settings/exchange-rates/1", "_id": 1, "targetCurrency": 2, "rate": 0.92 } } } }
---

# Create Exchange Rate (GraphQL)

Permission: `settings.exchange_rates.create`.
