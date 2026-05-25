---
outline: false
apiType: rest
examples:
  - id: admin-cms-pages-list
    title: List CMS Pages
    description: Paginated, filterable, sortable CMS pages list. Mirrors the admin CMS → Pages datagrid.
    query: |
      curl "https://your-domain.com/api/admin/cms/pages?page=1&per_page=10&sort=id&order=desc" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    variables: |
      page=1
      per_page=10
      sort=id
      order=desc
    response: |
      {
        "data": [
          {
            "id": 7,
            "urlKey": "about-us",
            "pageTitle": "About Us",
            "channel": "default",
            "locale": "en",
            "createdAt": "2026-01-12T08:15:00+00:00"
          }
        ],
        "meta": {
          "currentPage": 1,
          "perPage": 10,
          "lastPage": 3,
          "total": 24,
          "from": 1,
          "to": 10
        }
      }
---

# CMS Pages — List

Paginated CMS-pages list (datagrid parity).

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/cms/pages` | GET |

## Query parameters

| Param | Type | Notes |
|-------|------|-------|
| `page` | integer | 1-based page number (default `1`). |
| `per_page` | integer | Default `10`, max `50`. |
| `id` | integer | Filter by page ID. |
| `page_title` | string | Partial title match. |
| `url_key` | string | Partial url_key match. |
| `channel` | integer | Filter by channel ID. |
| `locale` | string | Locale code for translation resolution. |
| `sort` | string | One of `id`, `page_title`, `url_key`, `created_at`. |
| `order` | string | `asc` or `desc`. |

## Response

`200 OK` — `{ data, meta }` envelope.

| Field | Type | Notes |
|-------|------|-------|
| `data[].id` | integer | Page ID. |
| `data[].urlKey` | string | URL slug. |
| `data[].pageTitle` | string | Resolved title for the active locale. |
| `data[].channel` | string | Channel code. |
| `data[].locale` | string | Resolved locale. |
| `data[].createdAt` | string | ISO 8601. |
