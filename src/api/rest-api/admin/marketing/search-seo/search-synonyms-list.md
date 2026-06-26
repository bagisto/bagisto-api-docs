---
outline: false
apiType: rest
examples:
  - id: list
    title: List Search Synonyms
    description: Paginated list of every search-synonym group, returned in the { data, meta } envelope.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/search-synonyms?per_page=10&page=1" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 19,
            "name": "shirt-group",
            "terms": "shirt,tshirt,tee",
            "createdAt": "2026-05-28T10:57:59+05:30",
            "updatedAt": "2026-05-28T10:57:59+05:30"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
  - id: list-filtered
    title: Filter Search Synonyms
    description: Filter by name and contained terms. Filters compose with logical AND.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/search-synonyms?name=shirt&terms=tee&sort=name&order=asc" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 19,
            "name": "shirt-group",
            "terms": "shirt,tshirt,tee",
            "createdAt": "2026-05-28T10:57:59+05:30",
            "updatedAt": "2026-05-28T10:57:59+05:30"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# List Search Synonyms

Lists every search-synonym group in the store — the data behind the admin
**Marketing → Search & SEO → Search Synonyms** datagrid.

::: tip
New here? Read the [Search Synonyms overview](/api/rest-api/admin/marketing/search-seo/search-synonyms/) for what a search synonym is and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/search-synonyms` | GET |

## Response envelope

Admin collections return a `{ data, meta }` body envelope:

- `data` — the search-synonym rows for this page.
- `meta` — `currentPage`, `perPage`, `lastPage`, `total`, `from`, `to`.

## Query parameters

| Parameter | Description |
|-----------|-------------|
| `page`, `per_page` | Pagination (`per_page` default 10, max 50) |
| `name` | Group name — partial match |
| `terms` | Contained terms — partial match |
| `sort`, `order` | Sort field (`id`, `name`) + `asc` / `desc` (default `id desc`) |

Filters compose with logical AND — more filters narrow the result.

Every `/api/admin/*` request requires an admin Bearer token.
