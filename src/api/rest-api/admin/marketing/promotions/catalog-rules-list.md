---
outline: false
apiType: rest
examples:
  - id: list
    title: List Catalog Rules
    description: Paginated list of every catalog rule, returned in the { data, meta } envelope.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/catalog-rules?per_page=10&page=1" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 126,
            "name": "Summer Collection 10% Off",
            "description": "Sitewide 10% off the summer collection",
            "startsFrom": null,
            "endsTill": null,
            "status": 1,
            "sortOrder": 0,
            "conditionType": 1,
            "endOtherRules": 0,
            "actionType": "by_percent",
            "discountAmount": 10,
            "createdAt": "2026-06-17T12:13:15+05:30",
            "updatedAt": "2026-06-17T12:13:15+05:30"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 4, "total": 38, "from": 1, "to": 10 }
      }
  - id: list-filtered
    title: Filter Catalog Rules
    description: Filter by status and name, sorted by priority. Filters compose with logical AND.
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/catalog-rules?status=1&name=Summer&sort=sort_order&order=asc" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 126,
            "name": "Summer Collection 10% Off",
            "description": "Sitewide 10% off the summer collection",
            "startsFrom": null,
            "endsTill": null,
            "status": 1,
            "sortOrder": 0,
            "conditionType": 1,
            "endOtherRules": 0,
            "actionType": "by_percent",
            "discountAmount": 10,
            "createdAt": "2026-06-17T12:13:15+05:30",
            "updatedAt": "2026-06-17T12:13:15+05:30"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# List Catalog Rules

Lists every catalog rule in the store — the data behind the admin **Marketing →
Promotions → Catalog Rules** datagrid.

::: tip
New here? Read the [Catalog Rules overview](/api/rest-api/admin/marketing/promotions/catalog-rules/) for what a catalog rule does and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/catalog-rules` | GET |

## Response envelope

Admin collections return a `{ data, meta }` body envelope:

- `data` — the catalog-rule rows for this page.
- `meta` — `currentPage`, `perPage`, `lastPage`, `total`, `from`, `to`.

Each row carries the flat rule fields shown in the example. The heavier
`conditions`, `channels`, and `customerGroups` are served only by the
[detail](/api/rest-api/admin/marketing/promotions/catalog-rules-detail) endpoint —
they are `null` on list rows.

## Query parameters

| Parameter | Description |
|-----------|-------------|
| `page`, `per_page` | Pagination (`per_page` default 10, max 50) |
| `id` | Single id or comma-separated list (e.g. `1,4,9`) |
| `name` | Name — partial match |
| `status` | `0` (inactive) / `1` (active) |
| `sort_order` | Priority — exact match |
| `starts_from_from`, `starts_from_to` | Start-date range (ISO 8601) |
| `ends_till_from`, `ends_till_to` | End-date range (ISO 8601) |
| `sort`, `order` | Sort field (`id`, `name`, `sort_order`) + `asc` / `desc` (default `id desc`) |

Filters compose with logical AND — more filters narrow the result.

Every `/api/admin/*` request requires an admin Bearer token.
