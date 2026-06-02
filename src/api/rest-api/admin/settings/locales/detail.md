---
outline: false
apiType: rest
examples:
  - id: rest
    title: Locale Detail
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/locales/1" -H "Authorization: Bearer <token>"
    response: |
      { "id": 1, "code": "en", "name": "English", "direction": "ltr", "logoPath": null, "logoUrl": null }
---

# Locale Detail

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/locales/{id}` | GET |
