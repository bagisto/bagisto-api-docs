---
outline: false
apiType: rest
examples:
  - id: rest
    title: List Return Reasons
    query: |
      curl -X GET "https://your-domain.com/api/admin/rma/reasons" -H "Authorization: Bearer <token>"
    response: |
      {
        "data": [
          {
            "id": 2,
            "title": "Damaged product",
            "status": 1,
            "position": 1,
            "isAdmin": 0,
            "resolutionType": [
              "return",
              "cancel_items"
            ],
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

# List RMA reasons

Returns the store's return reasons. Rows come back in the standard `{ data, meta }` envelope.

## Endpoint

```
GET /api/admin/rma/reasons
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
| `title` | Partial (contains). | `?title=Damaged` |
| `status` | Exact — `1` active, `0` inactive. | `?status=1` |

### Sorting

| Parameter | Values |
|-----------|--------|
| `sort` | `id` (default), `position`, `title` |
| `order` | `asc`, `desc` (default `desc`) |

## Fields

| Field | Meaning |
|-------|---------|
| `title` | The reason label shown to the customer. |
| `status` | `1` active, `0` inactive. |
| `position` | Sort order in the returns form. |
| `isAdmin` | `1` if the reason was created by an admin, `0` if it is a seeded reason. |
| `resolutionType` | The return actions this reason allows — an array of `return` and/or `cancel_items`. |
| `message` | `null` on create / update / read; populated only on the delete confirmation. |

For how this menu fits the rest of the RMA settings, see the [menu overview](./).
