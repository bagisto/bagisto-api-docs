---
outline: false
apiType: rest
examples:
  - id: admin-settings-currency-mass-delete
    title: Mass Delete Currencies
    query: |
      curl -X POST "https://your-domain.com/api/admin/settings/currencies/mass-delete" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "indices": [3, 4] }'
    response: |
      { "deleted": [3, 4], "message": "Currencies deleted." }
---

# Mass Delete Currencies

::: warning Whole-batch pre-validation
Rejects with HTTP 400 if the batch would empty the currencies table OR if any id is a channel `base_currency_id`. Non-existent IDs silently skipped. Empty `indices` → 422.
:::

Permission: `settings.currencies.delete`.
