---
outline: false
examples:
  - id: update-exchange-rate
    title: Update Exchange Rate
    description: Change the rate of an existing exchange rate. The target currency stays fixed.
    query: |
      mutation UpdateAdminSettingsExchangeRate($input: updateAdminSettingsExchangeRateInput!) {
        updateAdminSettingsExchangeRate(input: $input) {
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
          "id": "/api/admin/settings/exchange-rates/31",
          "rate": 0.88
        }
      }
    response: |
      {
        "data": {
          "updateAdminSettingsExchangeRate": {
            "adminSettingsExchangeRate": {
              "id": "/api/admin/settings/exchange-rates/31",
              "_id": 31,
              "targetCurrency": 103,
              "targetCurrencyCode": "ZWL",
              "targetCurrencyName": "Zimbabwe Dollar (RTGS)",
              "rate": 0.88,
              "createdAt": "2026-06-19T17:38:29+05:30",
              "updatedAt": "2026-06-19T17:38:40+05:30"
            }
          }
        }
      }
---

# Update Exchange Rate

Updates an existing exchange rate's `rate`. The target currency is fixed at creation and is not changed by this mutation.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `updateAdminSettingsExchangeRate(input:)` | Mutation | Update an exchange rate's value |

## Input

| Field | Required | Notes |
|-------|----------|-------|
| `id` | yes | IRI of the exchange rate to update. |
| `rate` | yes | New positive numeric multiplier. |

The example uses an illustrative `id`. Replace it with a rate that exists in your store — use the [`adminSettingsExchangeRates`](./list.md) query to discover valid ids.

Permission: `settings.exchange_rates.edit`.

