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
            _id
            targetCurrency
            targetCurrencyCode
            targetCurrencyName
            rate
            message
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
              "_id": 35,
              "targetCurrency": 92,
              "targetCurrencyCode": "QDD",
              "targetCurrencyName": "Audit Demo Currency",
              "rate": 2.25,
              "message": "Exchange rate deleted successfully."
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

- The returned node is an in-memory snapshot of the just-deleted record — its scalar fields (`_id`, `targetCurrency`, `targetCurrencyCode`, `targetCurrencyName`, `rate`) still resolve so you can confirm exactly which row was removed.
- Select **`message`** for the success confirmation — it resolves to `"Exchange rate deleted successfully."` on a successful delete. `message` is `null` on read / list / create / update; a failed delete returns a top-level `errors[]` entry instead.
- Do **not** select the node's IRI `id` field on this mutation — the IRI cannot be generated for a deleted record and the field resolves with an `errors[]` entry. Select `_id` instead, as shown.
- An unknown id returns `Exchange rate not found.` (equivalent to HTTP 404).

The example uses an illustrative `id`. Replace it with a rate that exists in your store — use the [`adminSettingsExchangeRates`](./list.md) query to discover valid ids.

Permission: `settings.exchange_rates.delete`.

