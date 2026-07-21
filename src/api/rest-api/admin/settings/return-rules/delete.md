---
outline: false
apiType: rest
examples:
  - id: rest
    title: Delete RMA rule
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/rma/rules/3" -H "Authorization: Bearer <token>"
    response: |
      {
        "message": "RMA rule deleted successfully."
      }
---

# Delete RMA rule

Deletes a RMA rule by its numeric id. Permission: `sales.rma.rules.delete`.

## Endpoint

```
DELETE /api/admin/rma/rules/{id}
```

Returns `200` with a confirmation message.
