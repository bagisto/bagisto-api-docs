---
outline: false
apiType: rest
examples:
  - id: admin-marketing-search-synonym-mass-delete
    title: Mass Delete Search Synonyms
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/search-synonyms/mass-delete" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "indices": [12, 18] }'
    response: |
      { "deleted": [12, 18], "message": "Search synonyms deleted." }
---

# Mass Delete Search Synonyms

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/search-synonyms/mass-delete` | POST |

Non-existent IDs silently skipped.
