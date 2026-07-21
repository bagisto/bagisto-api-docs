---
outline: false
apiType: rest
examples:
  - id: rest
    title: Mass Update RMA statuses Status
    query: |
      curl -X POST "https://your-domain.com/api/admin/rma/statuses/mass-update-status" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{"indices": [9, 10], "value": 1}'
    response: |
      {
        "updated": [
          9,
          10
        ],
        "message": "Selected RMA statuses updated successfully."
      }
---

# Mass Update RMA statuses Status

Sets the active `status` flag on several RMA statuses in one call. Permission: `sales.rma.statuses.edit`.

## Endpoint

```
POST /api/admin/rma/statuses/mass-update-status
```

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | array | Yes | Non-empty list of numeric ids to update. |
| `value` | integer | Yes | New status — `1` (active) or `0` (inactive). |

An empty `indices` list or an out-of-range `value` returns a `422` error.

The response `updated` array lists the ids that changed.
