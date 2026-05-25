---
outline: false
apiType: rest
examples:
  - id: admin-marketing-search-synonym-update
    title: Update Search Synonym
    query: |
      curl -X PUT "https://your-domain.com/api/admin/marketing/search-synonyms/1" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "terms": "shirt,tshirt,tee,polo" }'
    response: |
      { "id": 1, "name": "shirt-group", "terms": "shirt,tshirt,tee,polo" }
---

# Update Search Synonym

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/search-synonyms/{id}` | PUT |

Permission: `marketing.search_seo.search_synonyms.edit`.
