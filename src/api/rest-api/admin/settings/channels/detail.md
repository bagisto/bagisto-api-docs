---
outline: false
apiType: rest
examples:
  - id: rest
    title: Channel Detail
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/channels/1" -H "Authorization: Bearer <token>"
    response: |
      { "id": 1, "code": "default", "name": "Default", "hostname": "store.example.com", "rootCategoryId": 1, "defaultLocaleId": 1, "baseCurrencyId": 1, "locales": [{ "id": 1, "code": "en" }], "currencies": [{ "id": 1, "code": "USD" }], "inventorySources": [{ "id": 1, "code": "default" }], "translations": [{ "locale": "en", "name": "Default" }] }
---

# Channel Detail

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/channels/{id}` | GET |
