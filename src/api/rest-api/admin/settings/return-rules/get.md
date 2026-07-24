---
outline: false
apiType: rest
examples:
  - id: rest
    title: Get RMA rule
    query: |
      curl -X GET "https://your-domain.com/api/admin/rma/rules/3" -H "Authorization: Bearer <token>"
    response: |
      {
        "id": 3,
        "name": "Apparel 30-day returns",
        "description": "Return window for all clothing.",
        "status": 1,
        "returnPeriod": 30,
        "default": 0,
        "message": null,
        "createdAt": "2026-07-20T09:00:00+00:00",
        "updatedAt": "2026-07-20T09:00:00+00:00"
      }
---

# Get RMA rule

Returns a single RMA rule by its numeric id.

## Endpoint

```
GET /api/admin/rma/rules/{id}
```

A `404` is returned when the id does not exist.

For field meanings, see the [menu overview](./).
