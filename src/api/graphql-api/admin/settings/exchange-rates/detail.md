---
outline: false
examples:
  - id: exchange-rate-detail
    title: Exchange Rate Detail
    description: Fetch a single exchange rate by its IRI.
    query: |
      query AdminSettingsExchangeRate($id: ID!) {
        adminSettingsExchangeRate(id: $id) {
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
    variables: |
      {
        "id": "/api/admin/settings/exchange-rates/11"
      }
    response: |
      {
        "data": {
          "adminSettingsExchangeRate": {
            "id": "/api/admin/settings/exchange-rates/11",
            "_id": 11,
            "targetCurrency": 27,
            "targetCurrencyCode": "PSH",
            "targetCurrencyName": "E2E PSH",
            "rate": 1.23,
            "createdAt": "2026-05-26T13:01:36+05:30",
            "updatedAt": "2026-05-26T13:01:36+05:30"
          }
        }
      }
---

# Exchange Rate Detail

Fetches a single exchange rate by its IRI, returning every field including the resolved target currency code/name.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminSettingsExchangeRate(id: ID!)` | Query | Fetch one exchange rate by IRI |

::: tip Prerequisites
The example uses an illustrative `id`. Replace it with a rate that exists in your store — use the [`adminSettingsExchangeRates`](./list.md) query to discover valid ids. An unknown id returns an `errors` entry equivalent to HTTP 404.
:::

::: tip
All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
:::
