---
outline: false
apiType: rest
examples:
  - id: admin-marketing-search-synonyms-list
    title: List Search Synonyms
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/search-synonyms" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 1, "name": "shirt-group", "terms": "shirt,tshirt,tee" }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
---

# List Search Synonyms

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/search-synonyms` | GET |

## Query Parameters

`page`, `per_page` (default 10, cap 50), `name` (partial), `terms` (partial), `sort` (`id`, `name`), `order`.
