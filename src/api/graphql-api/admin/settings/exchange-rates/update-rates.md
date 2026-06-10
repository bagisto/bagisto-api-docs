---
outline: false
examples:
  - id: gql
    title: Update Rates (auto-sync)
    query: |
      mutation UpdateRates($input: createAdminSettingsExchangeRateUpdateRatesInput!) {
        createAdminSettingsExchangeRateUpdateRates(input: $input) {
          adminSettingsExchangeRateUpdateRates {
            success
            updated
            message
          }
        }
      }
    variables: |
      { "input": {} }
    response: |
      {
        "data": {
          "createAdminSettingsExchangeRateUpdateRates": {
            "adminSettingsExchangeRateUpdateRates": {
              "success": true,
              "updated": 3,
              "message": "Exchange rates updated successfully."
            }
          }
        }
      }
---

# Update Rates (auto-sync) — GraphQL

Refreshes every non-base currency's exchange rate from the store's configured external rate provider — the **Update Rates** action on the Exchange Rates screen.

- The mutation takes an empty input.
- `updated` is the number of exchange-rate rows present after the sync.
- If the external provider fails (missing/invalid API key, network error), the response carries an `errors` entry with the provider's message.

Permission: `settings.exchange_rates.edit`.
