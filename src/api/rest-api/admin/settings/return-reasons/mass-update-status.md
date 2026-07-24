---
outline: false
apiType: rest
examples:
  - id: rest
    title: Mass Update RMA reasons Status
    query: |
      curl -X POST "https://your-domain.com/api/admin/rma/reasons/mass-update-status" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{"indices": [2, 3], "value": 1}'
    response: |
      {
        "updated": [
          2,
          3
        ],
        "message": "Selected RMA reasons updated successfully."
      }
---

# Mass Update RMA reasons Status

Sets the active `status` flag on several RMA reasons in one call. Permission: `sales.rma.reasons.edit`.

## Endpoint

```
POST /api/admin/rma/reasons/mass-update-status
```

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | array | Yes | Non-empty list of numeric ids to update. |
| `value` | integer | Yes | New status — `1` (active) or `0` (inactive). |

An empty `indices` list or an out-of-range `value` returns a `422` error.

The response `updated` array lists the ids that changed.
