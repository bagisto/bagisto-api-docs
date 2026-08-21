---
outline: false
apiType: rest
examples:
  - id: detail
    title: Search Synonym Detail
    description: Full payload for a single search-synonym group.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/search-synonyms/19" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "id": 19,
        "name": "shirt-group",
        "terms": "shirt,tshirt,tee",
        "createdAt": "2026-05-28T10:57:59+05:30",
        "updatedAt": "2026-05-28T10:57:59+05:30"
      }
---

# Search Synonym Detail

Returns a single search-synonym group with its full field set — the data behind
the admin **Marketing → Search & SEO → Search Synonyms** view screen.

New here? Read the [Search Synonyms overview](/api/rest-api/admin/marketing/search-seo/search-synonyms/) for what a search synonym is and how its fields behave.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/search-synonyms/{id}` | GET |

## Details

- Requires an admin Bearer token in the `Authorization` header.
- An unknown id returns a `404`.

## Response fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | int | Numeric id |
| `name` | string | Group name |
| `terms` | string | Comma-separated list of interchangeable search words |
| `createdAt` | string | Creation timestamp |
| `updatedAt` | string | Last-update timestamp |
