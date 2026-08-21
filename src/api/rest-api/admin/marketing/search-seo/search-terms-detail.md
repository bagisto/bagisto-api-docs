---
outline: false
apiType: rest
examples:
  - id: detail
    title: Search Term Detail
    description: Full payload for a single search term, including its result count and use count.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/search-terms/106" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "id": 106,
        "term": "Coastal Breeze QA",
        "results": 1,
        "uses": 3,
        "redirectUrl": "https://example.com/qa",
        "channel": {
          "id": 1,
          "code": "default",
          "name": "Default"
        },
        "locale": "en",
        "createdAt": "2026-06-03T13:14:05+05:30",
        "updatedAt": "2026-06-17T12:14:07+05:30"
      }
---

# Search Term Detail

Returns a single search term with its full field set — the data behind the admin
**Marketing → Search & SEO → Search Terms** view screen.

New here? Read the [Search Terms overview](/api/rest-api/admin/marketing/search-seo/search-terms/) for what a search term is and how its fields behave.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/search-terms/{id}` | GET |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- An unknown id returns a `404`.

## Response fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | int | Numeric id |
| `term` | string | The text shoppers searched for |
| `results` | int | Number of products the search returned — storefront-recorded, read-only |
| `uses` | int | Number of times the term was searched — storefront-recorded, read-only |
| `redirectUrl` | string | Optional URL the storefront redirects this query to, or `null` |
| `channel` | object | The channel the term was recorded on — `{ id, code, name }`. Detail-only (`null` on list rows) |
| `locale` | string | Locale code the term was recorded on |
| `createdAt` | string | Creation timestamp |
| `updatedAt` | string | Last-update timestamp |
