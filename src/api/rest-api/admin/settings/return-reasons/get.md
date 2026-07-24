---
outline: false
apiType: rest
examples:
  - id: rest
    title: Get RMA reason
    query: |
      curl -X GET "https://your-domain.com/api/admin/rma/reasons/2" -H "Authorization: Bearer <token>"
    response: |
      {
        "id": 2,
        "title": "Damaged product",
        "status": 1,
        "position": 1,
        "isAdmin": 0,
        "resolutionType": [
          "return",
          "cancel_items"
        ],
        "message": null,
        "createdAt": "2026-07-20T09:00:00+00:00",
        "updatedAt": "2026-07-20T09:00:00+00:00"
      }
---

# Get RMA reason

Returns a single RMA reason by its numeric id.

## Endpoint

```
GET /api/admin/rma/reasons/{id}
```

A `404` is returned when the id does not exist.

For field meanings, see the [menu overview](./).
