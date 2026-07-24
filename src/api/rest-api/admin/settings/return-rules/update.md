---
outline: false
apiType: rest
examples:
  - id: rest
    title: Update RMA rule
    query: |
      curl -X PUT "https://your-domain.com/api/admin/rma/rules/3" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{"name": "Apparel 45-day returns", "description": "Extended window for clothing.", "status": 1, "return_period": 45}'
    response: |
      {
        "id": 3,
        "name": "Apparel 45-day returns",
        "description": "Extended window for clothing.",
        "status": 1,
        "returnPeriod": 45,
        "default": 0,
        "message": null,
        "createdAt": "2026-07-20T09:00:00+00:00",
        "updatedAt": "2026-07-20T11:00:00+00:00"
      }
---

# Update RMA rule

Partial update — send only the fields you want to change; omitted fields keep their current value. Permission: `sales.rma.rules.edit`.

## Endpoint

```
PUT /api/admin/rma/rules/{id}
```

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | No | Rule label. |
| `description` | string | No | Free-text description. |
| `status` | integer | No | `1` active / `0` inactive. |
| `return_period` | integer | No | Return window in days. |

Returns `200` with the updated RMA rule.
