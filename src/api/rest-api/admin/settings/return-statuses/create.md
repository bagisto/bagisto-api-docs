---
outline: false
apiType: rest
examples:
  - id: rest
    title: Create RMA status
    query: |
      curl -X POST "https://your-domain.com/api/admin/rma/statuses" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{"title": "Awaiting inspection", "status": 1, "color": "#FDB022"}'
    response: |
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
---

# Create RMA status

Creates a new RMA status. Permission: `sales.rma.statuses.create`.

## Endpoint

```
POST /api/admin/rma/statuses
```

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | Yes | Status label. Must be unique. |
| `status` | integer | No | `1` active / `0` inactive (default `1`). |
| `color` | string | No | Hex color of the badge. |

Returns `201` with the created RMA status.
