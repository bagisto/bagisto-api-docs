---
outline: false
apiType: rest
examples:
  - id: admin-marketing-search-synonym-detail
    title: Search Synonym Detail
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/search-synonyms/1" \
        -H "Authorization: Bearer <token>"
    response: |
      { "id": 1, "name": "shirt-group", "terms": "shirt,tshirt,tee" }
---

# Search Synonym Detail

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/search-synonyms/{id}` | GET |
