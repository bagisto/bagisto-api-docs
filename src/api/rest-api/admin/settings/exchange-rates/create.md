---
outline: false
apiType: rest
examples:
  - id: rest
    title: Create Exchange Rate
    query: |
      curl -X POST "https://your-domain.com/api/admin/settings/exchange-rates" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{ "target_currency": 2, "rate": 0.92 }'
    response: |
      { "id": 1, "targetCurrency": 2, "rate": 0.92 }
---

# Create Exchange Rate

## Request Body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `target_currency` | integer | yes | Currency ID. Must exist. Composite-unique on `currency_exchange_rates.target_currency`. |
| `rate` | number | yes | Must be `> 0`. |

::: tip Source currency is implicit
There is **no** `source_currency` column. The source is the channel's base currency; only the target/rate pair is stored.
:::

::: warning Auto-sync deferred
The admin "Mass Auto-Sync" action (`ExchangeRateController::updateRates`) which calls an external rate-source helper is **intentionally not exposed in v1** — wiring that requires deciding how to surface provider-side errors. Will be revisited if there's integrator demand; for now the admin UI remains the entry point.
:::

Fires `core.exchange_rate.create.before/after`. Permission: `settings.exchange_rates.create`.
