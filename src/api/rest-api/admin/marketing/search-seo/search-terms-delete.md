---
outline: false
apiType: rest
examples:
  - id: admin-marketing-search-term-delete
    title: Delete Search Term
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/marketing/search-terms/1" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      { "message": "Search term deleted." }
---

# Delete Search Term

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/search-terms/{id}` | DELETE |
