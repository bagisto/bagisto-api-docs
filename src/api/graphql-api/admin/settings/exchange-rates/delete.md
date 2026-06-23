---
outline: false
examples:
  - id: delete-exchange-rate
    title: Delete Exchange Rate
    description: Delete a single exchange rate by its IRI. The deleted record is returned in the response.
    query: |
      mutation DeleteAdminSettingsExchangeRate($input: deleteAdminSettingsExchangeRateInput!) {
        deleteAdminSettingsExchangeRate(input: $input) {
          adminSettingsExchangeRate {
            id
            _id
            targetCurrency
            targetCurrencyCode
            targetCurrencyName
            rate
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/settings/exchange-rates/35"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminSettingsExchangeRate": {
            "adminSettingsExchangeRate": {
              "id": "/api/admin/settings/exchange-rates/35",
              "_id": 35,
              "targetCurrency": 92,
              "targetCurrencyCode": "QDD",
              "targetCurrencyName": "Audit Demo Currency",
              "rate": 2.25
            }
          }
        }
      }
---

# Delete Exchange Rate

Removes a single exchange rate. The currency itself is not affected — only the conversion entry is deleted.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminSettingsExchangeRate(input:)` | Mutation | Delete one exchange rate |

## Input

| Field | Required | Notes |
|-------|----------|-------|
| `id` | yes | IRI of the exchange rate to delete. |

## Notes

- On success the response returns the deleted record so you can confirm exactly which row was removed — `id`, `_id`, `targetCurrency`, `targetCurrencyCode`, `targetCurrencyName`, and `rate` all resolve from the deleted row.
- An unknown id returns `Exchange rate not found.` (equivalent to HTTP 404).

::: tip Prerequisites
The example uses an illustrative `id`. Replace it with a rate that exists in your store — use the [`adminSettingsExchangeRates`](./list.md) query to discover valid ids.
:::

Permission: `settings.exchange_rates.delete`.

::: tip
All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
:::
