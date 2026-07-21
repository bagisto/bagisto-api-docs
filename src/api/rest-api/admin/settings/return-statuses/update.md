---
outline: false
apiType: rest
examples:
  - id: rest
    title: Update RMA status
    query: |
      curl -X PUT "https://your-domain.com/api/admin/rma/statuses/9" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{"title": "Inspection complete", "status": 1, "color": "#12B76A"}'
    response: |
      {
        "id": 9,
        "title": "Inspection complete",
        "status": 1,
        "color": "#12B76A",
        "default": 0,
        "message": null,
        "createdAt": "2026-07-20T09:00:00+00:00",
        "updatedAt": "2026-07-20T11:00:00+00:00"
      }
---

# Update RMA status

Partial update — send only the fields you want to change; omitted fields keep their current value. Permission: `sales.rma.statuses.edit`.

## Endpoint

```
PUT /api/admin/rma/statuses/{id}
```

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | No | Status label. Must be unique. |
| `status` | integer | No | `1` active / `0` inactive. |
| `color` | string | No | Hex color of the badge. |

Returns `200` with the updated RMA status.
