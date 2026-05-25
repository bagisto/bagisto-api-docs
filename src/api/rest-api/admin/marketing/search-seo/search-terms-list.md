---
outline: false
apiType: rest
examples:
  - id: admin-marketing-search-terms-list
    title: List Search Terms
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/search-terms?sort=uses&order=desc" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 1, "term": "red shirt", "results": 23, "uses": 142, "channelId": 1, "channelName": "Default", "locale": "en" }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
---

# List Search Terms

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/search-terms` | GET |

## Query Parameters

`page`, `per_page` (default 10, cap 50), `term` (partial), `channel_id`, `locale`, `sort` (`id`, `term`, `uses`, `results`), `order`.

::: warning Auto-recorded
Search terms are recorded automatically by storefront searches; there is no `POST` create endpoint. Admin only edits/deletes.
:::
