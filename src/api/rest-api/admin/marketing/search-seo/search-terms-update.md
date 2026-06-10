---
outline: false
apiType: rest
examples:
  - id: admin-marketing-search-term-update
    title: Update Search Term
    query: |
      curl -X PUT "https://your-domain.com/api/admin/marketing/search-terms/1" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "term": "red shirt", "redirect_url": "https://example.com/shirts" }'
    response: |
      { "id": 1, "term": "red shirt", "redirectUrl": "https://example.com/shirts" }
---

# Update Search Term

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/search-terms/{id}` | PUT |

Admin can edit the term text and optional redirect URL. Counts (`uses` / `results`) are not editable.

## Request Body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `term` | string | yes | |
| `redirect_url` | string | no | Nullable. |
