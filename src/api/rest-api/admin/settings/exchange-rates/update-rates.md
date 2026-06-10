---
outline: false
apiType: rest
examples:
  - id: rest
    title: Update Rates (auto-sync)
    query: |
      curl -X POST "https://your-domain.com/api/admin/settings/exchange-rates/update-rates" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json"
    response: |
      { "success": true, "updated": 3, "message": "Exchange rates updated successfully." }
---

# Update Rates (auto-sync)

Refreshes every non-base currency's exchange rate from the store's configured external rate provider — the API equivalent of the **Update Rates** button on the Exchange Rates screen.

- Takes no request body.
- On success returns `{ success, updated, message }`, where `updated` is the number of exchange-rate rows present after the sync.
- If the external provider fails (for example a missing or invalid API key, or a network error), the endpoint returns `422` with the provider's own error message.
- The provider is configured server-side; this endpoint does not choose or accept a provider.

Permission: `settings.exchange_rates.edit`.
