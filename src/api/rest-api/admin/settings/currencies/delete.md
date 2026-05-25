---
outline: false
apiType: rest
examples:
  - id: admin-settings-currency-delete
    title: Delete Currency
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/settings/currencies/2" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      { "message": "Currency deleted." }
---

# Delete Currency

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/currencies/{id}` | DELETE |

::: warning Two delete guards (HTTP 400)
- **Last currency** — refuses if this is the only currency left.
- **Channel base** — refuses if any channel uses this as its `base_currency_id`.
:::

Permission: `settings.currencies.delete`.
