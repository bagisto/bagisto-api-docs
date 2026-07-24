---
outline: false
apiType: rest
examples:
  - id: rest
    title: Update RMA reason
    query: |
      curl -X PUT "https://your-domain.com/api/admin/rma/reasons/2" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{"title": "Damaged on arrival", "status": 1, "position": 2, "resolution_type": ["return"]}'
    response: |
      {
        "id": 2,
        "title": "Damaged on arrival",
        "status": 1,
        "position": 2,
        "isAdmin": 0,
        "resolutionType": [
          "return"
        ],
        "message": null,
        "createdAt": "2026-07-20T09:00:00+00:00",
        "updatedAt": "2026-07-20T11:00:00+00:00"
      }
---

# Update RMA reason

Partial update — send only the fields you want to change; omitted fields keep their current value. Permission: `sales.rma.reasons.edit`.

## Endpoint

```
PUT /api/admin/rma/reasons/{id}
```

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | No | Reason label. |
| `status` | integer | No | `1` active / `0` inactive. |
| `position` | integer | No | Sort order. |
| `resolution_type` | array | No | Allowed return actions. |

Returns `200` with the updated RMA reason.
