---
outline: false
apiType: rest
examples:
  - id: rest
    title: Delete RMA custom field
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/rma/custom-fields/4" -H "Authorization: Bearer <token>"
    response: |
      {
        "message": "RMA custom field deleted successfully."
      }
---

# Delete RMA custom field

Deletes a RMA custom field by its numeric id. Permission: `sales.rma.custom-fields.delete`.

## Endpoint

```
DELETE /api/admin/rma/custom-fields/{id}
```

Returns `200` with a confirmation message.
