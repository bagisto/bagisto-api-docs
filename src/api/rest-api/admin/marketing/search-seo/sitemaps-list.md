---
outline: false
apiType: rest
examples:
  - id: admin-marketing-sitemaps-list
    title: List Sitemaps
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/sitemaps" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 4, "fileName": "sitemap.xml", "path": "/", "generatedAt": "2026-05-23T11:02:55+00:00" }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
---

# List Sitemaps

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/sitemaps` | GET |

## Query Parameters

`page`, `per_page` (default 10, cap 50), `file_name` (partial), `sort` (`id`, `file_name`), `order`.
