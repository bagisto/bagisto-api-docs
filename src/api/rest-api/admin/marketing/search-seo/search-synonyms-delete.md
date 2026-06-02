---
outline: false
apiType: rest
examples:
  - id: admin-marketing-search-synonym-delete
    title: Delete Search Synonym
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/marketing/search-synonyms/1" \
        -H "Authorization: Bearer <token>"
    response: |
      { "message": "Search synonym deleted." }
---

# Delete Search Synonym

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/search-synonyms/{id}` | DELETE |

Permission: `marketing.search_seo.search_synonyms.delete`.
