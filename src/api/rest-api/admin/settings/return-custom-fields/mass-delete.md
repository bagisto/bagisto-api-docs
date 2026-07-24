---
outline: false
apiType: rest
examples:
  - id: rest
    title: Mass Delete RMA custom fields
    query: |
      curl -X POST "https://your-domain.com/api/admin/rma/custom-fields/mass-delete" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{"indices": [4, 6]}'
    response: |
      {
        "deleted": [
          4,
          6
        ],
        "message": "Selected RMA custom fields deleted successfully."
      }
---

# Mass Delete RMA custom fields

Deletes several RMA custom fields in one call. Permission: `sales.rma.custom-fields.delete`.

## Endpoint

```
POST /api/admin/rma/custom-fields/mass-delete
```

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | array | Yes | Non-empty list of numeric ids to delete. |

An empty or missing `indices` list returns a `422` error.

The response `deleted` array lists the ids that were removed.
