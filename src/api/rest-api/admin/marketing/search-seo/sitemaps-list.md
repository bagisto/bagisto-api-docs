---
outline: false
apiType: rest
examples:
  - id: list
    title: List Sitemaps
    description: Paginated list of every sitemap definition, returned in the { data, meta } envelope.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/sitemaps?per_page=10&page=1" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 1,
            "fileName": "sitemap.xml",
            "path": "/",
            "generatedAt": null,
            "createdAt": "2026-06-20T10:00:00+05:30",
            "updatedAt": "2026-06-20T10:00:00+05:30"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
  - id: list-filtered
    title: Filter Sitemaps
    description: Filter by file name, sorted by file name. Filters compose with logical AND.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/sitemaps?file_name=sitemap&sort=file_name&order=asc" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 1,
            "fileName": "sitemap.xml",
            "path": "/",
            "generatedAt": null,
            "createdAt": "2026-06-20T10:00:00+05:30",
            "updatedAt": "2026-06-20T10:00:00+05:30"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# List Sitemaps

Lists every sitemap definition in the store — the data behind the admin
**Marketing → Search & SEO → Sitemaps** datagrid.

New here? Read the [Sitemaps overview](/api/rest-api/admin/marketing/search-seo/sitemaps/) for what a sitemap does and how its fields behave.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/sitemaps` | GET |

## Response envelope

Admin collections return a `{ data, meta }` body envelope:

- `data` — the sitemap rows for this page.
- `meta` — `currentPage`, `perPage`, `lastPage`, `total`, `from`, `to`.

Each row carries the flat sitemap fields shown in the example. The built XML
paths — `indexFile` and `generatedSitemaps` — are served only by the
[detail](/api/rest-api/admin/marketing/search-seo/sitemaps-detail) endpoint;
they are not present on list rows. `generatedAt` stays `null` until the sitemap
has been generated at least once.

## Query parameters

| Parameter | Description |
|-----------|-------------|
| `page`, `per_page` | Pagination (`per_page` default 10, max 50) |
| `file_name` | File name — partial match |
| `sort`, `order` | Sort field (`id`, `file_name`) + `asc` / `desc` (default `id desc`) |

Filters compose with logical AND — more filters narrow the result.

Every `/api/admin/*` request requires an admin Bearer token.
