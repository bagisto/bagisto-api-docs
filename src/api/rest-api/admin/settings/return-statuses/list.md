---
outline: false
apiType: rest
examples:
  - id: rest
    title: List Return Statuses
    query: |
      curl -X GET "https://your-domain.com/api/admin/rma/statuses" -H "Authorization: Bearer <token>"
    response: |
      {
        "data": [
          {
            "id": 9,
            "title": "Awaiting inspection",
            "status": 1,
            "color": "#FDB022",
            "default": 0,
            "message": null,
            "createdAt": "2026-07-20T09:00:00+00:00",
            "updatedAt": "2026-07-20T09:00:00+00:00"
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

# List RMA statuses

Returns the store's return statuses. Default statuses cannot be deleted. Rows come back in the standard `{ data, meta }` envelope.

## Endpoint

```
GET /api/admin/rma/statuses
```

## Query parameters

All parameters are optional and combine in one request — filter, sort and paginate together.

### Pagination

| Parameter | Description |
|-----------|-------------|
| `page` | Page number (1-based). |
| `per_page` | Items per page (default `10`, max `50`). |

### Filters

Each filter narrows the result; supplying more than one combines with logical **AND**.

| Parameter | Match | Example |
|-----------|-------|---------|
| `title` | Partial (contains). | `?title=Awaiting` |
| `status` | Exact — `1` active, `0` inactive. | `?status=1` |

### Sorting

| Parameter | Values |
|-----------|--------|
| `sort` | `id` (default), `title` |
| `order` | `asc`, `desc` (default `desc`) |

## Fields

| Field | Meaning |
|-------|---------|
| `title` | The status label. |
| `status` | `1` active, `0` inactive. |
| `color` | Hex color of the status badge (e.g. `#FDB022`). |
| `default` | `1` for a built-in system status (cannot be deleted), `0` for a custom one. |
| `message` | `null` on create / update / read; populated only on the delete confirmation. |

For how this menu fits the rest of the RMA settings, see the [menu overview](./).
