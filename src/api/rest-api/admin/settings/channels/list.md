---
outline: false
apiType: rest
examples:
  - id: rest
    title: List Channels
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/channels" -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 1, "code": "default", "name": "Default Channel", "hostname": "store.example.com", "rootCategoryId": 1, "defaultLocaleId": 1, "baseCurrencyId": 1 }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
---

# List Channels

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/channels` | GET |
