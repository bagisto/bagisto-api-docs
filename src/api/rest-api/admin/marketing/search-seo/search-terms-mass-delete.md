---
outline: false
apiType: rest
examples:
  - id: admin-marketing-search-term-mass-delete
    title: Mass Delete Search Terms
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/search-terms/mass-delete" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "indices": [12, 18] }'
    response: |
      { "deleted": [12, 18], "message": "Search terms deleted." }
---

# Mass Delete Search Terms

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/search-terms/mass-delete` | POST |

Non-existent IDs silently skipped.
