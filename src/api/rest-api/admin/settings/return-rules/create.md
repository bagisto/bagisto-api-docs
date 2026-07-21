---
outline: false
apiType: rest
examples:
  - id: rest
    title: Create RMA rule
    query: |
      curl -X POST "https://your-domain.com/api/admin/rma/rules" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{"name": "Apparel 30-day returns", "description": "Return window for all clothing.", "status": 1, "return_period": 30}'
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

# Create RMA rule

Creates a new RMA rule. Permission: `sales.rma.rules.create`.

## Endpoint

```
POST /api/admin/rma/rules
```

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | Yes | Rule label. |
| `return_period` | integer | Yes | Return window in days. |
| `description` | string | No | Free-text description. |
| `status` | integer | No | `1` active / `0` inactive (default `1`). |

Returns `201` with the created RMA rule.
