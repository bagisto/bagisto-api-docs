---
outline: false
apiType: rest
examples:
  - id: list
    title: List Events
    description: Paginated list of every marketing event, returned in the { data, meta } envelope.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/events?per_page=10&page=1" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 14,
            "name": "Holiday Sale Kickoff",
            "description": "Email blast to all subscribers.",
            "date": "2026-12-20",
            "createdAt": "2026-05-28T10:57:24+05:30",
            "updatedAt": "2026-05-28T10:57:24+05:30"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
  - id: list-filtered
    title: Filter Events
    description: Filter by name and date range, sorted by date. Filters compose with logical AND.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/events?name=Holiday&date_from=2026-12-01&date_to=2026-12-31&sort=date&order=asc" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 14,
            "name": "Holiday Sale Kickoff",
            "description": "Email blast to all subscribers.",
            "date": "2026-12-20",
            "createdAt": "2026-05-28T10:57:24+05:30",
            "updatedAt": "2026-05-28T10:57:24+05:30"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# List Events

Lists every marketing event in the store — the data behind the admin **Marketing →
Communications → Events** datagrid.

New here? Read the [Events overview](/api/rest-api/admin/marketing/communications/events/) for what an event does and how its fields behave.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/events` | GET |

## Response envelope

Admin collections return a `{ data, meta }` body envelope:

- `data` — the event rows for this page.
- `meta` — `currentPage`, `perPage`, `lastPage`, `total`, `from`, `to`.

Each row carries the full event field set shown in the example.

## Query parameters

| Parameter | Description |
|-----------|-------------|
| `page`, `per_page` | Pagination (`per_page` default 10, max 50) |
| `name` | Name — partial match |
| `date_from`, `date_to` | Event-date range (`YYYY-MM-DD`) |
| `sort`, `order` | Sort field (`id`, `name`, `date`) + `asc` / `desc` (default `id desc`) |

Filters compose with logical AND — more filters narrow the result.

Every `/api/admin/*` request requires an admin Bearer token.
