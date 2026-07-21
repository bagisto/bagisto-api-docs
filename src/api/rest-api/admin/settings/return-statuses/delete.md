---
outline: false
apiType: rest
examples:
  - id: rest
    title: Delete RMA status
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/rma/statuses/9" -H "Authorization: Bearer <token>"
    response: |
      {
        "message": "RMA status deleted successfully."
      }
---

# Delete RMA status

Deletes a RMA status by its numeric id. Permission: `sales.rma.statuses.delete`.

## Endpoint

```
DELETE /api/admin/rma/statuses/{id}
```

Only **non-default** statuses can be deleted. Deleting a default (system) status returns a `422` error.

Returns `200` with a confirmation message.
