---
outline: false
apiType: rest
examples:
  - id: rest
    title: Get RMA custom field
    query: |
      curl -X GET "https://your-domain.com/api/admin/rma/custom-fields/4" -H "Authorization: Bearer <token>"
    response: |
      {
        "id": 4,
        "code": "preferred_resolution",
        "label": "Preferred resolution",
        "type": "select",
        "isRequired": 1,
        "position": 1,
        "inputValidation": null,
        "status": 1,
        "options": [
          {
            "id": 11,
            "name": "Refund",
            "value": "refund"
          },
          {
            "id": 12,
            "name": "Replacement",
            "value": "replacement"
          }
        ],
        "message": null,
        "createdAt": "2026-07-20T09:00:00+00:00",
        "updatedAt": "2026-07-20T09:00:00+00:00"
      }
---

# Get RMA custom field

Returns a single RMA custom field by its numeric id.

## Endpoint

```
GET /api/admin/rma/custom-fields/{id}
```

A `404` is returned when the id does not exist.

For field meanings, see the [menu overview](./).
