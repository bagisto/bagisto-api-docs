---
outline: false
apiType: rest
examples:
  - id: rest
    title: Mass Delete RMA rules
    query: |
      curl -X POST "https://your-domain.com/api/admin/rma/rules/mass-delete" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{"indices": [3, 5]}'
    response: |
      {
        "deleted": [
          3,
          5
        ],
        "message": "Selected RMA rules deleted successfully."
      }
---

# Mass Delete RMA rules

Deletes several RMA rules in one call. Permission: `sales.rma.rules.delete`.

## Endpoint

```
POST /api/admin/rma/rules/mass-delete
```

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | array | Yes | Non-empty list of numeric ids to delete. |

An empty or missing `indices` list returns a `422` error.

The response `deleted` array lists the ids that were removed.
