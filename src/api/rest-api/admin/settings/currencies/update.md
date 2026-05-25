---
outline: false
apiType: rest
examples:
  - id: admin-settings-currency-update
    title: Update Currency
    query: |
      curl -X PUT "https://your-domain.com/api/admin/settings/currencies/2" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "name": "Euro (EU)" }'
    response: |
      { "id": 2, "code": "EUR", "name": "Euro (EU)" }
---

# Update Currency

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/currencies/{id}` | PUT |

::: warning `code` is immutable
Mirrors the monolith — `code` is silently dropped from the update payload. Only `name`, `symbol`, separators, and `currency_position` are editable.
:::

Permission: `settings.currencies.edit`.
