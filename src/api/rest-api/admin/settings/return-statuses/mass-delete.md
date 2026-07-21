---
outline: false
apiType: rest
examples:
  - id: rest
    title: Mass Delete RMA statuses
    query: |
      curl -X POST "https://your-domain.com/api/admin/rma/statuses/mass-delete" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{"indices": [9, 10]}'
    response: |
      {
        "deleted": [
          9,
          10
        ],
        "message": "Selected RMA statuses deleted successfully."
      }
---

# Mass Delete RMA statuses

Deletes several RMA statuses in one call. Permission: `sales.rma.statuses.delete`.

## Endpoint

```
POST /api/admin/rma/statuses/mass-delete
```

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | array | Yes | Non-empty list of numeric ids to delete. |

An empty or missing `indices` list returns a `422` error.

Default (system) statuses in the list are **silently skipped**.

The response `deleted` array lists the ids that were removed.
