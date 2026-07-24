---
outline: false
apiType: rest
examples:
  - id: rest
    title: Mass Update RMA rules Status
    query: |
      curl -X POST "https://your-domain.com/api/admin/rma/rules/mass-update-status" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{"indices": [3, 5], "value": 1}'
    response: |
      {
        "updated": [
          3,
          5
        ],
        "message": "Selected RMA rules updated successfully."
      }
---

# Mass Update RMA rules Status

Sets the active `status` flag on several RMA rules in one call. Permission: `sales.rma.rules.edit`.

## Endpoint

```
POST /api/admin/rma/rules/mass-update-status
```

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | array | Yes | Non-empty list of numeric ids to update. |
| `value` | integer | Yes | New status — `1` (active) or `0` (inactive). |

An empty `indices` list or an out-of-range `value` returns a `422` error.

The response `updated` array lists the ids that changed.
