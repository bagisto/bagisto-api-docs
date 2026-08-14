---
outline: false
apiType: rest
examples:
  - id: list
    title: List Email Templates
    description: Paginated list of every email template, returned in the { data, meta } envelope.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/templates?per_page=10&page=1" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 21,
            "name": "Welcome Email",
            "status": "active",
            "content": "<p>Welcome to our store!</p>",
            "createdAt": "2026-05-28T10:57:33+05:30",
            "updatedAt": "2026-05-28T10:57:33+05:30"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 3, "total": 24, "from": 1, "to": 10 }
      }
  - id: list-filtered
    title: Filter Email Templates
    description: Filter by status and name. Filters compose with logical AND.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/templates?status=active&name=Welcome&sort=name&order=asc" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 21,
            "name": "Welcome Email",
            "status": "active",
            "content": "<p>Welcome to our store!</p>",
            "createdAt": "2026-05-28T10:57:33+05:30",
            "updatedAt": "2026-05-28T10:57:33+05:30"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# List Email Templates

Lists every email template in the store — the data behind the admin **Marketing →
Communications → Email Templates** datagrid.

New here? Read the [Email Templates overview](/api/rest-api/admin/marketing/communications/templates/) for what a template does and how its fields behave.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/templates` | GET |

## Response envelope

Admin collections return a `{ data, meta }` body envelope:

- `data` — the template rows for this page.
- `meta` — `currentPage`, `perPage`, `lastPage`, `total`, `from`, `to`.

Each row carries the full template fields, including the `content` HTML body.

## Query parameters

| Parameter | Description |
|-----------|-------------|
| `page`, `per_page` | Pagination (`per_page` default 10, max 50) |
| `name` | Name — partial match |
| `status` | `active`, `inactive`, or `draft` |
| `sort`, `order` | Sort field (`id`, `name`) + `asc` / `desc` (default `id desc`) |

Filters compose with logical AND — more filters narrow the result.

Every `/api/admin/*` request requires an admin Bearer token.
