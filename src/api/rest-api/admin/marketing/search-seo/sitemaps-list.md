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
            "channels": [1],
            "urls": [
              "https://example.com/storage/sitemaps/default/sitemap-1-1.xml"
            ],
            "generatedAt": null,
            "createdAt": "2026-06-20T10:00:00+05:30",
            "updatedAt": "2026-06-20T10:00:00+05:30"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
  - id: list-filtered
    title: Filter Sitemaps
    description: Filter by file name and channel, sorted by file name. Filters compose with logical AND.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/sitemaps?file_name=sitemap&channel_id=1&sort=file_name&order=asc" \
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
            "channels": [1],
            "urls": [
              "https://example.com/storage/sitemaps/default/sitemap-1-1.xml"
            ],
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

Each row carries the flat sitemap fields shown in the example, the `channels` it
covers and the public index `urls` for them. What the last generate run wrote —
`generatedFiles` — is served only by the
[detail](/api/rest-api/admin/marketing/search-seo/sitemaps-detail) endpoint;
it is not present on list rows. `generatedAt` stays `null` until the sitemap
has been generated at least once.

## Query parameters

| Parameter | Description |
|-----------|-------------|
| `page`, `per_page` | Pagination (`per_page` default 10, max 50) |
| `file_name` | File name — partial match |
| `channel_id` | Only sitemaps covering this channel |
| `sort`, `order` | Sort field (`id`, `file_name`) + `asc` / `desc` (default `id desc`) |

Filters compose with logical AND — more filters narrow the result.

Every `/api/admin/*` request requires an admin Bearer token.
