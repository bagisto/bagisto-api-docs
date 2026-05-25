---
outline: false
apiType: rest
examples:
  - id: admin-marketing-search-synonym-create
    title: Create Search Synonym
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/search-synonyms" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "name": "shirt-group", "terms": "shirt,tshirt,tee" }'
    response: |
      { "id": 1, "name": "shirt-group", "terms": "shirt,tshirt,tee" }
---

# Create Search Synonym

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/search-synonyms` | POST |

## Request Body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | yes | |
| `terms` | string | yes | Comma-separated synonyms. |

Permission: `marketing.search_seo.search_synonyms.create`.
