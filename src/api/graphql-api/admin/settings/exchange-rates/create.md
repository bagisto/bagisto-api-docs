---
outline: false
examples:
  - id: create-exchange-rate
    title: Create Exchange Rate
    description: Create a new exchange rate for a target currency that does not yet have one.
    query: |
      mutation CreateAdminSettingsExchangeRate($input: createAdminSettingsExchangeRateInput!) {
        createAdminSettingsExchangeRate(input: $input) {
          adminSettingsExchangeRate {
            id
            _id
            targetCurrency
            targetCurrencyCode
            targetCurrencyName
            rate
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "targetCurrency": 103,
          "rate": 0.85
        }
      }
    response: |
      {
        "data": {
          "createAdminSettingsExchangeRate": {
            "adminSettingsExchangeRate": {
              "id": "/api/admin/settings/exchange-rates/31",
              "_id": 31,
              "targetCurrency": 103,
              "targetCurrencyCode": "ZWL",
              "targetCurrencyName": "Zimbabwe Dollar",
              "rate": 0.85,
              "createdAt": "2026-06-19T17:38:29+05:30",
              "updatedAt": "2026-06-19T17:38:29+05:30"
            }
          }
        }
      }
---

# Create Exchange Rate

Creates a new exchange rate linking a target currency to a conversion `rate`.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminSettingsExchangeRate(input:)` | Mutation | Create an exchange rate |

## Input

| Field | Required | Notes |
|-------|----------|-------|
| `targetCurrency` | yes | Numeric id of an existing currency that does **not** already have a rate. |
| `rate` | yes | Positive numeric multiplier. |

## Notes

- A currency may have only **one** exchange rate. Supplying a `targetCurrency` that already has a rate is rejected with `The selected target currency is invalid.` (equivalent to HTTP 422). To change an existing rate, use [Update](./update.md) instead.

Permission: `settings.exchange_rates.create`.

