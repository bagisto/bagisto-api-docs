---
outline: false
apiType: rest
examples:
  - id: rest
    title: Delete RMA reason
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/rma/reasons/2" -H "Authorization: Bearer <token>"
    response: |
      {
        "message": "RMA reason deleted successfully."
      }
---

# Delete RMA reason

Deletes a RMA reason by its numeric id. Permission: `sales.rma.reasons.delete`.

## Endpoint

```
DELETE /api/admin/rma/reasons/{id}
```

Returns `200` with a confirmation message.
