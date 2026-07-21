---
outline: false
apiType: rest
examples:
  - id: rest
    title: Mass Delete RMA reasons
    query: |
      curl -X POST "https://your-domain.com/api/admin/rma/reasons/mass-delete" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{"indices": [2, 3, 4]}'
    response: |
      {
        "deleted": [
          2,
          3,
          4
        ],
        "message": "Selected RMA reasons deleted successfully."
      }
---

# Mass Delete RMA reasons

Deletes several RMA reasons in one call. Permission: `sales.rma.reasons.delete`.

## Endpoint

```
POST /api/admin/rma/reasons/mass-delete
```

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | array | Yes | Non-empty list of numeric ids to delete. |

An empty or missing `indices` list returns a `422` error.

The response `deleted` array lists the ids that were removed.
