---
outline: false
apiType: rest
examples:
  - id: rest
    title: Get RMA status
    query: |
      curl -X GET "https://your-domain.com/api/admin/rma/statuses/9" -H "Authorization: Bearer <token>"
    response: |
      {
        "id": 9,
        "title": "Awaiting inspection",
        "status": 1,
        "color": "#FDB022",
        "default": 0,
        "message": null,
        "createdAt": "2026-07-20T09:00:00+00:00",
        "updatedAt": "2026-07-20T09:00:00+00:00"
      }
---

# Get RMA status

Returns a single RMA status by its numeric id.

## Endpoint

```
GET /api/admin/rma/statuses/{id}
```

A `404` is returned when the id does not exist.

For field meanings, see the [menu overview](./).
