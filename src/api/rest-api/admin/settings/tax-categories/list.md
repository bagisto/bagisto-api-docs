---
outline: false
apiType: rest
examples:
  - id: rest
    title: List Tax Categories
    description: Paginated list of every tax category configured in the store.
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/tax-categories?per_page=10" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "data": [
          {
            "id": 32,
            "code": "doc-demo-tc",
            "name": "Documentation Demo Tax Category (Updated)",
            "description": "Updated for docs examples",
            "taxRates": [],
            "createdAt": "2026-06-19T17:47:49+05:30",
            "updatedAt": "2026-06-19T17:48:10+05:30"
          },
          {
            "id": 29,
            "code": "e2e_tc_hpj72b",
            "name": "E2E Tax Cat e2e_tc_hpj72b",
            "description": "e2e generated",
            "taxRates": [],
            "createdAt": "2026-06-17T12:16:02+05:30",
            "updatedAt": "2026-06-17T12:16:02+05:30"
          }
        ],
        "meta": {
          "currentPage": 1,
          "perPage": 10,
          "lastPage": 2,
          "total": 20,
          "from": 1,
          "to": 10
        }
      }
  - id: filtered
    title: Filtered + Sorted
    description: Narrow by code and name, sorted by name ascending. Supplying multiple filters narrows the result (logical AND).
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/tax-categories?code=doc&name=Demo&sort=name&order=asc&per_page=10" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "data": [
          {
            "id": 32,
            "code": "doc-demo-tc",
            "name": "Documentation Demo Tax Category (Updated)",
            "description": "Updated for docs examples",
            "taxRates": [],
            "createdAt": "2026-06-19T17:47:49+05:30",
            "updatedAt": "2026-06-19T17:48:10+05:30"
          }
        ],
        "meta": {
          "currentPage": 1,
          "perPage": 10,
          "lastPage": 1,
          "total": 1,
          "from": 1,
          "to": 1
        }
      }
---

# List Tax Categories

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/tax-categories` | GET |

Returns every tax category configured in the store in the `{ data, meta }` envelope. Each tax category is a named group of tax rates that you assign to products to determine how they are taxed.

## Pagination

| Parameter | Description |
|-----------|-------------|
| `page` | Page number, 1-based. Default `1`. |
| `per_page` | Items per page. Default `10`, max `50`. |

## Filters

Query parameters that narrow the result. Supplying more than one **narrows further** — they combine with logical **AND**. They mirror the admin Tax Categories datagrid filters.

| Parameter | Match | Example |
|-----------|-------|---------|
| `code` | Partial (contains). | `?code=doc` |
| `name` | Partial (contains). | `?name=Demo` |

## Sorting

| Parameter | Values |
|-----------|--------|
| `sort` | `id` (default), `code`, `name` |
| `order` | `asc`, `desc` (default `desc`) |

Both the compound form `?sort=name-asc` and the split form `?sort=name&order=asc` are accepted.

## Notes

- `taxRates` lists the attached rate ids. It is **detail-only** — empty (`[]`) on the listing to keep the list query light. Fetch a single category to read its attached rates.

See the [Tax Categories overview](./) for field meanings and behaviour.
