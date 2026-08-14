---
outline: false
apiType: rest
examples:
  - id: list
    title: List URL Rewrites
    description: Paginated list of every URL rewrite, returned in the { data, meta } envelope.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/url-rewrites?per_page=10&page=1" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 118,
            "entityType": "cms_page",
            "requestPath": "cms-test",
            "targetPath": "testing",
            "redirectType": "301",
            "locale": "en",
            "createdAt": "2026-06-23T12:32:58+05:30",
            "updatedAt": "2026-06-23T12:32:58+05:30"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 4, "total": 38, "from": 1, "to": 10 }
      }
  - id: list-filtered
    title: Filter URL Rewrites
    description: Filter by entity type and locale, sorted by entity type. Filters compose with logical AND.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/url-rewrites?entity_type=cms_page&locale=en&sort=entity_type&order=asc" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 118,
            "entityType": "cms_page",
            "requestPath": "cms-test",
            "targetPath": "testing",
            "redirectType": "301",
            "locale": "en",
            "createdAt": "2026-06-23T12:32:58+05:30",
            "updatedAt": "2026-06-23T12:32:58+05:30"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# List URL Rewrites

Lists every URL rewrite in the store — the data behind the admin **Marketing →
Search & SEO → URL Rewrites** datagrid.

New here? Read the [URL Rewrites overview](/api/rest-api/admin/marketing/search-seo/url-rewrites/) for what a URL rewrite does and how its fields behave.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/url-rewrites` | GET |

## Response envelope

Admin collections return a `{ data, meta }` body envelope:

- `data` — the URL-rewrite rows for this page.
- `meta` — `currentPage`, `perPage`, `lastPage`, `total`, `from`, `to`.

Each row carries the full rewrite fields shown in the example.

## Query parameters

| Parameter | Description |
|-----------|-------------|
| `page`, `per_page` | Pagination (`per_page` default 10, max 50) |
| `entity_type` | `product` / `category` / `cms_page` |
| `request_path` | Source path — partial match |
| `redirect_type` | `301` (permanent) / `302` (temporary) |
| `locale` | Locale code |
| `sort`, `order` | Sort field (`id`, `entity_type`, `locale`, `redirect_type`) + `asc` / `desc` (default `id desc`) |

Filters compose with logical AND — more filters narrow the result.

Every `/api/admin/*` request requires an admin Bearer token.
