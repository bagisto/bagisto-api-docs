---
outline: false
apiType: rest
examples:
  - id: rest
    title: List Return Rules
    query: |
      curl -X GET "https://your-domain.com/api/admin/rma/rules" -H "Authorization: Bearer <token>"
    response: |
      {
        "data": [
          {
            "id": 3,
            "name": "Apparel 30-day returns",
            "description": "Return window for all clothing.",
            "status": 1,
            "returnPeriod": 30,
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

# List RMA rules

Returns the store's return rules. Rows come back in the standard `{ data, meta }` envelope.

## Endpoint

```
GET /api/admin/rma/rules
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
| `name` | Partial (contains). | `?name=Apparel` |
| `status` | Exact — `1` active, `0` inactive. | `?status=1` |

### Sorting

| Parameter | Values |
|-----------|--------|
| `sort` | `id` (default), `name` |
| `order` | `asc`, `desc` (default `desc`) |

## Fields

| Field | Meaning |
|-------|---------|
| `name` | The rule label. |
| `description` | Free-text description of the rule. |
| `status` | `1` active, `0` inactive. |
| `returnPeriod` | The return window in **days** for products this rule matches. |
| `default` | `1` if this is the default rule, `0` otherwise. |
| `message` | `null` on create / update / read; populated only on the delete confirmation. |

For how this menu fits the rest of the RMA settings, see the [menu overview](./).
