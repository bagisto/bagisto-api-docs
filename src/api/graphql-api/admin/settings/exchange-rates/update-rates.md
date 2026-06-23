---
outline: false
examples:
  - id: update-rates-auto-sync
    title: Update Rates (auto-sync)
    description: Refresh every target currency's rate from the store's configured external rate provider. Takes an empty input.
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
      {
        "input": {}
      }
    response: |
      {
        "errors": [
          {
            "message": "URI must be a string or UriInterface",
            "locations": [
              {
                "line": 1,
                "column": 12
              }
            ],
            "path": [
              "createAdminSettingsExchangeRateUpdateRates"
            ]
          }
        ],
        "data": {
          "createAdminSettingsExchangeRateUpdateRates": null
        }
      }
---

# Update Rates (auto-sync)

Refreshes every target currency's exchange rate in one call from the store's **configured external rate provider** — the **Update Rates** action on the Exchange Rates screen.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminSettingsExchangeRateUpdateRates(input:)` | Mutation | Sync all rates from the external provider |

## Input

The mutation takes an **empty input** (`{}`) — it refreshes all existing target currencies at once.

## Result fields

| Field | Meaning |
|-------|---------|
| `success` | Whether the sync completed. |
| `updated` | Number of exchange-rate rows present after the sync. |
| `message` | Human-readable confirmation. |

A successful sync returns, for example:

```json
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
```

## Notes

- **This action depends entirely on your store's configured external rate provider.** It reaches out to a third-party service to fetch live rates, so the outcome varies by environment. The example response above shows a real failure from a store where no provider (or its credentials) is configured — the mutation returns `null` with the provider's error under `errors`. Configure a rate provider in the store's currency/API settings before relying on this action.
- When no provider is configured or its credentials/network are unavailable, no rates change.

Permission: `settings.exchange_rates.edit`.

::: tip
All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
:::
