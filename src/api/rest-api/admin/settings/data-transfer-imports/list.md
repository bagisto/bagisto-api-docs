---
outline: false
apiType: rest
examples:
  - id: rest
    title: List Imports
    description: Paginated list of every data transfer import job, newest first.
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/data-transfer/imports?per_page=10" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "data": [
          {
            "id": 3,
            "code": "products",
            "action": "append",
            "state": "completed",
            "processedRowsCount": 150,
            "summary": { "created": 100, "updated": 50, "deleted": 0 },
            "createdAt": "2026-05-25T09:00:00+00:00"
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
  - id: filtered
    title: Filtered + Sorted
    description: Narrow by entity type, action and state, then sort by created_at descending. Supplying multiple filters narrows the result (logical AND).
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/data-transfer/imports?code=products&action=append&state=completed&created_at_from=2026-01-01&created_at_to=2026-12-31&sort=created_at&order=desc&per_page=10" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "data": [
          {
            "id": 3,
            "code": "products",
            "action": "append",
            "state": "completed",
            "processedRowsCount": 150,
            "summary": { "created": 100, "updated": 50, "deleted": 0 },
            "createdAt": "2026-05-25T09:00:00+00:00"
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

# List Data Transfer Imports

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/data-transfer/imports` | GET |

Returns every data transfer import across entity types and actions in the `{ data, meta }` envelope, newest first. Each row is one import job — the file uploaded, the entity it targets, and how far it has run.

## Pagination

| Parameter | Description |
|-----------|-------------|
| `page` | Page number, 1-based. Default `1`. |
| `per_page` | Items per page. Default `10`, max `50`. |

## Filters

Query parameters that narrow the result. Supplying more than one **narrows further** — they combine with logical **AND**. They mirror the admin Imports datagrid filters.

| Parameter | Match | Example |
|-----------|-------|---------|
| `code` | Entity type (exact). | `?code=products` |
| `type` | Synonym for `code` (kept for spec compatibility). | `?type=products` |
| `action` | Exact — `append` or `delete`. | `?action=append` |
| `state` | Exact. | `?state=completed` |
| `created_at_from` | `createdAt` >= the given ISO date. | `?created_at_from=2026-01-01` |
| `created_at_to` | `createdAt` <= the given ISO date. | `?created_at_to=2026-12-31` |

## Sorting

| Parameter | Values |
|-----------|--------|
| `sort` | `id` (default), `state`, `created_at` |
| `order` | `asc`, `desc` (default `desc`) |

## Notes

- The heavy `errors` and `summary` blobs are **left null on listing rows** to keep the response light — fetch a single import with the detail endpoint to read them.
- `code` is the entity being imported (`products`, `customers`, `tax_rates`, …). `action` is `append` or `delete`.
- `processedRowsCount` advances as the import runs; `errorsCount` / `invalidRowsCount` reflect validation outcomes.

See the [Imports overview](./) for field meanings and behaviour.
