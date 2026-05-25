---
outline: false
apiType: rest
examples:
  - id: admin-settings-currency-detail
    title: Currency Detail
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/currencies/1" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      { "id": 1, "code": "USD", "name": "US Dollar", "symbol": "$" }
---

# Currency Detail

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/currencies/{id}` | GET |
