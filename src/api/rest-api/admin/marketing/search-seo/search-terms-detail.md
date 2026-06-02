---
outline: false
apiType: rest
examples:
  - id: admin-marketing-search-term-detail
    title: Search Term Detail
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/search-terms/1" \
        -H "Authorization: Bearer <token>"
    response: |
      { "id": 1, "term": "red shirt", "results": 23, "uses": 142, "redirectUrl": null, "channelId": 1, "channelName": "Default", "locale": "en" }
---

# Search Term Detail

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/search-terms/{id}` | GET |
