---
outline: false
apiType: rest
examples:
  - id: list
    title: List Search Terms
    description: Paginated list of every recorded search term, returned in the { data, meta } envelope.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/search-terms?per_page=10&page=1" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 106,
            "term": "Coastal Breeze QA",
            "results": 1,
            "uses": 3,
            "redirectUrl": "https://example.com/qa",
            "locale": "en",
            "createdAt": "2026-06-03T13:14:05+05:30",
            "updatedAt": "2026-06-17T12:14:07+05:30"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
  - id: list-popular
    title: Top Search Terms
    description: Sort by use count descending to surface the most-searched terms.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/search-terms?sort=uses&order=desc&channel_id=1&locale=en" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 106,
            "term": "Coastal Breeze QA",
            "results": 1,
            "uses": 3,
            "redirectUrl": "https://example.com/qa",
            "locale": "en",
            "createdAt": "2026-06-03T13:14:05+05:30",
            "updatedAt": "2026-06-17T12:14:07+05:30"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# List Search Terms

Lists every search term recorded by the storefront — the data behind the admin
**Marketing → Search & SEO → Search Terms** datagrid.

::: tip
New here? Read the [Search Terms overview](/api/rest-api/admin/marketing/search-seo/search-terms/) for what a search term is and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/search-terms` | GET |

## Response envelope

Admin collections return a `{ data, meta }` body envelope:

- `data` — the search-term rows for this page.
- `meta` — `currentPage`, `perPage`, `lastPage`, `total`, `from`, `to`.

## Query parameters

| Parameter | Description |
|-----------|-------------|
| `page`, `per_page` | Pagination (`per_page` default 10, max 50) |
| `term` | Search term — partial match |
| `channel_id` | Channel id — exact match |
| `locale` | Locale code — exact match |
| `sort`, `order` | Sort field (`id`, `term`, `uses`, `results`) + `asc` / `desc` (default `id desc`). Use `sort=uses&order=desc` for the most-searched terms |

Filters compose with logical AND — more filters narrow the result.

The `channel` object is **detail-only** — it appears on the
[detail](/api/rest-api/admin/marketing/search-seo/search-terms-detail) and update
responses and is `null` on list rows.

Every `/api/admin/*` request requires an admin Bearer token.
