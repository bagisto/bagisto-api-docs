---
outline: false
---

# Exchange Rates

The Exchange Rates menu defines the conversion rate from your store's **base currency** to each other currency you allow. When a shopper views the storefront in a non-base currency, prices are converted using the rate stored here. It mirrors the admin **Settings → Exchange Rates** screen.

## What an exchange rate row holds

Each row links one **target currency** to a single numeric **rate**:

| Field | Meaning |
|-------|---------|
| `_id` | Numeric id of the exchange-rate row. |
| `id` | Resource IRI (e.g. `/api/admin/settings/exchange-rates/11`). |
| `targetCurrency` | Numeric id of the currency this rate converts **to**. |
| `targetCurrencyCode` | The target currency's 3-letter code (e.g. `EUR`), resolved inline for convenience. |
| `targetCurrencyName` | The target currency's display name (e.g. `Euro`), resolved inline. |
| `rate` | The multiplier applied to a base-currency price to express it in the target currency. |
| `createdAt` / `updatedAt` | ISO 8601 timestamps. |

The base currency itself has no exchange-rate row — a base-to-base rate would always be `1`.

## One rate per target currency

Each target currency may have **at most one** exchange rate. Trying to create a second rate for a currency that already has one is rejected. To change an existing currency's rate, update the existing row rather than creating a new one.

## Auto-sync — the "Update Rates" action

Instead of typing every rate by hand, the **Update Rates** action fetches live rates for all target currencies in one call from your store's **configured external rate provider** (set under the store's currency/API configuration). This is the `createAdminSettingsExchangeRateUpdateRates` mutation. It takes an empty input and refreshes every existing target currency's rate. Because it reaches out to an external service, it can fail when no provider is configured or the provider's credentials/network are unavailable — in that case the response carries an `errors` entry with the provider's message and no rates change.

## Creating, updating, deleting

- **Create** a rate by supplying a `targetCurrency` id and a `rate`.
- **Update** a rate to change its `rate` (the target currency stays fixed).
- **Delete** a single rate, or **mass-delete** several at once by their numeric ids.

Deleting a rate does not delete the currency — only the conversion entry. A target currency with no rate simply isn't offered for conversion until a rate is added (or the auto-sync supplies one).

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List exchange rates](/api/graphql-api/admin/settings/exchange-rates/list) | `adminSettingsExchangeRates` query |
| [Get a single exchange rate](/api/graphql-api/admin/settings/exchange-rates/detail) | `adminSettingsExchangeRate(id:)` query |
| [Create an exchange rate](/api/graphql-api/admin/settings/exchange-rates/create) | `createAdminSettingsExchangeRate` mutation |
| [Update an exchange rate](/api/graphql-api/admin/settings/exchange-rates/update) | `updateAdminSettingsExchangeRate` mutation |
| [Delete an exchange rate](/api/graphql-api/admin/settings/exchange-rates/delete) | `deleteAdminSettingsExchangeRate` mutation |
| [Mass delete exchange rates](/api/graphql-api/admin/settings/exchange-rates/mass-delete) | `createAdminSettingsExchangeRateMassDelete` mutation |
| [Update rates (auto-sync)](/api/graphql-api/admin/settings/exchange-rates/update-rates) | `createAdminSettingsExchangeRateUpdateRates` mutation |

Permissions: `settings.exchange_rates.create` / `.edit` / `.delete` (`update-rates` uses `.edit`).

All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
